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
  selectProductCategories,
  selectBrands
  // selectLoader
} from 'containers/Buckets/selectors'

import {
  BannerWrapper,
  SearchWrapper
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
    productCategories: PropTypes.oneOfType([
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
    const { loader, productCategories, featuredBrands, changeRoute, windowWidth, intl } = this.props

    const { products } = this.state
    // const resposiveColumns = () => {
    //   if (windowWidth >= 768) {
    //     return 5
    //   } else {
    //     return 4
    //   }
    // }

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

    // const bannerImages = fromJS([
    //   {
    //     image: paramsImgix(imageStock('sample_banner.jpg'), {
    //       auto: 'compress',
    //       q: 35,
    //       lossless: 0
    //     })
    //   }
    // ])

    return (
      <div>
        <Helmet
          title='Home Page'
          meta={[
            { name: 'description', content: '7-eleven CliQQ home page' }
          ]}
        />

        <Grid padded>
          <Grid.Row className='bg-light-grey' columns={1}>
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

        <BannerWrapper>
          <BannerSlider loader={loader} images={bannerImages} />
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
          {/* <Promo loader={loader} /> */}
          <H3>
            <FormattedMessage {...messages.browseCategory} />
          </H3>
          <Category
            loader={loader}
            // resposiveColumns={resposiveColumns()}
            windowWidth={windowWidth}
            margin='2'
            changeRoute={changeRoute}
            route='/products-category'
            iconWidth='25'
            fontSize='9'
            height='80'
            categories={productCategories} />
          <H3>
            <FormattedMessage {...messages.browseBrands} />
          </H3>
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
  productCategories: selectProductCategories(),
  featuredBrands: selectBrands()
  // categoryLoader: selectLoader()
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
