import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  selectProductCategories
} from './selectors'

import {
  getProductCategoriesAction
} from './actions'

import {
  HIDE_BACK_BUTTON
} from './constants'

import {
  getSearchProductAction,
  setSearchProductAction
} from 'containers/SearchPage/actions'

import HeaderMenu from './HeaderMenu'
import SearchMenu from './SearchMenu'
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
    searchProduct: PropTypes.func.isRequired,
    setProductSearchList: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
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
    this._displayHeader = this._displayHeader.bind(this)
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
      return this._handleToggleSideBar()
    }

    return browserHistory.goBack()
  }

  /**
   * work around for closing sidebar on clicking the page
   */
  _handleCloseSidebarClickPusher () {
    const { toggleSidebar } = this.state

    if (toggleSidebar) {
      return this._handleToggleSideBar()
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

  _displayHeader () {
    const { changeRoute, routes, searchProduct, setProductSearchList } = this.props
    const { path } = routes.slice().pop()

    /**
     * we have to identify if we should display backbutton
     */
    const hideBackButton = this._hideBackButton()

    if (path === '/search') {
      return (
        <SearchMenu
          clearSearch={setProductSearchList}
          searchProduct={searchProduct}
          hideBackButton={hideBackButton}
          leftButtonAction={this._handleLeftButtonAction}
          show
        />
      )
    }

    return (
      <HeaderMenu
        hideBackButton={hideBackButton}
        leftButtonAction={this._handleLeftButtonAction}
        changeRoute={changeRoute}
        show
      />
    )
  }

  componentDidMount () {
    this.props.getCategories()
  }

  render () {
    const { children, productCategories } = this.props
    const { toggleSidebar } = this.state

    return (
      <Wrapper>
        { this._displayHeader() }
        <MainContent>
          { children }
        </MainContent>
        <SidebarMenu
          categories={productCategories}
          toggleSidebar={toggleSidebar}
          toggleAction={this._handleCloseSidebarClickPusher}
        />
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
    searchProduct: (payload) => dispatch(getSearchProductAction(payload)),
    setProductSearchList: (payload) => dispatch(setSearchProductAction(payload)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buckets)
