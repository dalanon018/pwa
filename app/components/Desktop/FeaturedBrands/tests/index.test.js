import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import FeaturedBrands, { Wrapper, ImageWrapper } from '../index'

const wrapper = (Component = FeaturedBrands, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<FeaturedBrands />', () => {
  const minProps = {
    brands: fromJS({}),
    imgixOptions: {},
    DefaultState: () => {},
    changeRoute: () => {},
    loader: false
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(FeaturedBrands, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should not render a div', () => {
    const renderedComponent = wrapper(FeaturedBrands, minProps)
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('renders one <Wrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<FeaturedBrands {...minProps} />)
    expect(ShallowedWrapper.find(Wrapper)).toHaveLength(1)
  })

  it('renders one <ImageWrapper/> styled component', () => {
    const ShallowedWrapper = shallow(<FeaturedBrands {...minProps} />)
    expect(ShallowedWrapper.find(ImageWrapper)).toHaveLength(0)
  })
})
