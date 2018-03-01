import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import { InfiniteLoading } from '../index'

const Children = () => (<h1> InfiniteLoading </h1>)
const wrapper = (props = {}, enzyme = shallow) => shallow(
  <InfiniteLoading {...props}>
    {() => (
      <Children />
    )}
  </InfiniteLoading>
)

describe('<InfiniteLoading />', () => {
  const minProps = {
    // to check if we are currently loading
    isLoading: false,
    // to check if we still need to scroll
    // we need there are still data to be fetched
    hasMoreData: false,
    // callback on scroll
    loadMoreData: () => {},
    // children to load
    children: () => {},
    results: fromJS([]),
    // total row count
    rowCount: 0
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render InfiniteLoader', () => {
    const renderComponent = wrapper(minProps)

    expect(
      renderComponent.find('InfiniteLoader').length
    ).toEqual(1)
  })
})
