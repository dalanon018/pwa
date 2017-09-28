import React from 'react'

import { IntlProvider } from 'react-intl'
import { shallow } from 'enzyme'
import Search from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <IntlProvider locale='en'>
    <Search {...props}>
      {children}
    </Search>
  </IntlProvider>
)

describe('<Search />', () => {
  const minProps = {}

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
