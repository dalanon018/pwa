import React from 'react'
import { shallow } from 'enzyme'

import { SectionTitle, Wrapper, LinkWrapper } from '../index'

const wrapper = (Component = SectionTitle, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<SectionTitle />', () => {
  const minProps = {
    changeRoute: () => {},
    title: 'Test Title',
    linkLabel: 'Test Link Label'
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(SectionTitle, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render Wrapper', () => {
    const renderComponent = shallow(<Wrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render LinkWrapper', () => {
    const renderComponent = shallow(<LinkWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
