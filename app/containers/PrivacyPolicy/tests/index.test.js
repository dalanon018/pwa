import React from 'react'
import { shallow } from 'enzyme'

import { PrivacyPolicy } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <PrivacyPolicy {...props}>
    {children}
  </PrivacyPolicy>
)

describe('<PrivacyPolicy />', () => {
  const minProps = {
    markdown: '# Lorem ipsum ## dolor sit amet, consectetur adipisicing elit. Vel architecto at necessitatibus voluptas harum explicabo vitae repudiandae facere, soluta assumenda sint sapiente atque ut magni aperiam earum tenetur ullam velit.',
    getMarkDown: () => {},
    dispatch: () => {},
    loading: false
  }
  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
