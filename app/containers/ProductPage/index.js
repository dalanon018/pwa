/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Product from 'components/Product'

import {
  selectLoader,
  selectProduct
} from './selectors'

import {
  getProductAction
} from './actions'

export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  componentDidMount () {
    const { params: { id } } = this.props
    this.props.getProduct({ id })
  }

  render () {
    const { loading, product } = this.props

    return (
      <div>
        <Helmet
          title='ProductPage'
          meta={[
            { name: 'description', content: 'Description of ProductPage' }
          ]}
        />
        <Product loading={loading} product={product} />
      </div>
    )
  }
}

ProductPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoader(),
  product: selectProduct()
})

function mapDispatchToProps (dispatch) {
  return {
    getProduct: (payload) => dispatch(getProductAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
