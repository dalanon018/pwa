import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import CategoriesLists from '../CategoriesLists'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <CategoriesLists {...props} />
)

describe('<CategoriesLists />', () => {
  const minProps = {
    lists: fromJS([])
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
