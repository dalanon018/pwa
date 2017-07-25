import React, { PropTypes } from 'react'
import styled from 'styled-components'

import H6 from 'components/H6'
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
  height: 140px;
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
    RESERVATION: '#41BDF2',
    PAID: '#F58322',
    INTRANSIT: '#EFBA03',
    PICKUP: '#8DC641',
    REPURCHASED: '#2081EC',
    CLAIMED: '#16A483',
    NOTCLAIMED: '#F23640'
  })('#41BDF2')(status)
}

const Purchase = ({ order }) => (
  <PurchaseWrapper>
    <ProductWrapper status={getColorStatus(order.get('status'))}>
      <ProductImage background={TestBackPack} />
      <ProductDescription>
        <CodeWrapper> <CodeImage src={CliqqLogo} />
          { order.getIn(['products', 'product_id']) }
        </CodeWrapper>
        <H6 uppercase> { order.getIn(['products', 'name']) } </H6>
        <ProductLogoImage src={TestLogo} />
      </ProductDescription>
    </ProductWrapper>
  </PurchaseWrapper>
)

Purchase.propTypes = {
  order: PropTypes.object.isRequired
}

export default Purchase
