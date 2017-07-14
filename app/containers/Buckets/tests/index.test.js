import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { Buckets } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Buckets {...props}>
    {children}
  </Buckets>
)

describe('<Buckets />', () => {
  const minProps = {
    children: {},
    categories: fromJS({}),
    getCategories: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
