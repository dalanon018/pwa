import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import Registration from '../index'

import {
  PopupContainer,
  InputWrapper,
  TextWrapper,
  TermsConditionsWrapper,
  ButtonWrapper,
  TermsConditionsHeader,
  CaptchaWrapper,
  RegistrationWrapper,
  ContentWrapper,
  BoxWrapper,
  ImageLogo
} from '../styles'

const wrapper = (Component = Registration, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<Registration />', () => {
  const minProps = {
    loadingMarkdown: false,
    submissionLoader: false,
    history: fromJS({}),
    value: 'test',
    check: false,
    markdown: true,
    toggleTerms: false,
    verificationToggle: false,
    disabledButton: false,
    errModalToggle: false,
    errModalName: 'test',
    errorTitle: 'test',
    errorMessage: 'test',

    _handleInput: () => {},
    _toggleTerms: () => {},
    _handlePaste: () => {},
    _handleCheck: () => {},
    _handleSubmit: () => {},
    _handleErrModalClose: () => {},
    _handleSubmitVerification: () => {},
    _closePopupSlide: () => {},
    _executeResendCode: () => {},
    _recaptchaRef: () => {},
    _executeCaptcha: () => {},
    _agreeAction: () => {},
    intl: {
      formatMessage: () => {}
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(Registration, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render five div\'s', () => {
    const renderedComponent = wrapper(Registration, minProps)
    expect(renderedComponent.find('div').length).toEqual(5)
  })

  it('should render PopupContainer', () => {
    const renderComponent = shallow(<PopupContainer />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render InputWrapper', () => {
    const renderComponent = shallow(<InputWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render TextWrapper', () => {
    const renderComponent = shallow(<TextWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render TermsConditionsWrapper', () => {
    const renderComponent = shallow(<TermsConditionsWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ButtonWrapper', () => {
    const renderComponent = shallow(<ButtonWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render TermsConditionsHeader', () => {
    const renderComponent = shallow(<TermsConditionsHeader />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render CaptchaWrapper', () => {
    const renderComponent = shallow(<CaptchaWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render RegistrationWrapper', () => {
    const renderComponent = shallow(<RegistrationWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ContentWrapper', () => {
    const renderComponent = shallow(<ContentWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render BoxWrapper', () => {
    const renderComponent = shallow(<BoxWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ImageLogo', () => {
    const renderComponent = shallow(<ImageLogo />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
