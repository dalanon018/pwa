import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import RecentStore from '../index'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <RecentStore {...props} />
)

describe('<RecentStore />', () => {
  const minProps = {
    value: fromJS({}),
    handleToggle: () => {},
    windowWidth: 400
  }

  it('render component without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
