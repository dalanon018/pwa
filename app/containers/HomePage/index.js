/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { fromJS } from 'immutable'

import Helmet from 'react-helmet'
import messages from './messages'

import { Grid } from 'semantic-ui-react'

import NavCategories from 'components/NavCategories'
import BannerSlider from 'components/BannerSlider'
import ProductView from 'components/ProductView'
import Category from 'components/Category'
import H1 from 'components/H1'
import Button from 'components/Button'
import Footer from 'components/Footer'
import StaticPromos from 'components/BannerStaticPromos'
import WindowWidth from 'components/WindowWidth'
// import Promo from 'components/Promo'

import { getFeaturedProductsAction } from './actions'
import { selectLoading, selectFeaturedProducts } from './selectors'

import {
  getProductCategoriesAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories
} from 'containers/Buckets/selectors'

import {
  BannerWrapper
} from './styles'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    getProductCategories: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    featuredProducts: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    productCategories: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
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
        <Button
          onClick={this._displayFeatured}
          primary
        > <FormattedMessage {...messages.productViewAll} /> </Button>
      )
    }

    return null
  }

  componentDidMount () {
    this.props.getProduct()
    this.props.getProductCategories()
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
    const { loader, productCategories, changeRoute } = this.props
    const { products } = this.state
    const grids = {
      mobile: 4,
      tablet: 4,
      computer: 3,
      widescreen: 3
    }

    return (
      <div>
        <Helmet
          title='Home Page'
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' }
          ]}
          link={[
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' }
          ]}
        />
        <NavCategories changeRoute={changeRoute} categories={productCategories} />

        <BannerWrapper>
          <Grid>
            <Grid.Row stretched className='banner-padding'>
              <Grid.Column
                className='banner-padding'
                mobile={16}
                tablet={8}
                computer={8}
                largeScreen={8}
                widescreen={8}>
                <BannerSlider loader={loader} />
              </Grid.Column>
              <Grid.Column
                className='banner-padding'
                only='tablet'
                tablet={8}
                computer={8}
                largeScreen={8}
                widescreen={8}>
                <StaticPromos loader={loader} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </BannerWrapper>

        <div className='padding__horizontal--10'>
          <Grid padded>
            <H1 center> <FormattedMessage {...messages.featureProduct} /> </H1>
            <ProductView changeRoute={changeRoute} loader={loader} products={products} />
            { this._displayViewAll() }
            {/* <Promo loader={loader} /> */}
            <H1 center> <FormattedMessage {...messages.browseCategory} /> </H1>
            <Category
              loader={loader}
              grids={grids}
              margin='2'
              changeRoute={changeRoute}
              route='/products-category'
              iconWidth='25'
              fontSize='9'
              height='80'
              categories={productCategories} />
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loader: selectLoading(),
  featuredProducts: selectFeaturedProducts(),
  productCategories: selectProductCategories()

})

function mapDispatchToProps (dispatch) {
  return {
    getProduct: payload => dispatch(getFeaturedProductsAction(payload)),
    getProductCategories: payload => dispatch(getProductCategoriesAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(HomePage))
