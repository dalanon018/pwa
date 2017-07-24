import React from 'react'
import styled from 'styled-components'

import H6 from 'components/H6'
import TestBackPack from 'images/test-images/BACKPACK-TICKET.png'
import TestLogo from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'

const PurchaseWrapper = styled.div`
  margin: 20px 0;
`

const ProductWrapper = styled.div`
  background-color: #F0F0F0;
  border: 2px solid blue;
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

const PurchaseDescription = styled.div`
  background-color: #FFF;
  height: 100px;
`

const Purchase = () => (
  <PurchaseWrapper>
    <ProductWrapper >
      <ProductImage background={TestBackPack} />
      <ProductDescription>
        <CodeWrapper> <CodeImage src={CliqqLogo} /> 000D1</CodeWrapper>
        <H6> ALL DAY BACKPACK | WINE </H6>
        <ProductLogoImage src={TestLogo} />
      </ProductDescription>
    </ProductWrapper>
    <PurchaseDescription />
  </PurchaseWrapper>
)

Purchase.propTypes = {

}

export default Purchase
