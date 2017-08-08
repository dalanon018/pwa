import React from 'react'
import { shallow } from 'enzyme'

import PopupSlide from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <PopupSlide {...props} />
)

describe('<PopupSlide />', () => {
  const minProps = {
    submit: () => {},
    onClose: () => {},
    modalClose: () => {},
    modalToggle: false,
    toggle: false,
    mobileNumber: null
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
