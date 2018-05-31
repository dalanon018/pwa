import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import FilterSection, {
  Header,
  CategoriesContainer,
  LabelSelected,
  BrandsContainer
} from '../index'

const wrapper = (Component = FilterSection, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<FilterSection />', () => {
  const minProps = {
    queryCategory: fromJS({}),
    queryBrands: fromJS({}),
    filterCategories: fromJS({}),
    filterCategoriesLoading: false,
    filterBrands: fromJS({}),
    filterBrandsLoading: true,
    requestFromFilter: () => {},
    brand: fromJS({}),
    category: fromJS({}),
    onClick: () => {},
    itemsLoading: true
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(FilterSection, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render one div', () => {
    const renderedComponent = wrapper(FilterSection, minProps)
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('renders one <Header/> styled component', () => {
    const ShallowedWrapper = shallow(<FilterSection {...minProps} />)
    expect(ShallowedWrapper.find(Header)).toHaveLength(1)
  })

  it('renders one <CategoriesContainer/> styled component', () => {
    const ShallowedWrapper = shallow(<FilterSection {...minProps} />)
    expect(ShallowedWrapper.find(CategoriesContainer)).toHaveLength(1)
  })

  it('renders <LabelSelected/> styled component', () => {
    const ShallowedWrapper = shallow(<FilterSection {...minProps} />)
    expect(ShallowedWrapper.find(LabelSelected)).toHaveLength(0)
  })

  it('renders one <BrandsContainer/> styled component', () => {
    const ShallowedWrapper = shallow(<FilterSection {...minProps} />)
    expect(ShallowedWrapper.find(BrandsContainer)).toHaveLength(1)
  })
})
