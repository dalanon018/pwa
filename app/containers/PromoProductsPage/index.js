/*
 *
 * PromoProductsPage
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
import SharedBannerSlider from 'components/Shared/BannerSlider'

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

import { BRAND_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getPromoAction,
  resetPromoProductsAction
} from './actions'
import {
  selectPromo,
  selectProducts,
  selectProductsRegular,
  selectProductsFeatured,
  selectProductsCount,
  selectProductsLoading,
  selectLazyload
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

export class PromoProductsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getPromo: PropTypes.func.isRequired,
    resetPromo: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    productsLoading: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    allProducts: PropTypes.object.isRequired,
    productsRegular: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    productsCount: PropTypes.number.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    animateBanner: true,
    promoImages: [],
    pageOffset: 0,
    offset: 0,
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

  _handlePageTitle = (nextProps) => {
    const { promo } = nextProps
    return promo.size ? promo.get('name') : ''
  }

  _handlePageBanners = (nextProps) => {
    const { promo } = nextProps

    if (promo.size) {
      const promoImages = promo.size ? promo.get('sliders').toArray().map(this._updateParamsImages) : []

      this.setState({
        promoImages
      })
    }
    return []
  }

  _displayMoreProducts = () => {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchPromoProducts(this.props))
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

  _displayEmptyLoadingIndicator = () => {
    const { productsLoading, lazyload, allProducts } = this.props

    const display = cond([
      [allPass([
        equals(false),
        partial(equals(0), [allProducts.size]),
        partial(equals(false), [lazyload])
      ]), this._displayEmpty],
      [allPass([
        equals(true),
        partial(equals(false), [lazyload])
      ]), this._displayLoader],
      [equals(false), () => null]
    ])

    return display(productsLoading)
  }

  _resetValuesAndFetch = (props) => {
    const { resetPromo } = props

    resetPromo()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchPromoProducts(props))
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchPromoProducts = (props) => {
    const { getPromo, match: { params: { id } } } = props
    const { offset, limit } = this.state

    // since this data is change and we know exactly
    getPromo({ offset, limit, id })
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
    const { productsFeatured, productsLoading, changeRoute, windowWidth, lazyload, productsCount } = this.props

    const displayFeatured = ifElse(
      lt(0),
      () => (
        <div className='margin__top-positive--30'>
          <InfiniteLoading
            results={productsFeatured}
            hasMoreData={lazyload}
            loadMoreData={this._displayMoreProducts}
            isLoading={productsLoading}
            rowCount={productsCount}
          >
            {(props) => (
              <AccessView
                mobileView={
                  <MobileProductView changeRoute={changeRoute} loader={productsLoading} products={productsFeatured} windowWidth={windowWidth} {...props} />
                }
                desktopView={
                  <DesktopProductView changeRoute={changeRoute} loader={productsLoading} products={productsFeatured} windowWidth={windowWidth} {...props} />
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
    const { lazyload, productsRegular, productsCount } = this.props

    if (lazyload && productsRegular.size === 0) {
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
              { productsCount }
              <FormattedMessage {...messages.items} />
            </DesktopItemCount>
          </div>
        }
      />
    )
  }

  _displayRegularItems = () => {
    const { productsRegular, changeRoute, productsLoading, lazyload, windowWidth, productsCount } = this.props
    if (productsRegular.size > 1 || lazyload === false) {
      return (
        <InfiniteLoading
          results={productsRegular}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={productsLoading}
          rowCount={productsCount}
        >
          {(props) => (
            <AccessView
              mobileView={
                <MobileProductView changeRoute={changeRoute} loader={productsLoading} products={productsRegular} windowWidth={windowWidth} {...props} />
              }
              desktopView={
                <DesktopProductView changeRoute={changeRoute} loader={productsLoading} products={productsRegular} windowWidth={windowWidth} {...props} />
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
    this._fetchPromoProducts(this.props)
    this.props.setRouteName(BRAND_NAME)
  }

  componentWillUnmount () {
    this.props.resetPromo()
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
      compose(lt(0), path(['promo', 'size'])),
      compose(
        this.props.setPageTitle,
        (nextProps) => {
          this._handlePageBanners(nextProps)
          return this._handlePageTitle(nextProps)
        }
      ),
      noop
    )

    updateFetchProduct(nextProps)
    updatePageTitle(nextProps)
  }

  render () {
    const { productsLoading, lazyload } = this.props
    const { promoImages, animateBanner } = this.state
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
                  loader={productsLoading}
                  images={promoImages}
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
              <SharedBannerSlider
                isInfinite
                autoplay={animateBanner}
                loader={productsLoading}
                images={promoImages}
            />
            }
          />
          <div className='margin__top-positive--30'>
            <InfiniteWrapper
              hasMoreData={lazyload}
              isLoading={productsLoading}
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
  promo: selectPromo(),
  allProducts: selectProducts(),
  productsRegular: selectProductsRegular(),
  productsFeatured: selectProductsFeatured(),
  productsCount: selectProductsCount(),
  productsLoading: selectProductsLoading(),
  lazyload: selectLazyload()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getPromo: payload => dispatch(getPromoAction(payload)),
    resetPromo: () => dispatch(resetPromoProductsAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'promoProductsPage', reducer })
const withSaga = injectSaga({ key: 'promoProductsPage', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(PromoProductsPage))
