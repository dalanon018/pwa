import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { browserHistory } from 'react-router'
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

import {
  HIDE_BACK_BUTTON
} from './constants'

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
    categories: PropTypes.bool.isRequired,
    routes: PropTypes.array.isRequired
  }

  state = {
    toggleSidebar: false
  }

  constructor () {
    super()

    this._handleToggleSideBar = this._handleToggleSideBar.bind(this)
    this._handleLeftButtonAction = this._handleLeftButtonAction.bind(this)
    this._handleCloseSidebarClickPusher = this._handleCloseSidebarClickPusher.bind(this)
    this._hideBackButton = this._hideBackButton.bind(this)
  }

  _handleToggleSideBar () {
    const { toggleSidebar } = this.state
    this.setState({
      toggleSidebar: !toggleSidebar
    })
  }

  /**
   * this is a factory fn since we button is dynamic base on the url of the user.
   */
  _handleLeftButtonAction () {
    if (this._hideBackButton()) {
      this._handleToggleSideBar()
    }

    return browserHistory.goBack()
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

  /**
   * if route is not:[
   *  '/',
   *  'home',
   *  'barcodes'
   * ]
   * then we will show the backbutton
   */
  _hideBackButton () {
    const { routes } = this.props
    const { path } = routes.slice().pop()
    return HIDE_BACK_BUTTON.includes(path)
  }

  componentDidMount () {
    this.props.getCategories()
  }

  render () {
    const { children, productCategories, changeRoute } = this.props
    const { toggleSidebar } = this.state

    /**
     * we have to identify if we should display backbutton
     */
    const hideBackButton = this._hideBackButton()

    return (
      <Wrapper>
        <Sidebar.Pushable as={Segment}>
          <Sidebar animation='overlay' width='thin' visible={toggleSidebar}>
            <SidebarMenu categories={productCategories} />
          </Sidebar>
          <Sidebar.Pusher dimmed={toggleSidebar} onClick={this._handleCloseSidebarClickPusher}>
            <HeaderMenu
              hideBackButton={hideBackButton}
              leftButtonAction={this._handleLeftButtonAction}
              changeRoute={changeRoute}
              show
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
