import React, { PropTypes } from 'react'
import styled from 'styled-components'

import H6 from 'components/H6'
import PackageStatus from 'components/PackageStatus'

import TestBackPack from 'images/test-images/BACKPACK-TICKET.png'
import TestLogo from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'

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

/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const identifyColor = cases => defaultColor => key =>
 key in cases ? cases[key] : defaultColor

/**
 * Main component for identifying color
 * @param {*} param0
 */
const getColorStatus = (status) => {
  return identifyColor({
    RESERVED: '#41BDF2',
    CONFIRMED: '#F58322',
    INTRANSIT: '#EFBA03',
    DELIVERED: '#8DC641',
    CLAIMED: '#16A483',
    UNCLAIMED: '#F23640'
  })('#41BDF2')(status)
}

const Purchase = ({ order, statuses, changeRoute }) => {
  const currentStatus = statuses[order.get('status')] || ''

  const goToReceipt = () => {
    changeRoute(`/purchases/${order.get('trackingNumber')}`)
  }

  return (
    <PurchaseWrapper>
      <ProductWrapper status={getColorStatus(currentStatus)} onClick={goToReceipt}>
        <ProductImage background={TestBackPack} />
        <ProductDescription>
          <CodeWrapper> <CodeImage src={CliqqLogo} />
            { order.getIn(['products', 'product_id']) }
          </CodeWrapper>
          <H6 uppercase> { order.getIn(['products', 'name']) } </H6>
          <ProductLogoImage src={TestLogo} />
          <ProductStatusWrapper>
            <PackageStatus {...{ status: currentStatus }} />
          </ProductStatusWrapper>
        </ProductDescription>
      </ProductWrapper>
    </PurchaseWrapper>
  )
}

Purchase.propTypes = {
  order: PropTypes.object.isRequired,
  statuses: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default Purchase
