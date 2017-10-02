/**
 *
 * HomePage
 *
 */

import React from 'react'
import styled from 'styled-components'
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
import ProductView from 'components/ProductView'

import {
  selectFeaturedProducts,
  selectProductsLoading,

  selectFeaturedCategories,
  selectCategoriesLoading,

  selectFeaturedBrands,
  selectBrandsLoading
} from './selectors'

import {
  getFeaturedProductsAction,
  getFeaturedCategoriesAction,
  getFeaturedBrandsAction
} from './actions'

import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import CategoriesLists from './CategoriesLists'
import BrandsLists from './BrandsLists'

const GridWrapper = styled(Grid)`
  & .row {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
`

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount () {
    const { getProducts, getCategories, getBrands } = this.props
    getProducts()
    getCategories()
    getBrands()
  }

  render () {
    const { products, categories, brands } = this.props

    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name='description' content='Description of HomePage' />
        </Helmet>
        <GridWrapper padded>
          <Grid.Row columns={1} verticalAlign='middle' color='grey'>
            <Grid.Column >
              <SearchBox />
            </Grid.Column>
          </Grid.Row>
        </GridWrapper>

        <Image alt='slider' src={SliderSample} />

        <Header as='h3' textAlign='center'>
          <FormattedMessage {...messages.featureProducts} />
        </Header>
        <ProductView products={products} />

        <Header as='h3' textAlign='center'>
          <FormattedMessage {...messages.featureCategories} />
        </Header>
        <CategoriesLists lists={categories} />

        <Header as='h3' textAlign='center'>
          <FormattedMessage {...messages.featureBrands} />
        </Header>
        <BrandsLists lists={brands} />
      </div>
    )
  }
}

HomePage.propTypes = {
  products: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  brands: PropTypes.object.isRequired,
  productsLoading: PropTypes.bool.isRequired,
  categoriesLoading: PropTypes.bool.isRequired,
  brandsLoading: PropTypes.bool.isRequired,
  getProducts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getBrands: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  products: selectFeaturedProducts(),
  productsLoading: selectProductsLoading(),

  categories: selectFeaturedCategories(),
  categoriesLoading: selectCategoriesLoading(),

  brands: selectFeaturedBrands(),
  brandsLoading: selectBrandsLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getProducts: () => dispatch(getFeaturedProductsAction()),
    getCategories: () => dispatch(getFeaturedCategoriesAction()),
    getBrands: () => dispatch(getFeaturedBrandsAction()),
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
