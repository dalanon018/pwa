import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import FilterTrigger from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <FilterTrigger {...props} />
)

describe('<FilterTrigger />', () => {
  const minProps = {
    parentId: '1',
    getFilterCategories: () => {},
    requestFromFilter: () => {},
    getFilterBrands: () => {},
    filterCategories: fromJS({}),
    filterBrands: fromJS({}),
    filterCategoriesLoading: false,
    filterBrandsLoading: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
