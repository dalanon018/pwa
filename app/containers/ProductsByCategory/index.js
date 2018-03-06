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
  __,
  allPass,
  compose,
  cond,
  equals,
  ifElse,
  lt,
  partial,
  path,
  subtract
} from 'ramda'
import { Container } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'
import MobileFooter from 'components/Mobile/Footer'

import WindowWidth from 'components/Shared/WindowWidth'
import H3 from 'components/Shared/H3'
import H4 from 'components/Shared/H4'
import EmptyProducts from 'components/Shared/EmptyProductsBlock'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import AccessView from 'components/Shared/AccessMobileDesktopView'
import Modal from 'components/Shared/PromptModal'

import { InfiniteLoading, InfiniteWrapper } from 'components/Shared/InfiniteLoading'

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
  getProductsViewedAction,
  resetProductsByCategoryAction,
  getOver18Action,
  submitOver18Action
} from './actions'

import {
  selectLazyload,
  selectLoading,
  selectProductsByCategory,
  selectProductsByCategoryItems,
  selectProductsByCategoryFeatured,
  selectProductsViewed,
  selectTotalCount,
  selectOver18
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

const DesktopTitle = styled.p`
  font-family: Lato,Cabin,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`

const DesktopItemCount = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
`

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
    products: PropTypes.object.isRequired,
    productsByCategory: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    setRouteName: PropTypes.func.isRequired,
    submitOver18: PropTypes.func.isRequired,
    getOver18: PropTypes.func.isRequired
  }

  state = {
    pageOffset: 0,
    offset: 0,
    togglePrompt: false,
    limit: LIMIT_ITEMS // we need this since we are including the feature items.
  }

  _tags = ['featured', 'sale']

  constructor () {
    super()

    this._handlePageTitle = this._handlePageTitle.bind(this)
    this._isCategoryExist = this._isCategoryExist.bind(this)
    this._fetchProductByCategory = this._fetchProductByCategory.bind(this)
    this._displayMoreProducts = this._displayMoreProducts.bind(this)
    this._resetValuesAndFetch = this._resetValuesAndFetch.bind(this)
    this._displayFeaturesProduct = this._displayFeaturesProduct.bind(this)
    this._displayHeaderFeaturesProduct = this._displayHeaderFeaturesProduct.bind(this)
    this._displayNumberProducts = this._displayNumberProducts.bind(this)
    this._displayRecentlyViewedHeader = this._displayRecentlyViewedHeader.bind(this)
    this._displayEmpty = this._displayEmpty.bind(this)
    this._handleRestrictAge = this._handleRestrictAge.bind(this)
    this._handleClosePrompt = this._handleClosePrompt.bind(this)
    this._handleOver18 = this._handleOver18.bind(this)
    this._handleCheckOver18 = this._handleCheckOver18.bind(this)
  }

  _isCategoryExist () {
    const { categories, match: { params: { id } } } = this.props
    if (categories.size) {
      const category = categories.find((cat) => cat.get('id') === id)
      return category ? `All ${category.get('name')}` : ''
    }
    return ''
  }

  _handlePageTitle (props = this.props) {
    const { lazyload, products } = props
    // we will not show this if products size is 0 and lazy loading since we know we are only displaying the featured items
    return (lazyload && products.size === 0) ? null : this._isCategoryExist()
  }

  _displayMoreProducts () {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchProductByCategory(this.props))
  }

  _displayHeaderFeaturesProduct () {
    const { productsFeatured } = this.props
    if (productsFeatured.size) {
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
    if (productsFeatured.size) {
      return (
        <InfiniteLoading
          results={productsFeatured}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={loader}
          rowCount={totalCount}
        >
          {(props) => (
            <AccessView
              mobileView={
                <MobileProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} {...props} />
              }
              desktopView={
                <DesktopProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} {...props} />
              }
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  _displayNumberProducts () {
    const { productsFeatured, totalCount, windowWidth } = this.props
    const displayTotalCount = subtract(__, productsFeatured.size)
    const product = this._displayProductData()

    if (product.size) {
      return (
        windowWidth >= 1024
        ? <DesktopItemCount className='color__grey'>
          { displayTotalCount(totalCount) }
          <FormattedMessage {...messages.items} />
        </DesktopItemCount>
        : <H4 className='color__grey'>
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
        <AccessView
          mobileView={
            <MobileProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
          }
          desktopView={
            <DesktopProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
          }
        />
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
      <AccessView
        mobileView={
          <MobileProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader products={this._displayAllProductData()} windowWidth={windowWidth} />
        }
        desktopView={
          <DesktopProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader products={this._displayAllProductData()} windowWidth={windowWidth} />
        }
      />
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

  _displayProductData = () => {
    const { productsByCategory } = this.props
    return productsByCategory
  }

  /**
   * Since we have different selector due to featured items and regular
   * now this solves is to return ALL data regardless it is a featured or not.
   */
  _displayAllProductData = () => {
    const { products } = this.props
    return products
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
            <AccessView
              mobileView={
                <MobileProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={products} windowWidth={windowWidth} {...props} />
              }
              desktopView={
                <DesktopProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={products} windowWidth={windowWidth} {...props} />
              }
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByCategory (props) {
    const { getProductsByCategory, match: { params: { id } } } = props
    const { offset, limit } = this.state

    getProductsByCategory({ offset, limit, id })
  }

  _resetValuesAndFetch (props) {
    const { resetProductsByCategory } = props

    resetProductsByCategory()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByCategory(props))
  }

  _handleOver18 () {
    this.props.submitOver18(true)
    this._handleClosePrompt()
  }

  _handleCheckOver18 () {
    this.props.getOver18()
  }

  _handleClosePrompt () {
    this.setState({ togglePrompt: !this.state.togglePrompt })
  }

  _handleRestrictAge () {
    const { match: { params: { id } } } = this.props
    // const mockIds = ['01', '02', '10']
    // const mockIds = ['04', '900', '15']
    const mockIds = ['0123456789']
    let adult = false

    mockIds.forEach(i => {
      switch (id) {
        case i:
          adult = true
          break
      }
    })

    return adult
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

    this._fetchProductByCategory(this.props)
    this._handleCheckOver18()
  }

  componentWillUnmount () {
    this.props.resetProductsByCategory()
  }

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
    const isCategory = window.location.pathname.split('/')[1] === 'products-category'
    const { loader, lazyload, over18, windowWidth } = this.props
    const { togglePrompt } = this.state

    return (
      <div>
        <ContentWrapper>
          <InfiniteWrapper
            hasMoreData={lazyload}
            isLoading={loader}
          >
            { this._displayHeaderFeaturesProduct() }
            { this._displayFeaturesProduct() }

            {
              windowWidth >= 1024
              ? <DesktopTitle> {this._handlePageTitle()} </DesktopTitle>
              : <H3 className='margin__none'> {this._handlePageTitle()} </H3>
            }

            { this._displayNumberProducts() }
            { this._displayEmptyLoadingIndicator() }
            { this._displayRegularItems() }

            { this._displayRecentlyViewedHeader() }
            { this._displayRecentlyViewedItems() }
          </InfiniteWrapper>
        </ContentWrapper>
        <AccessView
          mobileView={<MobileFooter />}
          desktopView={null}
        />
        <Modal
          open={this._handleRestrictAge() && !togglePrompt && !over18}
          name='warning'
          close={this._handleClosePrompt}
          isCategory={isCategory}
          letIn={this._handleOver18}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  products: selectProductsByCategory(),
  productsByCategory: selectProductsByCategoryItems(),
  productsViewed: selectProductsViewed(),
  productsFeatured: selectProductsByCategoryFeatured(),
  categories: selectProductCategories(),
  loader: selectLoading(),
  lazyload: selectLazyload(),
  totalCount: selectTotalCount(),
  categoryLoader: selectLoader(),
  over18: selectOver18()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProductCategories: payload => dispatch(getProductCategoriesAction(payload)),
    getProductsByCategory: payload => dispatch(getProductsByCategoryAction(payload)),
    getProductsViewed: () => dispatch(getProductsViewedAction()),
    resetProductsByCategory: () => dispatch(resetProductsByCategoryAction()),
    submitOver18: payload => dispatch(submitOver18Action(payload)),
    getOver18: () => dispatch(getOver18Action()),
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
