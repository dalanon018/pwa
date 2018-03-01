import React from 'react'
import { shallow } from 'enzyme'
import {
  CategoryBlock,
  BackgroundLay
} from '../styles'

const wrapper = (Component, props = {}, enzyme = shallow) => shallow(
  <Component {...props} />
)

describe('Category Styles', () => {
  it('CategoryBlock should render without exploding', () => {
    const renderComponent = wrapper(CategoryBlock)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('BackgroundLay should render without exploding', () => {
    const renderComponent = wrapper(BackgroundLay)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
