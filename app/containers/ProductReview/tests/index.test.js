import React from 'react'

import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import { Checkbox } from 'semantic-ui-react'
import { ProductReview, ShowCodComponent } from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <ProductReview {...props}>
    {children}
  </ProductReview>
)

describe('<ProductReview />', () => {
  const minProps = {
    getOrderProduct: () => {},
    getStore: () => {},
    setRouteName: () => {},
    storeLocator: () => {},
    getProductCategories: () => {},
    getBlackList: () => {},
    getVisitedStores: () => {},
    getCurrentPoints: () => {},
    pushRoute: () => {},
    changeRoute: () => {},
    isBlackListed: false,
    loader: false,
    orderedProduct: fromJS({
      'product_id': '0001',
      'image': null,
      'title': 'All Day Backpack | (wine)',
      'price': '600',
      'discount': {
        'percent': '25',
        'thru': '2015-04-06 12:00:00'
      },
      'details': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla. Aenean congue libero sed nisl euismod tristique. Integer finibus est orci, nec hendrerit turpis mollis id. Phasellus rhoncus mollis mauris sit amet euismod.',
      'shipping': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dictum eros nec sagittis pretium. Phasellus consectetur metus sed interdum fringilla.',
      'barcode': '718037806839'
    }),
    productLoader: false,
    mobileLoader: false,
    orderSuccess: fromJS({}),
    orderFail: fromJS({}),
    mobileNumber: '999999999',
    orderRequesting: false,
    visitedStores: fromJS({}),
    visitedStoresLoading: false,
    currentPoints: fromJS({ points: 0 }),
    currentPointsLoading: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render <ShowCodComponent/> Checkbox disabled isBlackListed === true', () => {
    const props = {
      isBlackListed: true
    }
    const renderComponent = shallow(<ShowCodComponent {...props} />)
    expect(renderComponent.find(Checkbox).props().disabled).toEqual(true)
  })

  it('should render <ShowCodComponent/> CheckBox if isBlackListed === false', () => {
    const props = {
      isBlackListed: false
    }
    const renderComponent = shallow(<ShowCodComponent {...props} />)
    expect(renderComponent.find(Checkbox).length).toEqual(1)
  })
})
