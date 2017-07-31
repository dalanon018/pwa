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
import { noop } from 'lodash'
import { ifElse, equals } from 'ramda'

import Product from 'components/Product'
import PopupSlide from 'components/PopupSlide'

import {
  selectLoader,
  selectProduct,
  selectMobileNumbers,
  selectProductSuccess,
  selectProductError
} from './selectors'

import {
  getProductAction,
  setCurrentProductAction,
  getMobileNumbersAction,
  updateMobileNumbersAction,
  setProductHandlersDefaultAction
} from './actions'

import {
  setToggleAction
} from 'containers/Buckets/actions'

import {
  selectToggle
} from 'containers/Buckets/selectors'

export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setHandlersDefault: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    toggle: PropTypes.bool.isRequired,
    productSuccess: PropTypes.bool.isRequired,
    productError: PropTypes.bool.isRequired,
    mobileNumbers: PropTypes.object.isRequired
  }

  state = {
    modalToggle: false,
    prevMobileNumber: null
  }

  /**
   * this will handle if success is valid after submission
   */
  successSubmission = false

  constructor () {
    super()

    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleToggle = this._handleToggle.bind(this)
    this._handleSuccess = this._handleSuccess.bind(this)
    this._handleError = this._handleError.bind(this)
    this._handleMobileRegistered = this._handleMobileRegistered.bind(this)
  }

  _handleSubmit ({ value }) {
    const { product, setCurrentProduct, updateMobileNumbers } = this.props

    this.successSubmission = true

    setCurrentProduct(product)
    updateMobileNumbers(value)
  }

  _handleClose () {
    this.setState({
      modalToggle: false
    })
  }

  _handleToggle = () => {
    this.props.setToggle()
  }

  _handleSuccess () {
    const { changeRoute } = this.props

    if (this.successSubmission) {
      this._handleClose()
      this.successSubmission = false

      changeRoute('/review')
    }
  }

  _handleError () {
    if (this.successSubmission) {
      this.setState({
        modalToggle: true
      })
      this.successSubmission = false
    }
  }

  _handleMobileRegistered (mobileNumbers) {
    this.setState({
      prevMobileNumber: mobileNumbers.last()
    })
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentDidMount () {
    const { params: { id }, getProduct, getMobileNumbers } = this.props
    getProduct({ id })
    getMobileNumbers()
  }

  componentWillReceiveProps (nextProps) {
    const { productSuccess, productError, mobileNumbers } = nextProps

    // handle if submission is success
    ifElse(equals(true), this._handleSuccess, noop)(productSuccess)

    // handle if submission is error
    ifElse(equals(true), this._handleError, noop)(productError)

    // handle if theree's mobile number we can use as default
    ifElse((mobile) => mobile.size > 0, this._handleMobileRegistered, noop)(mobileNumbers)
  }

  render () {
    const { loading, product, toggle } = this.props
    const { modalToggle, prevMobileNumber } = this.state

    return (
      <div>
        <Helmet
          title='ProductPage'
          meta={[
            { name: 'description', content: 'Description of ProductPage' }
          ]}
        />
        <Product loading={loading} product={product} popup={this._handleToggle} />
        <PopupSlide
          submit={this._handleSubmit}
          product={product}
          modalClose={this._handleClose}
          modalToggle={modalToggle}
          toggle={toggle}
          mobileNumber={prevMobileNumber}
          onClose={this._handleToggle} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoader(),
  product: selectProduct(),
  toggle: selectToggle(),
  mobileNumbers: selectMobileNumbers(),
  productSuccess: selectProductSuccess(),
  productError: selectProductError()
})

function mapDispatchToProps (dispatch) {
  return {
    getProduct: (payload) => dispatch(getProductAction(payload)),
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    updateMobileNumbers: (payload) => dispatch(updateMobileNumbersAction(payload)),
    setToggle: (payload) => dispatch(setToggleAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
