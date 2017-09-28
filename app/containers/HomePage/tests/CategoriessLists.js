import React from 'react'
import { shallow } from 'enzyme'

import CategoriesLists from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <CategoriesLists {...props} />
)

describe('<CategoriesLists />', () => {
  const minProps = {
    lists: []
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
