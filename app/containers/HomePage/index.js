/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import Helmet from 'react-helmet'
// import messages from './messages'

import { Grid } from 'semantic-ui-react'

import NavCategories from 'components/NavCategories'
import BannerSlider from 'components/BannerSlider'
import ProductView from 'components/ProductView'

import { getSampleApiAction } from './actions'
import { makeSelectHomePage, selectSampleApi } from './selectors'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()
    this.state = {
      loader: false
    }
    this.handleGetSampleApi = this.handleGetSampleApi.bind(this)
  }

  componentDidMount () {
    this.handleGetSampleApi('ferrari')
  }

  handleGetSampleApi (handle) {
    new Promise((resolve, reject) => {
      const payload = Object.assign({}, {
        passData: handle,
        resolve,
        reject
      })
      this.props.getSampleApi(payload)
    }).then(() => {
      this.setState({loader: true})
    }).catch((err) => {
      this.setState({loader: false})
      console.error(`Error:  ${err}`)
    })
  }

  render () {
    const { loader } = this.state

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
        <NavCategories />
        <BannerSlider />
        <div className='padding__horizontal--14'>
          <Grid padded>
            <ProductView loader={loader} />
          </Grid>
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
  sampleApi: selectSampleApi()
})

function mapDispatchToProps (dispatch) {
  return {
    getSampleApi: payload => dispatch(getSampleApiAction(payload)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
