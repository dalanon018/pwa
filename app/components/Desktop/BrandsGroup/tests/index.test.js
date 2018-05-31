import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import BrandsGroup, { NavWrapper } from '../index'

const wrapper = (Component = BrandsGroup, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<BrandsGroup />', () => {
  const minProps = {
    brands: fromJS([]),
    bottomScroll: false,
    goToBrand: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(BrandsGroup, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render eight div\'s', () => {
    const renderedComponent = wrapper(BrandsGroup, minProps)
    expect(renderedComponent.find('div').length).toEqual(8)
  })

  it('NavWrapper should render', () => {
    const renderComponent = shallow(<NavWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
