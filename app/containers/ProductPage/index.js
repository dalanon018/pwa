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
import { ifElse, both, equals, complement, partial, isEmpty } from 'ramda'

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
  selectToggle
} from './selectors'

import {
  setToggleAction,
  getProductAction,
  setCurrentProductAction,
  getMobileNumbersAction,
  updateMobileNumbersAction,
  setProductHandlersDefaultAction,
  getMarkDownAction,
  requestMobileRegistrationAction,
  requestVerificationCodeAction,
  resetSubmissionAction
} from './actions'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectLoyaltyToken
} from 'containers/Buckets/selectors'

import {
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

  /**
   * this will handle to let our app know that we submit the recaptcha
   */
  recaptchaSuccessSubmission = false

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
      errModalName: 'warning',
      errorTitle: '',
      errorMessage: ''
    }
  }

  _handleSubmitVerification = ({ value }) => {
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

  _handleSuccessMobileRegistration = () => {
    this.setState({
      errModalToggle: true,
      errorTitle: <FormattedMessage {...messages.successSendCodeTitle} />,
      errModalName: 'checkmark',
      errorMessage: <FormattedMessage {...messages.successSendCode} />
    })

    this._handleToggleVerification()
  }
  _handleToggleVerification = () => {
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
      errorTitle: <FormattedMessage {...messages.successResendCode} />,
      errModalName: 'warning',
      errorMessage: ''
    })
    this.resendCodeSuccessSubmission = false
  }

  _recaptchaRef = (ref) => {
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

  _executeCaptcha = (token) => {
    const tokenEmptyChecker = ifElse(isEmpty, noop, () => {
      this.mobileSuccessSubmission = true
      this._executeSendCode()
    })

    tokenEmptyChecker(token)
  }

  _handleTouch = (e) => {
    const { showSlide } = this.state
    const showSlideEmptyChecker = ifElse(isEmpty, noop, () => e.preventDefault())

    showSlideEmptyChecker(showSlide)
  }

  _handleSubmit = ({ value }) => {
    this.setState({
      mobileNumber: value
    })

    this.recaptcha.execute()
  }

  _handleClose = () => {
    this.setState({
      modalToggle: false
    })
  }

  _handleErrModalClose = () => {
    this.setState({
      errModalToggle: false,
      showSlide: false
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
    const elem = document.getElementsByTagName('body')[0].classList
    const toggleCustomBody = ifElse(equals(false), () => elem.add('custom__body'), () => elem.remove('custom__body'))

    toggleCustomBody(showSlide)
  }

  _handleSuccess = () => {
    const { changeRoute } = this.props
    const successSubmissionChecker = ifElse(equals(true), () => {
      this._handleClose()
      this.successSubmission = false
      changeRoute('/review')
    }, noop)

    successSubmissionChecker(this.successSubmission)
  }

  _handleError = () => {
    const successSubmissionChecker = ifElse(equals(true), () => {
      this.setState({
        modalToggle: true
      })
      this.successSubmission = false
    })

    successSubmissionChecker(this.successSubmission)
  }

  _handleErrorMobileRegistration = (error) => {
    this.setState({
      errModalToggle: true,
      errorTitle: error,
      errModalName: 'warning',
      errorMessage: ''
    })

    // we need to reset our data from the store so it won't show always.
    this.props.resetSubmission()
  }

  _handleMobileRegistered = (mobileNumbers) => {
    this.setState({
      prevMobileNumber: mobileNumbers.last()
    })
  }

  _handleSocialToggle = () => {
    this.setState({
      socialToggle: !this.state.socialToggle
    })
  }

  _handleCopy = () => {
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
    const { params: { id }, getProduct, getMobileNumbers, getMarkDown } = this.props

    getProduct({ id })
    getMobileNumbers()
    getMarkDown()
  }

  componentWillUnmount () {
    const { toggle, setToggle } = this.props

    const closePopupSlideToggle = ifElse(equals(true), setToggle, noop)
    const elem = document.getElementsByTagName('body')[0].classList
    const removeCustomBodyClass = ifElse(equals(2), () => elem.remove('custom__body'), noop)

    this.props.setHandlersDefault()
    this.props.resetSubmission()

    closePopupSlideToggle(toggle)
    removeCustomBodyClass(elem.length)
  }

  componentWillReceiveProps (nextProps) {
    const { productSuccess, productError, mobileNumbers, mobileRegistrationError, mobileRegistrationSuccess, verificationCodeSuccess, verificationCodeError } = nextProps

    // handle if submission is success
    ifElse(equals(true), this._handleSuccess, noop)(productSuccess)

    // handle if submission is error
    ifElse(equals(true), this._handleError, noop)(productError)

    // handle if mobile registration is success
    ifElse(both(equals(true), () => this.mobileSuccessSubmission),
    this._handleSuccessMobileRegistration, noop)(mobileRegistrationSuccess)

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
    const { modalToggle, prevMobileNumber, showVerification, errModalToggle, errModalName, errorTitle, errorMessage } = this.state
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
          name={errModalName}
          title={errorTitle}
          content={errorMessage}
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
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    updateMobileNumbers: (payload) => dispatch(updateMobileNumbersAction(payload)),
    setToggle: (payload) => dispatch(setToggleAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    getMarkDown: payload => dispatch(getMarkDownAction()),
    requestmobileRegistration: payload => dispatch(requestMobileRegistrationAction(payload)),
    requestVerificationCode: payload => dispatch(requestVerificationCodeAction(payload)),
    resetSubmission: () => dispatch(resetSubmissionAction()),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(ProductPage))
