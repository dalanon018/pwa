import styled from 'styled-components'

import {
  Grid
} from 'semantic-ui-react'

export const ReceiptWrapper = styled.div`
`

export const ProductWrapper = styled.div`
  background-color: #FFF;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: 2px dashed #AEAEAE;
  display: flex;
  height: 140px;
  margin: 0 auto;
`
export const ProductImage = styled.div`
  background: url(${({background}) => background}) no-repeat top right / cover;
  border-bottom-left-radius: 10px;
  width: 160px;
`

export const ProductDescription = styled.div`
  padding: 20px
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: center;
  letter-spacing: 2px;
`
export const CodeWrapper = styled.span`
  color: #AEAEAE;
`

export const CodeImage = styled.img`
  float: left;
  width: 19px;
  margin-right: 10px;
`

export const ProductLogoImage = styled.img`
  width: 180px;
  max-width: 100%;
`

export const ReceiptDescription = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-top: 1px dashed #CCC;
  background-color: #FFF;
  padding: 30px 20px;
  color: #5B5B5B;
`

export const PurchaseGeneralInfo = styled.div`
  font-family: 'helveticalight'
  margin-top: 20px
  font-size: 12px;
`

export const DetailTitle = styled.div`
  margin: 5px 0;
`

export const ProductPrice = styled.p`
  color: #F88728;
  font-family: 'helveticabold';
  font-size: 29px;
  line-height: inherit;
  margin: 10px 0;
  text-transform: uppercase;
`

export const BarcodeSVG = styled.svg`
  width: 100%;
`

export const WrapperWarning = styled(Grid)`
  background-color: #8DC641;
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
  margin-top: 20px;
`
