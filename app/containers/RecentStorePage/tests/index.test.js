import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { RecentStorePage } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <RecentStorePage {...props}>
    {children}
  </RecentStorePage>
)

describe('<RecentStorePage />', () => {
  const minProps = {
    setPageTitle: () => {},
    getStore: () => {},
    setRouteName: () => {},
    getVisitedStores: () => {},
    dispatch: () => {},
    visitedStores: fromJS({}),
    visitedStoresLoading: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
