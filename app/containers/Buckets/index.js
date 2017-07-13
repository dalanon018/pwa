import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Sidebar,
  Segment
} from 'semantic-ui-react'

import makeSelectBuckets from './selectors'
import HeaderMenu from './HeaderMenu'
import SidebarMenu from './SidebarMenu'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

export class Buckets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    toggleSidebar: false
  }

  constructor () {
    super()

    this._handleToggleSideBar = this._handleToggleSideBar.bind(this)
    this._handleCloseSidebarClickPusher = this._handleCloseSidebarClickPusher.bind(this)
  }

  _handleToggleSideBar () {
    const { toggleSidebar } = this.state
    this.setState({
      toggleSidebar: !toggleSidebar
    })
  }

  /**
   * work around for closing sidebar on clicking the page
   */
  _handleCloseSidebarClickPusher () {
    const { toggleSidebar } = this.state

    if (toggleSidebar) {
      this._handleToggleSideBar()
    }

    return false
  }

  render () {
    const { toggleSidebar } = this.state
    return (
      <Wrapper>
        <Sidebar.Pushable as={Segment}>
          <Sidebar animation='overlay' width='thin' visible={toggleSidebar}>
            <SidebarMenu />
          </Sidebar>
          <Sidebar.Pusher dimmed={toggleSidebar} onClick={this._handleCloseSidebarClickPusher}>
            <HeaderMenu toggleSidebarAction={this._handleToggleSideBar} />
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Wrapper>
    )
  }
}

Buckets.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  Buckets: makeSelectBuckets()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buckets)
