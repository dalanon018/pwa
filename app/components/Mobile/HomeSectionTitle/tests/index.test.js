import React from 'react'
import { shallow } from 'enzyme'

import { HomeSectionTitle } from '../index'

const wrapper = (Component = HomeSectionTitle, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<HomeSectionTitle />', () => {
  const minProps = {
    changeRoute: () => {},
    title: 'Test Title',
    linkLabel: 'Test Link Label'
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(HomeSectionTitle, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
