import React from 'react'
import { shallow } from 'enzyme'

import { Footer } from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <Footer {...props} />
)

describe('<Footer />', () => {
  const minProps = {
    changeRoute: () => {}
  }
  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
