import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import { InfiniteLoading } from '../index'

const Children = () => (<h1> InfiniteLoading </h1>)
const wrapper = (props = {}, enzyme = shallow) => shallow(
  <InfiniteLoading {...props}>
    <Children />
  </InfiniteLoading>
)

describe('<InfiniteLoading />', () => {
  const minProps = {
    isLoading: false,
    lazyload: false,
    results: fromJS([]),
    onScroll: () => {},
    limit: 0
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render children', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(Children).length
    ).toEqual(1)
  })
})
