/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import Recaptcha from 'react-google-recaptcha'

import { FormattedMessage } from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { noop } from 'lodash'
import { ifElse, both, equals, complement, partial } from 'ramda'

import { imageStock } from 'utils/image-stock'

import Product from 'components/Product'
import PopupSlide from 'components/PopupSlide'
import PopupVerification from 'components/PopupVerification'
import WindowWidth from 'components/WindowWidth'
import Modal from 'components/PromptModal'

import messages from './messages'

import {
  selectLoader,
  selectProduct,
  selectMobileNumbers,
  selectProductSuccess,
  selectProductError,
  selectMarkdown,
  selectLoadingMarkdown,
  selectMobileRegistrationSuccess,
  selectMobileRegistrationError,
  selectVerificationCodeSuccess,
  selectVerificationCodeError,
  selectLoyaltyToken
} from './selectors'

import {
  getProductAction,
  setCurrentProductAction,
  getMobileNumbersAction,
  updateMobileNumbersAction,
  setProductHandlersDefaultAction,
  getMarkDownAction,
  setVerificationCodeAction,
  requestMobileRegistrationAction,
  requestVerificationCodeAction,
  resetSubmissionAction,
  getLoyaltyTokenAction
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

export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    setHandlersDefault: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    toggle: PropTypes.bool.isRequired,
    productSuccess: PropTypes.bool.isRequired,
    productError: PropTypes.bool.isRequired,
    mobileNumbers: PropTypes.object.isRequired,
    mobileRegistrationSuccess: PropTypes.bool,
    mobileRegistrationError: PropTypes.string,
    loyaltyToken: PropTypes.string
  }

  /**
   * this will handle if success is valid after verification code
   */
  successSubmission = false

  /**
   * this will handle if success is valid on verification code.
   */
  successVerificationSubmission = false

    /**
   * this will handle if success is valid after mobile Registration Submission
   */
  mobileSuccessSubmission = false

  /**
   * this will handle if resend code was sent since we want to show a successful message to the user.
   */
  resendCodeSuccessSubmission = false

  constructor () {
    super()
    this.state = {
      modalToggle: false,
      prevMobileNumber: null,
      verificationCode: '',
      socialToggle: false,
      copied: false,
      showSlide: false,
      showVerification: false,
      mobileNumber: '',
      errModalToggle: false,
      errorMessage: ''
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
    this._handleFactoryToggleLoyaltyToken = this._handleFactoryToggleLoyaltyToken.bind(this)
    this._handleToggleVerification = this._handleToggleVerification.bind(this)
    this._handleSubmitVerification = this._handleSubmitVerification.bind(this)
    this._handleSuccessVerificationCode = this._handleSuccessVerificationCode.bind(this)
  }

  _handleSubmitVerification ({ value }) {
    this.successVerificationSubmission = true
    const { mobileNumber } = this.state
    const { requestVerificationCode } = this.props

    requestVerificationCode({
      mobileNumber,
      code: value
    })

    this.props.setToggle()
    this._handleCustomBody()
  }

  _handleSuccessVerificationCode = () => {
    const { product, setCurrentProduct, updateMobileNumbers } = this.props
    const { mobileNumber } = this.state

    this.successSubmission = true
    this.successVerificationSubmission = false

    setCurrentProduct(product)
    updateMobileNumbers(mobileNumber)
  }

  _handleToggleVerification () {
    this.setState({
      showVerification: !this.state.showVerification
    })
    this.mobileSuccessSubmission = false
  }

  /**
   * once our resend code is successful we want to make sure that we show the success message to the user.
   */
  _handleSuccessResendVerificationCode = () => {
    this.setState({
      errModalToggle: true,
      errorMessage: <FormattedMessage {...messages.successResendCode} />
    })
    this.resendCodeSuccessSubmission = false
  }

  _recaptchaRef (ref) {
    this.recaptcha = ref
  }

  _executeSendCode = () => {
    const { mobileNumber } = this.state

    this.props.requestmobileRegistration(mobileNumber)
  }

  _executeResendCode = () => {
    this.resendCodeSuccessSubmission = true
    this._executeSendCode()
  }

  _executeCaptcha (token) {
    if (token) {
      this.mobileSuccessSubmission = true
      this._executeSendCode()
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
    }, () => {
      ENVIROMENT === 'production' ? this.recaptcha.execute() : this._executeCaptcha(true)
    })
  }

  _handleClose () {
    this.setState({
      modalToggle: false
    })
  }

  _handleErrModalClose = () => {
    this.setState({
      errModalToggle: false
    })
  }

  _closePopupSlide = (e) => {
    this.recaptcha.reset()
    this._handleToggleVerification(e)
  }

  // on submission we check if we can proceed to product review since we already have loyaltyToken defined.
  _handleFactoryToggleLoyaltyToken = (event) => {
    const { product, loyaltyToken, setCurrentProduct, updateMobileNumbers, mobileNumbers, changeRoute } = this.props
    const gotoReview = () => {
      setCurrentProduct(product)
      updateMobileNumbers(mobileNumbers.last())

      changeRoute('/review')
    }

    const handleLoyaltyToken = ifElse(
      equals(null),
      partial(this._handleToggle, [event]),
      gotoReview
    )

    return handleLoyaltyToken(loyaltyToken)
  }

  _handleToggle = (event) => {
    event.stopPropagation()
    const { showSlide } = this.state
    this.props.setToggle()

    this.setState({
      showSlide: !showSlide
    })

    this._handleCustomBody()
  }

  _handleCustomBody = () => {
    const { showSlide } = this.state
    const elem = document.getElementsByTagName('body')[0]

    if (!showSlide) {
      elem.classList.add('custom__body')
    } else {
      elem.classList.remove('custom__body')
    }
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

  _handleErrorMobileRegistration = (error) => {
    this.setState({
      errModalToggle: true,
      errorMessage: error
    })

    // we need to reset our data from the store so it won't show always.
    this.props.resetSubmission()
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

  componentWillMount () {
    this.props.setPageTitle('Product Details')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    const { params: { id }, getProduct, getMobileNumbers, getMarkDown, getLoyaltyToken } = this.props

    getLoyaltyToken()
    getProduct({ id })
    getMobileNumbers()
    getMarkDown()
  }

  componentWillUnmount () {
    const { toggle, setToggle } = this.props

    const closePopupSlideToggle = ifElse(equals(true), setToggle, noop)
    const elem = document.getElementsByTagName('body')[0]
    const removeCustomBodyClass = ifElse(equals(2), () => elem.classList.remove('custom__body'), noop)

    this.props.setHandlersDefault()
    this.props.resetSubmission()

    closePopupSlideToggle(toggle)
    removeCustomBodyClass(elem.classList.length)
  }

  componentWillReceiveProps (nextProps) {
    const { productSuccess, productError, mobileNumbers, mobileRegistrationError, mobileRegistrationSuccess, verificationCodeSuccess, verificationCodeError } = nextProps

    // handle if submission is success
    ifElse(equals(true), this._handleSuccess, noop)(productSuccess)

    // handle if submission is error
    ifElse(equals(true), this._handleError, noop)(productError)

    // handle if mobile registration is success
    ifElse(both(equals(true), () => this.mobileSuccessSubmission), this._handleToggleVerification, noop)(mobileRegistrationSuccess)

    // handle if resend verification code is successful
    ifElse(both(equals(true), () => this.resendCodeSuccessSubmission), this._handleSuccessResendVerificationCode, noop)(mobileRegistrationSuccess)

    // handle if mobile registration is error
    ifElse(complement(equals(null)), this._handleErrorMobileRegistration, noop)(mobileRegistrationError)

    // handle if verification code is success
    ifElse(both(equals(true), () => this.successVerificationSubmission), this._handleSuccessVerificationCode, noop)(verificationCodeSuccess)

    // handle if verification code is error
    ifElse(complement(equals(null)), this._handleErrorMobileRegistration, noop)(verificationCodeError)

    // handle if theree's mobile number we can use as default
    ifElse((mobile) => mobile.size > 0, this._handleMobileRegistered, noop)(mobileNumbers)
  }

  render () {
    const { loading, product, toggle, route, windowWidth, markdown, loader, changeRoute } = this.props
    const { modalToggle, prevMobileNumber, showVerification, errModalToggle, errorMessage } = this.state
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
            popup={this._handleFactoryToggleLoyaltyToken}
            copied={this._handleCopy}
            defaultImage={imageStock('default-slider.jpg')}
            toggle={this.state.socialToggle}
            toggleClick={this._handleSocialToggle}
            productPageTrigger={productPageTrigger}
            changeRoute={changeRoute}
          />
        </div>
        <div>
          <PopupSlide
            recaptcha={
              <Recaptcha
                ref={this._recaptchaRef}
                size='invisible'
                badge='inline'
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={this._executeCaptcha}
              />
            }
            handleCheckAw={this._handleCheck}
            handleDisableAw={this._handleDisable}
            submit={this._handleSubmit}
            modalClose={this._handleClose}
            modalToggle={modalToggle}
            toggle={toggle}
            mobileNumber={prevMobileNumber}
            onClose={this._handleToggle}
            loader={loader}
            markdown={markdown} />
        </div>
        <div onTouchMove={this._handleTouch}>
          <PopupVerification
            submit={this._handleSubmitVerification}
            modalClose={this._handleClose}
            modalToggle={modalToggle}
            toggle={showVerification}
            onClose={this._closePopupSlide}
            resendCode={this._executeResendCode}
          />
        </div>

        <Modal
          open={errModalToggle}
          name='warning'
          title={errorMessage}
          content=''
          close={this._handleErrModalClose}
        />
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
  loader: selectLoadingMarkdown(),
  mobileRegistrationSuccess: selectMobileRegistrationSuccess(),
  mobileRegistrationError: selectMobileRegistrationError(),
  verificationCodeSuccess: selectVerificationCodeSuccess(),
  verificationCodeError: selectVerificationCodeError(),
  loyaltyToken: selectLoyaltyToken()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: (payload) => dispatch(getProductAction(payload)),
    getLoyaltyToken: () => dispatch(getLoyaltyTokenAction()),
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    updateMobileNumbers: (payload) => dispatch(updateMobileNumbersAction(payload)),
    setToggle: (payload) => dispatch(setToggleAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    getMarkDown: payload => dispatch(getMarkDownAction()),
    setVerificationCode: payload => dispatch(setVerificationCodeAction(payload)),
    requestmobileRegistration: payload => dispatch(requestMobileRegistrationAction(payload)),
    requestVerificationCode: payload => dispatch(requestVerificationCodeAction(payload)),
    resetSubmission: () => dispatch(resetSubmissionAction()),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(ProductPage))
