import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import BrandsLists from '../BrandsLists'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <BrandsLists {...props} />
)

describe('<BrandsLists />', () => {
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
