import React from 'react'
import { shallow } from 'enzyme'

import { PopupVerification } from '../index'

import CloseButton from 'components/Shared/CloseButton'
import Input from 'components/Shared/InputField'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TextWrapper,
  ResendWrapper,
  PopupContent } from '../styles'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <PopupVerification {...props} />
)

describe('<PopupVerification />', () => {
  const minProps = {
    submit: () => {},
    onClose: () => {},
    changeRoute: () => {},
    resendCode: () => {},
    toggle: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('renders one <PopupWrapper/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(PopupWrapper)).toHaveLength(1)
  })

  it('renders one <BannerHeader/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(BannerHeader)).toHaveLength(1)
  })

  it('renders one <PopupContainer/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(PopupContainer)).toHaveLength(1)
  })

  it('renders one <PopupContent/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(PopupContent)).toHaveLength(1)
  })

  it('renders one <TextWrapper/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(TextWrapper)).toHaveLength(1)
  })

  it('renders one <InputWrapper/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(InputWrapper)).toHaveLength(1)
  })

  it('renders one <ResendWrapper/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(ResendWrapper)).toHaveLength(1)
  })

  it('renders one <CloseButton/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(CloseButton)).toHaveLength(1)
  })

  it('renders one <Input/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(Input)).toHaveLength(1)
  })

  it('should render a div', () => {
    const renderedComponent = shallow(
      <PopupVerification {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })
})
