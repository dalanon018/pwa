import React from 'react'
import { shallow } from 'enzyme'

import H2 from '../index'

describe('<H2 />', () => {
  const children = 'test'
  it('should render a prop', () => {
    const id = 'testId'
    const renderedComponent = shallow(
      <H2 id={id}>
        {children}
      </H2>
    )
    expect(renderedComponent.prop('id')).toEqual(id)
  })

  it('should render its text', () => {
    const renderedComponent = shallow(
      <H2>
        {children}
      </H2>
    )
    expect(renderedComponent.contains(children)).toEqual(true)
  })
})
