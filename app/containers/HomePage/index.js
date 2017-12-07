/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react'
import LazyLoad from 'react-lazyload'

import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { fromJS } from 'immutable'
import { gt, ifElse, identity } from 'ramda'

import { paramsImgix } from 'utils/image-stock'

import Helmet from 'react-helmet'
import messages from './messages'

import { Container, Grid, Button, Input } from 'semantic-ui-react'

import BannerSlider from 'components/BannerSlider'
import ProductView from 'components/ProductView'
import Category from 'components/Category'
import H3 from 'components/H3'
import Brand from 'components/Brand'
import Footer from 'components/Footer'
import WindowWidth from 'components/WindowWidth'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectFeaturedCategories,
  selectFeaturedBrands,
  selectLoader
} from 'containers/Buckets/selectors'

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
  SearchContainer,
  CategoryWrapper
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
    setShowActivityIcon: PropTypes.func.isRequired
  }

  state = {
    products: fromJS([])
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

  componentWillMount () {
    this.props.setPageTitle(null)
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    this.props.getProduct()
  }

  componentWillReceiveProps (nextProps) {
    const { featuredProducts } = nextProps

    if (featuredProducts.size) {
      this.setState({
        products: featuredProducts.slice(0, 6)
      })
    }
  }

  render () {
    const { loader, featuredCategories, featuredBrands, changeRoute, windowWidth, intl, brandLoader } = this.props
    const { products } = this.state
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

        <BannerWrapper>
          <BannerSlider
            loader={loader}
            images={bannerImages}
            slidesToShow={numSlide}
            isInfinite
          />
        </BannerWrapper>

        <Container>
          <Grid padded>
            <Grid.Row columns={1}>
              <H3>
                <FormattedMessage {...messages.featureProduct} />
              </H3>
            </Grid.Row>
          </Grid>

          <ProductView
            changeRoute={changeRoute}
            loader={loader}
            products={products}
            windowWidth={windowWidth} />
          { this._displayViewAll() }

          <LazyLoad height='100%' offset={-200} once>
            <div>
              {
                this._shouldDisplayHeader(
                  <H3>
                    <FormattedMessage {...messages.browseCategory} />
                  </H3>
                )(featuredCategories.size > 0)
              }

              <CategoryWrapper>
                <Category
                  loader={loader}
                  windowWidth={windowWidth}
                  margin='2'
                  changeRoute={changeRoute}
                  route='/products-category'
                  iconWidth='25'
                  fontSize='9'
                  height='80'
                  categories={featuredCategories} />
              </CategoryWrapper>

              {
                this._shouldDisplayHeader(
                  <H3>
                    <FormattedMessage {...messages.browseBrands} />
                  </H3>
                )(featuredBrands.size > 0)
              }
              <Brand brands={featuredBrands} loader={brandLoader} />
            </div>
          </LazyLoad>
        </Container>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loader: selectLoading(),
  brandLoader: selectLoader(),
  featuredProducts: selectFeaturedProducts(),
  featuredCategories: selectFeaturedCategories(),
  featuredBrands: selectFeaturedBrands(),
  totalFeaturedProductCount: selectTotalCount()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: payload => dispatch(getFeaturedProductsAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomePage)))
