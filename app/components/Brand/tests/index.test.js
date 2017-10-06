import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import Brand from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <Brand {...props} />
)

describe('<Brand />', () => {
  const minProps = {
    brands: (fromJS([]))
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
