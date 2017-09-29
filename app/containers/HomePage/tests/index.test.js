import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import SearchBox from 'components/SearchBox'
import CategoriesLists from '../CategoriesLists'
import BrandsLists from '../BrandsLists'

import { HomePage } from '../index'

const wrapper = (props = {}, enzyme = shallow) => shallow(
  <HomePage {...props} />
)

describe('<HomePage />', () => {
  const minProps = {
    products: fromJS([]),
    categories: fromJS([]),
    brands: fromJS([]),
    productsLoading: false,
    categoriesLoading: false,
    brandsLoading: false,
    getProducts: () => {},
    getCategories: () => {},
    getBrands: () => {},
    dispatch: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render the SearchBox', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(SearchBox).length).toBe(1)
  })

  it('should render Categories', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(CategoriesLists).length).toBe(1)
  })

  it('should render the Brands', () => {
    const renderComponent = wrapper(minProps)
    expect(renderComponent.find(BrandsLists).length).toBe(1)
  })
})
