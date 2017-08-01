import React from 'react'
import { shallow } from 'enzyme'

import ModalWithHeader from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <ModalWithHeader {...props} />
)

describe('<ModalWithHeader />', () => {
  it('should not render a div', () => {
    const renderedComponent = shallow(
      <ModalWithHeader />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('should render a modal', () => {
    const renderedComponent = shallow(
      <ModalWithHeader />
    )
    expect(renderedComponent.find('Modal').length).toEqual(1)
  })

  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
