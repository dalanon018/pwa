import React from 'react'
import { shallow } from 'enzyme'
import {
  BarcodeSVG,
  WrapperWarning,
  WarningDescription,
  ButtonContainer,
  ReceiptWrapper,
  ReceiptContainer,
  ReceiptHeader,
  ReceiptContent,
  Scanner,
  ScannerWrapper
} from '../styled'

const wrapper = (Component, props = {}, enzyme = shallow) => shallow(
  <Component {...props} />
)

describe('Receipt Styles', () => {
  it('BarcodeSVG should render without exploding', () => {
    const renderComponent = wrapper(BarcodeSVG)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('WrapperWarning should render without exploding', () => {
    const renderComponent = wrapper(WrapperWarning)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('WarningDescription should render without exploding', () => {
    const renderComponent = wrapper(WarningDescription)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ButtonContainer should render without exploding', () => {
    const renderComponent = wrapper(ButtonContainer)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ReceiptWrapper should render without exploding', () => {
    const renderComponent = wrapper(ReceiptWrapper)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ReceiptContainer should render without exploding', () => {
    const renderComponent = wrapper(ReceiptContainer)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ReceiptHeader should render without exploding', () => {
    const renderComponent = wrapper(ReceiptHeader)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ReceiptContent should render without exploding', () => {
    const renderComponent = wrapper(ReceiptContent)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('Scanner should render without exploding', () => {
    const renderComponent = wrapper(Scanner)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ScannerWrapper should render without exploding', () => {
    const renderComponent = wrapper(ScannerWrapper)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
