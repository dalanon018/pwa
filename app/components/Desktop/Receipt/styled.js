import styled from 'styled-components'

import {
  HIDE_BARCODE
} from './constants'

export const BarcodeSVG = styled.svg`
  display: ${({ status }) => HIDE_BARCODE.includes(status) ? 'none' : 'block'};
`

export const WrapperWarning = styled.div`
  padding: 0 10px;
  position: relative;
  margin: 30px 0;
  width: 100%;
`

export const WarningDescription = styled.div`
  font-family: 'Roboto';
  font-size: 14px;
  line-height: 17px;
  padding: 0 20px;
  position: relative;
  display: flex;
  align-items: flex-start;

  span.screenshot-label {
    font-size: 14px
    line-height: 17px;
  }

  .image {
    width: 26px;
    margin-right: 8px;
  }

  section > p {
    margin: 0 !important;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;

  .ui.button.primary {
    padding: 20px 40px !important;
  }
`

// ====================
export const ReceiptWrapper = styled.div`
  position: relative;

  @media screen and (min-width: 1440px) {
    width: 500px;
    margin: auto;
  }
`

export const ReceiptContainer = styled.div`
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 0px 10px rgba(174,174,174, 0.8);
  margin: 0 20px 0;
`

export const ReceiptHeader = styled.div`
  background-color: #fafafa;
  border-radius: 10px 10px 0 0;
  padding: 20px;

  .order-number {
    p {
      font-weight: 100;
    }
  }

  @media (min-width: 320px) and (max-width:374px) {
    .order-number {
      p {
        font-size: 15px !important;
        span {
          font-size: 17px;
        }
      }
    }
    .product-status {
      p {
        font-size: 15px !important;
      }
    }
  }

  @media (min-width: 1024px) {

  }
`

export const ReceiptContent = styled.div`
  border-radius: 10px 10px 0 0;
  height: ${props => props.show}px;
  opacity: 0;
  width: 100%;
  z-index: 1;
  overflow: hidden;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  transition: all 1s ease;

  .product-current-price {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-right: 15px !important;
    padding: 0 !important;
    margin: 0;
  }
  .product-price {
    align-self: flex-end;
    line-height: initial;
    text-decoration: line-through;
  }
  .mobile-number {
    margin-bottom: 0 !important;
  }
`

export const Scanner = styled.div`
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

export const PushNotificationWrapper = styled.div`
  border-top: 2px solid #F0F0F0;
  padding: 14px;

  @media (min-width: 1024px) and (max-width: 1365px) {
    // padding: 5px 200px !important;
  }
  @media (min-width: 1366px) {
    margin-left: auto;
    margin-right: auto;
    width: 500px;
  }
`

export const InstructionsWrapper = styled.div`
  padding: 0 10px;
  position: relative;
  margin-bottom: 30px;
  width: 100%;
`

export const CustomContainer = styled.div`
  // @media (min-width: 1024px) {
  //   margin: 0 auto;
  //   width: 500px;
  // }
`

export const InfoContainer = styled.div`
  @media (min-width: 1024px) and (max-width: 1365px) {
    padding: 5px 200px !important;
  }
  @media (min-width: 1366px) {
    margin: 0 auto;
    width: 500px;
  }
`

export const MatchCode = styled.div`
  position: relative;
  width: 100%;
  text-align: center;

  .border-divider {
    border-top: 2px dashed #2F2F2F;
    border-bottom: 2px dashed #2F2F2F;
    width: 100%;
    height: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    background: #FAFAFA !important;
    font-weight: 700 !important;
    padding: 0 5px !important;
    position: relative;
    z-index: 1;
  }
`
export const PayCode = styled.div`
  width: 100%;
`

export const InfoWrapper = styled.div`
  border-radius: 13px;
  position: relative;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;

  .label {
    margin: 0 auto;
    width: 200px;
    margin-left: 110px;
  }

  .cliqq-hand {
    bottom: 0;
    left: 0;
    position: absolute;
  }
`
