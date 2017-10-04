import React from 'react'
import { shallow } from 'enzyme'

import ChildAccordion from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <ChildAccordion {...props} />
)

describe('<ChildAccordion />', () => {
  const minProps = {
    title: 'Test'
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
