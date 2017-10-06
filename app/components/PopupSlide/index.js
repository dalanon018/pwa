/**
*
* PopupSlide
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components';

import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  compose,
  isNil,
  prop,
  ifElse,
  F
} from 'ramda'

import Button from 'components/Button'
import CloseButton from 'components/CloseButton'
import Input from 'components/InputField'
import Checkbox from 'components/CheckboxField'
import Modal from 'components/PromptModal'
import A from 'components/A'

import BannerBg from 'images/modal-bg-orange.png'
import MobileIcon from 'images/icons/mobile-icon.svg'

import { Image, Label } from 'semantic-ui-react'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TextWrapper,
  PopupContent } from './styles'

export class PopupSlide extends React.PureComponent {
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
    this._setDefaultMobileNumber = this._setDefaultMobileNumber.bind(this)
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

    if (curValue.length <= 10 && this._validateData(curValue)) {
      e.preventDefault()
      this.setState({
        value: e.target.value,
        inputed: this.state.value
      }, () => this._handleDisable())
    }
  }

  _handleDisable () {
    if ((this.state.value.length === 10 && this.state.value.charAt(0) === '9') && this.state.check === true) {
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

  _setDefaultMobileNumber ({ mobileNumber }) {
    this.setState({
      value: mobileNumber
    })
  }

  componentDidMount () {
    const setDefaultMobile = ifElse(
      compose(isNil, prop('mobileNumber')),
      noop,
      this._setDefaultMobileNumber
    )

    setDefaultMobile(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const { mobileNumber } = nextProps

    if (mobileNumber) {
      this._setDefaultMobileNumber(nextProps)
    }
  }

  render () {
    const { toggle, onClose, modalToggle, modalClose } = this.props
    const { value } = this.state

    const checkboxList =
      [
        {
          name: 'checkbox',
          label: (
            <span>
              I have read and accepted the
              <A key={0} onClick={this._goToTermsConditions}> Terms and Conditions</A>
            </span>
          )
        }
      ]

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
              <Label as='span' basic color='grey' size='massive'>
                <FormattedMessage {...messages.phonePrefix} />
              </Label>

              <Input
                type='text'
                value={value}
                onChange={this._handleInput}
                placeholder='9XXXXXXXXX'
                onPaste={F} />
            </InputWrapper>
            {
              checkboxList.map((item, index) =>
                <Checkbox
                  key={index}
                  className='margin__bottom-positive--20'
                  onChange={this._handleCheck}
                  name={item.name}
                  label={item.label} />
              )
            }
            <Button
              disabled={this.state.toggle}
              primary
              onClick={this._handleSubmit}>
                  Submit
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

export default connect(mapStateToProps, mapDispatchToProps)(PopupSlide)
