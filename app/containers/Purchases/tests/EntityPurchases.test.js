import React from 'react'
import { fromJS } from 'immutable'
import { Grid } from 'semantic-ui-react'
import { shallow } from 'enzyme'
import EntityPurchases from '../EntityPurchases'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <EntityPurchases {...props} />
)

describe('<EntityPurchases />', () => {
  const minProps = {
    changeRoute: () => {},
    windowWidth: 0,
    entity: fromJS([{
      'amount': 590,
      'claimExpiry': '2017-09-27 16:09:20',
      'dateCreated': '2017-09-07 16:09:21',
      'payCode': '9956-4037-2166',
      'products': {
        'cliqqCode': '0004A',
        'image': 'https://cliqq.imgix.net/0004A.png',
        'name': 'Naviforce NF9028 30M Waterproof Analog Watch (Black/Brown/White)'
      },
      'status': 'RESERVED',
      'storeName': 'Kamias',
      'trackingNumber': '337508604184442831'
    }])
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
