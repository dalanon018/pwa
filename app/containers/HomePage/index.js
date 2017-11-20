/*
 *
 * HomePage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { fromJS } from 'immutable'
import { ifElse, identity } from 'ramda'
import { Container, Grid, Button, Input } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix } from 'utils/image-stock'

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

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import { getFeaturedProductsAction } from './actions'
import { selectLoading, selectFeaturedProducts } from './selectors'
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
    const { featuredProducts } = this.props

    if (featuredProducts.size > 4) {
      return (
        <Grid padded>
          <Grid.Row centered>
            <Button
              onClick={this._displayFeatured}
              primary >
              <FormattedMessage {...messages.productViewAll} /> </Button>
          </Grid.Row>
        </Grid>
      )
    }

    return null
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
        products: featuredProducts.slice(0, 4)
      })
    }
  }

  render () {
    const { loader, featuredCategories, featuredBrands, changeRoute, windowWidth, intl, brandLoader } = this.props
    const { products } = this.state
    const numSlide = windowWidth > 767 ? 2 : 1
    const imgixOptions = {
      w: 414,
      h: 246,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    const bannerImages = [
      paramsImgix('https://cliqq.imgix.net/sample_banner.jpg', imgixOptions),
      paramsImgix('https://cliqq.imgix.net/sample_banner.jpg', imgixOptions),
      paramsImgix('https://cliqq.imgix.net/sample_banner.jpg', imgixOptions)
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
  featuredBrands: selectFeaturedBrands()
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
const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'home', reducer })
const withSaga = injectSaga({ key: 'home', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(HomePage)))
