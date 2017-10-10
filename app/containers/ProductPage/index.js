/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import Recaptcha from 'react-google-recaptcha'
import styled from 'styled-components'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { noop } from 'lodash'
import { ifElse, equals } from 'ramda'

import { imageStock } from 'utils/image-stock'

import Product from 'components/Product'
import PopupSlide from 'components/PopupSlide'
import PopupVerification from 'components/PopupVerification'
import WindowWidth from 'components/WindowWidth'

import {
  selectLoader,
  selectProduct,
  selectMobileNumbers,
  selectProductSuccess,
  selectProductError,
  selectMarkdown,
  selectLoadingMarkdown
} from './selectors'

import {
  getProductAction,
  setCurrentProductAction,
  getMobileNumbersAction,
  updateMobileNumbersAction,
  setProductHandlersDefaultAction,
  getMarkDownAction
} from './actions'

import {
  setToggleAction,
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectToggle
} from 'containers/Buckets/selectors'

import {
  ENVIROMENT,
  RECAPTCHA_SITE_KEY
} from 'containers/App/constants'

const RecaptchaWrapper = styled.div`
  display: none;
`

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

  /**
   * this will handle if success is valid after submission
   */
  successSubmission = false

  constructor () {
    super()
    this.state = {
      modalToggle: false,
      prevMobileNumber: null,
      socialToggle: false,
      copied: false,
      showSlide: false,
      showVerification: false,
      mobileNumber: '',
      toggleCheck: false
    }

    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleToggle = this._handleToggle.bind(this)
    this._handleSuccess = this._handleSuccess.bind(this)
    this._handleError = this._handleError.bind(this)
    this._handleMobileRegistered = this._handleMobileRegistered.bind(this)
    this._handleSocialToggle = this._handleSocialToggle.bind(this)
    this._handleCopy = this._handleCopy.bind(this)
    this._handleTouch = this._handleTouch.bind(this)
    this._recaptchaRef = this._recaptchaRef.bind(this)
    this._executeCaptcha = this._executeCaptcha.bind(this)
    this._handleToggleVerification = this._handleToggleVerification.bind(this)
    this._handleSubmitVerification = this._handleSubmitVerification.bind(this)
  }

  _handleSubmitVerification () {
    const { product, setCurrentProduct, updateMobileNumbers } = this.props
    const { mobileNumber } = this.state

    setCurrentProduct(product)
    updateMobileNumbers(mobileNumber)
  }

  _handleToggleVerification () {
    this.setState({
      showVerification: !this.state.showVerification
    })
  }

  _recaptchaRef (ref) {
    this.recaptcha = ref
  }

  _executeCaptcha (token) {
    if (token) {
      this.successSubmission = true
      this._handleToggleVerification()
    }
  }

  _handleTouch (e) {
    const { showSlide } = this.state
    if (showSlide) {
      e.preventDefault()
    }
  }

  _handleSubmit ({ value }) {
    this.setState({
      mobileNumber: value
    }, () =>
      ENVIROMENT === 'production' ? this.recaptcha.execute() : this._executeCaptcha(true)
    )
  }

  _handleClose () {
    this.setState({
      modalToggle: false
    })
  }

  _handleToggle = (e) => {
    e.stopPropagation()
    this.props.setToggle()
    this.setState({
      showSlide: !this.state.showSlide
    })
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

  _handleSocialToggle () {
    this.setState({
      socialToggle: !this.state.socialToggle
    })
  }

  _handleCopy () {
    this.setState({
      copied: true
    })
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentDidMount () {
    const { params: { id }, getProduct, getMobileNumbers, getMarkDown } = this.props
    getProduct({ id })
    getMobileNumbers()
    getMarkDown()
  }

  componentWillReceiveProps (nextProps) {
    const { productSuccess, productError, mobileNumbers } = nextProps

    // handle if submission is success
    ifElse(equals(true), this._handleSuccess, noop)(productSuccess)

    // handle if submission is error
    ifElse(equals(true), this._handleError, noop)(productError)

    // handle if theree's mobile number we can use as default
    ifElse((mobile) => mobile.size > 0, this._handleMobileRegistered, noop)(mobileNumbers)

    this.props.setPageTitle('Product Details')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
  }

  render () {
    const { loading, product, toggle, route, windowWidth, markdown, loader } = this.props
    const { modalToggle, prevMobileNumber, showVerification, toggleCheck } = this.state
    const productPageTrigger = route && route
    return (
      <div>
        <Helmet
          title={`ProductPage - ${product.get('title')}`}
        />
        <div>
          <Product
            loading={loading}
            product={product}
            windowWidth={windowWidth}
            popup={this._handleToggle}
            copied={this._handleCopy}
            defaultImage={imageStock('default-slider.jpg')}
            toggle={this.state.socialToggle}
            toggleClick={this._handleSocialToggle}
            productPageTrigger={productPageTrigger}
          />
        </div>
        <div onTouchMove={this._handleTouch}>
          <PopupSlide
            handleCheckAw={this._handleCheck}
            handleDisableAw={this._handleDisable}
            submit={this._handleSubmit}
            modalClose={this._handleClose}
            modalToggle={modalToggle}
            toggle={toggle}
            mobileNumber={prevMobileNumber}
            onClose={this._handleToggle}
            toggleCheck={toggleCheck}
            loader={loader}
            markdown={markdown} />
        </div>
        <div onTouchMove={this._handleTouch}>
          <PopupVerification
            submit={this._handleSubmitVerification}
            modalClose={this._handleClose}
            modalToggle={modalToggle}
            toggle={showVerification}
            mobileNumber={prevMobileNumber}
            onClose={this._handleToggleVerification} />
        </div>
        <RecaptchaWrapper>
          <Recaptcha
            ref={this._recaptchaRef}
            size='invisible'
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={this._executeCaptcha}
          />
        </RecaptchaWrapper>
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
  productError: selectProductError(),
  markdown: selectMarkdown(),
  loader: selectLoadingMarkdown()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: (payload) => dispatch(getProductAction(payload)),
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    updateMobileNumbers: (payload) => dispatch(updateMobileNumbersAction(payload)),
    setToggle: (payload) => dispatch(setToggleAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    getMarkDown: payload => dispatch(getMarkDownAction()),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(ProductPage))
