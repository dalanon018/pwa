import React from 'react'
import { shallow } from 'enzyme'

import { PopupVerification } from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <PopupVerification {...props} />
)

describe('<PopupVerification />', () => {
  const minProps = {
    submit: () => {},
    onClose: () => {},
    modalClose: () => {},
    changeRoute: () => {},
    modalToggle: false,
    toggle: false,
    mobileNumber: '9123456780'
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
