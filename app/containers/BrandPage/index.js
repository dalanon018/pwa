/*
 *
 * BrandPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  allPass,
  compose,
  cond,
  equals,
  ifElse,
  lt,
  partial,
  path
} from 'ramda'
import { Container } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix } from 'utils/image-stock'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'

import MobileFooter from 'components/Mobile/Footer'

import MobileBannerSlider from 'components/Mobile/BannerSlider'
import DesktopBannerSlider from 'components/Desktop/BannerSlider'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import WindowWidth from 'components/Shared/WindowWidth'
import H3 from 'components/Shared/H3'
import EmptyProducts from 'components/Shared/EmptyProductsBlock'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import { InfiniteLoading, InfiniteWrapper } from 'components/Shared/InfiniteLoading'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
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
  resetProductsByBrandsAction
} from './actions'
import {
  selectLazyload,
  selectLoading,
  selectProductsByBrandsItems,
  selectProductsByBrandsFeatured,
  selectTotalCount
} from './selectors'
import {
  LIMIT_ITEMS
} from './constants'

const ContentWrapper = styled(Container)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;
`

const DesktopItemCount = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
`

const DesktopTitle = styled.p`
  font-family: Lato,Cabin,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0;
`

export class BrandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProductsByBrands: PropTypes.func.isRequired,
    resetProductsByBrands: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    productsByBrands: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    totalCount: PropTypes.number.isRequired,
    brands: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    animateBanner: true,
    brandImages: [],
    brandDesktopSliders: [],
    pageOffset: 0,
    offset: 0,
    limit: LIMIT_ITEMS
  }

  _updateParamsImages = (images) => {
    const options = {
      w: 1170,
      h: 300,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return images ? paramsImgix(images, options) : ''
  }

  _handlePageTitle = (nextProps) => {
    const { brands, match: { params: { id } } } = nextProps

    if (brands.size) {
      const brand = brands.find((entity) => entity.get('id') === id)
      const brandImages = brand.size ? brand.get('sliders').toArray().map(this._updateParamsImages) : []
      const brandDesktopSliders = brand.size ? brand.get('desktopSliders').toArray().map(this._updateParamsImages) : []

      this.setState({
        brandImages,
        brandDesktopSliders
      })

      return brand ? brand.get('name') : ''
    }
    return ''
  }

  _displayMoreProducts = () => {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
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
          <DesktopProductView changeRoute={changeRoute} loader={loader} products={productsByBrands} windowWidth={windowWidth} />
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

  _resetValuesAndFetch = (props) => {
    const { resetProductsByBrands } = props
    resetProductsByBrands()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByBrands(props))
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByBrands = (props) => {
    const { getProductsByBrands, match: { params: { id } } } = props
    const { offset, limit } = this.state

    // since this data is change and we know exactly
    getProductsByBrands({ offset, limit, id })
  }

  _handleBannerAnimation = (show) => () => {
    this.setState({
      animateBanner: show
    })
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

  _displayFeaturedProducts = () => {
    const { productsFeatured, loader, changeRoute, windowWidth, lazyload, totalCount } = this.props

    const displayFeatured = ifElse(
      lt(0),
      () => (
        <div className='margin__top-positive--30'>
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
                  <DesktopProductView changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} {...props} />
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

  _displayHeaderRegularProduct () {
    const { lazyload, productsByBrands, totalCount } = this.props

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
          <div className='margin__vertical--30'>
            <DesktopTitle>
              <FormattedMessage {...messages.brandsTitle} />
            </DesktopTitle>
            <DesktopItemCount className='color__grey'>
              { totalCount }
              <FormattedMessage {...messages.items} />
            </DesktopItemCount>
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
                <DesktopProductView changeRoute={changeRoute} loader={loader} products={productsByBrands} windowWidth={windowWidth} {...props} />
              }
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  componentWillMount () {
    // we set this as text so it doesnt look
    this.props.setPageTitle('..')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    // initial data
    this._fetchProductByBrands(this.props)
    this.props.setRouteName(BRAND_NAME)
  }

  componentWillUnmount () {
    this.props.resetProductsByBrands()
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
      compose(lt(0), path(['brands', 'size'])),
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
    const { productsByBrands, loader, lazyload } = this.props
    const { brandImages, animateBanner, brandDesktopSliders } = this.state
    return (
      <div>
        <Waypoint
          onEnter={this._handleBannerAnimation(true)}
          onLeave={this._handleBannerAnimation(false)}
        >
          <div>
            <AccessView
              mobileView={
                <MobileBannerSlider
                  isInfinite
                  autoplay={animateBanner}
                  results={productsByBrands}
                  loader={loader}
                  images={brandImages}
                />
              }
              desktopView={null}
            />
          </div>
        </Waypoint>
        <ContentWrapper>
          <AccessView
            mobileView={null}
            desktopView={
              <DesktopBannerSlider
                isInfinite
                autoplay={animateBanner}
                results={productsByBrands}
                loader={loader}
                images={brandDesktopSliders}
            />
            }
          />
          <div className='margin__top-positive--30'>
            <InfiniteWrapper
              hasMoreData={lazyload}
              isLoading={loader}
            >
              { this._displayHeaderFeaturesProduct() }
              { this._displayFeaturedProducts() }

              { this._displayHeaderRegularProduct() }
              { this._displayEmptyLoadingIndicator() }
              { this._displayRegularItems() }
            </InfiniteWrapper>
          </div>
        </ContentWrapper>
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
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProductsByBrands: payload => dispatch(getProductsByBrandsAction(payload)),
    resetProductsByBrands: () => dispatch(resetProductsByBrandsAction()),
    changeRoute: (url) => dispatch(push(url)),
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
)(WindowWidth(BrandPage))
