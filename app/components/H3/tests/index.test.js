import React from 'react'
import { shallow } from 'enzyme'

import H3 from '../index'

describe('<H3 />', () => {
  const children = 'test'
  it('should render a prop', () => {
    const id = 'testId'
    const renderedComponent = shallow(
      <H3 id={id}>
        {children}
      </H3>
    )
    expect(renderedComponent.prop('id')).toEqual(id)
  })

  it('should render its text', () => {
    const renderedComponent = shallow(
      <H3>
        {children}
      </H3>
    )
    expect(renderedComponent.contains(children)).toBe(false)
  })
})
