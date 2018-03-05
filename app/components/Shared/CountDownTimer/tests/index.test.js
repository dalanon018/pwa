import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'

import Countdown from '../index'

const wrapper = (props = {}, enzyme = shallow) => enzyme(
  <Countdown {...props} />
)

describe('<Countdown />', () => {
  const minProps = {
    endDate: moment().add(1, 'hours').format('YYY-MM-DD HH:mm:ss')
  }

  it('render component without exploding', () => {
    const renderComponent = wrapper(minProps)
    expect(
      renderComponent.length
    ).toEqual(1)
  })
})
