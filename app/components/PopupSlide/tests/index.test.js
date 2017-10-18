import React from 'react'
import { IntlProvider } from 'react-intl'
import { shallow, mount } from 'enzyme'

import { PopupSlide } from '../index'

import CloseButton from 'components/CloseButton'
import Input from 'components/InputField'
import Checkbox from 'components/CheckboxField'
import Modal from 'components/PromptModal'
import A from 'components/A'
import { LoadingStateInfo } from 'components/LoadingBlock'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TextWrapper,
  PopupContent,
  TermsConditionsWrapper,
  ButtonWrapper } from '../styles'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <PopupSlide {...props} />
)

// const _setMarkDownContent = () => {}

describe('<PopupSlide />', () => {
  const minProps = {
    submit: () => {},
    onClose: () => {},
    modalClose: () => {},
    changeRoute: () => {},
    modalToggle: false,
    toggle: false,
    mobileNumber: '9123456780',
    markdown: ''
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('markdown props has value', () => {
    const renderComponent = mount(
      <IntlProvider locale='en'>
        <PopupSlide {...minProps} />
      </IntlProvider>
    )

    renderComponent.setProps({ markdown: 'test' })
    expect(renderComponent.props().markdown).toBe('test')
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

  it('renders one <TermsConditionsWrapper/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(TermsConditionsWrapper)).toHaveLength(1)
  })

  it('renders one <ButtonWrapper/> styled component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(ButtonWrapper)).toHaveLength(1)
  })

  it('renders one <CloseButton/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(CloseButton)).toHaveLength(1)
  })

  it('renders one <Input/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(Input)).toHaveLength(1)
  })

  it('renders one <Checkbox/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(Checkbox)).toHaveLength(1)
  })

  it('renders one <Modal/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(Modal)).toHaveLength(1)
  })

  it('renders zero <A/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(A)).toHaveLength(0)
  })

  it('renders one <LoadingStateInfo/> component', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(LoadingStateInfo)).toHaveLength(1)
  })
})
