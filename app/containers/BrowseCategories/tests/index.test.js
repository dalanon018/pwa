import React from 'react'
import { shallow } from 'enzyme'

import { BrowseCategories } from '../index'

describe('<BrowseCategories />', () => {
  const minProps = {
    loader: false,
    categories: [],
    getCategories: () => {},
    dispatch: () => {}
  }

  it('should render a div', () => {
    const renderedComponent = shallow(
      <BrowseCategories {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(2)
  })
})
