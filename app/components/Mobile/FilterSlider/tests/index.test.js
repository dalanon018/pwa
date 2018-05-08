import React from 'react'

import { shallow } from 'enzyme'

import FilterSlider, {
  Wrapper,
  OptionWrapper,
  ButtonWrapper,
  FormWrapper,
  BlockWrapper } from '../index'

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

  it('Wrapper should render', () => {
    const renderComponent = shallow(<Wrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('OptionWrapper should render', () => {
    const renderComponent = shallow(<OptionWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ButtonWrapper should render', () => {
    const renderComponent = shallow(<ButtonWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('FormWrapper should render', () => {
    const renderComponent = shallow(<FormWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('BlockWrapper should render', () => {
    const renderComponent = shallow(<BlockWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
