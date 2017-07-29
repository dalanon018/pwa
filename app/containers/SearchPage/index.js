/*
 *
 * SearchPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Product from 'components/Product'
import PopupSlide from 'components/PopupSlide'

import {
  selectSearchProductLoading,
  selectSearchProduct,
  selectProductSuccess,
  selectProductError
} from './selectors'

import {
  setCurrentProductAction,
  setMobileNumbersAction,
  setProductHandlersDefaultAction
} from './actions'

import {
  setToggleAction
} from 'containers/Buckets/actions'

import {
  selectToggle
} from 'containers/Buckets/selectors'

/**
 * most of the function are copied from prodct page for now! since we will have to change this due to fuzzy search and stuff.
 */
export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setHandlersDefault: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired,
    productSuccess: PropTypes.bool.isRequired,
    productError: PropTypes.bool.isRequired
  }

  constructor () {
    super()

    this.state = {
      modalToggle: false
    }

    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleToggle = this._handleToggle.bind(this)
    this._displayProduct = this._displayProduct.bind(this)
  }

  _handleSubmit ({ value }) {
    const { product, setCurrentProduct, setMobileNumbers } = this.props

    this.successSubmission = true

    setCurrentProduct(product)
    setMobileNumbers(value)
  }

  _handleClose () {
    this.setState({
      modalToggle: false
    })
  }

  _handleToggle = () => {
    this.props.setToggle()
  }

  _displayProduct () {
    const { loading, product } = this.props

    if (product.size > 0) {
      return (
        <Product loading={loading} product={product} popup={this._handleToggle} />
      )
    }

    return null
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentWillReceiveProps (nextProps) {
    const { productSuccess, productError, changeRoute } = nextProps

    if (productSuccess && this.successSubmission) {
      this._handleClose()
      this.successSubmission = false

      changeRoute('/review')
    }

    if (productError && this.successSubmission) {
      this.setState({
        modalToggle: productError
      })
      this.successSubmission = false
    }
  }

  render () {
    const { product, toggle } = this.props
    const { modalToggle } = this.state
    return (
      <div>
        <Helmet
          title='Search'
          meta={[
            { name: 'description', content: 'Description of SearchPage' }
          ]}
        />
        { this._displayProduct() }
        <PopupSlide
          submit={this._handleSubmit}
          product={product}
          modalClose={this._handleClose}
          modalToggle={modalToggle}
          toggle={toggle}
          onClose={this._handleToggle}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  product: selectSearchProduct(),
  loading: selectSearchProductLoading(),
  toggle: selectToggle(),
  productSuccess: selectProductSuccess(),
  productError: selectProductError()
})

function mapDispatchToProps (dispatch) {
  return {
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    setMobileNumbers: (payload) => dispatch(setMobileNumbersAction(payload)),
    setToggle: (payload) => dispatch(setToggleAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
