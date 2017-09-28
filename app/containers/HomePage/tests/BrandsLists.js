import React from 'react'
import { shallow } from 'enzyme'

import BrandsLists from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <BrandsLists {...props} />
)

describe('<BrandsLists />', () => {
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
