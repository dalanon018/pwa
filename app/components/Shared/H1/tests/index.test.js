import React from 'react'
import { shallow } from 'enzyme'

import H1 from '../index'

describe('<H1 />', () => {
  const children = 'test'

  it('should render a prop', () => {
    const id = 'testId'
    const renderedComponent = shallow(
      <H1 id={id}>
        {children}
      </H1>
    )
    expect(renderedComponent.prop('id')).toEqual(id)
  })

  it('should render its text', () => {
    const renderedComponent = shallow(
      <H1>
        {children}
      </H1>
    )
    expect(renderedComponent.contains(children)).toEqual(true)
  })
})
