/*
 *
 * HomePage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import {
  both,
  compose as RCompose,
  equals,
  identity,
  ifElse,
  lt,
  partial,
  map,
  prop,
  when
} from 'ramda'
import { range } from 'lodash'
import { Container, Image, Label } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix, imageStock } from 'utils/image-stock'

import MobileSlider from 'components/Mobile/BannerSlider'
import DesktopSlider from 'components/Desktop/BannerSlider'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'

import MobileFooter from 'components/Mobile/Footer'
import BrandSlider from 'components/Mobile/BrandSlider'
import SectionTitle from 'components/Mobile/HomeSectionTitle'
import OrderTip from 'components/Mobile/OrderTip'
import PointAds from 'components/Mobile/PointAds'
import FlashDeals from 'components/Mobile/FlashDeals'

import WindowWidth from 'components/Shared/WindowWidth'
import AccessView from 'components/Shared/AccessMobileDesktopView'
import { InfiniteLoading, InfiniteWrapper } from 'components/Shared/InfiniteLoading'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectFeaturedCategories,
  selectFeaturedBrands,
  selectBrandLoader,
  selectCategoryNavLoader
} from 'containers/Buckets/selectors'
import {
  HOME_NAME
} from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getFeaturedProductsAction,
  getPromosAction,
  getBannersAction
} from './actions'
import {
  selectLoading,
  selectFeaturedProducts,
  selectTotalCount,
  selectPromos,
  selectPromosLoading,
  selectPromosCount,
  selectLazyload,

  selectBanners,
  selectBannersLoading
} from './selectors'
import {
  LIMIT_ITEMS
} from './constants'

import {
  BannerWrapper,
  CategoryIconsWrapper,
  CategoryItem,
  CustomHr
} from './styles'

import MoreCategoriesIcon from 'images/icons/category-header/more-categories-icon.svg'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    featuredProductsLoader: PropTypes.bool.isRequired,
    totalFeaturedProductCount: PropTypes.number.isRequired,
    featuredProducts: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    featuredBrands: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    featuredCategories: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowPointsIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    promos: PropTypes.object.isRequired,
    promosLoading: PropTypes.bool.isRequired,
    promosCount: PropTypes.number.isRequired,
    getPromos: PropTypes.func.isRequired,
    banners: PropTypes.object.isRequired,
    bannersLoading: PropTypes.bool.isRequired,
    getBanners: PropTypes.func.isRequired,
    lazyload: PropTypes.bool.isRequired,
    categoryNavLoader: PropTypes.bool.isRequired
  }

  state = {
    _banners: [],
    showFeaturedItems: false,
    showFeaturedCategories: false,
    pageOffset: 0,
    offset: 0,
    limit: LIMIT_ITEMS
  }

  _imgixOptions = ({ windowWidth }) => {
    return {
      w: windowWidth >= 1024 ? 1170 : 800,
      h: 400,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }
  }

  _shouldDisplayHeader = (component) => ifElse(
      identity,
      () => component,
      () => null
    )

  _handleFeaturedItemsWaypointEnter = () => {
    this.setState({
      showFeaturedItems: true
    })
  }

  _handleFeaturedCategoriesWaypointEnter = () => {
    this.setState({
      showFeaturedCategories: true
    })
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchFeaturedProducts = (props) => {
    const { getProduct } = props
    const { offset, limit } = this.state

    // since this data is change and we know exactly
    getProduct({ offset, limit })
  }

  _displayMoreProducts = () => {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchFeaturedProducts(this.props))
  }

  _displayFeaturedItems = () => {
    const { featuredProducts, changeRoute, featuredProductsLoader, lazyload, windowWidth, totalFeaturedProductCount } = this.props
    if (featuredProducts.size > 0 || lazyload === false) {
      return (
        <InfiniteLoading
          results={featuredProducts}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={featuredProductsLoader}
          rowCount={totalFeaturedProductCount}
        >
          {(props) => (
            <AccessView
              mobileView={
                <MobileProductView changeRoute={changeRoute} loader={featuredProductsLoader} products={featuredProducts} windowWidth={windowWidth} {...props} />
              }
              desktopView={
                <DesktopProductView changeRoute={changeRoute} loader={featuredProductsLoader} products={featuredProducts} windowWidth={windowWidth} {...props} />
              }
            />
          )}
        </InfiniteLoading>
      )
    }
  }

  _handleDefaultCategoryIcon = (key) => {
    return (
      <CategoryItem key={key}>
        <Image src={imageStock('mobile-category-icon-default.png')} alt='CLiQQ' />
        <CustomHr />
      </CategoryItem>
    )
  }

  _updateStateFromProps = (key) => (data) => {
    this.setState({
      [key]: data
    })
  }

  _updateStateBanners = ({ key, props }) => RCompose(
    this._updateStateFromProps(key),
    // convert
    (immutable) => immutable.toArray(),
    map((items) => paramsImgix(items, this._imgixOptions(props)))
  )

  componentDidMount () {
    const { setPageTitle, setShowActivityIcon, setShowSearchIcon, setShowPointsIcon, getPromos, getBanners, setRouteName } = this.props
    setPageTitle(null)
    setShowSearchIcon(false)
    setShowPointsIcon(false)
    setShowActivityIcon(true)

    getBanners()
    getPromos()
    setRouteName(HOME_NAME)
    this._fetchFeaturedProducts(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const { banners } = nextProps
    const { _banners } = this.state

    const shouldUpdateBanners = when(
      both(
        partial(equals(0), [_banners.length]),
        RCompose(
          lt(0),
          prop('size')
        )
      ),
      this._updateStateBanners({
        key: '_banners',
        props: nextProps
      })
    )

    shouldUpdateBanners(banners)
  }

  render () {
    const {
      featuredCategories,
      featuredBrands,
      changeRoute,
      windowWidth,
      brandLoader,
      featuredProductsLoader,
      lazyload,
      intl,
      categoryNavLoader,
      promos,
      promosLoading,
      promosCount,
      bannersLoading
    } = this.props
    const { _banners } = this.state

    const desktopBannerImages = [
      paramsImgix('https://cliqqshop.imgix.net/banner-desktop.jpg', this._imgixOptions({ windowWidth }))
    ]
    return (
      <div>
        <Helmet
          title='Home Page'
          meta={[
          { name: 'description', content: '7-eleven CliQQ home page' }
          ]}
      />

        <Container>
          <CategoryIconsWrapper>
            {
              categoryNavLoader ? range(4).map((_, index) => this._handleDefaultCategoryIcon(index))
              : featuredCategories.map((category, index) => {
                return (
                  <CategoryItem key={index} onClick={() => changeRoute(`/products-category/${category.get('id')}?name=${category.get('name')}`)}>
                    <Image src={category.get('icon') !== '' ? category.get('icon') : imageStock('mobile-category-icon-default.png')} alt='CLiQQ' />
                    <Label basic size='tiny' className='item-label'>
                      {category.get('name')}
                    </Label>
                  </CategoryItem>
                )
              })
            }
            <CategoryItem onClick={() => changeRoute(`/categories/`)}>
              {
                !categoryNavLoader
                ? <span>
                  <Image src={MoreCategoriesIcon} alt='CLiQQ' />
                  <Label basic size='tiny' className='item-label'>
                    More
                  </Label>
                </span>
                : <span>
                  <Image src={imageStock('mobile-category-icon-default.png')} alt='CLiQQ' />
                  <CustomHr />
                </span>
              }

            </CategoryItem>
          </CategoryIconsWrapper>

          <BannerWrapper>
            <AccessView
              mobileView={
                <MobileSlider
                  curved
                  loader={bannersLoading}
                  images={_banners}
                  isInfinite
                />
              }
              desktopView={
                <DesktopSlider
                  loader={false}
                  images={desktopBannerImages}
                  slidesToShow={1}
                  isInfinite
                />
              }
            />
          </BannerWrapper>

          <SectionTitle
            title={intl.formatMessage(messages.browseBrands)}
            linkLabel={intl.formatMessage(messages.moreBrands)}
            link='/brands/' />

          <BrandSlider
            brands={featuredBrands}
            loader={brandLoader}
            changeRoute={changeRoute}
          />

        </Container>

        <OrderTip />

        {
          promos.map(promo => (
            <FlashDeals
              key={promo.get('promoCode')}
              windowWidth={windowWidth}
              changeRoute={changeRoute}
              promo={promo}
              promosLoading={promosLoading}
              promosCount={promosCount}
              intl={intl}
            />
            )
          )
        }

        <PointAds />

        <Container>
          <SectionTitle
            title={intl.formatMessage(messages.featureProduct)}
            link='/products-featured' />

          <InfiniteWrapper
            hasMoreData={lazyload}
            isLoading={featuredProductsLoader}
          >
            { this._displayFeaturedItems() }
          </InfiniteWrapper>
        </Container>
        <AccessView
          mobileView={<MobileFooter />}
          desktopView={null}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  featuredProductsLoader: selectLoading(),
  brandLoader: selectBrandLoader(),
  featuredProducts: selectFeaturedProducts(),
  featuredCategories: selectFeaturedCategories(),
  featuredBrands: selectFeaturedBrands(),
  totalFeaturedProductCount: selectTotalCount(),
  promos: selectPromos(),
  promosLoading: selectPromosLoading(),
  promosCount: selectPromosCount(),
  banners: selectBanners(),
  bannersLoading: selectBannersLoading(),
  lazyload: selectLazyload(),
  categoryNavLoader: selectCategoryNavLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: payload => dispatch(getFeaturedProductsAction(payload)),
    getPromos: payload => dispatch(getPromosAction(payload)),
    getBanners: payload => dispatch(getBannersAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'home', reducer })
const withSaga = injectSaga({ key: 'home', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(HomePage)))
