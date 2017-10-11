/**
 * Testing our Product View component
 */

import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import Product from '../index'

const children = 'Test'
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Product {...props}>
    {children}
  </Product>
)

describe('<Product />', () => {
  const minProps = {
    product: fromJS({
      'cliqqCode': ['00001', '11111', '06525'],
      'image': null,
      'title': 'All Day Backpack | (wine)',
      'price': '600',
      'discount': {
        'percent': '25',
        'thru': '2015-04-06 12:00:00'
      },
      'details': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla. Aenean congue libero sed nisl euismod tristique. Integer finibus est orci, nec hendrerit turpis mollis id. Phasellus rhoncus mollis mauris sit amet euismod.',
      'deliveryPromiseMessage': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla.',
      'barcode': '718037806839'
    }),
    loading: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
