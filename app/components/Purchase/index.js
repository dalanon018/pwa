import React, { PropTypes } from 'react'
import styled from 'styled-components'

import {
  Grid
} from 'semantic-ui-react'

import H6 from 'components/H6'
import PackageStatus from 'components/PackageStatus'

import TestBackPack from 'images/test-images/BACKPACK-TICKET.png'
import TestLogo from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
import CLAIMED from 'images/status/claimed.svg'
import UNCLAIMED from 'images/status/unclaimed.svg'

const PurchaseWrapper = styled.div`
  margin: 5px 0;
`

const ProductWrapper = styled.div`
  background-color: #F0F0F0;
  border: 2px solid  ${({status}) => status};
  border-radius: 5px;
  display: flex;
  height: 160px;
  margin: 0 auto;
`
const ProductImage = styled.div`
  background: url(${({background}) => background}) no-repeat top right / cover;
  width: 160px;
`

const ProductDescription = styled.div`
  padding: 20px
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: center;
  letter-spacing: 2px;
`

const ProductStatusWrapper = styled.div`
  width: 100%;
`

const CodeWrapper = styled.span`
  color: #AEAEAE;
`

const CodeImage = styled.img`
  float: left;
  width: 19px;
  margin-right: 10px;
`

const ProductLogoImage = styled.img`
  width: 180px;
  max-width: 100%;
`

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
      CLAIMED,
      UNCLAIMED
    })('#41BDF2')(currentStatus)
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
      RESERVED: '#41BDF2',
      CONFIRMED: '#F58322',
      INTRANSIT: '#EFBA03',
      DELIVERED: '#8DC641',
      CLAIMED: '#16A483',
      UNCLAIMED: '#F23640'
    })('#41BDF2')(status)
  }

  render () {
    const { order, statuses } = this.props
    const currentStatus = statuses[order.get('status')] || ''

    return (
      <PurchaseWrapper>
        <ProductWrapper status={this._getColorStatus(currentStatus)} onClick={this._goToReceipt}>
          <ProductImage background={TestBackPack} />
          <ProductDescription>
            <CodeWrapper> <CodeImage src={CliqqLogo} />
              { order.getIn(['products', 'product_id']) }
            </CodeWrapper>
            <H6 uppercase> { order.getIn(['products', 'name']) } </H6>
            <ProductLogoImage src={TestLogo} />
            <ProductStatusWrapper>
              { this._displayPackageStatus() }
            </ProductStatusWrapper>
          </ProductDescription>
        </ProductWrapper>
      </PurchaseWrapper>
    )
  }
}

export default Purchase
