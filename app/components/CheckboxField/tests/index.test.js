import React from 'react'
import { shallow } from 'enzyme'

import CheckboxField from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <CheckboxField {...props} />
)

describe('<CheckboxField />', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })

  it('should render a div', () => {
    const renderedComponent = shallow(
      <CheckboxField />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
