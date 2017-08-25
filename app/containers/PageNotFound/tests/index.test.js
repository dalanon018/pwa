import React from 'react'
import { shallow } from 'enzyme'

import PageNotFound from '../index'
import OtherPage from 'components/OtherPage'

describe('<PageNotFound />', () => {
  const minProps = {
    message: () => {}
  }
  it('should render a OtherPage component', () => {
    const renderedComponent = shallow(
      <PageNotFound {...minProps} />
    )
    expect(renderedComponent.find(OtherPage).length).toEqual(1)
  })
})
