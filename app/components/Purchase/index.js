import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

import {
  Grid,
  Image,
  Label
} from 'semantic-ui-react'

import { isNil } from 'ramda'

// import H6 from 'components/H6'
import PackageStatus from 'components/PackageStatus'

import { paramsImgix } from 'utils/image-stock'

// import CliqqLogo from 'images/icons/cliqq.png'
import CLAIMED from 'images/status/claimed.svg'
import UNCLAIMED from 'images/status/unclaimed.svg'
import UNPAID from 'images/status/unpaid.svg'

// const PurchaseWrapper = styled.div`
//   cursor: pointer;
//   height: 100%;
//   margin: 5px 0;
// `

const PurchaseWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 0px 20px #F0F0F0;
  display: flex;
  height: 100%;
  margin: 0 auto;
  min-height: 100px;
`

const PurchaseInfo = styled.div`
  padding: 14px;
`

const PurchaseImage = styled.div`
  background-color: #F0F0F0;
`

const StatusWrapper = styled.div`
  background-color: ${({status}) => status};
  text-align: center;
  padding: 2px;

  span {
    color: #FFFFFF !important;
  }
`

const OtherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .product-price {
    font-size: 35px;
    font-weight: 700;
    letter-spacing: -2px;
    margin: 0;
  }

  .status-info {
    text-align: right;

    p {
      margin-bottom: 0;
    }
  }
`

// =========================

const StatusUseCaseImg = styled.img`
  width: 28px;
`

/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const switchFn = cases => defaultCase => key =>
 key in cases ? cases[key] : defaultCase

class Purchase extends React.PureComponent {
  static propTypes = {
    order: PropTypes.object.isRequired,
    statuses: PropTypes.object.isRequired,
    purchaseOrders: PropTypes.array.isRequired,
    purchaseUsecases: PropTypes.array.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._displayPackageStatus = this._displayPackageStatus.bind(this)
    this._goToReceipt = this._goToReceipt.bind(this)
    this._getColorStatus = this._getColorStatus.bind(this)
    this._useCaseBannerImg = this._useCaseBannerImg.bind(this)
  }

  _useCaseBannerImg () {
    const { order, statuses } = this.props
    const currentStatus = statuses[order.get('status')] || ''

    return switchFn({
      UNPAID,
      CLAIMED,
      UNCLAIMED
    })('#F58322')(currentStatus)
  }

  _displayPackageStatus () {
    const { order, statuses, purchaseOrders } = this.props
    const currentStatus = statuses[order.get('status')] || ''

    if (purchaseOrders.includes(currentStatus)) {
      return (
        <PackageStatus {...{ status: currentStatus }} />
      )
    }

    return (
      <Grid padded columns={1}>
        <Grid.Row>
          <Grid.Column className='padding__none' verticalAlign='middle' textAlign='right'>
            <StatusUseCaseImg src={this._useCaseBannerImg()} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  _goToReceipt () {
    const { order, changeRoute } = this.props
    changeRoute(`/purchases/${order.get('trackingNumber')}`)
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
    const { order, statuses, defaultImage } = this.props
    const currentStatus = statuses[order.get('status')] || ''

    const imgixOptions = {
      w: 100,
      h: 100,
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
              <Label as='span' basic size='large'>
            Brand Name
          </Label>
              <Label as='p' basic size='large'>
                {this._productName(order.getIn(['products', 'name']))}
              </Label>
              <OtherInfo>
                <Label className='product-price text__roboto' as='span' basic color='orange'>
                  <FormattedMessage {...messages.peso} />
                  {order.get('amount')}
                </Label>
                <div className='status-info'>
                  <Label as='p' basic size='mini'>
                Date Claimed:
              </Label>
                  <Label as='span' basic size='large'>
                09-21-2017
              </Label>
                </div>
              </OtherInfo>
            </PurchaseInfo>
            <PurchaseImage>
              <Image
                src={(order.getIn(['products', 'image']) &&
                `${paramsImgix(order.getIn(['products', 'image']), imgixOptions)}`) ||
                paramsImgix(defaultImage, imgixOptions)} />
              <StatusWrapper status={this._getColorStatus(currentStatus)}>
                <Label as='span' basic size='medium'>
                  {this._handleStatusString(order.get('status'))}
                </Label>
              </StatusWrapper>
            </PurchaseImage>
          </PurchaseWrapper>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default Purchase
