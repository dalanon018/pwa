import React from 'react'
import Recaptcha from 'react-google-recaptcha'

import { shallow } from 'enzyme'
import { LoginPage } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <LoginPage {...props}>
    {children}
  </LoginPage>
)

describe('<LoginPage />', () => {
  const minProps = {
    authenticating: false,
    isLogin: () => {},
    getMarkDown: () => {},
    getMobileNumbers: () => {},
    mobileNumbers: {},
    markdown: '',
    loadingMarkdown: false,
    mobileRegistrationSuccess: false,
    mobileRegistrationError: null,
    recaptchaValidationSuccess: false,
    recaptchaValidationError: null,
    verificationCodeSuccess: false,
    verificationCodeError: null,
    requestmobileRegistration: () => {},
    requestRecaptchaValidation: () => {},
    requestVerificationCode: () => {},
    resetSubmission: () => {},
    history: {
      goBack () {}
    }
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders one <Recaptcha/> custom component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(Recaptcha)).toHaveLength(1)
  })
})
