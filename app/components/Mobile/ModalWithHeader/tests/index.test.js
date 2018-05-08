import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'

import ModalWithHeader, {
  BannerHeader,
  DetailsWrapper,
  ModalContainer,
  ButtonWrapper
} from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <ModalWithHeader {...props} />
)

describe('<ModalWithHeader />', () => {
  const minProps = {
    receipt: fromJS({
      'trackingNumber': '344760497230963444',
      'claimExpiry': '2017-07-13 00:17:08',
      'currency': 'COD',
      'dateCreated': '2017-07-01 16:17:34',
      'amount': '760.00',
      'quantity': '1',
      'mobileNumber': '09052720567',
      'status': 'FOR PULL OUT',
      'cliqqCode': '0003',
      'imageUrl': 'http://ic1.maxabout.us/mobiles//G/2014/8/gionee-ctrl-v4s-front-rear-view.jpg',
      'brandLogo': 'http://ic1.maxabout.us/mobiles//G/2014/8/gionee-ctrl-v4s-front-rear-view.jpg',
      'name': 'All Day Backpack | (blue)'
    }),
    receipts: fromJS([
      {
        'trackingNumber': '344760497230963444',
        'claimExpiry': '2017-07-13 00:17:08',
        'currency': 'COD',
        'dateCreated': '2017-07-01 16:17:34',
        'amount': '760.00',
        'quantity': '1',
        'mobileNumber': '09052720567',
        'status': 'FOR PULL OUT',
        'cliqqCode': '0003',
        'imageUrl': 'http://ic1.maxabout.us/mobiles//G/2014/8/gionee-ctrl-v4s-front-rear-view.jpg',
        'brandLogo': 'http://ic1.maxabout.us/mobiles//G/2014/8/gionee-ctrl-v4s-front-rear-view.jpg',
        'name': 'All Day Backpack | (blue)'
      }
    ]),
    setUpdatedReceipts: () => {},
    goToHome: () => {},
    goToReceipts: () => {},
    goToProducts: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should not render a div', () => {
    const renderedComponent = wrapper(minProps)
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('should render a modal', () => {
    const renderedComponent = wrapper(minProps)
    expect(renderedComponent.find('Modal').length).toEqual(1)
  })

  it('should render BannerHeader', () => {
    const renderComponent = shallow(<BannerHeader />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render DetailsWrapper', () => {
    const renderComponent = shallow(<DetailsWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ModalContainer', () => {
    const renderComponent = shallow(<ModalContainer />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ButtonWrapper', () => {
    const renderComponent = shallow(<ButtonWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
