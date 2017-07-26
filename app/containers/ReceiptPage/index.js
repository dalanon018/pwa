/*
 *
 * ReceiptPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Receipt from 'components/Receipt'
import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

import RESERVED from 'images/ticket-backgrounds/reserve.png'
import CONFIRMED from 'images/ticket-backgrounds/paid.png'
import INTRANSIT from 'images/ticket-backgrounds/intransit.png'
import DELIVERED from 'images/ticket-backgrounds/pickup.png'
import CLAIMED from 'images/ticket-backgrounds/claimed.png'
import UNCLAIMED from 'images/ticket-backgrounds/not-claimed.png'

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

export class ReceiptPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    receipt: PropTypes.object.isRequired,
    getReceipt: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._identifyBackground = this._identifyBackground.bind(this)
  }

  _identifyBackground () {
    const { receipt } = this.props

    return identifyBackground({
      RESERVED,
      CONFIRMED,
      INTRANSIT,
      DELIVERED,
      CLAIMED,
      UNCLAIMED
    })('none')(STATUSES[receipt.get('status')])
  }

  componentDidMount () {
    const { params: { trackingNumber } } = this.props
    this.props.getReceipt({ trackingNumber })
  }

  render () {
    const { receipt } = this.props

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
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptPage)
