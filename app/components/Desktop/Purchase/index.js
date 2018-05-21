import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Grid,
  Image,
  Label,
  Container
} from 'semantic-ui-react'
import {
  compose,
  partialRight
} from 'ramda'
import { FormattedMessage } from 'react-intl'

import Countdown from 'components/Shared/Countdown'
import PlainCard from 'components/Shared/PlainCard'

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
  // border-radius: 1px;
  // border: 1px solid #ebebeb;
  display: flex;
  height: 100%;
  margin: 0 auto;
  min-height: 114px;
  width: 100%;
  padding: 14px 30px;
`

const PurchaseInfo = styled.div`
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  .product-name {
    margin: 5px 0 !important;
  }
`

// const StatusContainer = styled.div`
//   align-items: center;
//   display: flex;
//   flex-wrap: wrap;
//   // min-width: 146px;
//   min-width: 170px;
//   padding: 10px;
//   position: relative;
//   // width: 146px;
//   width: 170px;
// `

const StatusWrapper = styled.div`
  background-color: ${({status}) => status};
  border-radius: 0 0 5px 5px;
  padding: 3px 0;
  text-align: center;
  width: 100%;
`

const OtherInfo = styled.div`
  width: 100%;

  .status-info {
    margin-top: 10px;
    p {
      margin-bottom: 0;
    }
  }
`

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-width: 115px;
  width: 115px;
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
      <span>
        <FormattedMessage {...messages[`date${modePayment}${currentStatus}`]} />
        <span>:&nbsp;</span>
      </span>
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
      w: 115,
      h: 112,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return (
      <Grid.Row>
        <Grid.Column>
          <Container className='padding__none'>
            <PlainCard>
              <PurchaseWrapper onClick={this._goToReceipt} className='cursor__pointer'>
                <PurchaseInfo>
                  <div>
                    {
                      receipt.getIn(['products', 'brand'])
                      ? <Label as='span' basic size='big' className='text__weight--500 color__grey'>{receipt.getIn(['products', 'brand', 'name'])}</Label>
                      : null
                    }
                    <Label as='p' basic size='huge' className='text__weight--500 product-name'>
                      {this._productName(receipt.getIn(['products', 'name']))}
                    </Label>
                  </div>
                  <OtherInfo>
                    <Label className='text__weight--700' as='span' size='massive' basic color='orange'>
                      <FormattedMessage {...messages.peso} />
                      {parseFloat(receipt.get('amount')).toLocaleString()}
                    </Label>

                    <div className='status-info'>
                      <Label as='span' basic size='large' className='text__weight--400'>
                        { this._handleDateString() }
                      </Label>
                      <Label as='span' basic size='large' className='text__weight--500'>
                        { this._handleDateValue() }
                      </Label>
                    </div>
                  </OtherInfo>
                </PurchaseInfo>

                <PlainCard width={165}>
                  <div>
                    <ImageWrapper>
                      <Image
                        src={(receipt.getIn(['products', 'image']) &&
                      `${paramsImgix(receipt.getIn(['products', 'image']), imgixOptions)}`) ||
                      paramsImgix(defaultImage, imgixOptions)} />
                    </ImageWrapper>
                    <StatusWrapper status={this._getColorStatus(currentStatus)}>
                      <Label as='span' basic size='large' className='color__white text__weight--500'>
                        { this._handleStatusTitle() }
                      </Label>
                    </StatusWrapper>
                  </div>
                </PlainCard>

              </PurchaseWrapper>
            </PlainCard>
          </Container>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default Countdown(Purchase)
