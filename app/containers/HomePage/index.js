/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { fromJS } from 'immutable'
import { ifElse, identity } from 'ramda'

import { imageStock, paramsImgix } from 'utils/image-stock'

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

import { getFeaturedProductsAction } from './actions'
import { selectLoading, selectFeaturedProducts } from './selectors'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectFeaturedCategories,
  selectFeaturedBrands
} from 'containers/Buckets/selectors'

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
    const { loader, featuredCategories, featuredBrands, changeRoute, windowWidth, intl } = this.props
    const { products } = this.state
    const numSlide = windowWidth > 767 ? 2 : 1
    const bannerImages = [
      paramsImgix(imageStock('sample_banner.jpg'), {
        auto: 'compress',
        q: 35,
        lossless: 0
      }),
      paramsImgix(imageStock('sample_banner.jpg'), {
        auto: 'compress',
        q: 35,
        lossless: 0
      }),
      paramsImgix(imageStock('sample_banner.jpg'), {
        auto: 'compress',
        q: 35,
        lossless: 0
      })
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
                    fluid
                    onClick={changeRoute.bind(this, '/search')}
                    placeholder={intl.formatMessage(messages.searchPlaceholder)}
                    icon='search' />
                </SearchWrapper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </SearchContainer>

        <BannerWrapper>
          <BannerSlider loader={loader} images={bannerImages} slidesToShow={numSlide} />
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
          <Brand brands={featuredBrands} />
        </Container>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loader: selectLoading(),
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

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomePage)))
