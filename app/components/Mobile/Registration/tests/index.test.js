import React from 'react'
import { shallow } from 'enzyme'

import Registration from '../index'
import {
  PopupWrapper,
  TextWrapper,
  PopupContainer,
  BannerHeader,
  InputWrapper,
  PopupContent,
  TermsConditionsWrapper,
  ButtonWrapper,
  TermsConditionsHeader,
  ModalContentWrapper,
  Wrapper
} from '../styles'

const wrapper = (Component = Registration, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<Registration />', () => {
  const minProps = {
    loadingMarkdown: false,
    submissionLoader: false,
    history: {},
    value: 'Lorem ipsum dolor sit amet',
    markdown: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    toggleTerms: true,
    verificationToggle: false,
    disabledButton: false,
    errModalToggle: false,
    errModalName: 'Lorem Ipsum',

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
    _agreeAction: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(Registration, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render PopupWrapper', () => {
    const renderComponent = shallow(<PopupWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render TextWrapper', () => {
    const renderComponent = shallow(<TextWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render PopupContainer', () => {
    const renderComponent = shallow(<PopupContainer {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render BannerHeader', () => {
    const renderComponent = shallow(<BannerHeader {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render InputWrapper', () => {
    const renderComponent = shallow(<InputWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render PopupContent', () => {
    const renderComponent = shallow(<PopupContent {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render TermsConditionsWrapper', () => {
    const renderComponent = shallow(<TermsConditionsWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ButtonWrapper', () => {
    const renderComponent = shallow(<ButtonWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render TermsConditionsHeader', () => {
    const renderComponent = shallow(<TermsConditionsHeader {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ModalContentWrapper', () => {
    const renderComponent = shallow(<ModalContentWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render Wrapper', () => {
    const renderComponent = shallow(<Wrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render a div', () => {
    const renderedComponent = shallow(
      <Registration {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(3)
  })
})
