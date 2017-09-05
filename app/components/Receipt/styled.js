import styled from 'styled-components'

import {
  HIDE_BARCODE
} from './constants'

export const ReceiptWrapper = styled.div`
  
  @media(min-width: 370px) {
    .desktop-list-margin {
      margin: 25px 0 15px;
    }
  }

  @media (min-width: 768px) {
    .desktop-list-margin {
      margin: 25px 0;
    }
  }
`

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
  margin: 5px 0;
  width: 100%;
  display: ${({ status }) => HIDE_BARCODE.includes(status) ? 'none' : 'block'};

  @media (min-width: 768px) {
    margin: 0 auto 15px;
    width: inherit;
  }
`

export const WrapperWarning = styled.div`
  background-color: #8DC641;
  padding: 20px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  width: 100%;

  @media (min-width: 768px) {
    margin-bottom: 20px;
    padding: 25px 30px;

    img {
      width: 35px;
    }
    p {
      font-family: 'helveticabold';
      font-size: 15px;
      letter-spacing: 0;
    }
  }

  @media (min-width: 1200px) {
    padding: 25px 100px;
  }
`

export const WarningDescription = styled.p`
  color: #FFFFFF;
  font-family: 'helveticamedium';
  letter-spacing: 1px;
  line-height: 1.2;
  padding: 0 20px;
  position: relative;

  &:before {
    background: url(${props => props.icon})no-repeat center center / contain;
    content: '';
    height: 30px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
  }

  @media (min-width: 768px) {
    padding: 0 50px;
    &:before {
      height: 40px;
      width: 40px;
    }
  }
`

export const ButtonWrapper = styled.div`
  display:flex;
  justify-content: center;
  margin-top: 10px;

  @media (min-width: 768px) {
    .custom-button {
      padding: 20px 40px !important;
      width: 100%;
    }

    .custom-button span {
      font-size: 18px
    }
  }
`
