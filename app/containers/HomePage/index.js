/**
 *
 * HomePage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import {
  Grid,
  Image,
  Header
} from 'semantic-ui-react'

import SliderSample from 'images/test-images/v2/slider.jpg'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import SearchBox from 'components/SearchBox'

// Test Images
import Accessories from 'images/test-images/v2/Accessories.jpg'
import Apparel from 'images/test-images/v2/Apparel.jpg'
import SkinCare from 'images/test-images/v2/SkinCare.jpg'
import HomeLiving from 'images/test-images/v2/HomeLiving.jpg'

import Bench from 'images/test-images/v2/Bench.jpg'
import Calbee from 'images/test-images/v2/Calbee.jpg'
import Palmolive from 'images/test-images/v2/Palmolive.jpg'
import Sony from 'images/test-images/v2/Sony.jpg'
import Penshoppe from 'images/test-images/v2/Penshoppe.jpg'

import {
  makeSelectHomePage
} from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import CategoriesLists from './CategoriesLists'
import BrandsLists from './BrandsLists'

const CategoriesData = [
  Apparel,
  HomeLiving,
  Accessories,
  SkinCare
]

const BrandsData = [
  Bench,
  Calbee,
  Palmolive,
  Sony,
  Penshoppe
]

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <Helmet>
          <title>HomePage</title>
          <meta name='description' content='Description of HomePage' />
        </Helmet>
        <Grid padded>
          <Grid.Row columns={1} verticalAlign='middle' color='grey'>
            <Grid.Column >
              <SearchBox />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Image alt='slider' src={SliderSample} />
        <Header as='h3' textAlign='center'>
          <FormattedMessage {...messages.featureProducts} />
        </Header>

        <Header as='h3' textAlign='center'>
          <FormattedMessage {...messages.featureCategories} />
        </Header>
        <CategoriesLists lists={CategoriesData} />

        <Header as='h3' textAlign='center'>
          <FormattedMessage {...messages.featureBrands} />
        </Header>
        <BrandsLists lists={BrandsData} />
      </div>
    )
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'homePage', reducer })
const withSaga = injectSaga({ key: 'homePage', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage)
