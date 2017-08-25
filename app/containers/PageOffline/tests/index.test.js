import React from 'react'
import { shallow } from 'enzyme'

import PageOffline from '../index'
import OtherPage from 'components/OtherPage'

describe('<PageOffline />', () => {
  const minProps = {
    message: () => {}
  }

  it('should render a OtherPage component', () => {
    const renderedComponent = shallow(
      <PageOffline {...minProps} />
    )
    expect(renderedComponent.find(OtherPage).length).toEqual(1)
  })
})
