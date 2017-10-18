import React, { PropTypes } from 'react'
import styled from 'styled-components'

import {
  identity,
  ifElse,
  is,
  both,
  equals,
  partial
} from 'ramda'
import { noop } from 'lodash'
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import Firebase from 'utils/firebase-realtime'
import Notification from 'utils/firebase-notification'

import {
  selectProductCategories,
  selectBrands,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage,
  selectPageTitle,
  selectShowSearchIcon,
  selectShowActivityIcon,
  selectIsRegisteredPush
} from './selectors'

import {
  getProductCategoriesAction,
  getBrandsAction,
  getMobileNumbersAction,
  getUpdatedReceiptsAction,
  setUpdatedReceiptsAction,
  setNetworkErrorAction,
  registerPushAction,
  getRegisteredPushAction
} from './actions'

import {
  HIDE_BACK_BUTTON
} from './constants'

import {
  ENVIROMENT
} from 'containers/App/constants'

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
  margin-top: 50px;
  overflow: hidden;
  width: 100%;
`

export class Buckets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    getBrands: PropTypes.func.isRequired,
    getUpdatedReceipts: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    searchProduct: PropTypes.func.isRequired,
    setProductSearchList: PropTypes.func.isRequired,
    setNetworkError: PropTypes.func.isRequired,
    productCategories: PropTypes.object.isRequired,
    brands: PropTypes.object.isRequired,
    mobileNumbers: PropTypes.object,
    routes: PropTypes.array.isRequired,
    toggleError: PropTypes.bool.isRequired,
    toggleMessage: PropTypes.string,
    intl: intlShape.isRequired,
    pageTitle: PropTypes.string,
    showSearchIcon: PropTypes.bool.isRequired,
    showActivityIcon: PropTypes.bool.isRequired,
    isRegisteredPush: PropTypes.bool.isRequired,
    registerPush: PropTypes.func.isRequired,
    getRegisteredPush: PropTypes.func.isRequired
  }

  state = {
    toggleSidebar: false
  }

  _lastY
  _parentElement

  _goToHome = () => {
    const { changeRoute } = this.props
    changeRoute('/')
  }

  _goToReceipts = () => {
    const { changeRoute } = this.props
    changeRoute('/purchases')
  }

  _handleNetworkErrorMessage = () => {
    this.props.setNetworkError(null)
  }

  _handleBackButton = (location) => {
    const { toggleSidebar } = this.state

    const noBackButton = ifElse(
      identity,
      this._handleToggleSideBar,
      noop
    )

    return noBackButton(toggleSidebar)
  }

  _handleToggleSideBar = () => {
    const { toggleSidebar } = this.state
    this.setState({
      toggleSidebar: !toggleSidebar
    })
  }

  /**
   * this is a factory fn since we button is dynamic base on the url of the user.
   */
  _handleLeftButtonAction = () => {
    if (this._hideBackButton()) {
      return this._handleToggleSideBar()
    }

    return browserHistory.goBack()
  }

  /**
   * work around for closing sidebar on clicking the page
   */
  _handleCloseSidebarClickPusher = () => {
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
  _hideBackButton = () => {
    const { routes } = this.props
    const { path } = routes.slice().pop()

    return HIDE_BACK_BUTTON.includes(path.split('/')[1])
  }

  _displayHeader = () => {
    const { pageTitle, showSearchIcon, showActivityIcon, changeRoute, routes, searchProduct, setProductSearchList, intl } = this.props
    const { path } = routes.slice().pop()
    const currentRoute = routes.slice().pop().name

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
        />
      )
    }

    return (
      <HeaderMenu
        pageTitle={pageTitle}
        showSearchIcon={showSearchIcon}
        showActivityIcon={showActivityIcon}
        hideBackButton={hideBackButton}
        leftButtonAction={this._handleLeftButtonAction}
        changeRoute={changeRoute}
        currentRoute={currentRoute}
        searchProduct={searchProduct}
        intl={intl}
      />
    )
  }

  _handleShownModal = () => {
    const { receiptsUpdated, setUpdatedReceipts, windowWidth } = this.props

    return receiptsUpdated.map((receipt, index) =>
      <ModalWithHeader
        receipt={receipt}
        receipts={receiptsUpdated}
        key={index}
        setUpdatedReceipts={setUpdatedReceipts}
        goToHome={this._goToHome}
        goToReceipts={this._goToReceipts}
        windowWidth={windowWidth}
      />
    )
  }

  _firebaseListener = (snapshot) => {
    const { getUpdatedReceipts } = this.props

    getUpdatedReceipts({
      snapshot: snapshot.val()
    })
  }

  _firebaseHandleRefreshTokenSubmission = (err, token) => {
    const { registerPush } = this.props
    const processPushNotification = ifElse(
      equals(null),
      partial(registerPush, [{
        token
      }]),
      noop
    )

    return processPushNotification(err)
  }

  _firebaseHandleRefreshToken = (currentToken) => {
    const isProduction = () => equals('production', ENVIROMENT)
    const registerPush = ifElse(
      both(is(String), isProduction),
      partial(Notification.refreshToken, [this._firebaseHandleRefreshTokenSubmission]),
      noop
    )

    registerPush(currentToken)
  }

  componentDidMount () {
    const { getMobileNumbers, getCategories, getBrands, getRegisteredPush } = this.props

    getMobileNumbers()
    getRegisteredPush()
    getCategories()
    getBrands()

    browserHistory.listen(this._handleBackButton)
  }

  componentWillReceiveProps (nextProps) {
    const { mobileNumbers, isRegisteredPush } = nextProps
    /**
     * whenever theres new mobile number we have to listen for all the order
     */
    Firebase.listen(mobileNumbers, this._firebaseListener)

    // if isRegister
    this._firebaseHandleRefreshToken(isRegisteredPush)
  }

  render () {
    const { children, productCategories, changeRoute, toggleError, toggleMessage, brands } = this.props
    const { toggleSidebar } = this.state
    return (
      <Wrapper toggleSidebar={toggleSidebar}>
        { this._displayHeader() }
        <MainContent
          toggleSidebar={toggleSidebar} >
          { children }
        </MainContent>
        <div
          className='sidebar-wrapper' >
          <SidebarMenu
            changeRoute={changeRoute}
            categories={productCategories}
            brands={brands}
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
  brands: selectBrands(),
  mobileNumbers: selectMobileNumbers(),
  receiptsUpdated: selectReceiptsUpdated(),
  toggleError: selectToggleError(),
  toggleMessage: selectToggleMessage(),
  pageTitle: selectPageTitle(),
  showSearchIcon: selectShowSearchIcon(),
  showActivityIcon: selectShowActivityIcon(),
  isRegisteredPush: selectIsRegisteredPush()
})

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getProductCategoriesAction()),
    getBrands: () => dispatch(getBrandsAction()),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    getUpdatedReceipts: (payload) => dispatch(getUpdatedReceiptsAction(payload)),
    setUpdatedReceipts: (payload) => dispatch(setUpdatedReceiptsAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    searchProduct: (payload) => dispatch(getSearchProductAction(payload)),
    setProductSearchList: (payload) => dispatch(setSearchProductAction(payload)),
    setNetworkError: (payload) => dispatch(setNetworkErrorAction(payload)),
    registerPush: (payload) => dispatch(registerPushAction(payload)),
    getRegisteredPush: () => dispatch(getRegisteredPushAction()),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Buckets)))
