import React, { PropTypes } from 'react'
import styled from 'styled-components'

import {
// concat,
 // compose,
 // map,
 // join,
 // toPairs,
  identity,
  ifElse
 // partial,
 // equals
} from 'ramda'
import { noop } from 'lodash'
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import Firebase from 'utils/firebase-realtime'

import {
  selectProductCategories,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage
} from './selectors'

import {
  getProductCategoriesAction,
  getMobileNumbersAction,
  getUpdatedReceiptsAction,
  setUpdatedReceiptsAction,
  setNetworkErrorAction
} from './actions'

import {
  HIDE_BACK_BUTTON
} from './constants'

import {
  getSearchProductAction,
  setSearchProductAction
} from 'containers/SearchPage/actions'

import ModalWithHeader from 'components/ModalWithHeader'
import Modal from 'components/PromptModal'
import WindowWidth from 'components/WindowWidth'

import messages from './messages'
import HeaderMenu from './HeaderMenu'
import SearchMenu from './SearchMenu'
import SidebarMenu from './SidebarMenu'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
`

const MainContent = styled.div`
  margin-top: 47px;
  overflow: hidden;
  width: 100%;
  -webkit-overflow-scrolling: auto;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`

// const SidebarCustom = styled(Sidebar.Pusher)`
//   padding: 0 !important;
//   &:not(body) {
//     transform: inherit;
//   }
// `

// const fnSearchParams = (params) => compose(
//   concat('?'),
//   join('&'),
//   map(join('=')),
//   toPairs
// )(params)

export class Buckets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    getUpdatedReceipts: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    searchProduct: PropTypes.func.isRequired,
    setProductSearchList: PropTypes.func.isRequired,
    setNetworkError: PropTypes.func.isRequired,
    productCategories: PropTypes.object.isRequired,
    mobileNumbers: PropTypes.object,
    routes: PropTypes.array.isRequired,
    toggleError: PropTypes.bool.isRequired,
    toggleMessage: PropTypes.string,
    intl: intlShape.isRequired
  }

  state = {
    toggleSidebar: false
  }

  _mainContent
  _lastY
  _parentElement

  constructor () {
    super()

    this._handleToggleSideBar = this._handleToggleSideBar.bind(this)
    this._handleLeftButtonAction = this._handleLeftButtonAction.bind(this)
    this._handleCloseSidebarClickPusher = this._handleCloseSidebarClickPusher.bind(this)
    this._hideBackButton = this._hideBackButton.bind(this)
    this._displayHeader = this._displayHeader.bind(this)
    this._firebaseListener = this._firebaseListener.bind(this)
    this._handleShownModal = this._handleShownModal.bind(this)
    this._handleNetworkErrorMessage = this._handleNetworkErrorMessage.bind(this)
    this._goToHome = this._goToHome.bind(this)
    this._goToReceipts = this._goToReceipts.bind(this)
    this._handleBackButton = this._handleBackButton.bind(this)
    this._handleMainContent = this._handleMainContent.bind(this)
    this._scrolledSidebarChecker = this._scrolledSidebarChecker.bind(this)
    this._findParent = this._findParent.bind(this)
    this._collectionHas = this._collectionHas.bind(this)
    this._initY = this._initY.bind(this)
    this._touchMoveAddListener = this._touchMoveAddListener.bind(this)
    this._touchMoveRemoveListener = this._touchMoveRemoveListener.bind(this)
  }

  _collectionHas (a, b) {
    for (var i = 0, len = a.length; i < len; i++) {
      if (a[i] === b) return true
    }
    return false
  }

  _findParent (elm, selector) {
    let all = document.querySelectorAll(selector)
    let cur = elm.parentNode
    while (cur && !this._collectionHas(all, cur)) {
      cur = cur.parentNode
    }
    return cur
  }

  _touchMoveAddListener () {
    const addEvent = this._mainContent.addEventListener
    addEvent('touchmove', this._scrolledSidebarChecker, false)
    addEvent('touchstart', this._initY, false)
  }

  _touchMoveRemoveListener () {
    const removeEvent = this._mainContent.removeEventListener
    removeEvent('touchmove', this._scrolledSidebarChecker)
    removeEvent('touchstart', this._initY)
  }

  _initY (e) {
    this._lastY = e.touches[0].clientY
    this._parentElement = this._findParent(e.target, '.sidebar-wrapper')
  }

  _scrolledSidebarChecker (e) {
    let sideBarMenu = this._parentElement.firstElementChild
    let currentY = e.changedTouches[0].clientY

    if (sideBarMenu.scrollTop === (sideBarMenu.scrollHeight - sideBarMenu.offsetHeight)) {
      if (currentY < this._lastY) {
        e.preventDefault()
      }
    }

    if (sideBarMenu.scrollTop === 0) {
      if (currentY > this._lastY) {
        e.preventDefault()
      }
    }
  }

  _handleMainContent (content) {
    this._mainContent = content
  }

  _goToHome () {
    const { changeRoute } = this.props
    changeRoute('/')
  }

  _goToReceipts () {
    const { changeRoute } = this.props
    changeRoute('/purchases')
  }

  _handleNetworkErrorMessage () {
    this.props.setNetworkError(null)
  }

  _handleBackButton (location) {
    const { toggleSidebar } = this.state

    const noBackButton = ifElse(
      identity,
      this._handleToggleSideBar,
      noop
    )

    return noBackButton(toggleSidebar)
  }

  _handleToggleSideBar () {
    // const { changeRoute } = this.props
    const { toggleSidebar } = this.state
    const modalToggle = !toggleSidebar
    // const params = { modalToggle }

    let sidebarChecker = toggleSidebar ? 'scroll' : 'hidden'
    document.body.style.overflow = sidebarChecker

    if (!toggleSidebar) {
      this._touchMoveAddListener()
    } else {
      this._touchMoveRemoveListener()
    }

    this.setState({
      toggleSidebar: modalToggle
    })

    // const shouldAddParams = ifElse(
    //   identity,
    //   partial(fnSearchParams, [params]),
    //   () => ''
    // )
    // const redirectURL = `${window.location.pathname}${shouldAddParams(modalToggle)}`
    // const shouldRedirect = ifElse(
    //   equals(window.location.pathname),
    //   noop,
    //   changeRoute,
    // )
    // return shouldRedirect(redirectURL)
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

    return HIDE_BACK_BUTTON.includes(path.split('/')[1])
  }

  _displayHeader () {
    const { changeRoute, routes, searchProduct, setProductSearchList, windowWidth, intl } = this.props
    const { path } = routes.slice().pop()
    const currentRoute = routes.slice().pop().name

    /**
     * we have to identify if we should display backbutton
     */
    const hideBackButton = this._hideBackButton()

    if (path === '/search' && windowWidth < 768) {
      return (
        <SearchMenu
          clearSearch={setProductSearchList}
          searchProduct={searchProduct}
          hideBackButton={hideBackButton}
          leftButtonAction={this._handleLeftButtonAction}
        />
      )
    }

    return (
      <HeaderMenu
        categories={this.props.productCategories}
        hideBackButton={hideBackButton}
        leftButtonAction={this._handleLeftButtonAction}
        changeRoute={changeRoute}
        currentRoute={currentRoute}
        searchProduct={searchProduct}
        intl={intl}
      />
    )
  }

  _handleShownModal () {
    const { receiptsUpdated, setUpdatedReceipts } = this.props

    return receiptsUpdated.map((receipt, index) =>
      <ModalWithHeader
        receipt={receipt}
        receipts={receiptsUpdated}
        key={index}
        setUpdatedReceipts={setUpdatedReceipts}
        goToHome={this._goToHome}
        goToReceipts={this._goToReceipts}
      />
    )
  }

  _firebaseListener (snapshot) {
    const { getUpdatedReceipts } = this.props

    getUpdatedReceipts({
      snapshot: snapshot.val()
    })
  }

  componentDidMount () {
    const { getMobileNumbers, getCategories } = this.props

    getMobileNumbers()
    getCategories()

    browserHistory.listen(this._handleBackButton)
  }

  componentWillUnmount () {
    this._touchMoveRemoveListener()
  }

  componentWillUnmount () {
    this._touchMoveRemoveListener()
  }

  componentWillReceiveProps (nextProps) {
    const { mobileNumbers } = nextProps
    /**
     * whenever theres new mobile number we have to listen for all the order
     */
    Firebase.listen(mobileNumbers, this._firebaseListener)
  }

  render () {
    const { children, productCategories, changeRoute, toggleError, toggleMessage } = this.props
    const { toggleSidebar } = this.state
    return (
      <Wrapper toggleSidebar={toggleSidebar}>
        { this._displayHeader() }
        <MainContent innerRef={this._handleMainContent} toggleSidebar={toggleSidebar}>
          { children }
        </MainContent>
        <div className='sidebar-wrapper'>
          <SidebarMenu
            changeRoute={changeRoute}
            categories={productCategories}
            toggleSidebar={toggleSidebar}
            toggleAction={this._handleCloseSidebarClickPusher}
          />
        </div>
        { this._handleShownModal() }
        <Modal
          open={toggleError}
          name='warning'
          title={<FormattedMessage {...messages.errorHeader} />}
          content={toggleMessage}
          close={this._handleNetworkErrorMessage}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  productCategories: selectProductCategories(),
  mobileNumbers: selectMobileNumbers(),
  receiptsUpdated: selectReceiptsUpdated(),
  toggleError: selectToggleError(),
  toggleMessage: selectToggleMessage()
})

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getProductCategoriesAction()),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    getUpdatedReceipts: (payload) => dispatch(getUpdatedReceiptsAction(payload)),
    setUpdatedReceipts: (payload) => dispatch(setUpdatedReceiptsAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    searchProduct: (payload) => dispatch(getSearchProductAction(payload)),
    setProductSearchList: (payload) => dispatch(setSearchProductAction(payload)),
    setNetworkError: (payload) => dispatch(setNetworkErrorAction(payload)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Buckets)))
