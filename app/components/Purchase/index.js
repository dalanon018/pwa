import React, { PropTypes } from 'react'
import styled from 'styled-components'

import {
  Grid,
  Image,
  Label
} from 'semantic-ui-react'
import {
  compose,
  partialRight
} from 'ramda'
import { FormattedMessage } from 'react-intl'

import Countdown from 'components/Countdown'

import { paramsImgix } from 'utils/image-stock'
import { DateFormater } from 'utils/date' // DateFormater
import { handlingStatus } from 'utils/ordersHelper'
import { switchFn } from 'utils/logicHelper'

import purchasesMessages from 'containers/Purchases/messages'
import {
  DEFAULT_METHOD_PAYMENT
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
  max-width: 110px;
  position: relative;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
`

const StatusWrapper = styled.div`
  background-color: ${({status}) => status};
  // bottom: 0;
  // left: 0;
  // padding: 2px;
  // position: absolute;
  text-align: center;
  width: 100%;
`

const OtherInfo = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .product-price {
    font-size: 30px;
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

  @media (min-width: 375px) {
    .product-price {
      font-size: 35px;
    }
  }
`
class Purchase extends React.PureComponent {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
    statuses: PropTypes.object.isRequired,
    purchaseOrders: PropTypes.array.isRequired,
    purchaseUsecases: PropTypes.array.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  _defaultModePayment = DEFAULT_METHOD_PAYMENT

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
      INTRANSIT: '#F58322',
      LOSTINTRANSIT: '#F23640',
      DELIVERED: '#F58322',
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
    const handleStatus = handlingStatus(this._handleModePayment())

    const handleDate = compose(
      partialRight(DateFormater, ['MM-DD-YYYY']),
      switchFn({
        PROCESSING: receipt.get('dateCreated'),
        CONFIRMED: receipt.get('lastUpdated'),
        INTRANSIT: receipt.get('lastUpdated'),
        CLAIMED: receipt.get('lastUpdated'),
        DELIVERED: receipt.get('lastUpdated'),
        UNPAID: receipt.get('lastUpdated'),
        UNCLAIMED: receipt.get('lastUpdated')
      })(receipt.get('claimExpiry')),
      handleStatus
    )

    return handleDate(currentStatus)
  }

  _handleDateValue = () => {
    const { timer, statuses, receipt } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''
    const handleStatus = handlingStatus(this._handleModePayment())
    const Timer = timer || '00:00:00'

    return switchFn({
      RESERVED: <p> { Timer } </p>
    })(
      this._handleDateVisible()
    )(handleStatus(currentStatus))
  }

  _handleModePayment = () => {
    const { receipt } = this.props
    return receipt.get('modePayment') || this._defaultModePayment
  }

  _handleStatusTitle = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || 'UNKNOWN'
    const handleStatus = handlingStatus(this._handleModePayment())

    return (
      <FormattedMessage {...purchasesMessages[`titleStatus${handleStatus(currentStatus)}`]} />
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
                  {parseFloat(receipt.get('amount')).toLocaleString()}
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
              <div>
                <Image
                  src={(receipt.getIn(['products', 'image']) &&
              `${paramsImgix(receipt.getIn(['products', 'image']), imgixOptions)}`) ||
              paramsImgix(defaultImage, imgixOptions)} />
              </div>
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
