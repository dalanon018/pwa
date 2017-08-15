import React from 'react'
import { shallow } from 'enzyme'

import DesktopHeader from '../index'

import A from 'components/A'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <DesktopHeader {...props} />
)

describe('<DesktopHeader />', () => {
  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('it should render Anchor', () => {
    expect(shallow(<A />).length).toEqual(1)
  })

  it('it should render div tags', () => {
    expect(shallow(<div />).length).toEqual(1)
  })
})
