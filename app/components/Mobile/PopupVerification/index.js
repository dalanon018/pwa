/**
*
* PopupSlideVerification
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components';

import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'
import { push } from 'react-router-redux'

import CloseButton from 'components/Shared/CloseButton'
import Input from 'components/Shared/InputField'

import BannerBg from 'images/modal-bg-lightgrey.png'
import MobileIcon from 'images/icons/mobile-icon.svg'
import ResendIcon from 'images/icons/resend.svg'

import { Image, Label, Button } from 'semantic-ui-react'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TextWrapper,
  ResendWrapper,
  PopupContent } from './styles'

export class PopupVerification extends React.PureComponent {
  static propTypes = {
    submit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func,
    resendCode: PropTypes.func.isRequired
  }

  state = {
    value: '',
    toggle: true,
    check: false
  }

  constructor (props) {
    super(props)

    this._handleInput = this._handleInput.bind(this)
    this._handleCheck = this._handleCheck.bind(this)
    this._handleDisable = this._handleDisable.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
    this._goToTermsConditions = this._goToTermsConditions.bind(this)
    this._validateData = this._validateData.bind(this)
  }

  _goToTermsConditions () {
    this.props.changeRoute('/terms-conditions')
  }

  _handleCheck (e, data) {
    this.setState({
      check: data.checked
    }, () => this._handleDisable())
  }

  _validateData (data) {
    let lastIndex = data.length - 1
    let lastChar = data[lastIndex] === undefined ? '' : data[lastIndex]
    return !isNaN(lastChar) && lastChar !== ' '
  }

  _handleInput (e) {
    let curValue = e.target.value

    if (curValue.length <= 4 && this._validateData(curValue)) {
      e.preventDefault()
      this.setState({
        value: e.target.value,
        inputed: this.state.value
      }, () => this._handleDisable())
    }
  }

  _handleDisable () {
    if (this.state.value.length === 4) {
      this.setState({
        toggle: false
      })
    } else {
      this.setState({
        toggle: true
      })
    }
  }

  _handleSubmit () {
    const { value } = this.state
    this.props.submit({
      value
    })
  }

  _handlePaste = (e, data) => {
    const pastedValue = e.clipboardData.getData('Text')
    const regexp = /^-?\d+?\d*$/

    if (regexp.test(pastedValue) === false) {
      e.preventDefault()
      window.alert('You are not able to paste text with letters or special characters.')
    }
    if (pastedValue.length > 4) {
      e.preventDefault()
      window.alert('Larger than 4 digits is not allowed.')
    }
  }

  render () {
    const { toggle, onClose, resendCode, submissionLoader } = this.props
    const { value } = this.state

    return (
      <PopupWrapper toggle={toggle} className='background__white'>
        <BannerHeader background={BannerBg}>
          <span className='background__teal'>
            <Image alt='CLiQQ' src={MobileIcon} />
          </span>
        </BannerHeader>
        <PopupContainer>
          <PopupContent>
            <TextWrapper>
              <Label as='p' basic size='huge' className='text__weight--500'>
                <FormattedMessage {...messages.register} />
              </Label>
              <Label as='p' basic size='large' className='text__weight--400'><FormattedMessage {...messages.label} /></Label>
            </TextWrapper>

            <InputWrapper>
              <Input
                type='tel'
                value={value}
                onChange={this._handleInput}
                placeholder='XXXX'
                onPaste={this._handlePaste} />
            </InputWrapper>

            <ResendWrapper>
              <div className='resend-content' onClick={resendCode}>
                <Image src={ResendIcon} />
                <Label as='span' basic size='medium' className='color__primary'><FormattedMessage {...messages.resend} /></Label>
              </div>
            </ResendWrapper>

            <Button
              disabled={this.state.toggle}
              loading={submissionLoader}
              fluid
              primary
              onClick={this._handleSubmit}>
              <FormattedMessage {...messages.submit} />
            </Button>

            <CloseButton close={onClose} text='Cancel' />
          </PopupContent>
        </PopupContainer>
      </PopupWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({

})

function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupVerification)
