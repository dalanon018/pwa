import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { SearchPage } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <SearchPage {...props}>
    {children}
  </SearchPage>
)

describe('<SearchPage />', () => {
  const minProps = {
    product: fromJS({}),
    loading: false,
    getProduct: () => {},
    setCurrentProduct: () => {},
    changeRoute: () => {},
    setHandlersDefault: () => {},
    toggle: false,
    productSuccess: false,
    productError: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
