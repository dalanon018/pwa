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

import { Grid, Button, Input, Label } from 'semantic-ui-react'

import BannerSlider from 'components/BannerSlider'
import ProductView from 'components/ProductView'
import Category from 'components/Category'
import H1 from 'components/H1'
import H2 from 'components/H2'
import H3 from 'components/H3'
import H4 from 'components/H4'
import ListCollapse from 'components/ListCollapse'
import Brand from 'components/Brand'
import Footer from 'components/Footer'
import StaticPromos from 'components/BannerStaticPromos'
import WindowWidth from 'components/WindowWidth'
// import Promo from 'components/Promo'

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
  ContentWrapper,
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
        <Grid>
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

        <SearchWrapper>
          <Input
            onClick={changeRoute.bind(this, '/search')}
            placeholder={intl.formatMessage(messages.searchPlaceholder)}
            icon='search' />
        </SearchWrapper>

        <BannerWrapper>
          <Grid padded>
            <Grid.Row stretched className='banner-padding'>
              <Grid.Column
                className='banner-padding'
                mobile={16}
                tablet={8}
                computer={8}
                largeScreen={8}
                widescreen={8}>
                <BannerSlider loader={loader} images={bannerImages} />
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

        <ContentWrapper className='padding__horizontal--10'>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <H1 text='SITE THEMING' />
                <H1 text='Header One' />
                <H2 text='Header Two' />
                <H3 text='Header Three' />
                <H4 text='Header Four' />
                <Button onClick={() => {}} primary>Primary Button</Button>
                <ListCollapse title='lorem ipsum'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos repudiandae inventore debitis iusto ea esse eligendi voluptatum distinctio assumenda quam aliquid, unde ullam odit tenetur cum, explicabo quisquam a!</p>
                </ListCollapse>
                <Input placeholder='Search...' />
                <div>
                  <Label as='p' basic size='mini'>Mini</Label>
                  <Label as='p' basic size='tiny'>Tiny</Label>
                  <Label as='p' basic size='small'>Small</Label>
                  <Label as='p' basic size='medium'>Medium</Label>
                  <Label as='p' basic size='large'>Large</Label>
                  <Label as='p' basic size='big'>Big</Label>
                  <Label as='p' basic size='huge'>Huge</Label>
                  <Label as='p' basic size='massive'>Massive</Label>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <H3>
            <FormattedMessage {...messages.featureProduct} />
          </H3>
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
          <H3 className='margin__none'>
            <FormattedMessage {...messages.browseBrands} />
          </H3>
          <Brand brands={featuredBrands} />
        </ContentWrapper>
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
