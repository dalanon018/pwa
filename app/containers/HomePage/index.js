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
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { gt, ifElse, identity } from 'ramda'
import { Container, Grid, Button, Image, Label } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix } from 'utils/image-stock'

import H3 from 'components/Shared/H3'
import MobileBrand from 'components/Mobile/Brand'
import DesktopBrand from 'components/Desktop/Brand'

import MobileSlider from 'components/Mobile/BannerSlider'
import DesktopSlider from 'components/Desktop/BannerSlider'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'

import MobileCategory from 'components/Mobile/Category'
import DesktopCategory from 'components/Desktop/Category'
import MobileFooter from 'components/Mobile/Footer'

import WindowWidth from 'components/Shared/WindowWidth'
import AccessView from 'components/Shared/AccessMobileDesktopView'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectFeaturedCategories,
  selectFeaturedBrands,
  selectBrandLoader
} from 'containers/Buckets/selectors'
import {
  HOME_NAME
} from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getFeaturedProductsAction,
  getPromosAction
} from './actions'
import {
  selectLoading,
  selectFeaturedProducts,
  selectTotalCount,
  selectPromos,
  selectPromosLoading,
  selectPromosCount
} from './selectors'
import {
  LIMIT_ITEMS
} from './constants'

import {
  BannerWrapper,
  CategoryIconsWrapper,
  CategoryItem
} from './styles'

import AccessoriesIcon from 'images/icons/category-header/accessories-icon.svg'
// import GadgetsIcon from 'images/icons/category-header/gadgets-icon.svg'
// import LaundryIcon from 'images/icons/category-header/laundry-icon.svg'
// import SportsTravelIcon from 'images/icons/category-header/sports-travel-icon.svg'
import MoreCategoriesIcon from 'images/icons/category-header/more-categories-icon.svg'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
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
    setShowActivityIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    promos: PropTypes.object.isRequired,
    promosLoading: PropTypes.bool.isRequired,
    promosCount: PropTypes.number.isRequired,
    getPromos: PropTypes.func.isRequired
  }

  state = {
    showFeaturedItems: false,
    showFeaturedCategories: false
  }
  constructor () {
    super()

    this._displayViewAll = this._displayViewAll.bind(this)
    this._displayFeatured = this._displayFeatured.bind(this)
  }

  _displayFeatured () {
    this.props.changeRoute(`/products-category/featured`)
  }

  _displayViewAll () {
    const { totalFeaturedProductCount } = this.props
    const componentRender = ifElse(
      gt(LIMIT_ITEMS),
      () => null,
      () => (
        <Grid padded>
          <Grid.Row centered>
            <Button
              onClick={this._displayFeatured}
              primary >
              <FormattedMessage {...messages.productViewAll} /> </Button>
          </Grid.Row>
        </Grid>
      )
    )

    return componentRender(totalFeaturedProductCount)
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

  componentWillMount () {
    this.props.setPageTitle(null)
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    this.props.getProduct()
    this.props.getPromos()
    this.props.setRouteName(HOME_NAME)
  }

  render () {
    const { loader, featuredProducts, featuredCategories, featuredBrands, changeRoute, windowWidth, brandLoader } = this.props
    const imgixOptions = {
      w: windowWidth >= 1024 ? 1170 : 800,
      h: 400,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    const bannerImages = [
      paramsImgix('https://cliqqshop.imgix.net/PWA/banners/banner1.png', imgixOptions),
      paramsImgix('https://cliqqshop.imgix.net/PWA/banners/banner2.png', imgixOptions),
      paramsImgix('https://cliqqshop.imgix.net/PWA/banners/banner3.png', imgixOptions),
      paramsImgix('https://cliqqshop.imgix.net/PWA/banners/banner4.png', imgixOptions)
    ]

    const desktopBannerImages = [
      paramsImgix('https://cliqqshop.imgix.net/banner-desktop.jpg', imgixOptions)
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
              featuredCategories.map((category, index) => {
                return (
                  <CategoryItem key={index} onClick={() => changeRoute(`/products-category/${category.get('id')}`)}>
                    <Image src={AccessoriesIcon} alt='CLiQQ' />
                    <Label basic size='tiny' className='item-label'>
                      {category.get('name')}
                    </Label>
                  </CategoryItem>
                )
              })
            }
            <CategoryItem>
              <Image src={MoreCategoriesIcon} alt='CLiQQ' />
              <Label basic size='tiny' className='item-label'>
                More
              </Label>
            </CategoryItem>
          </CategoryIconsWrapper>

          <BannerWrapper>
            <AccessView
              mobileView={
                <MobileSlider
                  curved
                  loader={false}
                  images={bannerImages}
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

          <AccessView
            mobileView={
              <H3>
                <FormattedMessage {...messages.browseBrands} />
              </H3>
            }
            desktopView={null}
          />

          <AccessView
            mobileView={
              <MobileBrand
                brands={featuredBrands}
                loader={brandLoader}
                changeRoute={changeRoute}
              />
            }
            desktopView={
              <DesktopBrand
                brands={featuredBrands}
                loader={brandLoader}
                changeRoute={changeRoute}
              />
            }
          />

          <H3>
            <FormattedMessage {...messages.browseCategory} />
          </H3>
          <AccessView
            mobileView={
              <MobileCategory
                loader={loader}
                windowWidth={windowWidth}
                margin='2'
                changeRoute={changeRoute}
                route='/products-category'
                iconWidth='25'
                fontSize='9'
                height='80'
                categories={featuredCategories}
              />
            }
            desktopView={
              <DesktopCategory
                loader={loader}
                windowWidth={windowWidth}
                margin='2'
                changeRoute={changeRoute}
                route='/products-category'
                iconWidth='25'
                fontSize='9'
                height='80'
                categories={featuredCategories}
              />
            }
          />

          { this._displayViewAll() }

          <AccessView
            mobileView={
              <MobileProductView
                changeRoute={changeRoute}
                loader={loader}
                products={featuredProducts}
                windowWidth={windowWidth}
              />
            }
            desktopView={
              <DesktopProductView
                changeRoute={changeRoute}
                loader={loader}
                products={featuredProducts}
                windowWidth={windowWidth}
              />
            }
          />
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
  loader: selectLoading(),
  brandLoader: selectBrandLoader(),
  featuredProducts: selectFeaturedProducts(),
  featuredCategories: selectFeaturedCategories(),
  featuredBrands: selectFeaturedBrands(),
  totalFeaturedProductCount: selectTotalCount(),
  promos: selectPromos(),
  promosLoading: selectPromosLoading(),
  promosCount: selectPromosCount()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: payload => dispatch(getFeaturedProductsAction(payload)),
    getPromos: payload => dispatch(getPromosAction(payload)),
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
