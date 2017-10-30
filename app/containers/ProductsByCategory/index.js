/*
 *
 * ProductsByCategoryPage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  __,
  F,
  T,
  compose,
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
import styled from 'styled-components'
import { Container } from 'semantic-ui-react'

import ProductView from 'components/ProductView'
import Footer from 'components/Footer'
import WindowWidth from 'components/WindowWidth'
import LazyLoading from 'components/LazyLoading'

import H3 from 'components/H3'
import H4 from 'components/H4'
import EmptyProducts from 'components/EmptyProductsBlock'

import { Uppercase } from 'utils/string'

import {
  getProductCategoriesAction,
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories,
  selectLoader
} from 'containers/Buckets/selectors'

import messages from './messages'

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
    productsByTags: PropTypes.object.isRequired,
    productsByCategory: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  state = {
    pageOffset: 0,
    offset: 0,
    limit: 16 // we need this since we are including the feature items.
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
    const { categories, params: { id } } = this.props
    if (categories.size) {
      const category = categories.find((cat) => cat.get('id') === id)
      return category ? category.get('name') : ''
    }
    return ''
  }

  _handlePageTitle () {
    const { params: { id } } = this.props
    const IstagText = (tag) => `${Uppercase(tag)} Items`

    const titleCondition = ifElse(isTag(this._tags), IstagText, this._isCategoryExist)
    const titleComposition = compose(titleCondition)
    return titleComposition(id)
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
    const { productsFeatured, changeRoute, loader, windowWidth } = this.props
    if (this._handleFeaturedProductsPerCategory() && productsFeatured.size) {
      return (
        <ProductView changeRoute={changeRoute} loader={loader} products={productsFeatured.slice(0, 4)} windowWidth={windowWidth} />
      )
    }

    return null
  }

  _displayNumberProducts () {
    const { params: { id }, productsByCategory, productsFeatured, totalCount } = this.props
    const displayTotalCount = ifElse(partial(isTag(this._tags), [id]),
      identity,
      subtract(__, productsFeatured.size)
    )

    if (productsByCategory.size) {
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
    const { productsViewed } = this.props

    if (productsViewed.size) {
      return (
        <H3>
          <FormattedMessage {...messages.viewed} />
        </H3>
      )
    }

    return null
  }

  _displayEmpty () {
    const { productsByCategory, loader } = this.props

    if (loader === false && !(productsByCategory.size > 0)) {
      return (
        <EmptyProducts>
          <FormattedMessage {...messages.emptyMessage} />
        </EmptyProducts>
      )
    }

    return null
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
    const { params: { id }, productsByTags, productsByCategory } = this.props
    const shouldDiplayTagItems = ifElse(
      isTag(this._tags),
      () => productsByTags,
      () => productsByCategory
    )

    return shouldDiplayTagItems(id)
  }

  _handleFeaturedProductsPerCategory () {
    const { params: { id } } = this.props
    const shouldNotDisplay = (id) => (isTag(this._tags)(id))

    const showFeaturedItem = ifElse(shouldNotDisplay, F, T)

    return showFeaturedItem(id)
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByTagCategory (props) {
    const { getProductsByTags, getProductsByCategory, params: { id } } = props
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
    const { getProductsViewed, getProductCategories } = this.props

    getProductCategories()
    getProductsViewed()

    this._fetchProductByTagCategory(this.props)
  }

  componentWillUnmount () {
    this.props.resetProductsByCategory()
  }

  componentWillReceiveProps (nextProps) {
    const { params } = this.props

    const isParamsEqual = (id, props) => compose(
      equals(id),
      path(['params', 'id'])
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
    const { productsViewed, loader, changeRoute, lazyload, windowWidth } = this.props
    const { limit } = this.state

    return (
      <div>
        <ContentWrapper>
          <LazyLoading
            lazyload={lazyload}
            results={this._displayProductData()}
            onScroll={this._displayMoreProducts}
            limit={limit}
          >
            { this._displayHeaderFeaturesProduct() }
            { this._displayFeaturesProduct() }

            <H3 className='margin__none'> {this._handlePageTitle()} </H3>
            {this._displayNumberProducts()}
            { this._displayEmpty() }
            <ProductView changeRoute={changeRoute} loader={loader} products={this._displayProductData()} windowWidth={windowWidth} />

            { this._displayRecentlyViewedHeader() }
          </LazyLoading>
          <ProductView changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />

        </ContentWrapper>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
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

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(ProductsByCategory))
