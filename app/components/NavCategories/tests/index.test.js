import React from 'react'
import { shallow } from 'enzyme'

import NavCategories from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <NavCategories {...props} />
)

describe('<NavCategories />', () => {
  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<NavCategories />).length).toEqual(1)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
