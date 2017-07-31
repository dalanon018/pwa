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
import Promo from 'components/Promo'

import { getProductCategoriesAction } from 'containers/Buckets/actions'
import { selectProductCategories } from 'containers/Buckets/selectors'
import { getProductsByCategoryAction } from './actions'
import { selectProductsByCategory, selectLoading } from './selectors'

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
    loader: PropTypes.bool.isRequired,
    productsByCategory: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    categories: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  }

  componentDidMount () {
    this.props.getProductCategories()
    this.props.getProductsByCategory()
  }

  render () {
    const { productsByCategory, categories, loader, changeRoute } = this.props
    console.log('productsByCategory', productsByCategory)
    return (
      <div>
        <NavCategories changeRoute={changeRoute} categories={categories} />
        <div className='padding__horizontal--10'>
          <Grid padded>
            <H1 center className='padding__top--25'>ACCESSORIES</H1>
            <ItemCount>
              6 <FormattedMessage {...messages.items} />
            </ItemCount>
            <ProductView changeRoute={changeRoute} loader={loader} products={productsByCategory} />
            <Promo loader={loader} />
            <H1 center className='margin__top--none'><FormattedMessage {...messages.viewed} /></H1>
            <ProductView changeRoute={changeRoute} loader={loader} products={productsByCategory} />
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

ProductsByCategory.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  productsByCategory: selectProductsByCategory(),
  categories: selectProductCategories(),
  loader: selectLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getProductCategories: payload => dispatch(getProductCategoriesAction(payload)),
    getProductsByCategory: payload => dispatch(getProductsByCategoryAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsByCategory)
