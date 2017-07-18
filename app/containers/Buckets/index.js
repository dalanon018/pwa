import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Sidebar,
  Segment
} from 'semantic-ui-react'

import {
  selectProductCategories
} from './selectors'

import {
  getProductCategoriesAction
} from './actions'

import HeaderMenu from './HeaderMenu'
import SidebarMenu from './SidebarMenu'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

const MainContent = styled.div`
  margin-top: 47px;
`

// const SidebarCustom = styled(Sidebar.Pusher)`
//   padding: 0 !important;
//   &:not(body) {
//     transform: inherit;
//   }
// `

export class Buckets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    categories: PropTypes.bool.isRequired
  }

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

  componentDidMount () {
    this.props.getCategories()
  }

  render () {
    const { children, productCategories, changeRoute } = this.props
    const { toggleSidebar } = this.state

    return (
      <Wrapper>
        <Sidebar.Pushable as={Segment}>
          <Sidebar animation='overlay' width='thin' visible={toggleSidebar}>
            <SidebarMenu categories={productCategories} />
          </Sidebar>
          <Sidebar.Pusher dimmed={toggleSidebar} onClick={this._handleCloseSidebarClickPusher}>
            <HeaderMenu
              toggleSidebarAction={this._handleToggleSideBar}
              changeRoute={changeRoute}
            />
            <MainContent>
              { children }
            </MainContent>
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
  productCategories: selectProductCategories()
})

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getProductCategoriesAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buckets)
