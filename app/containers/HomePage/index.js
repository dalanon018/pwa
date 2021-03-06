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
import { Container, Image, Label, Grid } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix, imageStock } from 'utils/image-stock'

import MobileSlider from 'components/Mobile/BannerSlider'
import DesktopSlider from 'components/Desktop/BannerSlider'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'

import MobileFooter from 'components/Mobile/Footer'
// import BrandSlider from 'components/Mobile/BrandSlider'
import SectionTitle from 'components/Shared/SectionTitle'
import OrderTip from 'components/Mobile/OrderTip'
import PointAds from 'components/Mobile/PointAds'
import MobileFlashDeals from 'components/Mobile/FlashDeals'
import DesktopFlashDeals from 'components/Desktop/FlashDeals'
import BrandCarousel from 'components/Mobile/BrandCarousel'
import FlashDealBanner from 'components/Shared/FlashDealBanner'
import FeaturedBrands from 'components/Desktop/FeaturedBrands'
import PointsBannerAds from 'components/Desktop/PointsBannerAds'

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
  selectFeaturedBrandsMobile,
  selectFeaturedBrandsDesktop,
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
  clearFeaturedProductsAction,
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
  LIMIT_ITEMS,
  MOBILE_LIMIT_ITEMS,
  DESKTOP_LIMIT_ITEMS
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
    mobileFeaturedBrands: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    desktopFeaturedBrands: PropTypes.oneOfType([
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

  _limitIdentifier = () => {
    const { isMobileDevice } = this.props
    return isMobileDevice() ? MOBILE_LIMIT_ITEMS : DESKTOP_LIMIT_ITEMS
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
    const { offset } = this.state

    // since this data is change and we know exactly
    getProduct({ offset, limit: this._limitIdentifier() })
  }

  _displayMoreProducts = () => {
    const { pageOffset } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * this._limitIdentifier())
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
          {(props) =>
            <AccessView
              mobileView={<MobileProductView showElement={false} changeRoute={changeRoute} loader={featuredProductsLoader} products={featuredProducts} windowWidth={windowWidth} {...props} />}
              desktopView={<DesktopProductView showElement={false} changeRoute={changeRoute} loader={featuredProductsLoader} products={featuredProducts} windowWidth={windowWidth} {...props} />}
            />

          }
        </InfiniteLoading>
      )
    }

    return null
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

  _handleCategoryName = (data) => {
    // const { windowWidth } = this.props
    const format = /[&]/

    if (!format.test(data)) {
      return data.replace(/ /g, '\n')
    } else {
      return data
    }

    // let maxChar = 15

    // switch (true) {
    //   case (windowWidth >= 375 && windowWidth <= 600):
    //     maxChar = 8
    //     break
    //   case (windowWidth >= 767):
    //     maxChar = 100
    //     break
    // }

    // if (data && data.length > maxChar) {
    //   return `${data.slice(0, maxChar)}...`
    // }
    // return data.replace(/ /g, '\n')
  }

  _handleDesktopPromoCount = () => {
    const { promos } = this.props

    switch (promos.length) {
      case 2:
        return 2

      case 3:
        return 3
    }
  }

  componentDidMount () {
    const { setPageTitle, setShowActivityIcon, setShowSearchIcon, setShowPointsIcon, getPromos, getBanners, windowWidth, setRouteName } = this.props

    setPageTitle(null)
    setShowSearchIcon(false)
    setShowPointsIcon(false)
    setShowActivityIcon(true)

    getBanners()
    getPromos({
      tabletColumnCount: windowWidth >= 767 ? 4 : 2
    })
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

  componentWillUnmount () {
    /**
     * we need to clear the products on unmount.
     * since state of this component is refreshed
     *  offset for products featured is not retain. that is why there are multiple same products seen in different places.
     */
    this.props.clearFeaturedProducts()
  }

  render () {
    const {
      featuredCategories,
      mobileFeaturedBrands,
      desktopFeaturedBrands,
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
      bannersLoading,
      location
    } = this.props
    // const { _banners } = this.state

    const imgixOptions = {
      w: 800,
      h: 300,
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    const mobileBannerImages = range(1, 10).map(i => paramsImgix(`https://cliqqshop.imgix.net/PWA/banners/E3-banner${i}.jpg`, imgixOptions))
    const desktopBannerImages = range(1, 10).map(i => paramsImgix(`https://cliqqshop.imgix.net/PWA/banners/E3-banner${i}.jpg`, imgixOptions))
    // const firstPromoCode = promos.first() && promos.first().get('promoCode')

    return (
      <div>
        <Helmet
          title='Home Page'
          meta={[
            { name: 'description', content: '7-eleven CliQQ home page' }
          ]}
        />

        <Container>
          <AccessView
            mobileView={
              <CategoryIconsWrapper>
                {
                  categoryNavLoader ? range(4).map((_, index) => this._handleDefaultCategoryIcon(index))
                    : featuredCategories.map((category, index) => {
                      return (
                        <CategoryItem key={index} onClick={() => changeRoute(`/products-category/${category.get('id')}?name=${category.get('name')}`)}>
                          <Image src={category.get('icon') !== '' ? category.get('icon') : imageStock('mobile-category-icon-default.png')} alt='CLiQQ' />
                          <Label basic size='tiny' className='item-label text__weight--400'>
                            {this._handleCategoryName(category.get('name'))}
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
                        <Label basic size='tiny' className='item-label text__weight--400'>
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
            }
            desktopView={null}
          />

          <BannerWrapper>
            <AccessView
              mobileView={
                <MobileSlider
                  curved
                  loader={bannersLoading}
                  images={mobileBannerImages}
                  isInfinite
                  isHome={location && location.pathname === '/'}
                />
              }
              desktopView={
                <DesktopSlider
                  loader={false}
                  images={desktopBannerImages}
                  slidesToShow={1}
                  isInfinite
                  isHome={location && location.pathname === '/'}
                />
              }
            />
          </BannerWrapper>

          <AccessView
            mobileView={null}
            desktopView={
              promos.size > 1
                ? <Container>
                  <Grid>
                    <Grid.Row columns={this._handleDesktopPromoCount()}>
                      <Grid.Column>
                        {
                          promos.slice(0, 3).map(promo => (
                            <FlashDealBanner
                              key={promo.get('promoCode')}
                              image={promo.get('background')}
                              promosLoading={promosLoading}
                              width={null}
                              height={130}
                            />
                          ))
                        }
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container> : null
            }
          />

          <div className={`${windowWidth >= 1024 && 'padding__horizontal--10 margin__top-positive--30'}`}>
            <SectionTitle
              colorGrey
              dataCy='feature-brands'
              title={intl.formatMessage(messages.browseBrands)}
              linkLabel={intl.formatMessage(messages.moreBrands)}
              link='/brands/' />
          </div>

          {/*
            <BrandSlider
              brands={featuredBrands}
              loader={brandLoader}
              changeRoute={changeRoute}
            />
          */}

          <AccessView
            mobileView={
              <BrandCarousel
                brands={mobileFeaturedBrands}
                loader={brandLoader}
                changeRoute={changeRoute}
              />
            }
            desktopView={
              <Container>
                <FeaturedBrands
                  brands={desktopFeaturedBrands}
                  loader={brandLoader}
                  changeRoute={changeRoute} />
              </Container>
            }
          />

        </Container>

        <AccessView
          mobileView={<OrderTip />}
          desktopView={null}
        />

        {
          promos.size >= 1 &&
          <Container>
            <div className={`${windowWidth >= 1024 && 'margin__top-positive--10 padding__horizontal--10'}`}>
              <SectionTitle
                colorGrey
                noMarginBottom
                // promo={promos.first()}
                linkLabel='See All'
                // promosLoading={promosLoading}
                title={intl.formatMessage(messages.flashDeals)}
                // link={windowWidth >= 1024 ? 'promos/' + firstPromoCode : '/flash-deals'}
                link={'/flash-deals'} />
            </div>
          </Container>
        }

        <AccessView
          mobileView={
            <div>
              {
                promos.map(promo => (
                  <MobileFlashDeals
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
            </div>
          }
          desktopView={
            <div>
              {
                promos.map(promo => (
                  <DesktopFlashDeals
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
            </div>
          }
        />

        <AccessView
          mobileView={<PointAds changeRoute={changeRoute} />}
          desktopView={<PointsBannerAds changeRoute={changeRoute} />}
        />

        <Container>
          <div className={`${windowWidth >= 1024 && 'padding__horizontal--10 margin__top-positive--20'}`}>
            <SectionTitle
              colorGrey
              title={intl.formatMessage(messages.featureProduct)}
              link='/products-featured' />
          </div>

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
  mobileFeaturedBrands: selectFeaturedBrandsMobile(),
  desktopFeaturedBrands: selectFeaturedBrandsDesktop(),
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
    clearFeaturedProducts: () => dispatch(clearFeaturedProductsAction()),
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
