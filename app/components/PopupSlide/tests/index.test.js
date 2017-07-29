import React from 'react'
import { shallow } from 'enzyme'

import PopupSlide from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <PopupSlide {...props} />
)

describe('<PopupSlide />', () => {
  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<PopupSlide />).length).toEqual(1)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})