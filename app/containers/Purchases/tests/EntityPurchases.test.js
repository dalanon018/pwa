import React from 'react'

import { Grid } from 'semantic-ui-react'
import { shallow } from 'enzyme'
import EmptyPurchases from '../EmptyPurchases'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <EmptyPurchases {...props} />
)

describe('<EmptyPurchases />', () => {
  const minProps = {
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('render with grid', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.find(Grid).length
    ).toEqual(1)
  })
})
