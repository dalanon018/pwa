import styled from 'styled-components'

import {
  HIDE_BARCODE
} from './constants'

export const ProductWrapper = styled.div`
  background-color: #FFF;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 2px dashed #AEAEAE;
  display: flex;
  // min-height: 140px;
  padding: 10px 0;
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
  padding: 20px;
  width: 70%;

  h6 {
    line-height: 10px;
    text-align: right;
    width: 100%;
  }

  @media (min-width: 768px) {
    align-items: center;
    margin-bottom: 40px;
    padding: 0;
    width: 100%;

    h6 {
      font-family: 'helveticabold';
      font-size: 19px;
      letter-spacing: 6px;
      line-height: 20px;
      margin-bottom: 25px;
      text-align: center;
    }
  }
`
export const CodeWrapper = styled.span`
  color: #AEAEAE;

  @media (min-width: 768px) {
    align-items: center;
    display: flex;
    justify-content: center;

    img {
      width: 25px;
    }

    font-family: 'helveticabold';
    font-size: 20px;
    letter-spacing: 6px;
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
  padding: 20px 20px;
  color: #5B5B5B;

  @media (min-width: 768px) {
    border-radius: 0;
    border: 0;
    padding: 0;
    padding: 0;

    .custom-row {
      padding: 0 !important;
    }

    .desktop-padding-wrapper {
      padding: 60px 30px 60px 0;
    }
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
    font-size: 18px;
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

  @media (min-width: 768px) {
    font-size: 36px;
    font-weight: bold;
    letter-spacing: 1px;
  }
`

export const BarcodeSVG = styled.svg`
  display: ${({ status }) => HIDE_BARCODE.includes(status) ? 'none' : 'block'};
`

export const WrapperWarning = styled.div`
  padding: 0 20px;
  position: relative;
  margin: 30px 0;
  width: 100%;

  @media (min-width: 768px) {
    margin-bottom: 20px;
    padding: 25px 30px;

    img {
      width: 35px;
    }
  }
`

export const WarningDescription = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 15px;
  padding: 0 20px;
  position: relative;
  display: flex;
  align-items: center;

  .image {
    width: 26px;
    margin-right: 8px;
  }

  @media (min-width: 768px) {
    padding: 0 50px;
    &:before {
      height: 40px;
      width: 40px;
    }
  }
`

export const ButtonContainer = styled.div`
  background: #f58322;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1;

  .ui.button.primary {
    padding: 20px 40px !important;
  }

  @media (min-width: 768px) {
    padding: 0;
    position: static;
  }
`

// ====================
export const ReceiptWrapper = styled.div`
  position: relative;
`

export const ReceiptContainer = styled.div`
  box-shadow: 0px 0px 30px #F0F0F0;
  background-color: #FFFFFF;
  
  margin: 50px 20px 0;
`

export const ReceiptHeader = styled.div`
  background-color: #F0F0F0;
  padding: 14px;
`

export const ReceiptContent = styled.div`
  height: ${props => props.show}px;
  opacity: 0;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  -webkit-transition: all 2s ease;
  -moz-transition: all 2s ease;
  -o-transition: all 2s ease;
  transition: all 2s ease;
  ${'' /* box-shadow: 0px 0px 20px #F0F0F0;
  background-color: #FFFFFF;
  padding: 14px;
  width: 100%; */}

  .product-current-price {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-right: 15px !important;
    margin: 0;
  }
  .product-price {
    align-self: flex-end;
    color: #AEAEAE !important;
    line-height: initial;
    text-decoration: line-through;
  }
`

export const Scanner = styled.div`
  background-color: #000000;
  border: 3px solid #5B5B5B;
  height: 10px;
  width: 100%;
`

export const ScannerWrapper = styled.div`
  bottom: -5px;
  left: 0;
  padding: 0 15px;
  position: absolute;
  width: 100%;
  z-index: -1;
`
