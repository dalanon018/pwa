import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import Brand, { BrandWrapper } from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <Brand {...props} />
)

describe('<Brand />', () => {
  const minProps = {
    brands: (fromJS([])),
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('BrandWrapper should render', () => {
    const renderComponent = shallow(<BrandWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
