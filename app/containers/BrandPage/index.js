/*
 *
 * BrandPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
// import Waypoint from 'react-waypoint'
import queryString from 'query-string'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push, replace } from 'react-router-redux'
import { noop } from 'lodash'
import {
  allPass,
  anyPass,
  compose,
  cond,
  equals,
  ifElse,
  lt,
  partial,
  path,
  when,
  complement
} from 'ramda'
// import { Container, Grid } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix } from 'utils/image-stock'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'
import SectionTitle from 'components/Shared/SectionTitle'
import MobileFooter from 'components/Mobile/Footer'

// import MobileBannerSlider from 'components/Mobile/BannerSlider'
// import SharedBannerSlider from 'components/Shared/BannerSlider'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import MobileBrandSection from 'components/Mobile/BrandSection'
import DesktopBrandSection from 'components/Desktop/BrandSection'
import WindowWidth from 'components/Shared/WindowWidth'
import H3 from 'components/Shared/H3'
import EmptyProducts from 'components/Shared/EmptyProductsBlock'
// import FilterTrigger from 'components/Mobile/FilterTrigger'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import { InfiniteLoading } from 'components/Shared/InfiniteLoading'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import {
  selectBrands,
  selectLoader
} from 'containers/Buckets/selectors'
import { BRAND_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getProductsByBrandsAction,
  resetProductsByBrandsAction,
  getFilterCategoriesAction
} from './actions'
import {
  selectLazyload,
  selectLoading,
  selectProductsByBrandsItems,
  selectProductsByBrandsFeatured,
  selectTotalCount,
  selectFilterCategories,
  selectFilterCategoriesLoading
} from './selectors'
import {
  LIMIT_ITEMS,
  MOBILE_LIMIT_ITEMS,
  DESKTOP_LIMIT_ITEMS
} from './constants'

// const ContentWrapper = styled(Container)`
//   padding-top: 20px !important;
//   padding-bottom: 20px !important;
// `

// const DesktopItemCount = styled.p`
//   font-family: Roboto;
//   font-size: 14px;
//   font-weight: 400;
//   margin-bottom: 20px;
//   text-align: center;
// `

// const DesktopTitle = styled.p`
//   font-size: 20px;
//   font-weight: 700;
//   text-align: center;
//   margin-bottom: 0;
// `

export class BrandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    replaceRoute: PropTypes.func.isRequired,
    getProductsByBrands: PropTypes.func.isRequired,
    resetProductsByBrands: PropTypes.func.isRequired,
    getFilterCategories: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowPointsIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    productsByBrands: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    filterCategories: PropTypes.object.isRequired,
    filterCategoriesLoading: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    brands: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    animateBanner: true,
    brandImages: [],
    pageOffset: 0,
    offset: 0,
    filtered: false,
    limit: LIMIT_ITEMS
  }

  _updateParamsImages = (images) => {
    const options = {
      w: 800,
      h: 400,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return images ? paramsImgix(images, options) : ''
  }

  _limitIdentifier = () => {
    const { isMobileDevice } = this.props
    return isMobileDevice() ? MOBILE_LIMIT_ITEMS : DESKTOP_LIMIT_ITEMS
  }

  _handlePageTitle = (nextProps) => {
    const { brands, match: { params: { id } } } = nextProps

    if (brands.size) {
      const brand = brands.find((entity) => entity.get('id') === id)
      const brandImages = brand.size ? brand.get('sliders').toArray().map(this._updateParamsImages) : []

      this.setState({
        brandImages
      })

      return brand ? brand.get('name') : ''
    }
    return ''
  }

  _displayMoreProducts = () => {
    const { pageOffset } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * this._limitIdentifier())
    }, () => this._fetchProductByBrands(this.props))
  }

  _displayLoader = () => {
    return (
      <LoadingIndicator />
    )
  }

  _displayEmpty = () => {
    return (
      <EmptyProducts>
        <FormattedMessage {...messages.emptyMessage} />
      </EmptyProducts>
    )
  }

  /**
   * this will simply display items that we are loading
   */
  _displayEmptyProductViewLoading = () => {
    const { changeRoute, windowWidth, productsByBrands, loader } = this.props
    return (
      <AccessView
        mobileView={
          <MobileProductView changeRoute={changeRoute} loader={loader} products={productsByBrands} windowWidth={windowWidth} />
        }
        desktopView={
          <DesktopProductView columns={5} changeRoute={changeRoute} loader={loader} products={productsByBrands} windowWidth={windowWidth} />
        }
      />
    )
  }

  _displayEmptyLoadingIndicator = () => {
    const { loader, lazyload, productsByBrands } = this.props

    const display = cond([
      [allPass([
        equals(false),
        partial(equals(0), [productsByBrands.size]),
        partial(equals(false), [lazyload])
      ]), this._displayEmpty],
      [allPass([
        equals(true),
        partial(equals(false), [lazyload])
      ]), this._displayLoader],
      [equals(false), () => null]
    ])

    return display(loader)
  }

  /**
   * allowEmpty if the response from filtered categories is empty then we its okay to
   * overwrite the values.
   */
  _fetchFilteredCategories = ({ props = this.props, category, brand, allowEmpty = true }) => {
    const { match: { params }, getFilterCategories } = props
    const brandId = brand || params.id

    getFilterCategories({ category, brand: brandId, allowEmpty })
  }

  _requestFromFilter = ({ category: { id, name } }) => {
    const { match: { params }, changeRoute } = this.props

    this.setState({
      pageOffset: 0,
      offset: 0
    })

    changeRoute(`/brands/${params.id}?category=${id || ''}`)
  }

  _resetValuesAndFetch = (props) => {
    const { match: { params }, location: { search }, resetProductsByBrands } = props
    const { category } = queryString.parse(search)

    resetProductsByBrands()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByBrands(props))

    this._fetchFilteredCategories({ brand: params.id, category })
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByBrands = (props) => {
    const { getProductsByBrands, match: { params: { id } }, location: { search } } = props
    const { offset } = this.state
    const { category } = queryString.parse(search)

    // since this data is change and we know exactly
    getProductsByBrands({ offset, id, category, limit: this._limitIdentifier() })
  }

  _handleBannerAnimation = (show) => () => {
    this.setState({
      animateBanner: show
    })
  }

  _displayHeaderFeaturesProduct = () => {
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

  _displayFeaturedProducts = () => {
    const { productsFeatured, loader, changeRoute, windowWidth, lazyload, totalCount } = this.props

    const displayFeatured = ifElse(
      lt(0),
      () => (
        <div className='margin__top-positive--10'>
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
                  <MobileProductView changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} {...props} />
                }
                desktopView={
                  <div className='margin__bottom-positive--30'>
                    <DesktopProductView columns={5} changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} {...props} />
                  </div>
                }
              />
            )}
          </InfiniteLoading>
        </div>
      ),
      noop
    )

    return displayFeatured(productsFeatured.size)
  }

  _displayHeaderRegularProduct = () => {
    const {
      lazyload,
      productsByBrands,
      // totalCount,
      intl
    } = this.props

    if (lazyload && productsByBrands.size === 0) {
      return null
    }

    return (
      <AccessView
        mobileView={
          <H3>
            <FormattedMessage {...messages.brandsTitle} />
          </H3>
        }
        desktopView={
          <div className='padding__horizontal--15'>
            <SectionTitle
              title={intl.formatMessage(messages.brandsTitle)}
              itemCount={productsByBrands.size} />
          </div>
        }
      />
    )
  }

  _displayRegularItems = () => {
    const { productsByBrands, changeRoute, loader, lazyload, windowWidth, totalCount } = this.props
    if (productsByBrands.size > 1 || lazyload === false) {
      return (
        <InfiniteLoading
          results={productsByBrands}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={loader}
          rowCount={totalCount}
        >
          {(props) => (
            <AccessView
              mobileView={
                <MobileProductView changeRoute={changeRoute} loader={loader} products={productsByBrands} windowWidth={windowWidth} {...props} />
              }
              desktopView={
                <DesktopProductView columns={5} changeRoute={changeRoute} loader={loader} products={productsByBrands} windowWidth={windowWidth} {...props} />
              }
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  _handleCheckParameter (props) {
    const { location: { search } } = props
    const parameter = queryString.parse(search)

    this.setState({filtered: !!parameter.category})
  }

  componentDidMount () {
    const { match: { params }, location: { search }, setRouteName, setPageTitle, setShowSearchIcon, setShowPointsIcon, setShowActivityIcon } = this.props
    const { category } = queryString.parse(search)

    // initial data
    this._fetchProductByBrands(this.props)

    setPageTitle('..')
    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)
    setRouteName(BRAND_NAME)

    this._fetchFilteredCategories({ brand: params.id, category })
  }

  componentWillUnmount () {
    this.props.resetProductsByBrands()
  }

  componentWillReceiveProps (nextProps) {
    const { match: { params }, location: { search } } = this.props
    /**
     * we need to check if ID and Category are the same so we can trigger requesting
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

    const updatePageTitle = ifElse(
      compose(lt(0), path(['brands', 'size'])),
      compose(
        this.props.setPageTitle,
        this._handlePageTitle
      ),
      noop
    )

    updateFetchProduct(nextProps)
    updatePageTitle(nextProps)

    this._handleCheckParameter(nextProps)
  }

  render () {
    const { location: { search }, productsByBrands, loader, lazyload, filterCategories, filterCategoriesLoading } = this.props
    const { brandImages, animateBanner, filtered } = this.state
    const { category } = queryString.parse(search)

    return (
      <div>
        <AccessView
          mobileView={
            <MobileBrandSection
              animateBanner={animateBanner}
              brandImages={brandImages}
              category={category}
              filterCategories={filterCategories}
              filterCategoriesLoading={filterCategoriesLoading}
              filtered={filtered}
              lazyload={lazyload}
              loader={loader}
              productsByBrands={productsByBrands}

              _displayEmptyLoadingIndicator={this._displayEmptyLoadingIndicator}
              _displayFeaturedProducts={this._displayFeaturedProducts}
              _displayHeaderFeaturesProduct={this._displayHeaderFeaturesProduct}
              _displayHeaderRegularProduct={this._displayHeaderRegularProduct}
              _displayRegularItems={this._displayRegularItems}
              _fetchFilteredCategories={this._fetchFilteredCategories}
              _handleBannerAnimation={this._handleBannerAnimation}
              _requestFromFilter={this._requestFromFilter}
            />
          }
          desktopView={
            <DesktopBrandSection
              animateBanner={animateBanner}
              brandImages={brandImages}
              category={category}
              filterCategories={filterCategories}
              filterCategoriesLoading={filterCategoriesLoading}
              filtered={filtered}
              lazyload={lazyload}
              loader={loader}
              productsByBrands={productsByBrands}

              _displayEmptyLoadingIndicator={this._displayEmptyLoadingIndicator}
              _displayFeaturedProducts={this._displayFeaturedProducts}
              _displayHeaderFeaturesProduct={this._displayHeaderFeaturesProduct}
              _displayHeaderRegularProduct={this._displayHeaderRegularProduct}
              _displayRegularItems={this._displayRegularItems}
              _fetchFilteredCategories={this._fetchFilteredCategories}
              _handleBannerAnimation={this._handleBannerAnimation}
              _requestFromFilter={this._requestFromFilter}
            />
          }
        />
        <AccessView
          mobileView={<MobileFooter />}
          desktopView={null}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  productsByBrands: selectProductsByBrandsItems(),
  productsFeatured: selectProductsByBrandsFeatured(),
  totalCount: selectTotalCount(),
  filterCategories: selectFilterCategories(),
  filterCategoriesLoading: selectFilterCategoriesLoading(),
  brands: selectBrands(),
  loader: selectLoading(),
  lazyload: selectLazyload(),
  brandsLoader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProductsByBrands: payload => dispatch(getProductsByBrandsAction(payload)),
    resetProductsByBrands: () => dispatch(resetProductsByBrandsAction()),
    getFilterCategories: (payload) => dispatch(getFilterCategoriesAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    replaceRoute: (url) => dispatch(replace(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'brandPage', reducer })
const withSaga = injectSaga({ key: 'brandPage', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(BrandPage)))
