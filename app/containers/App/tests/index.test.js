import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../index'

describe('<App />', () => {
  it('App should render', () => {
    const minProps = {
      loading: false,
      error: false,
      currentUser: false,
      userData: {
        repositories: false
      }
    }

    const children = (<h1>Test</h1>)
    const renderedComponent = shallow(
      <App {...minProps} >
        {children}
      </App>
    )
    expect(renderedComponent.contains(children)).toEqual(true)
  })
})
