import React from 'react'

import { shallow } from 'enzyme'

import FilterSlider from '../index'

const wrapper = (props = {}, context = {}, enzyme = shallow) => shallow(
  <FilterSlider {...props} />,
  { context }
)

describe('<FilterSlider />', () => {
  const minProps = {
    toggleDrawer: false,
    toggleCategory: '',
    toggleBrands: [],
    selectedCategory: {},
    selectedBrands: [],
    categoriesLoading: false,
    brandsLoading: false
  }

  const context = {
    handleToggleCategory: () => {},
    handleToggleBrands: () => {},
    toggleReset: () => {},
    handleSubmit: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps, context)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
