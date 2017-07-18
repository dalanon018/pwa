import React from 'react'
import { shallow } from 'enzyme'

import Footer from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <Footer {...props} />
)

describe('<Footer />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(
      <Footer />
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
