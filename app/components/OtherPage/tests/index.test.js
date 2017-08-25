import React from 'react'
import { shallow } from 'enzyme'

import OtherPage from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <OtherPage {...props} />
)

describe('<OtherPage />', () => {
  const renderComponent = wrapper()
  it('render without exploding', () => {
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
