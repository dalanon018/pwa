import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import PointsHistory, { PointsHistoryWrapper, AdjustedPoints } from '../index'

const wrapper = (Component = PointsHistory, props = {}, enzyme = shallow) => enzyme(
  <Component {...props} />
)

describe('<PointsHistory />', () => {
  const minProps = {
    changeRoute: () => {},
    loader: false,
    transactions: fromJS([
      {
        product: {
          name: 'product'
        },
        datetime: '2018-08-05T06:38:09.427Z',
        points: 999,
        type: 'plus'
      }
    ])
  }

  it('render without exploding', () => {
    const renderComponent = wrapper(PointsHistory, minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render a div', () => {
    const renderedComponent = shallow(
      <PointsHistory />
    )
    expect(renderedComponent.find('div').length).toEqual(1)
  })

  it('should render PointsHistoryWrapper', () => {
    const renderComponent = shallow(<PointsHistoryWrapper />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render AdjustedPoints', () => {
    const renderComponent = shallow(<AdjustedPoints />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
