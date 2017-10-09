import React, { PropTypes } from 'react'
import styled from 'styled-components'

import {
  Grid,
  Image,
  Label
} from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { isNil } from 'ramda'

import Countdown from 'components/Countdown'

import { paramsImgix } from 'utils/image-stock'
import { DateFormater } from 'utils/date' // DateFormater

import messages from './messages'

const PurchaseWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 0px 20px #F0F0F0;
  display: flex;
  height: 100%;
  margin: 0 auto;
  min-height: 100px;
`

const PurchaseInfo = styled.div`
  align-content: space-between;
  display: flex;
  flex-wrap: wrap;
  padding: 14px;
  width: 100%;
`

const PurchaseImage = styled.div`
  background-color: #F0F0F0;
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

  span {
    color: #FFFFFF !important;
  }
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

// @TODO: Mode of payment needed to come from Order
const modePayment = 'Cod'

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

  _handleStatusString = (status) => {
    const index = status && status.slice(0, 1)
    const body = status && status.toLowerCase().slice(1)
    const text = `${index}${body}`

    if (!isNil(index && body)) {
      return text
    }
  }

  _handleDateString = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || 'FieldDefault'

    return (
      <FormattedMessage {...messages[`date${modePayment}${currentStatus}`]} />
    )
  }

  _handleDateValue = () => {
    const { timer, receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')]
    const Timer = timer || '00:00:00'

    return switchFn({
      RESERVED: <p> { Timer } </p>,
      UNPAID: <p> { Timer } </p>
    })(
      DateFormater(receipt.get('claimExpiry'), 'MM-DD-YYYY')
    )(currentStatus)
  }

  _productName = (data) => {
    const { windowWidth } = this.props
    let maxChar = 18

    switch (true) {
      case (windowWidth >= 375 && windowWidth <= 500):
        maxChar = 28
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
                <Label as='span' basic size='large'>
                  Brand Name
                </Label>
                <Label as='p' basic size='large'>
                  {this._productName(receipt.getIn(['products', 'name']))}
                </Label>
              </div>
              <OtherInfo>
                <Label className='product-price text__roboto' as='span' basic color='orange'>
                  <FormattedMessage {...messages.peso} />
                  {receipt.get('amount')}
                </Label>
                <div className='status-info'>
                  <Label as='p' basic size='mini'>
                    { this._handleDateString() }
                  </Label>
                  <Label as='span' basic size='large'>
                    { this._handleDateValue() }
                  </Label>
                </div>
              </OtherInfo>
            </PurchaseInfo>
            <PurchaseImage>
              <Image
                src={(receipt.getIn(['products', 'image']) &&
                `${paramsImgix(receipt.getIn(['products', 'image']), imgixOptions)}`) ||
                paramsImgix(defaultImage, imgixOptions)} />
              <StatusWrapper status={this._getColorStatus(currentStatus)}>
                <Label as='span' basic size='medium'>
                  {this._handleStatusString(receipt.get('status'))}
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
