/*
 *
 * ProductsByCategory
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import messages from './messages'
import styled from 'styled-components'

import { Grid } from 'semantic-ui-react'

import H1 from 'components/H1'
import NavCategories from 'components/NavCategories'
import ProductView from 'components/ProductView'
import Footer from 'components/Footer'
// import Promo from 'components/Promo'

import {
  getProductCategoriesAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories
} from 'containers/Buckets/selectors'

import {
  getProductsByCategoryAction,
  getProductsViewedAction
} from './actions'

import {
  selectProductsByCategory,
  selectLoading,
  selectProductsViewed
} from './selectors'

const ItemCount = styled.p`
  font-family: 'helveticalight';
  letter-spacing: 2px;
  text-align: center;
  width: 100%;
`

export class ProductsByCategory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProductsByCategory: PropTypes.func.isRequired,
    getProductCategories: PropTypes.func.isRequired,
    getProductsViewed: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    productsByCategory: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { getProductsViewed, getProductCategories, getProductsByCategory } = this.props
    getProductCategories()
    getProductsByCategory()
    getProductsViewed()
  }

  render () {
    const { productsByCategory, categories, productsViewed, loader, changeRoute } = this.props
    return (
      <div>
        <NavCategories changeRoute={changeRoute} categories={categories} />
        <div className='padding__horizontal--10'>
          <Grid padded>
            <H1 center className='padding__top--25'>ACCESSORIES</H1>
            <ItemCount>
              6 <FormattedMessage {...messages.items} />
            </ItemCount>
            <H1 center className='padding__top--25'>PRODUCTS</H1>
            <H1 center>SHOWING 1-15 OF 72 ITEMS FOR ACCESSORIES</H1>
            <ProductView changeRoute={changeRoute} loader={loader} products={productsByCategory} />
            {/* <Promo loader={loader} /> */}
            <H1 center><FormattedMessage {...messages.viewed} /></H1>
            <ProductView changeRoute={changeRoute} loader={loader} products={productsViewed} />
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  productsByCategory: selectProductsByCategory(),
  productsViewed: selectProductsViewed(),
  categories: selectProductCategories(),
  loader: selectLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getProductCategories: payload => dispatch(getProductCategoriesAction(payload)),
    getProductsByCategory: payload => dispatch(getProductsByCategoryAction(payload)),
    getProductsViewed: () => dispatch(getProductsViewedAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsByCategory)
