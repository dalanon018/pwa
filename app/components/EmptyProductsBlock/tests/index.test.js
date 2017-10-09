import React from 'react'
import { shallow } from 'enzyme'

import EmptyProductsBlock from '../index'

const children = (<p> test1 </p>)
const wrapper = (props = {}, enzyme = shallow) => shallow(
  <EmptyProductsBlock {...props} >
    { children }
  </EmptyProductsBlock>
)

describe('<EmptyProductsBlock />', () => {
  const minProps = {
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
