import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import SearchResult, {
  CustomIcon,
  Title,
  Content,
  CustomItem,
  ItemWrapper
} from '../index'

const wrapper = (Component = SearchResult, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<SearchResult />', () => {
  const minProps = {
    product: fromJS({}),
    changeRoute: () => {}
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(SearchResult, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should not render a div', () => {
    const renderedComponent = wrapper(SearchResult, minProps)
    expect(renderedComponent.find('div').length).toEqual(0)
  })

  it('should render CustomIcon', () => {
    const renderComponent = shallow(<CustomIcon />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render Title', () => {
    const renderComponent = shallow(<Title />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render Content', () => {
    const renderComponent = shallow(<Content />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render CustomItem', () => {
    const renderComponent = shallow(<CustomItem />)
    expect(renderComponent.length).toEqual(1)
  })

  it('should render ItemWrapper', () => {
    const renderComponent = shallow(<ItemWrapper />)
    expect(renderComponent.length).toEqual(1)
  })
})
