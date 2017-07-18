import React from 'react'
import styled from 'styled-components'

import H5 from 'components/H5'
import TestBackPack from 'images/test-images/BACKPACK-TICKET.png'
import TestLogo from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'

const BarcodeWrapper = styled.div`
`

const ProductWrapper = styled.div`
  background-color: #FFF;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 1px dashed #CCC;
  display: flex;
  height: 140px;
  margin: 0 auto;
`
const ProductImage = styled.div`
  background: url(${({background}) => background}) no-repeat top right / cover;
  border-bottom-left-radius: 10px;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-top: 1px dashed #CCC;
  background-color: #FFF;
  height: 100px;
`

const Barcode = () => (
  <BarcodeWrapper>
    <ProductWrapper >
      <ProductImage background={TestBackPack} />
      <ProductDescription>
        <span> <CodeImage src={CliqqLogo} /> 000D1</span>
        <H5> ALL DAY BACKPACK | WINE </H5>
        <ProductLogoImage src={TestLogo} />
      </ProductDescription>
    </ProductWrapper>
    <PurchaseDescription />
  </BarcodeWrapper>
)

Barcode.propTypes = {

}

export default Barcode
