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
  margin: 30px 0 10px;
  width: 100%;
`

export const WarningDescription = styled.div`
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

  section > p {
    margin: 0 !important;
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
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 3;

  .ui.button.primary {
    padding: 20px 40px !important;
  }
`

// ====================
export const ReceiptWrapper = styled.div`
  position: relative;
`

export const ReceiptContainer = styled.div`
  box-shadow: 0px 0px 10px rgba(174,174,174, 0.8);

  margin: 50px 20px 0;
`

export const ReceiptHeader = styled.div`
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
  border-bottom: 2px solid #F0F0F0;
  margin-top: 40px;
  padding: 14px;
`

export const InstructionsWrapper = styled.div`
  padding: 0 10px;
  position: relative;
  margin-bottom: 30px;
  width: 100%;
`
