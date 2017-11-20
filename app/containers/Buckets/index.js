import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactNotification from 'react-notification-system'

import {
  identity,
  ifElse,
  is,
  both,
  equals,
  partial
} from 'ramda'
import { noop } from 'lodash'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Switch, Route } from 'react-router-dom'

import Firebase from 'utils/firebase-realtime'
import Notification from 'utils/firebase-notification'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { isMobileDevice } from 'utils/http'

import {
  selectProductCategories,
  selectBrands,
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage,
  selectPageTitle,
  selectFullScreenHeader,
  selectShowSearchIcon,
  selectShowActivityIcon,
  selectIsRegisteredPush,
  selectLoyaltyToken
} from './selectors'

import {
  getProductCategoriesAction,
  getBrandsAction,
  getMobileNumbersAction,
  getUpdatedReceiptsAction,
  setUpdatedReceiptsAction,
  setNetworkErrorAction,
  registerPushAction,
  getRegisteredPushAction,
  getLoyaltyTokenAction,
  removeLoyaltyTokenAction
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

import HomePage from 'containers/HomePage/Loadable'
import ModalWithHeader from 'components/ModalWithHeader'
import Modal from 'components/PromptModal'
import WindowWidth from 'components/WindowWidth'

import reducer from './reducer'
import sagas from './sagas'
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
    isMobile: PropTypes.bool.isRequired,
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
    headerMenuFullScreen: PropTypes.bool.isRequired,
    showSearchIcon: PropTypes.bool.isRequired,
    showActivityIcon: PropTypes.bool.isRequired,
    isRegisteredPush: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]).isRequired,
    registerPush: PropTypes.func.isRequired,
    getRegisteredPush: PropTypes.func.isRequired,
    loyaltyToken: PropTypes.string,
    getLoyaltyToken: PropTypes.func.isRequired,
    removeLoyaltyToken: PropTypes.func.isRequired
  }

  state = {
    toggleSidebar: false
  }

  _lastY
  _parentElement

  _reactNotificationRef = (ref) => {
    this._notificationRef = ref
  }

  _displayBestViewedMobileNotification = () =>
    setTimeout(() =>
      this._notificationRef.addNotification({
        title: <FormattedMessage {...messages.bestViewedTitle} />,
        message: <FormattedMessage {...messages.bestViewedContent} />,
        autoDismiss: 0,
        level: 'success'
      })
    , 2000)

  _goToHome = () => {
    const { changeRoute } = this.props
    changeRoute('/')
  }

  _goToReceipts = () => {
    const { changeRoute } = this.props
    changeRoute('/purchases')
  }

  _goToProducts = (productId) => {
    const { changeRoute } = this.props
    changeRoute(`/product/${productId}`)
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
    if (!toggleSidebar) {
      document.body.classList.add('custom__body')
    } else {
      document.body.classList.remove('custom__body')
    }

    this.setState({
      toggleSidebar: !toggleSidebar
    })
  }

  /**
   * this is a factory fn since we button is dynamic base on the url of the user.
   */
  _handleLeftButtonAction = () => {
    const { history } = this.props

    if (this._hideBackButton()) {
      return this._handleToggleSideBar()
    }

    return history.goBack()
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
    const { pageTitle, showSearchIcon, showActivityIcon, changeRoute, routes, searchProduct, setProductSearchList, intl, headerMenuFullScreen } = this.props
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
        headerMenuFullScreen={headerMenuFullScreen}
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
        goToProducts={this._goToProducts}
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
    const { getMobileNumbers, getCategories, getBrands, getRegisteredPush, getLoyaltyToken, isMobile } = this.props
    const shouldDisplayNotification = ifElse(
      identity,
      noop, // if true then we dont need to do anything
      this._displayBestViewedMobileNotification
    )

    getMobileNumbers()
    getRegisteredPush()
    getCategories()
    getBrands()
    getLoyaltyToken()

    shouldDisplayNotification(isMobile)
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
    const { productCategories, changeRoute, toggleError, toggleMessage, brands, loyaltyToken, removeLoyaltyToken } = this.props
    const { toggleSidebar } = this.state
    return (
      <Wrapper toggleSidebar={toggleSidebar}>
        { this._displayHeader() }
        <MainContent
          toggleSidebar={toggleSidebar} >
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </MainContent>
        <div
          className='sidebar-wrapper' >
          <SidebarMenu
            isSignIn={!!loyaltyToken}
            signOut={removeLoyaltyToken}
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
        <ReactNotification ref={this._reactNotificationRef} />
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  // make sure we have a single entry point to our application
  isMobile: () => isMobileDevice(),
  productCategories: selectProductCategories(),
  brands: selectBrands(),
  mobileNumbers: selectMobileNumbers(),
  receiptsUpdated: selectReceiptsUpdated(),
  toggleError: selectToggleError(),
  toggleMessage: selectToggleMessage(),
  pageTitle: selectPageTitle(),
  headerMenuFullScreen: selectFullScreenHeader(),
  showSearchIcon: selectShowSearchIcon(),
  showActivityIcon: selectShowActivityIcon(),
  isRegisteredPush: selectIsRegisteredPush(),
  loyaltyToken: selectLoyaltyToken()
})

function mapDispatchToProps (dispatch) {
  return {
    getCategories: () => dispatch(getProductCategoriesAction()),
    getBrands: () => dispatch(getBrandsAction()),
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    getLoyaltyToken: () => dispatch(getLoyaltyTokenAction()),
    removeLoyaltyToken: () => dispatch(removeLoyaltyTokenAction()),
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

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'buckets', reducer })
const withSaga = injectSaga({ key: 'buckets', sagas })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(Buckets)))
