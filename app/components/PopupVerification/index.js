/**
*
* PopupSlideVerification
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components';

import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'
import { push } from 'react-router-redux'
import {
  F
} from 'ramda'

import CloseButton from 'components/CloseButton'
import Input from 'components/InputField'
import Modal from 'components/PromptModal'

import BannerBg from 'images/modal-bg-lightgrey.png'
import MobileIcon from 'images/icons/mobile-icon.svg'
import ResendIcon from 'images/test-images/v2/Mail.svg'

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
    modalClose: PropTypes.func,
    modalToggle: PropTypes.bool,
    mobileNumber: PropTypes.string,
    changeRoute: PropTypes.func
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

    if (curValue.length <= 6 && this._validateData(curValue)) {
      e.preventDefault()
      this.setState({
        value: e.target.value,
        inputed: this.state.value
      }, () => this._handleDisable())
    }
  }

  _handleDisable () {
    if (this.state.value.length === 6) {
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

  render () {
    const { toggle, onClose, modalToggle, modalClose } = this.props
    const { value } = this.state

    return (
      <PopupWrapper toggle={toggle}>
        <BannerHeader background={BannerBg}>
          <span>
            <Image alt='Cliqq' src={MobileIcon} />
          </span>
        </BannerHeader>
        <PopupContainer>
          <PopupContent>
            <TextWrapper>
              <Label as='p' basic size='big'>
                <FormattedMessage {...messages.register} />
              </Label>
              <Label as='p' basic color='grey' size='medium'><FormattedMessage {...messages.label} /></Label>
            </TextWrapper>

            <InputWrapper>
              <Input
                type='text'
                value={value}
                onChange={this._handleInput}
                placeholder='XXXXXX'
                onPaste={F} />
            </InputWrapper>

            <ResendWrapper>
              <div className='resend-content'>
                <Image src={ResendIcon} />
                <Label as='span' basic size='large'><FormattedMessage {...messages.resend} /></Label>
              </div>
            </ResendWrapper>

            <Button
              disabled={this.state.toggle}
              primary
              onClick={this._handleSubmit}>
              <FormattedMessage {...messages.submit} />
            </Button>

            <CloseButton close={onClose} text='Close' />
          </PopupContent>
        </PopupContainer>
        <Modal
          open={modalToggle}
          name='remove'
          close={modalClose}
          title='Server Error'
          content='System is under maintenance' />
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
