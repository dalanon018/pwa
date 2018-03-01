import React from 'react'
import { fromJS } from 'immutable'
import { shallow } from 'enzyme'
import Category, { DefaultState } from '../index'

const wrapper = (Component = Category, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<Category />', () => {
  const minProps = {
    loader: false,
    grids: {},
    categories: fromJS([
      {
        name: 'test-category',
        background: 'image1.png',
        main: 'image1.png'
      }
    ]),
    changeRoute: () => {}
  }

  it('should render a Background Image of category', () => {
    const renderedComponent = wrapper(Category, minProps)
    expect(
      renderedComponent.find('[background]').length
    ).toEqual(1)
  })

  it('should render Loader', () => {
    const renderComponent = wrapper(Category, { ...minProps, loader: true })
    expect(
      renderComponent.find(DefaultState).length
    ).toBeGreaterThan(0)
  })
})
