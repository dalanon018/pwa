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

import { Grid, Button, Input } from 'semantic-ui-react'

import NavCategories from 'components/NavCategories'
import BannerSlider from 'components/BannerSlider'
import ProductView from 'components/ProductView'
import Category from 'components/Category'
import H1 from 'components/H1'
import H2 from 'components/H2'
import H3 from 'components/H3'
import H4 from 'components/H4'
import ListCollapse from 'components/ListCollapse'
import ListFloated from 'components/ListFloated'
// import Button from 'components/Button'
import Footer from 'components/Footer'
import StaticPromos from 'components/BannerStaticPromos'
import WindowWidth from 'components/WindowWidth'
// import Promo from 'components/Promo'

import { getFeaturedProductsAction } from './actions'
import { selectLoading, selectFeaturedProducts } from './selectors'

import {
  getProductCategoriesAction,
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories,
  selectLoader
} from 'containers/Buckets/selectors'

import {
  BannerWrapper,
  ContentWrapper
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
        <Button
          onClick={this._displayFeatured}
          primary
        > <FormattedMessage {...messages.productViewAll} /> </Button>
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
    const { loader, productCategories, changeRoute, windowWidth, categoryLoader, route, intl } = this.props
    const { products } = this.state
    const homeRouteName = route && route.name
    const resposiveColumns = () => {
      if (windowWidth >= 768) {
        return 5
      } else {
        return 4
      }
    }

    const bannerImages = fromJS([
      {
        image: paramsImgix(imageStock('sample_banner.jpg'), {
          auto: 'compress',
          q: 35,
          lossless: 0
        })
      }
    ])

    return (
      <div>
        <Helmet
          title='Home Page'
          meta={[
            { name: 'description', content: '7-eleven CliQQ home page' }
          ]}
        />

        <NavCategories
          changeRoute={changeRoute}
          categoryLoader={categoryLoader}
          loader={loader}
          categories={productCategories} />

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
                <BannerSlider loader={loader} images={bannerImages} homeRouteName={homeRouteName} />
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
                <H1 className='header-label' text='SITE THEMING' />
                <H1 className='header-label' text='Header One' />
                <H2 className='header-label' text='Header Two' />
                <H3 className='header-label' text='Header Three' />
                <H4 className='header-label' text='Header Four' />
                <Button onClick={() => {}} primary>Primary Button</Button>
                <ListCollapse />
                <ListFloated />
                <Input placeholder='Search...' />
              </Grid.Column>
            </Grid.Row>
            <H1 className='header-label'> <FormattedMessage {...messages.featureProduct} /> </H1>
            <H3 className='header-label' text={intl.formatMessage(messages.featureProduct)} />
            <ProductView
              changeRoute={changeRoute}
              loader={loader}
              products={products}
              windowWidth={windowWidth} />
            { this._displayViewAll() }
            {/* <Promo loader={loader} /> */}
            <H1 className='header-label'> <FormattedMessage {...messages.browseCategory} /> </H1>
            <Category
              loader={loader}
              resposiveColumns={resposiveColumns()}
              windowWidth={windowWidth}
              margin='2'
              changeRoute={changeRoute}
              route='/products-category'
              iconWidth='25'
              fontSize='9'
              height='80'
              categories={productCategories} />
          </Grid>
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
  categoryLoader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: payload => dispatch(getFeaturedProductsAction(payload)),
    getProductCategories: payload => dispatch(getProductCategoriesAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomePage)))
