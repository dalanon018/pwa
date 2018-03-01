import React from 'react'
import { shallow } from 'enzyme'

import H4 from '../index'

describe('<H4 />', () => {
  const children = 'test'

  it('should render a prop', () => {
    const id = 'testId'
    const renderedComponent = shallow(
      <H4 id={id}>
        {children}
      </H4>
    )
    expect(renderedComponent.prop('id')).toEqual(id)
  })

  it('should render its text', () => {
    const renderedComponent = shallow(
      <H4>
        {children}
      </H4>
    )
    expect(renderedComponent.contains(children)).toEqual(true)
  })
})
