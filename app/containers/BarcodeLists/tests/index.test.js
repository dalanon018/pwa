import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { BarcodeLists } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <BarcodeLists {...props}>
    {children}
  </BarcodeLists>
)

describe('<BarcodesList />', () => {
  const minProps = {
    loaders: false,
    barcodes: fromJS({}),
    getBarcodes: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
