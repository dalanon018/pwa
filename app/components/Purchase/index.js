import React, { PropTypes } from 'react'
import styled from 'styled-components'

import {
  Grid,
  Image,
  Label
} from 'semantic-ui-react'
import { ifElse, equals, both, partial } from 'ramda'
import { FormattedMessage } from 'react-intl'

import Countdown from 'components/Countdown'

import { paramsImgix } from 'utils/image-stock'
import { DateFormater } from 'utils/date' // DateFormater

import purchasesMessages from 'containers/Purchases/messages'
import {
  COD_DATE_ORDERED_STATUS
} from 'containers/Buckets/constants'

import messages from './messages'

const PurchaseWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 0px 10px rgba(174,174,174, 0.5);
  display: flex;
  height: 100%;
  margin: 0 auto;
  min-height: 114px;
`

const PurchaseInfo = styled.div`
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
  padding: 14px;
  width: 100%;
`

const PurchaseImage = styled.div`
  min-width: 90px;
  position: relative;
`

const StatusWrapper = styled.div`
  background-color: ${({status}) => status};
  bottom: 0;
  left: 0;
  padding: 2px;
  position: absolute;
  text-align: center;
  width: 100%;
`

const OtherInfo = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .product-price {
    font-size: 35px;
    font-weight: 700;
    letter-spacing: -2px;
    line-height: 30px;
    margin: 0;
  }

  .status-info {
    text-align: right;

    p {
      margin-bottom: 0;
    }
  }
`

/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const switchFn = cases => defaultCase => key =>
 key in cases ? cases[key] : defaultCase

class Purchase extends React.PureComponent {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
    statuses: PropTypes.object.isRequired,
    purchaseOrders: PropTypes.array.isRequired,
    purchaseUsecases: PropTypes.array.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._goToReceipt = this._goToReceipt.bind(this)
    this._getColorStatus = this._getColorStatus.bind(this)
  }

  _goToReceipt () {
    const { receipt, changeRoute } = this.props
    changeRoute(`/purchases/${receipt.get('trackingNumber')}`)
  }

  /**
   * Main component for identifying color
   * @param {*} param0
   */
  _getColorStatus (status) {
    return switchFn({
      RESERVED: '#F58322',
      UNPAID: '#F23640',
      CONFIRMED: '#F58322',
      INTRANSIT: '#EFBA03',
      DELIVERED: '#8DC640',
      CLAIMED: '#8DC640',
      UNCLAIMED: '#F23640'
    })('#F58322')(status)
  }

  _handleDateString = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || 'FieldDefault'
    const modePayment = receipt.get('modePayment') || 'CASH'
    return (
      <FormattedMessage {...messages[`date${modePayment}${currentStatus}`]} />
    )
  }

  _handleDateVisible = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''
    const statusCASHNotAffected = (status) => !COD_DATE_ORDERED_STATUS.includes(status)

    const showDate = ifElse(
      both(equals(this._defaultModePayment), partial(statusCASHNotAffected, [currentStatus])),
      () => receipt.get('claimExpiry'),
      () => receipt.get('dateCreated')
    )

    return DateFormater(showDate(receipt.get('modePayment')), 'MM-DD-YYYY')
  }

  _handleDateValue = () => {
    const { timer, receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')]
    const Timer = timer || '00:00:00'

    return switchFn({
      RESERVED: <p> { Timer } </p>,
      UNPAID: <p> { Timer } </p>
    })(
      this._handleDateVisible()
    )(currentStatus)
  }

  _handleStatusTitle = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || 'UNKNOWN'

    return (
      <FormattedMessage {...purchasesMessages[`titleStatus${currentStatus}`]} />
    )
  }

  _productName = (data) => {
    const { windowWidth } = this.props
    let maxChar = 18

    switch (true) {
      case (windowWidth >= 375 && windowWidth <= 500):
        maxChar = 28
        break
      case (windowWidth >= 767):
        maxChar = 50
        break
    }

    if (data && data.length > maxChar) {
      return `${data.slice(0, maxChar)}...`
    }
    return data
  }

  render () {
    const { receipt, statuses, defaultImage } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''
    const imgixOptions = {
      w: 90,
      h: 90,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return (
      <Grid.Row>
        <Grid.Column>
          <PurchaseWrapper onClick={this._goToReceipt}>
            <PurchaseInfo>
              <div>
                {
                  receipt.getIn(['products', 'brand'])
                  ? <Label as='span' basic size='large' className='color__secondary'>{receipt.getIn(['products', 'brand', 'name'])}</Label>
                  : null
                }
                <Label as='p' basic size='large' className='color__secondary'>
                  {this._productName(receipt.getIn(['products', 'name']))}
                </Label>
              </div>
              <OtherInfo>
                <Label className='product-price text__roboto' as='span' basic color='orange'>
                  <FormattedMessage {...messages.peso} />
                  {receipt.get('amount')}
                </Label>
                <div className='status-info'>
                  <Label as='p' basic size='mini' className='color__secondary'>
                    { this._handleDateString() }
                  </Label>
                  <Label as='span' basic size='large' className='color__secondary'>
                    { this._handleDateValue() }
                  </Label>
                </div>
              </OtherInfo>
            </PurchaseInfo>
            <PurchaseImage className='background__light-grey'>
              <Image
                src={(receipt.getIn(['products', 'image']) &&
                `${paramsImgix(receipt.getIn(['products', 'image']), imgixOptions)}`) ||
                paramsImgix(defaultImage, imgixOptions)} />
              <StatusWrapper status={this._getColorStatus(currentStatus)}>
                <Label as='span' basic size='medium' className='color__white'>
                  { this._handleStatusTitle() }
                </Label>
              </StatusWrapper>
            </PurchaseImage>
          </PurchaseWrapper>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default Countdown(Purchase)
