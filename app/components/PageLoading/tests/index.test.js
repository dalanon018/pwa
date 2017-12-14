import React from 'react'
import { render } from 'enzyme'

import PageLoading from '../index'

describe('<PageLoading />', () => {
  it('should render without exploding', () => {
    const renderedComponent = render(
      <PageLoading />
    )
    expect(renderedComponent.length).toEqual(1)
  })
})
