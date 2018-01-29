/*
 *
 * HomePage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { gt, ifElse, identity } from 'ramda'
import { Container, Grid, Button, Input } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix } from 'utils/image-stock'

import BannerSlider from 'components/Shared/BannerSlider'

import H3 from 'components/Shared/H3'
import MobileBrand from 'components/Mobile/Brand'
import DesktopBrand from 'components/Desktop/Brand'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'

import MobileCategory from 'components/Mobile/Category'
import DesktopCategory from 'components/Desktop/Category'

import MobileFooter from 'components/Mobile/Footer'
import DesktopFooter from 'components/Desktop/Footer'

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
  getFeaturedProductsAction
} from './actions'
import {
  selectLoading,
  selectFeaturedProducts,
  selectTotalCount
} from './selectors'
import {
  LIMIT_ITEMS
} from './constants'

import {
  BannerWrapper,
  SearchWrapper,
  SearchContainer
} from './styles'

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
    setRouteName: PropTypes.func.isRequired
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
    this.props.setRouteName(HOME_NAME)
  }

  render () {
    const { loader, featuredProducts, featuredCategories, featuredBrands, changeRoute, windowWidth, intl, brandLoader } = this.props

    const numSlide = windowWidth > 767 ? 2 : 1
    const imgixOptions = {
      w: 800,
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

    return (
      <div>
        <Helmet
          title='Home Page'
          meta={[
          { name: 'description', content: '7-eleven CliQQ home page' }
          ]}
      />

        {
          windowWidth < 1024 &&
          <SearchContainer className='background__light-grey' data-attribute='search'>
            <Grid padded>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <SearchWrapper>
                    <Input
                      aria-label='search'
                      name='search'
                      fluid
                      onClick={changeRoute.bind(this, '/search')}
                      placeholder={intl.formatMessage(messages.searchPlaceholder)}
                      icon='search'
                    />
                  </SearchWrapper>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </SearchContainer>
        }

        <BannerWrapper>
          <BannerSlider
            loader={false}
            images={bannerImages}
            slidesToShow={numSlide}
            isInfinite
          />
        </BannerWrapper>

        <Container>
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
            <FormattedMessage {...messages.featureProduct} />
          </H3>
          <Waypoint
            onEnter={this._handleFeaturedItemsWaypointEnter}
          >
            {
            showFeaturedItems &&
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
            }
          </Waypoint>

          { this._displayViewAll() }

          <H3>
            <FormattedMessage {...messages.browseCategory} />
          </H3>
          <Waypoint
            onEnter={this._handleFeaturedCategoriesWaypointEnter}
          >
            {
            showFeaturedCategories &&
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
            }
          </Waypoint>
        </Container>
        <AccessView
          mobileView={<MobileFooter />}
          desktopView={<DesktopFooter />}
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
  totalFeaturedProductCount: selectTotalCount()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: payload => dispatch(getFeaturedProductsAction(payload)),
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
