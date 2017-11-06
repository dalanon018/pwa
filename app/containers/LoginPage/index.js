/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react'
import showdown from 'showdown'
import Recaptcha from 'react-google-recaptcha'

import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { isEmpty, noop } from 'lodash'
import {
  both,
  complement,
  compose,
  equals,
  ifElse,
  partial,
  lt,
  prop
} from 'ramda'

import CloseButton from 'components/CloseButton'
import Input from 'components/InputField'
import Checkbox from 'components/CheckboxField'
import Modal from 'components/PromptModal'
import A from 'components/A'
import PopupVerification from 'components/PopupVerification'
import { LoadingStateInfo } from 'components/LoadingBlock'

import BannerBg from 'images/modal-bg-lightgrey.png'
import MobileIcon from 'images/icons/mobile-icon.svg'
import BackIcon from 'images/icons/back.svg'

import { Image, Label, Button, Grid } from 'semantic-ui-react'

import {
  userIsNotAuthenticated
} from 'containers/App/auth'

import {
  RECAPTCHA_SITE_KEY
} from 'containers/App/constants'

import {
  setAuthenticatingAction
} from 'containers/App/actions'

import {
  selectIsAuthenticating
} from 'containers/App/selectors'

import AuthLoader from './AuthLoader'
import messages from './messages'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TextWrapper,
  PopupContent,
  TermsConditionsWrapper,
  ButtonWrapper,
  TermsConditionsHeader
} from './styles'

import {
  selectMobileNumbers,
  selectMarkdown,
  selectLoadingMarkdown,
  selectMobileRegistrationSuccess,
  selectMobileRegistrationError,
  selectVerificationCodeSuccess,
  selectVerificationCodeError,
  selectRecaptchaValidationSuccess,
  selectRecaptchaValidationError,
  selectSubmissionLoader
} from './selectors'

import {
  isLoginAction,
  getMobileNumbersAction,
  getMarkDownAction,
  requestMobileRegistrationAction,
  requestVerificationCodeAction,
  requestRecaptchaValidationAction,
  resetSubmissionAction
} from './actions'

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    authenticating: PropTypes.bool.isRequired,
    isLogin: PropTypes.func.isRequired,
    getMarkDown: PropTypes.func.isRequired,
    getMobileNumbers: PropTypes.func.isRequired,
    mobileNumbers: PropTypes.object.isRequired,
    markdown: PropTypes.string.isRequired,
    loadingMarkdown: PropTypes.bool.isRequired,
    mobileRegistrationSuccess: PropTypes.bool,
    mobileRegistrationError: PropTypes.string,
    recaptchaValidationSuccess: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    recaptchaValidationError: PropTypes.string,
    verificationCodeSuccess: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    verificationCodeError: PropTypes.string,
    requestmobileRegistration: PropTypes.func.isRequired,
    requestRecaptchaValidation: PropTypes.func.isRequired,
    requestVerificationCode: PropTypes.func.isRequired,
    resetSubmission: PropTypes.func.isRequired
  }

  state = {
    value: '',
    disabledButton: true,
    check: false,
    toggleTerms: false,
    markdown: '',
    verificationToggle: false,
    errModalToggle: false,
    errModalName: 'warning',
    errorTitle: '',
    errorMessage: ''
  }

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

  _recaptchaRef = (ref) => {
    this.recaptcha = ref
  }

  _handleTouch = (e) => {
    e.preventDefault()
  }

  _handleCheck = (e, { checked }) => {
    this.setState({
      check: checked
    }, () => this._handleDisable())
  }

  _agreeAction = (e) => {
    this._handleCheck(e, { checked: true })
    this._toggleTerms()
  }

  _handleDisable = () => {
    if ((this.state.value.length === 10 && this.state.value.charAt(0) === '9') && this.state.check === true) {
      this.setState({
        disabledButton: false
      })
    } else {
      this.setState({
        disabledButton: true
      })
    }
  }

  _handleSubmit = () => this.recaptcha.execute()

  _validateData = (data) => {
    const lastIndex = data.length - 1
    const lastChar = data[lastIndex] === undefined ? '' : data[lastIndex]
    return !isNaN(lastChar) && lastChar !== ' '
  }

  _handleInput = (e) => {
    const value = e.target.value

    if (value.length <= 10 && this._validateData(value)) {
      e.preventDefault()
      this.setState({
        value,
        inputed: this.state.value
      }, () => this._handleDisable())
    }
  }

  _handleMobileRegistered = (mobileNumbers) => {
    this.setState({
      value: mobileNumbers.last()
    })
  }

  _handleToggleVerification = () => {
    this.setState({
      verificationToggle: !this.state.verificationToggle
    })
    this.mobileSuccessSubmission = false
  }

  _closePopupSlide = () => {
    this.recaptcha.reset()
    this._handleToggleVerification()
  }

  _handleErrModalClose = () => {
    this.setState({
      errModalToggle: false
    })
  }

/**
 * Handling happy flow and success process
 */

  _executeSendCode = () => {
    const { value } = this.state
    this.props.requestmobileRegistration(value)
  }

  _executeResendCode = () => {
    this.resendCodeSuccessSubmission = true
    this._executeSendCode()
  }

  _handleRecaptchaValidationSuccess = () => {
    // we need to set this back to false
    this.recaptchaSuccessSubmission = false
    // we need to let them know we are submitting mobile registration
    this.mobileSuccessSubmission = true
    this._executeSendCode()
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

  _handleSubmitVerification = ({ value }) => {
    this.successVerificationSubmission = true
    const { requestVerificationCode } = this.props

    requestVerificationCode({
      mobileNumber: this.state.value,
      code: value
    })
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

/**
 * ------------------------------------
 * Handling Error on Process
 * -----------------------------------
 */

  _handleSetStateErrorMessages = (error) => {
    this.setState({
      errModalToggle: true,
      errorTitle: error,
      errModalName: 'warning',
      errorMessage: ''
    })
    this.props.resetSubmission()
  }

  _handleErrorRecaptchaValidation = (error) => {
    this.recaptchaSuccessSubmission = false

    // we need to reset our recaptcha
    this.recaptcha.reset()
    return this._handleSetStateErrorMessages(error)
  }

  _handleErrorMobileRegistration = (error) => {
    this.mobileSuccessSubmission = false
    return this._handleSetStateErrorMessages(error)
  }

  _handleErrorVerificationCode = (error) => {
    this.successVerificationSubmission = false
    return this._handleSetStateErrorMessages(error)
  }

  _setMarkDownContent = (data) => {
    const converter = new showdown.Converter()
    const html = converter.makeHtml(data)

    this.setState({
      markdown: html
    })
  }

  _executeCaptcha = (token) => {
    const { requestRecaptchaValidation } = this.props
    const tokenEmptyChecker = ifElse(isEmpty, noop,
      (token) => {
        this.recaptchaSuccessSubmission = true
        requestRecaptchaValidation(token)
      }
    )

    tokenEmptyChecker(token)
  }

  _toggleTerms = () => {
    const { toggleTerms } = this.state

    this.setState({
      toggleTerms: !toggleTerms
    })
  }

  componentDidMount () {
    const { getMobileNumbers, getMarkDown } = this.props

    getMobileNumbers()
    getMarkDown()
  }

  componentWillReceiveProps (nextProps) {
    const {
      mobileNumbers, markdown,
      recaptchaValidationSuccess, recaptchaValidationError,
      mobileRegistrationError, mobileRegistrationSuccess,
      verificationCodeError
    } = nextProps
    const { value } = this.state

    // handle if theree's mobile number we can use as default
    const usePrevMobile = ifElse(both(compose(lt(0), prop('size')), partial(equals(''), [value])), this._handleMobileRegistered, noop)

    const setMarkdownContent = ifElse(complement(equals('')), this._setMarkDownContent, noop)

      // handle recaptcha validation  is success
    const handleRecaptchaValidationSuccess = ifElse(both(equals(true), () => this.recaptchaSuccessSubmission),
      this._handleRecaptchaValidationSuccess, noop)
     // handle Recaptcha validation is error
    const handleRecaptchaValidationError = ifElse(both(complement(equals(null)), () => this.recaptchaSuccessSubmission),
     this._handleErrorRecaptchaValidation, noop)

    // handle if mobile registration is success
    const handleSuccessMobileRegistration = ifElse(both(equals(true), () => this.mobileSuccessSubmission),
    this._handleSuccessMobileRegistration, noop)

    // handle if mobile registration is error
    const handleErrorMobileRegistration = ifElse(both(complement(equals(null)), () => this.mobileSuccessSubmission), this._handleErrorMobileRegistration, noop)

    // handle if resend verification code is successful note that we use the same  functionality for mobileRegistration where it send the code to the number entered.
    const handleSuccessResendVerificationCode = ifElse(both(equals(true), () => this.resendCodeSuccessSubmission), this._handleSuccessResendVerificationCode, noop)

        // handle if verification code is error
    const handleErrorVerificationCode = ifElse(both(complement(equals(null)), () => this.successVerificationSubmission), this._handleErrorVerificationCode, noop)

    usePrevMobile(mobileNumbers)
    setMarkdownContent(markdown)

    handleRecaptchaValidationSuccess(recaptchaValidationSuccess)
    handleRecaptchaValidationError(recaptchaValidationError)

    handleSuccessMobileRegistration(mobileRegistrationSuccess)
    handleErrorMobileRegistration(mobileRegistrationError)
    handleSuccessResendVerificationCode(mobileRegistrationSuccess)

    handleErrorVerificationCode(verificationCodeError)
  }

  render () {
    const { loadingMarkdown, submissionLoader } = this.props
    const { value, check, markdown, toggleTerms, verificationToggle, disabledButton, errModalToggle, errModalName, errorTitle, errorMessage } = this.state

    return (
      <div>
        <PopupWrapper className='background__white'>
          <BannerHeader background={BannerBg}>
            <span className='background__smoke-grey border__three-white'>
              <Image alt='Cliqq' src={MobileIcon} />
            </span>
          </BannerHeader>
          <PopupContainer>
            <PopupContent>
              <TextWrapper>
                <Label as='p' basic size='huge' className='color__secondary'>
                  <FormattedMessage {...messages.register} />
                </Label>
                <Label as='p' basic color='grey' size='medium'><FormattedMessage {...messages.label} /></Label>
              </TextWrapper>

              <InputWrapper>
                <Label as='span' basic color='grey' size='massive'>
                  <FormattedMessage {...messages.phonePrefix} />
                </Label>

                <Input
                  type='tel'
                  value={value}
                  onChange={this._handleInput}
                  placeholder='9XXXXXXXXX'
                  onPaste={this._handlePaste} />
              </InputWrapper>
              <Checkbox
                className='margin__bottom-positive--20'
                onChange={this._handleCheck}
                checked={check}
                name='checkbox'
                label={(
                  <span className='checkbox-label'>
                    <FormattedMessage {...messages.checkTermsLabel} />
                    <A key={0} onClick={this._toggleTerms}>
                      <FormattedMessage {...messages.checkTermsLink} />
                    </A>
                  </span>
                )}
              />
              <Button
                disabled={disabledButton}
                loading={submissionLoader}
                primary
                fluid
                onClick={this._handleSubmit}>
                <FormattedMessage {...messages.submitButton} />
              </Button>

              <CloseButton close={browserHistory.goBack} text='Close' />
            </PopupContent>
          </PopupContainer>
          <Modal
            open={errModalToggle}
            name={errModalName}
            title={errorTitle}
            content={errorMessage}
            close={this._handleErrModalClose}
          />

          <PopupVerification
            submit={this._handleSubmitVerification}
            toggle={verificationToggle}
            onClose={this._closePopupSlide}
            submissionLoader={submissionLoader}
            resendCode={this._executeResendCode}
          />

          <Recaptcha
            ref={this._recaptchaRef}
            size='invisible'
            badge='inline'
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={this._executeCaptcha}
          />
        </PopupWrapper>
        <TermsConditionsWrapper toggle={toggleTerms} className='background__white'>
          <div className='document-helper terms-conditions'>
            <Grid padded>
              <TermsConditionsHeader toggle={toggleTerms} className='background__white'>
                <Grid padded>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <div className='back-icon-container'>
                        <Image alt='Cliqq' src={BackIcon} onClick={this._toggleTerms} />
                      </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Label as='span' size='large' className='tc-header-label'>
                        <FormattedMessage {...messages.headerTerms} />
                      </Label>
                    </Grid.Column>
                    <Grid.Column width={3} />
                  </Grid.Row>
                </Grid>
              </TermsConditionsHeader>
              <LoadingStateInfo loading={loadingMarkdown} count='4'>
                <div className='animation-fade tc-content color__grey' dangerouslySetInnerHTML={{__html: markdown}} />
              </LoadingStateInfo>
              <ButtonWrapper toggle={toggleTerms}>
                <Button primary fluid onClick={this._agreeAction}><FormattedMessage {...messages.buttonLabelAgree} /></Button>
              </ButtonWrapper>
            </Grid>
          </div>
        </TermsConditionsWrapper>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  mobileNumbers: selectMobileNumbers(),
  markdown: selectMarkdown(),
  loadingMarkdown: selectLoadingMarkdown(),
  submissionLoader: selectSubmissionLoader(),
  authenticating: selectIsAuthenticating(),
  mobileRegistrationSuccess: selectMobileRegistrationSuccess(),
  mobileRegistrationError: selectMobileRegistrationError(),
  verificationCodeSuccess: selectVerificationCodeSuccess(),
  verificationCodeError: selectVerificationCodeError(),
  recaptchaValidationSuccess: selectRecaptchaValidationSuccess(),
  recaptchaValidationError: selectRecaptchaValidationError()
})

function mapDispatchToProps (dispatch) {
  return {
    setAuthenticating: (payload) => dispatch(setAuthenticatingAction(payload)),
    isLogin: () => dispatch(isLoginAction()),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    getMarkDown: payload => dispatch(getMarkDownAction()),
    requestmobileRegistration: payload => dispatch(requestMobileRegistrationAction(payload)),
    requestRecaptchaValidation: payload => dispatch(requestRecaptchaValidationAction(payload)),
    requestVerificationCode: payload => dispatch(requestVerificationCodeAction(payload)),
    resetSubmission: () => dispatch(resetSubmissionAction()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoader(userIsNotAuthenticated(LoginPage)))
