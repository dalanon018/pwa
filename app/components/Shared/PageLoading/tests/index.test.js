import React from 'react'
import { shallow } from 'enzyme'

import PageLoading from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <PageLoading {...props} />
)

describe('<PageLoading />', () => {
  const minProps = {
    intl: {
      formatMessage: () => {}
    }
  }
  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
