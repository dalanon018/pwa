/*
 *
 * ProductsByCategoryPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  F,
  T,
  __,
  allPass,
  compose,
  cond,
  contains,
  curry,
  equals,
  identity,
  ifElse,
  lt,
  partial,
  path,
  subtract
} from 'ramda'
import { Container } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { Uppercase } from 'utils/string'

import ProductView from 'components/ProductView'
import Footer from 'components/Footer'
import WindowWidth from 'components/WindowWidth'
// import LazyLoading from 'components/LazyLoading'
import InfiniteLoading from 'components/InfiniteLoading'
import H3 from 'components/H3'
import H4 from 'components/H4'
import EmptyProducts from 'components/EmptyProductsBlock'
import LoadingIndicator from 'components/LoadingIndicator'

import {
  getProductCategoriesAction,
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import {
  selectProductCategories,
  selectLoader
} from 'containers/Buckets/selectors'
import { PRODUCTSCATEGORY_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getProductsByCategoryAction,
  getProductsByTagsAction,
  getProductsViewedAction,
  resetProductsByCategoryAction
} from './actions'

import {
  selectLazyload,
  selectLoading,
  selectProductsByCategory,
  selectProductsByCategoryItems,
  selectProductsByCategoryFeatured,
  selectProductsViewed,
  selectTotalCount
} from './selectors'

import {
  LIMIT_ITEMS
} from './constants'

const ContentWrapper = styled(Container)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;

  h4.ui.header {
    margin-top: 0 !important;
  }

  @media (min-width: 768px) {
    .header-label {
      padding-bottom: 20px;
    }

    .header-label span {
      font-size: 20px;
    }

    .category-title {
      font-size: 20px;
    }

    .num-item-label, .num-item-label span {
      font-size: 17px;
      letter-spacing: 3px;
    }

    .recent-label {
      padding-bottom: 20px;
      padding-top: 25px;
    }

    .recent-label span {
      font-size: 20px;
    }
  }
`

const isTag = curry((tags, id) => contains(id, tags))

export class ProductsByCategory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProductsByCategory: PropTypes.func.isRequired,
    getProductCategories: PropTypes.func.isRequired,
    getProductsViewed: PropTypes.func.isRequired,
    resetProductsByCategory: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    allCategoryProducts: PropTypes.object.isRequired,
    productsByTags: PropTypes.object.isRequired,
    productsByCategory: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    setRouteName: PropTypes.func.isRequired
  }

  state = {
    pageOffset: 0,
    offset: 0,
    limit: LIMIT_ITEMS // we need this since we are including the feature items.
  }

  _tags = ['featured', 'sale']

  constructor () {
    super()

    this._handlePageTitle = this._handlePageTitle.bind(this)
    this._isCategoryExist = this._isCategoryExist.bind(this)
    this._fetchProductByTagCategory = this._fetchProductByTagCategory.bind(this)
    this._displayMoreProducts = this._displayMoreProducts.bind(this)
    this._resetValuesAndFetch = this._resetValuesAndFetch.bind(this)
    this._handleFeaturedProductsPerCategory = this._handleFeaturedProductsPerCategory.bind(this)
    this._displayFeaturesProduct = this._displayFeaturesProduct.bind(this)
    this._displayHeaderFeaturesProduct = this._displayHeaderFeaturesProduct.bind(this)
    this._displayNumberProducts = this._displayNumberProducts.bind(this)
    this._displayRecentlyViewedHeader = this._displayRecentlyViewedHeader.bind(this)
    this._displayEmpty = this._displayEmpty.bind(this)
  }

  _isCategoryExist () {
    const { categories, match: { params: { id } } } = this.props
    if (categories.size) {
      const category = categories.find((cat) => cat.get('id') === id)
      return category ? category.get('name') : ''
    }
    return ''
  }

  _handlePageTitle () {
    const { match: { params: { id } }, lazyload } = this.props
    const IstagText = (tag) => `${Uppercase(tag)} Items`
    const product = this._displayProductData()

    const titleCondition = ifElse(isTag(this._tags), IstagText, this._isCategoryExist)
    const titleComposition = compose(titleCondition)

    // we will not show this if product size is 0 and lazy loading since we know we are only displaying the featured items
    return (lazyload && product.size === 0) ? null : titleComposition(id)
  }

  _displayMoreProducts () {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchProductByTagCategory(this.props))
  }

  _displayHeaderFeaturesProduct () {
    const { productsFeatured } = this.props
    if (this._handleFeaturedProductsPerCategory() && productsFeatured.size) {
      return (
        <H3>
          <FormattedMessage {...messages.feature} />
        </H3>
      )
    }

    return null
  }

  _displayFeaturesProduct () {
    const { productsFeatured, changeRoute, loader, lazyload, windowWidth, totalCount } = this.props
    if (this._handleFeaturedProductsPerCategory() && productsFeatured.size) {
      return (
        <InfiniteLoading
          results={productsFeatured}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={loader}
          rowCount={totalCount}
        >
          {(props) => (
            <ProductView
              changeRoute={changeRoute}
              loader={loader}
              products={productsFeatured}
              windowWidth={windowWidth}
              {...props}
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  _displayNumberProducts () {
    const { match: { params: { id } }, productsFeatured, totalCount } = this.props
    const displayTotalCount = ifElse(partial(isTag(this._tags), [id]),
      identity,
      subtract(__, productsFeatured.size)
    )
    const product = this._displayProductData()

    if (product.size) {
      return (
        <H4 className='color__grey'>
          { displayTotalCount(totalCount) }
          <FormattedMessage {...messages.items} />
        </H4>
      )
    }

    return null
  }

  _displayRecentlyViewedHeader () {
    const { productsViewed, lazyload } = this.props

    // we only show if items are not empty and not lazyloading
    if (productsViewed.size && !lazyload) {
      return (
        <H3>
          <FormattedMessage {...messages.viewed} />
        </H3>
      )
    }

    return null
  }

  _displayRecentlyViewedItems () {
    const { productsViewed, lazyload, changeRoute, loader, windowWidth } = this.props
    // we only show if items are not empty and not lazyloading
    if (productsViewed.size && !lazyload) {
      return (
        <ProductView changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
      )
    }

    return null
  }

  /**
   * this will simply display items that we are loading
   */
  _displayEmptyProductViewLoading = () => {
    const { changeRoute, windowWidth } = this.props

    return (
      <ProductView changeRoute={changeRoute} loader products={this._displayAllProductData()} windowWidth={windowWidth} />
    )
  }

  _displayEmptyLoadingIndicator = () => {
    const { loader, lazyload } = this.props
    const product = this._displayAllProductData()
    const display = cond([
      [allPass([
        equals(false),
        partial(equals(0), [product.size]),
        partial(equals(false), [lazyload])
      ]), this._displayEmpty],
      [allPass([
        equals(true),
        partial(equals(0), [product.size])
      ]), this._displayEmptyProductViewLoading],
      [allPass([
        equals(true),
        partial(equals(false), [lazyload])
      ]), this._displayLoader],
      [equals(false), () => null]
    ])

    return display(loader)
  }

  _displayEmpty () {
    return (
      <EmptyProducts>
        <FormattedMessage {...messages.emptyMessage} />
      </EmptyProducts>
    )
  }

  _displayLoader = () => {
    return (
      <LoadingIndicator />
    )
  }

  /**
   * What does this solve?
   * Well if your page is for featured item
   * technically you have to show the featured items along with the ordinary items.
   *
   * else where if you're on a category then you have certain distinction
   * weather the item is featured or ordinary
   */
  _displayProductData = () => {
    const { match: { params: { id } }, productsByTags, productsByCategory } = this.props
    const shouldDiplayTagItems = ifElse(
      isTag(this._tags),
      () => productsByTags,
      () => productsByCategory
    )

    return shouldDiplayTagItems(id)
  }

  /**
   * Since we have different selector due to featured items and regular
   * now this solves is to return ALL data regardless it is a featured or not.
   */
  _displayAllProductData = () => {
    const { match: { params: { id } }, productsByTags, allCategoryProducts } = this.props
    const shouldDiplayTagItems = ifElse(
      isTag(this._tags),
      () => productsByTags,
      () => allCategoryProducts
    )

    return shouldDiplayTagItems(id)
  }

  _displayRegularItems = () => {
    const { changeRoute, loader, lazyload, windowWidth, totalCount } = this.props
    const products = this._displayProductData()

    if (products.size !== 0) {
      return (
        <InfiniteLoading
          results={products}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={loader}
          rowCount={totalCount}
        >
          {(props) => (
            <ProductView
              changeRoute={changeRoute}
              loader={loader}
              products={products}
              windowWidth={windowWidth}
              {...props}
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  _handleFeaturedProductsPerCategory () {
    const { match: { params: { id } } } = this.props
    const shouldNotDisplay = (id) => (isTag(this._tags)(id))

    const showFeaturedItem = ifElse(shouldNotDisplay, F, T)

    return showFeaturedItem(id)
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByTagCategory (props) {
    const { getProductsByTags, getProductsByCategory, match: { params: { id } } } = props
    const { offset, limit } = this.state
    const requestData = curry((fn, id) => fn({ offset, limit, id }))
    const executeFetchData = ifElse(
      isTag(this._tags),
      requestData(getProductsByTags),
      requestData(getProductsByCategory)
    )

    // since this data is change and we know exactly
    executeFetchData(id)
  }

  _resetValuesAndFetch (props) {
    const { resetProductsByCategory } = props

    resetProductsByCategory()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByTagCategory(props))
  }

  componentWillMount () {
    this.props.setPageTitle('..')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    const { getProductsViewed, getProductCategories, setRouteName } = this.props

    setRouteName(PRODUCTSCATEGORY_NAME)
    getProductCategories()
    getProductsViewed()

    this._fetchProductByTagCategory(this.props)
  }

  componentWillUnmount () {
    this.props.resetProductsByCategory()
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   const { allCategoryProducts } = this.props

  //   if (allCategoryProducts.size !== nextProps.allCategoryProducts.size) {
  //     return true
  //   }

  //   return false
  // }

  componentWillReceiveProps (nextProps) {
    const { match: { params } } = this.props

    const isParamsEqual = (id, props) => compose(
      equals(id),
      path(['match', 'params', 'id'])
    )(props)

    const updateFetchProduct = ifElse(
      partial(isParamsEqual, [params.id]),
      noop,
      this._resetValuesAndFetch
    )

    const updatePageTitle = ifElse(
      compose(lt(0), path(['categories', 'size'])),
      compose(
        this.props.setPageTitle,
        this._handlePageTitle
      ),
      noop
    )

    updateFetchProduct(nextProps)
    updatePageTitle(nextProps)
  }

  render () {
    return (
      <div>
        <ContentWrapper>
          { this._displayHeaderFeaturesProduct() }
          { this._displayFeaturesProduct() }

          <H3 className='margin__none'> {this._handlePageTitle()} </H3>
          { this._displayNumberProducts() }
          { this._displayEmptyLoadingIndicator() }
          { this._displayRegularItems() }

          { this._displayRecentlyViewedHeader() }
          { this._displayRecentlyViewedItems() }
        </ContentWrapper>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  allCategoryProducts: selectProductsByCategory(),
  productsByTags: selectProductsByCategory(),
  productsByCategory: selectProductsByCategoryItems(),
  productsViewed: selectProductsViewed(),
  productsFeatured: selectProductsByCategoryFeatured(),
  categories: selectProductCategories(),
  loader: selectLoading(),
  lazyload: selectLazyload(),
  totalCount: selectTotalCount(),
  categoryLoader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProductCategories: payload => dispatch(getProductCategoriesAction(payload)),
    getProductsByCategory: payload => dispatch(getProductsByCategoryAction(payload)),
    getProductsByTags: payload => dispatch(getProductsByTagsAction(payload)),
    getProductsViewed: () => dispatch(getProductsViewedAction()),
    resetProductsByCategory: () => dispatch(resetProductsByCategoryAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'productsByCategory', reducer })
const withSaga = injectSaga({ key: 'productsByCategory', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(ProductsByCategory))
