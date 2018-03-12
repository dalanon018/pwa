import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { BrandLanding } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <BrandLanding {...props}>
    {children}
  </BrandLanding>
)

describe('<BrandLanding />', () => {
  const minProps = {
    setPageTitle: () => {},
    setRouteName: () => {},
    dispatch: () => {},
    brands: fromJS({})
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
