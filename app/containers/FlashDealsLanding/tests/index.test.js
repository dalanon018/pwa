import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import { FlashDealsLanding } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <FlashDealsLanding {...props}>
    {children}
  </FlashDealsLanding>
)

describe('<FlashDealsLanding />', () => {
  const minProps = {
    setPageTitle: () => {},
    setRouteName: () => {},
    dispatch: () => {},
    categories: fromJS({})
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
