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

import { getFeaturedProductsAction } from './actions'
import { selectLoading, selectFeaturedProducts } from './selectors'

import {
  getProductCategoriesAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories
} from 'containers/Buckets/selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getProduct: PropTypes.object.getProduct,
    getProductCategories: PropTypes.object.getProductCategories
  }

  componentDidMount () {
    this.props.getProduct()
    this.props.getProductCategories()
  }

  render () {
    const { loader, featuredProducts, productCategories } = this.props

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
        <NavCategories categories={productCategories} />
        <BannerSlider loader={loader} />
        <div className='padding__horizontal--10'>
          <Grid padded>
            <H1 center> <FormattedMessage {...messages.featureProduct} /> </H1>
            <ProductView loader={loader} products={featuredProducts} />
            <Button
              onClick={() => {}}
              primary
              fluid
            > <FormattedMessage {...messages.productViewAll} /> </Button>
            <H1 center> <FormattedMessage {...messages.browseCategory} /> </H1>
            <Category loader={loader} categories={productCategories} />
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

HomePage.propTypes = {
  changeRoute: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
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
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
