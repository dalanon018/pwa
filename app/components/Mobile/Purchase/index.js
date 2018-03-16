import React from 'react'
import PropTypes from 'prop-types'
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

import Countdown from 'components/Shared/Countdown'

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
  border-radius: 3px;
  display: flex;
  height: 100%;
  margin: 0 auto;
  min-height: 114px;
  padding: 14px;
  width: 100%;
`

const PurchaseInfo = styled.div`
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
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
  width: 100%;

  .product-price {
    letter-spacing: -1px;
    margin-bottom: 20px;
  }

  .status-info {
    align-items: center;
    display: flex;
    justify-content: space-arount;

    span {
      margin-bottom: 0;
      margin-right: 3px;
    }
  }

  // @media (min-width: 375px) {
  //   .product-price {
  //     font-size: 35px;
  //   }
  // }
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
      RESERVED: '#FFB70B',
      UNPAID: '#FF4813',
      CONFIRMED: '#FFB70B',
      INTRANSIT: '#FFB70B',
      LOSTINTRANSIT: '#FF4813',
      DELIVERED: '#FFB70B',
      CLAIMED: '#229D90',
      UNCLAIMED: '#FF4813'
    })('#FFB70B')(status)
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
        LOSTINTRANSIT: receipt.get('lastUpdated'),
        CLAIMED: receipt.get('lastUpdated'),
        DELIVERED: receipt.get('lastUpdated'),
        UNPAID: receipt.get('lastUpdated'),
        UNCLAIMED: receipt.get('lastUpdated')
      })(receipt.get('expiryDate')),
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
        maxChar = 25
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
      w: 82,
      h: 82,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return (
      <Grid.Row>
        <Grid.Column>
          <PurchaseWrapper onClick={this._goToReceipt} className='box__shadow--primary background__white'>
            <PurchaseInfo>
              <div>
                {
                  receipt.getIn(['products', 'brand'])
                  ? <Label as='span' basic size='small' className='color__grey text__weight--400'>{receipt.getIn(['products', 'brand', 'name'])}</Label>
                  : null
                }
                <Label as='p' basic size='medium' className='text__weight--400 margin__none'>
                  {this._productName(receipt.getIn(['products', 'name']))}
                </Label>
              </div>
              <OtherInfo>
                <Label className='product-price text__weight--700 color__primary' size='big' as='span' basic>
                  <FormattedMessage {...messages.peso} />
                  {parseFloat(receipt.get('amount')).toLocaleString()}
                </Label>
                <div className='status-info'>
                  <Label as='span' basic size='small' className='text__weight--400'>
                    { this._handleDateString() }
                  </Label>
                  <Label as='span' basic size='small' className='text__weight--700'>
                    { this._handleDateValue() }
                  </Label>
                </div>
              </OtherInfo>
            </PurchaseInfo>
            <PurchaseImage>
              <div>
                <Image
                  src={(receipt.getIn(['products', 'image']) &&
              `${paramsImgix(receipt.getIn(['products', 'image']), imgixOptions)}`) ||
              paramsImgix(defaultImage, imgixOptions)} />
              </div>
              <StatusWrapper status={this._getColorStatus(currentStatus)}>
                <Label as='span' basic size='small' className='color__white text__weight--500'>
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
