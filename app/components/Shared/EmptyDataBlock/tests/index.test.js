import React from 'react'
import { shallow } from 'enzyme'

import EmptyDataBlock from '../index'
import { Loader } from 'semantic-ui-react'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <EmptyDataBlock {...props} />
)

describe('<EmptyDataBlock />', () => {
  it('render without exploding', () => {
    const renderComponent = wrapper()
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<EmptyDataBlock />).length).toEqual(1)
  })

  it('renders without exploding', () => {
    expect(shallow(<Loader />).length).toEqual(1)
  })

  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true)
  })
})
