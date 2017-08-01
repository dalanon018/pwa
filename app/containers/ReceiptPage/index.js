/*
 *
 * ReceiptPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { noop } from 'lodash'
import { ifElse, equals, both, compose, prop } from 'ramda'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage } from 'react-intl'

import Receipt from 'components/Receipt'
import Modal from 'components/PromptModal'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

import RESERVED from 'images/ticket-backgrounds/reserve.png'
import UNPAID from 'images/ticket-backgrounds/unpaid.png'
import CONFIRMED from 'images/ticket-backgrounds/paid.png'
import INTRANSIT from 'images/ticket-backgrounds/intransit.png'
import DELIVERED from 'images/ticket-backgrounds/pickup.png'
import CLAIMED from 'images/ticket-backgrounds/claimed.png'
import UNCLAIMED from 'images/ticket-backgrounds/not-claimed.png'

import messages from './messages'

import {
  selectLoading,
  selectReceipt
} from './selectors'

import {
  getReceiptAction
} from './actions'

const ReceiptWrapper = styled.div`
  background: url(${({background}) => background}) no-repeat top right / cover;
  min-height: 100vh;
  padding: 25px;
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
    getReceipt: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  state = {
    modalToggle: false
  }

  constructor () {
    super()

    this._identifyBackground = this._identifyBackground.bind(this)
    this._goToHome = this._goToHome.bind(this)
    this._handleDoneInvalidReceipt = this._handleDoneInvalidReceipt.bind(this)
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

  _goToHome () {
    this.props.changeRoute('/')
  }

  _handleDoneInvalidReceipt () {
    this.setState({
      modalToggle: true
    })
    setTimeout(() => {
      this.props.changeRoute('/')
    }, 5000)
  }

  componentDidMount () {
    const { params: { trackingNumber } } = this.props
    this.props.getReceipt({ trackingNumber })
  }

  componentWillReceiveProps (nextProps) {
    const { receipt, loading } = nextProps
    console.log(receipt, loading)

    ifElse(
      both(isEntityEmpty, isDoneRequesting(loading)),
      this._handleDoneInvalidReceipt, noop
    )(receipt)
  }

  render () {
    const { receipt } = this.props
    const { modalToggle } = this.state

    return (
      <ReceiptWrapper background={this._identifyBackground}>
        <Helmet
          title='ReceiptPage'
          meta={[
            { name: 'description', content: 'Description of ReceiptPage' }
          ]}
        />
        <Receipt
          statuses={STATUSES}
          purchaseUsecases={PURCHASE_USECASE}
          purchaseOrder={PURCHASE_ORDER}
          receipt={receipt}
          goHome={this._goToHome}
        />

        <Modal
          open={modalToggle}
          name='warning'
          title={<FormattedMessage {...messages.errorMessageTitle} />}
          content={<FormattedMessage {...messages.invalidTrackingNumber} />}
        />
      </ReceiptWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  receipt: selectReceipt(),
  loading: selectLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getReceipt: (payload) => dispatch(getReceiptAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptPage)
