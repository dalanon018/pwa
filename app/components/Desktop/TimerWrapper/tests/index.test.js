import React from 'react'

import moment from 'moment'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import TimerWrapper, {
  Wrapper,
  ContentWrapper,
  LabelWrapper
} from '../index'

const children = (<h1>Test</h1>)
const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <TimerWrapper {...props}>
    {children}
  </TimerWrapper>
)

describe('<TimerWrapper />', () => {
  const minProps = { promo: fromJS({ thruDate: moment().add(1, 'hours').format('YYY-MM-DD HH:mm:ss') }) }

  it('render without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render Wrapper', () => {
    const renderComponent = shallow(<Wrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render ContentWrapper', () => {
    const renderComponent = shallow(<ContentWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should render LabelWrapper', () => {
    const renderComponent = shallow(<LabelWrapper {...minProps} />)
    expect(
      renderComponent.length
    ).toEqual(1)
  })

  it('should not render a div', () => {
    const renderedComponent = shallow(
      <TimerWrapper {...minProps} />
    )
    expect(renderedComponent.find('div').length).toEqual(0)
  })
})
