/*
 *
 * SearchPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Product from 'components/Product'

import {
  selectSearchProductLoading,
  selectSearchProduct
} from './selectors'

export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  constructor () {
    super()

    this._displayProduct = this._displayProduct.bind(this)
  }
  _displayProduct () {
    const { loading, product } = this.props

    if (product.size > 0) {
      return (
        <Product loading={loading} product={product} />
      )
    }

    return null
  }

  render () {
    return (
      <div>
        <Helmet
          title='Search'
          meta={[
            { name: 'description', content: 'Description of SearchPage' }
          ]}
        />
        { this._displayProduct() }
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  product: selectSearchProduct(),
  loading: selectSearchProductLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
