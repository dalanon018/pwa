import React from 'react'
import { shallow } from 'enzyme'
import {
  BannerHeader,
  DetailsWrapper,
  ModalContainer,
  ButtonWrapper
} from '../styles'

const wrapper = (Component, props = {}, enzyme = shallow) => shallow(
  <Component {...props} />
)

describe('BannerSlider Styles', () => {
  it('BannerHeader should render without exploding', () => {
    const renderComponent = wrapper(BannerHeader)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('DetailsWrapper should render without exploding', () => {
    const renderComponent = wrapper(DetailsWrapper)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ModalContainer should render without exploding', () => {
    const renderComponent = wrapper(ModalContainer)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('ButtonWrapper should render without exploding', () => {
    const renderComponent = wrapper(ButtonWrapper)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
