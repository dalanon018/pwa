import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import SearchResult from '../index'

const wrapper = (Component = SearchResult, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<SearchResult />', () => {
  const minProps = {
    product: fromJS({}),
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(SearchResult, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should not render a div', () => {
    const renderedComponent = wrapper(SearchResult, minProps)
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
