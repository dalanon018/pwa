import React from 'react'
import { shallow } from 'enzyme'

import { Footer } from '../index'

import { 
  Wrapper,
  HelperLinks,
  CopyRight,
  IconItem,
  CustomItem
 } from '../Wrapper'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <Footer {...props} />
)

describe('<Footer />', () => {
  const minProps = {
    changeRoute: () => {},
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

  it('should render Wrapper', () => {
    const renderComponent = shallow(<Wrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render HelperLinks', () => {
    const renderComponent = shallow(<HelperLinks />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render CopyRight', () => {
    const renderComponent = shallow(<CopyRight />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render IconItem', () => {
    const renderComponent = shallow(<IconItem />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render CustomItem', () => {
    const renderComponent = shallow(<CustomItem />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
