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
import moment from 'moment'

import { Grid } from 'semantic-ui-react'

import NavCategories from 'components/NavCategories'
import BannerSlider from 'components/BannerSlider'
import ProductView from 'components/ProductView'
import Category from 'components/Category'
import H1 from 'components/H1'
import Button from 'components/Button'
import Footer from 'components/Footer'
import Promo from 'components/Promo'

import { getFeaturedProductsAction } from './actions'
import { selectLoading, selectFeaturedProducts } from './selectors'

import {
  getProductCategoriesAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories
} from 'containers/Buckets/selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * holder for countdown interval
   */
  countdownInterval

  constructor () {
    super()
    this.state = {
      count: ''
    }
  }

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

  countdownTimer = () => {
    const date = new Date()
    let eventTime = 1500474126
    let currentTime = Math.floor(date.getTime() / 1000)
    let diffTime = eventTime - currentTime
    let duration = moment.duration(diffTime * 1000, 'milliseconds')
    let interval = 1000

    this.countdownInterval = setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds')
      const countHours = () => {
        if (duration.hours().toString().length > 1) {
          return duration.hours()
        } else {
          return '0' + duration.hours()
        }
      }
      const countMinutes = () => {
        if (duration.minutes().toString().length > 1) {
          return duration.minutes()
        } else {
          return '0' + duration.minutes()
        }
      }
      const countSeconds = () => {
        if (duration.seconds().toString().length > 1) {
          return duration.seconds()
        } else {
          return '0' + duration.seconds()
        }
      }

      this.setState({
        count: `${countHours()}:${countMinutes()}:${countSeconds()}`
      })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.countdownInterval)
  }

  componentDidMount () {
    this.props.getProduct()
    this.props.getProductCategories()
    this.countdownTimer()
  }

  render () {
    const { loader, featuredProducts, productCategories, changeRoute } = this.props

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
            <ProductView changeRoute={changeRoute} loader={loader} products={featuredProducts} />
            <Button
              onClick={() => {}}
              primary
              fluid
            > <FormattedMessage {...messages.productViewAll} /> </Button>
            <Promo loader={loader} countDown={this.state.count} />
            <H1 className='margin__top--none' center> <FormattedMessage {...messages.browseCategory} /> </H1>
            <Category loader={loader} categories={productCategories} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
