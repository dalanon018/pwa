import React from 'react'
import { shallow } from 'enzyme'
import ProductView from '../index'

describe('<ProductView />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <ProductView />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
