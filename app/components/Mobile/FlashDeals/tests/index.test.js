import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import FlashDeals from '../index'

const wrapper = (Component = FlashDeals, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<FlashDeals />', () => {
  const minProps = {
    promo: fromJS([
      {
        fromDate: '2018-03-26 00:00:00',
        id: 9,
        images: [{imageUrl: 'https://thumbnails.cbc.ca/maven_legacy/thumbnails/199/150/1-0.jpg'}],
        name: 'Promo 1',
        productList: [{name: 'Penshoppe Face Towel (Plum)', shortDescription: 'Plum French Terry face towel'}],
        promoCode: '00001',
        thruDate: '2019-12-31 00:00:00',
        totalCount: 15
      }
    ]),
    promosLoading: false,
    promosCount: 1
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(FlashDeals, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
