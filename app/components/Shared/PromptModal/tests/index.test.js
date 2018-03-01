import React from 'react'
import { shallow } from 'enzyme'

import PromptModal from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <PromptModal {...props} />
)

describe('<PromptModal />', () => {
  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<PromptModal />).length).toEqual(1)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
