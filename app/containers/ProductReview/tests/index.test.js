import React from 'react'
import { shallow } from 'enzyme'

import { ProductReview } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <ProductReview {...props}>
    {children}
  </ProductReview>
)

describe('<ProductReview />', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })

  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
