/*
 *
 * ReceiptPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { noop } from 'lodash'
import { allPass, ifElse, equals, both, compose, prop, partial } from 'ramda'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'

import Notification from 'utils/firebase-notification'

import Receipt from 'components/Receipt'
import Modal from 'components/PromptModal'
import WindowWidth from 'components/WindowWidth'

import RESERVED from 'images/ticket-backgrounds/reserve.png'
import UNPAID from 'images/ticket-backgrounds/unpaid.png'
import CONFIRMED from 'images/ticket-backgrounds/paid.png'
import INTRANSIT from 'images/ticket-backgrounds/intransit.png'
import DELIVERED from 'images/ticket-backgrounds/pickup.png'
import CLAIMED from 'images/ticket-backgrounds/claimed.png'
import UNCLAIMED from 'images/ticket-backgrounds/not-claimed.png'

import {
  userIsAuthenticated
} from 'containers/App/auth'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

import {
  selectIsRegisteredPush
} from 'containers/Buckets/selectors'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction,
  registerPushAction,
  getRegisteredPushAction
} from 'containers/Buckets/actions'

import {
  ENVIROMENT
} from 'containers/App/constants'

import messages from './messages'

import {
  selectLoading,
  selectReceipt
} from './selectors'

import {
  getReceiptAction,
  requestReceiptAction
} from './actions'

const ReceiptWrapper = styled.div`
  ${''}
  // min-height: 100vh;
  // padding: 50px 14px;
  margin-bottom: 60px;

  @media (min-width: 768px) {
    padding: 35px 30px;
  }
`
/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const identifyBackground = cases => defaultColor => key =>
 key in cases ? cases[key] : defaultColor

const isDoneRequesting = (loader) => () => (loader === false)

const isEntityEmpty = compose(equals(0), prop('size'))

export class ReceiptPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    receipt: PropTypes.object.isRequired,
    isRegisteredPush: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]).isRequired,
    getReceipt: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    getRegisteredPush: PropTypes.func.isRequired,
    registerPush: PropTypes.func.isRequired
  }

  state = {
    modalToggle: false,
    loadingPushToggle: false,
    title: null,
    content: null
  }

  constructor () {
    super()

    this._identifyBackground = this._identifyBackground.bind(this)
    this._goToHomeFn = this._goToHomeFn.bind(this)
    this._repurchaseFn = this._repurchaseFn.bind(this)
    this._goToPurchases = this._goToPurchases.bind(this)
    this._handleDoneInvalidReceipt = this._handleDoneInvalidReceipt.bind(this)
    this._processRegistrationNotification = this._processRegistrationNotification.bind(this)
  }

  _handleModalClose = () => {
    this.setState({
      modalToggle: false
    })
  }

  _identifyBackground () {
    const { receipt } = this.props
    return identifyBackground({
      RESERVED,
      UNPAID,
      CONFIRMED,
      INTRANSIT,
      DELIVERED,
      CLAIMED,
      UNCLAIMED
    })('none')(STATUSES[receipt.get('status')])
  }

  _goToHomeFn () {
    this.props.changeRoute('/')
  }

  _goToPurchases () {
    this.props.changeRoute('/purchases')
  }

  _repurchaseFn () {
    const { receipt } = this.props
    if (receipt.size) {
      this.props.changeRoute(`/product/${receipt.getIn(['products', 'cliqqCode'])}`)
    }
  }

  _handleDoneInvalidReceipt () {
    this.setState({
      modalToggle: true,
      title: <FormattedMessage {...messages.errorMessageTitle} />,
      content: <FormattedMessage {...messages.invalidTrackingNumber} />
    })

    setTimeout(() => {
      this.props.changeRoute('/')
    }, 5000)
  }

  _processRegistrationNotification (err, token) {
    const { registerPush } = this.props
    const processPushNotification = ifElse(
      equals(null),
      partial(registerPush, [{
        token
      }]),
      () => this.setState({
        modalToggle: true,
        title: <FormattedMessage {...messages.pushErrorMessageTitle} />,
        content: <FormattedMessage {...messages.pushErrorMessage} />
      })
    )

    this.setState({
      loadingPushToggle: false
    })

    return processPushNotification(err)
  }

  _handleRegistrationPushNotification = (evt, { checked }) => {
    const isProduction = () => equals('production', ENVIROMENT)
    const isNotIOS = () => !(!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform))

    this.setState({
      loadingPushToggle: true
    })

    const registerPush = ifElse(
      allPass([equals(true), isProduction, isNotIOS]),
      partial(Notification.requestPermission, [this._processRegistrationNotification]),
      () => {
        this.setState({
          loadingPushToggle: false,
          modalToggle: true,
          title: <FormattedMessage {...messages.pushErrorMessageTitle} />,
          content: <FormattedMessage {...messages.pushErrorUnsupportedMessage} />
        })
      }
    )
    registerPush(checked)
  }

  componentWillMount () {
    this.props.setPageTitle('Your Receipt')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(false)
  }

  componentDidMount () {
    const { params: { trackingNumber }, getRegisteredPush } = this.props
    this.props.getReceipt({ trackingNumber })
    getRegisteredPush()
  }

  componentWillReceiveProps (nextProps) {
    const { receipt, loading } = nextProps

    ifElse(
      both(isEntityEmpty, isDoneRequesting(loading)),
      this._handleDoneInvalidReceipt, noop
    )(receipt)
  }

  render () {
    const { receipt, isRegisteredPush, windowWidth, loading, route } = this.props
    const { modalToggle, title, content, loadingPushToggle } = this.state
    const receiptPageName = route && route.name
    // const widthResponsive = windowWidth >= 768
    return (
      <ReceiptWrapper background={this._identifyBackground}>
        <Helmet
          title='ReceiptPage'
          meta={[
            { name: 'description', content: 'Description of ReceiptPage' }
          ]}
        />
        <Receipt
          loadingPushToggle={loadingPushToggle}
          receiptPageName={receiptPageName}
          loading={loading}
          statuses={STATUSES}
          purchaseUsecases={PURCHASE_USECASE}
          purchaseOrder={PURCHASE_ORDER}
          receipt={receipt}
          goHomeFn={this._goToHomeFn}
          windowWidth={windowWidth}
          goToProduct={this._repurchaseFn}
          goReceiptPage={this._goToPurchases}
          registerPushNotification={this._handleRegistrationPushNotification}
          isRegisteredPush={isRegisteredPush}
        />

        <Modal
          open={modalToggle}
          name='warning'
          title={title}
          content={content}
          close={this._handleModalClose}
        />
      </ReceiptWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  receipt: selectReceipt(),
  loading: selectLoading(),
  isRegisteredPush: selectIsRegisteredPush()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getReceipt: (payload) => dispatch(getReceiptAction(payload)),
    getRegisteredPush: () => dispatch(getRegisteredPushAction()),
    repurchase: (payload) => dispatch(requestReceiptAction(payload)),
    registerPush: (payload) => dispatch(registerPushAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(userIsAuthenticated(ReceiptPage)))
