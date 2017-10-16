import React from 'react'

import { shallow, mount } from 'enzyme'
import { Image } from 'semantic-ui-react'

import BannerStaticPromos from '../index'

const wrapper = (Component = BannerStaticPromos, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<BannerStaticPromos />', () => {
  describe('Banner if Loading', () => {
    const minProps = { loader: false }
    const renderComponent = wrapper(BannerStaticPromos, minProps, mount)

    it('render without exploding', () => {
      expect(
        renderComponent.length
      ).toEqual(1)
    })

    it('should load image', () => {
      expect(
        renderComponent.find(Image).length
      ).toBeGreaterThan(0)
    })
  })

  describe('Banner if not Loading', () => {
    const minProps = { loader: true }
    const renderComponent = wrapper(BannerStaticPromos, minProps)

    it('render without exploding', () => {
      expect(
        renderComponent.length
      ).toEqual(1)
    })

    it('should load image', () => {
      expect(
        renderComponent.find('.loader-image')
      ).toBeDefined()
    })
  })
})
