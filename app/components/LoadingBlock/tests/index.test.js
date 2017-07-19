/**
 * Testing our Product View component
 */

import React from 'react'
import { shallow } from 'enzyme'

import { LoadingStateImage, LoadingStateInfo } from '../index'

describe('<LoadingBlock />', () => {
  describe('<LoadingStateImage />', () => {
    const children = (<h1> test </h1>)
    const wrapper = (props = {}, enzyme = shallow) => enzyme(
      <LoadingStateImage {...props}>
        {children}
      </LoadingStateImage>
    )

    it('render without exploding', () => {
      const minProps = {
        loading: false
      }
      const renderComponent = wrapper(minProps)
      expect(
        renderComponent.length
      ).toEqual(1)
    })

    it('should render loading', () => {
      const minProps = {
        loading: true
      }
      const renderComponent = wrapper(minProps)
      expect(renderComponent.find('EmptyDataBlock')).toBeDefined()
    })
  })

  describe('<LoadingStateInfo />', () => {
    const children = (<h1> test </h1>)
    const wrapper = (props = {}, enzyme = shallow) => enzyme(
      <LoadingStateInfo {...props}>
        {children}
      </LoadingStateInfo>
    )

    it('render without exploding', () => {
      const minProps = {
        loading: false
      }
      const renderComponent = wrapper(minProps)
      expect(
        renderComponent.length
      ).toEqual(1)
    })

    it('should render loading', () => {
      const minProps = {
        loading: true
      }
      const renderComponent = wrapper(minProps)
      expect(renderComponent.find('EmptyDataBlock')).toBeDefined()
    })
  })
})
