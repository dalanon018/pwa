/*
 *
 * ProductsByCategoryPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import queryString from 'query-string'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push, replace } from 'react-router-redux'
import {
  __,
  allPass,
  anyPass,
  complement,
  compose,
  cond,
  equals,
  partial,
  path,
  subtract,
  when
} from 'ramda'

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
import MobileCategorySection from 'components/Mobile/CategorySection'
import DesktopCategorySection from 'components/Desktop/CategorySection'
import SectionTitle from 'components/Shared/SectionTitle'

import { InfiniteLoading } from 'components/Shared/InfiniteLoading'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
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
  getFilterCategoriesAction,
  getFilterBrandsAction,
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
  selectOver18,
  selectFilterCategories,
  selectFilterCategoriesLoading,
  selectFilterBrands,
  selectFilterBrandsLoading
} from './selectors'

import {
  LIMIT_ITEMS,
  MOBILE_LIMIT_ITEMS,
  DESKTOP_LIMIT_ITEMS
} from './constants'

const DesktopItemCount = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
`

export class ProductsByCategory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    replaceRoute: PropTypes.func.isRequired,
    getProductsByCategory: PropTypes.func.isRequired,
    getProductsViewed: PropTypes.func.isRequired,
    getFilterCategories: PropTypes.func.isRequired,
    getFilterBrands: PropTypes.func.isRequired,
    resetProductsByCategory: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowPointsIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    products: PropTypes.object.isRequired,
    productsByCategory: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    filterCategories: PropTypes.object.isRequired,
    filterCategoriesLoading: PropTypes.bool.isRequired,
    filterBrands: PropTypes.object.isRequired,
    filterBrandsLoading: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    setRouteName: PropTypes.func.isRequired,
    submitOver18: PropTypes.func.isRequired,
    getOver18: PropTypes.func.isRequired
  }

  state = {
    pageOffset: 0,
    offset: 0,
    togglePrompt: false,
    filtered: false,
    limit: LIMIT_ITEMS // we need this since we are including the feature items.
  }

  _tags = ['featured', 'sale']

  constructor () {
    super()

    this._handlePageTitle = this._handlePageTitle.bind(this)
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

  _handlePageTitle (props = this.props) {
    const { name } = queryString.parse(props.location.search)
    return `All ${name || 'Category'}`
  }

  _limitIdentifier = () => {
    const { isMobileDevice } = this.props
    return isMobileDevice() ? MOBILE_LIMIT_ITEMS : DESKTOP_LIMIT_ITEMS
  }

  _displayMoreProducts () {
    const { pageOffset } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * this._limitIdentifier())
    }, () => this._fetchProductByCategory(this.props))
  }

  _displayHeaderFeaturesProduct () {
    const { productsFeatured, intl } = this.props
    if (productsFeatured.size) {
      return (
        <AccessView
          mobileView={
            <H3>
              <FormattedMessage {...messages.feature} />
            </H3>
          }
          desktopView={
            <div className='padding__horizontal--15'>
              <SectionTitle
                title={intl.formatMessage(messages.feature)}
                itemCount={productsFeatured.size} />
            </div>
          }
        />
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
                <DesktopProductView columns={5} isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} {...props} />
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
    const { productsViewed, lazyload, intl } = this.props

    // we only show if items are not empty and not lazyloading
    if (productsViewed.size && !lazyload) {
      return (
        <AccessView
          mobileView={
            <H3>
              <FormattedMessage {...messages.viewed} />
            </H3>
          }
          desktopView={
            <div className='padding__horizontal--15'>
              <SectionTitle
                title={intl.formatMessage(messages.viewed)}
                itemCount={productsViewed.size} />
            </div>
          }
        />
      )
    }

    return null
  }

  _displayRecentlyViewedItems = () => {
    const { productsViewed, lazyload, changeRoute, loader, windowWidth } = this.props
    // we only show if items are not empty and not lazyloading
    if (productsViewed.size && !lazyload) {
      return (
        <AccessView
          mobileView={
            <MobileProductView isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
          }
          desktopView={
            <DesktopProductView columns={5} isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
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
          <DesktopProductView columns={5} isMinor={this._handleRestrictAge()} over18={this.props.over18} changeRoute={changeRoute} loader products={this._displayAllProductData()} windowWidth={windowWidth} />
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
    const { getProductsByCategory, match: { params: { id } }, location: { search } } = props
    const { offset } = this.state
    const { brands } = queryString.parse(search)

    getProductsByCategory({ offset, id, brands, limit: this._limitIdentifier() })
  }

  // if ID is different from previous prop then we assume this is a new loaded page
  // need to request differnt items.
  _resetValuesAndFetch (props) {
    const { match: { params }, setPageTitle, resetProductsByCategory } = props

    resetProductsByCategory()

    // make sure we updated the page title
    setPageTitle(this._handlePageTitle(props))

    this._fetchFilteredCategories({ category: params.id })
    this._fetchFilteredBrands({ category: params.id })

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByCategory(props))
  }

  /**
   * allowEmpty if the response from filtered categories is empty then we its okay to
   * overwrite the values.
   */
  _fetchFilteredCategories = ({ props = this.props, category, allowEmpty = true }) => {
    const { getFilterCategories } = props

    getFilterCategories({ category, allowEmpty })
  }

  _fetchFilteredBrands = ({ props = this.props, category }) => {
    const { getFilterBrands } = props

    getFilterBrands({ category })
  }

  _requestFromFilter = ({ brands, category: { id, name } }) => {
    const { location: { search }, match: { params }, changeRoute } = this.props
    const locationSearch = queryString.parse(search)
    // if category prop is undefined meaning that we didn't found the category
    // it's because we only choose the brands so we have to use the existing

    const useId = id || params.id
    const useName = name || locationSearch.name

    this.setState({
      pageOffset: 0,
      offset: 0
    })

    changeRoute(`/products-category/${useId}?brands=${brands.join(',')}&name=${useName}`)
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

  _handleCheckParameter (props) {
    const { location: { search } } = props
    const parameter = queryString.parse(search)

    this.setState({filtered: !!parameter.brands})
  }

  _getQueryBrands = () => {
    const { location: { search } } = this.props
    const parameter = queryString.parse(search)
    return parameter.brands ? parameter.brands.split(',') : []
  }

  // TODO: We need to remove extra call for categories specially I think we dont need them anymore
  componentDidMount () {
    const { match: { params }, getProductsViewed, setRouteName, setPageTitle, setShowSearchIcon, setShowPointsIcon, setShowActivityIcon } = this.props

    setPageTitle(this._handlePageTitle())
    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)

    setRouteName(PRODUCTSCATEGORY_NAME)
    getProductsViewed()

    this._fetchProductByCategory(this.props)
    this._handleCheckOver18()

    this._fetchFilteredCategories({ category: params.id })
    this._fetchFilteredBrands({ category: params.id })
  }

  componentWillUnmount () {
    this.props.resetProductsByCategory()
  }

  componentWillReceiveProps (nextProps) {
    const { match: { params }, location: { search } } = this.props
    /**
     * we need to check if ID and brands are the same so we can trigger requesting
     */
    const paramsId = path(['match', 'params', 'id'])
    const locationSearch = path(['location', 'search'])
    const isIdNotEqual = (id, props) => compose(
      complement(equals(id)),
      paramsId
    )(props)

    const updateFetchProduct = when(
      anyPass([
        partial(isIdNotEqual, [params.id]),
        compose(complement(equals(search)), locationSearch)
      ]),
      this._resetValuesAndFetch
    )

    updateFetchProduct(nextProps)

    this._handleCheckParameter(nextProps)
  }

  render () {
    const isCategory = window.location.pathname.split('/')[1] === 'products-category'
    const { match: { params: { id } }, loader, lazyload, over18, windowWidth, filterCategories, filterBrands, filterCategoriesLoading, filterBrandsLoading } = this.props
    const { togglePrompt, filtered } = this.state

    return (
      <div>
        <AccessView
          mobileView={
            <MobileCategorySection
              filterBrands={filterBrands}
              filterBrandsLoading={filterBrandsLoading}
              filterCategories={filterCategories}
              filterCategoriesLoading={filterCategoriesLoading}
              filtered={filtered}
              getFilterBrands={this._fetchFilteredBrands}
              getFilterCategories={this._fetchFilteredCategories}
              lazyload={lazyload}
              loader={loader}
              queryBrands={this._getQueryBrands()}
              queryCategory={id}
              requestFromFilter={this._requestFromFilter}
              windowWidth={windowWidth}

              _displayEmptyLoadingIndicator={this._displayEmptyLoadingIndicator}
              _displayFeaturesProduct={this._displayFeaturesProduct}
              _displayHeaderFeaturesProduct={this._displayHeaderFeaturesProduct}
              _displayNumberProducts={this._displayNumberProducts}
              _displayRecentlyViewedHeader={this._displayRecentlyViewedHeader}
              _displayRecentlyViewedItems={this._displayRecentlyViewedItems}
              _displayRegularItems={this._displayRegularItems}
              _handlePageTitle={this._handlePageTitle}
          />
        }
          desktopView={
            <DesktopCategorySection
              filterBrands={filterBrands}
              filterBrandsLoading={filterBrandsLoading}
              filterCategories={filterCategories}
              filterCategoriesLoading={filterCategoriesLoading}
              filtered={filtered}
              getFilterBrands={this._fetchFilteredBrands}
              getFilterCategories={this._fetchFilteredCategories}
              lazyload={lazyload}
              loader={loader}
              queryBrands={this._getQueryBrands()}
              queryCategory={id}
              requestFromFilter={this._requestFromFilter}
              windowWidth={windowWidth}

              _displayEmptyLoadingIndicator={this._displayEmptyLoadingIndicator}
              _displayFeaturesProduct={this._displayFeaturesProduct}
              _displayHeaderFeaturesProduct={this._displayHeaderFeaturesProduct}
              _displayNumberProducts={this._displayNumberProducts}
              _displayRecentlyViewedHeader={this._displayRecentlyViewedHeader}
              _displayRecentlyViewedItems={this._displayRecentlyViewedItems}
              _displayRegularItems={this._displayRegularItems}
              _handlePageTitle={this._handlePageTitle}
          />
        }
      />
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
  filterCategories: selectFilterCategories(),
  filterCategoriesLoading: selectFilterCategoriesLoading(),
  filterBrands: selectFilterBrands(),
  filterBrandsLoading: selectFilterBrandsLoading(),
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
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProductsByCategory: payload => dispatch(getProductsByCategoryAction(payload)),
    getProductsViewed: () => dispatch(getProductsViewedAction()),
    resetProductsByCategory: () => dispatch(resetProductsByCategoryAction()),
    getFilterCategories: (payload) => dispatch(getFilterCategoriesAction(payload)),
    getFilterBrands: (payload) => dispatch(getFilterBrandsAction(payload)),
    submitOver18: payload => dispatch(submitOver18Action(payload)),
    getOver18: () => dispatch(getOver18Action()),
    changeRoute: (url) => dispatch(push(url)),
    replaceRoute: (url) => dispatch(replace(url)),
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
)(WindowWidth(injectIntl(ProductsByCategory)))
