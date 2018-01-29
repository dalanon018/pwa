import React from 'react'
import { shallow } from 'enzyme'

import ListBlock from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <ListBlock {...props} />
)

describe('<ListBlock />', () => {
  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
