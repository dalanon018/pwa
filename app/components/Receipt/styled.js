import styled from 'styled-components'

import {
  HIDE_BARCODE
} from './constants'

export const ReceiptWrapper = styled.div`
`

export const ProductWrapper = styled.div`
  background-color: #FFF;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 2px dashed #AEAEAE;
  display: flex;
  min-height: 140px;
  justify-content: space-between;
  margin: 0 auto;

  @media (min-width: 768px) {
    height: 220px;
  }
`
export const ProductImage = styled.div`
  background: url(${({background}) => background}) no-repeat center / cover;
  border-bottom-left-radius: 10px;
  width: 100%;
`

export const ProductDescription = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: center;
  letter-spacing: 2px;
  padding: 20px
  width: 70%;

  h6 {
    line-height: 10px;
    text-align: right;
  }

  @media (min-width: 768px) {
    width: 80%;
    h6 {
      font-family: 'helveticabold';
      font-size: 18px;
      letter-spacing: 5px;
      margin: 10px 0 20px 0;
    }
  }
`
export const CodeWrapper = styled.span`
  color: #AEAEAE;

  @media (min-width: 768px) {
    font-family: 'helveticabold';
    font-size: 16px;
    letter-spacing: 3px;
  }
`

export const CodeImage = styled.img`
  float: left;
  width: 19px;
  margin-right: 10px;
`

export const ProductLogoImage = styled.img`
  width: 180px;
  max-width: 100%;

  @media (min-width: 768px) {
    width: 270px;
  }
`

export const ReceiptDescription = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-top: 1px dashed #CCC;
  background-color: #FFF;
  padding: 30px 20px;
  color: #5B5B5B;

  @media (min-width: 768px) {
    padding: 50px;
  }
`

export const PurchaseGeneralInfo = styled.div`
  font-family: 'helveticalight';
  font-size: 12px;

  .item {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    margin-top: 0;
  }
`

export const DetailTitle = styled.div`
  margin: 5px 0;
  font-family: 'helveticalight';
`

export const ProductPrice = styled.p`
  color: #F88728;
  font-family: 'helveticabold';
  font-size: 29px;
  line-height: inherit;
  text-transform: uppercase;
`

export const BarcodeSVG = styled.svg`
  margin: 5px 0;
  width: 100%;
  display: ${({ status }) => HIDE_BARCODE.includes(status) ? 'none' : 'block'};

  @media (min-width: 768px) {
    margin: 20px 0;
  }
`

export const WrapperWarning = styled.div`
  background-color: #8DC641;
  margin: 0 auto;
  max-width: 492px;
  width: 100%;
  text-transform: uppercase;

  @media (min-width: 768px) {
    img {
      width: 50px;
    }
    p {
      font-size: 16px;
      font-family: 'helveticabold';
    }
  }
`

export const WarningDescription = styled.p`
  font-family: 'helveticamedium';
  color: #FFFFFF;
  letter-spacing: 1px;
  line-height: 1.2;
`

export const ButtonWrapper = styled.div`
  display:flex;
  justify-content: center;
  margin-top: 10px;
`
