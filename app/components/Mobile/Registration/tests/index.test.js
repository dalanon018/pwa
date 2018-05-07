import React from 'react'
import { shallow } from 'enzyme'

import Registration from '../index'

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
})
