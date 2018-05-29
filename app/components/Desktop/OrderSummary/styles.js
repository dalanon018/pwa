import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const ProductItem = styled.div`
  margin-bottom: 20px;
  
  .image {
    margin: 0 auto;
    width: 200px;
  }
`
const StepWrapper = styled.div`
  &.visibility {
    display: ${({ visibility }) => visibility ? 'block' : 'none'};
    transition: all .3s ease;

    span {
      align-self: flex-start;
      flex: none;
    }
  }

  &:first-child {
    border-top: 0;
    margin-bottom: 0;
  }
`

const CashPrepaidInfo = styled.div`
  &.visibility {
    display: ${({ visibility }) => !visibility ? 'block' : 'none'};
    transition: all .3s ease;

    span {
      align-self: flex-start;
      flex: none;
    }
  }

  &:first-child {
    border-top: 0;
    margin-bottom: 0;
  }
`

const DetailsWrapper = styled.div`
  padding: 0 15px;
`

const SelectMethodWrapper = styled.div`
  width: 100%;

  .cliqq-plain-icon {
    // width: 11px !important;
    display: inline-block !important;
    margin: -2px -5px 0;
    transform: scale(0.45);
  }

  .checkbox {
    border-radius: 5px;
    border: 1px solid #E8E8E8;
    height: 100%;
    padding: 18px 15px;
    position: relative;
    width: 100%;

    &.checked {
      border: 1px solid #FF4813;
    }

    input:checked~label:after {
      content: '';
      width: 12px;
      height: 7px;
      position: absolute;
      top: 42%;
      left: 5px;
      border: 3px solid #fcfff4;
      border-top: none;
      border-right: none;
      background: transparent !important;
      transform: rotate(-45deg);
    }

    input:checked~label:before {
      background-color: #229D90 !important;
      border-color: #229D90 !important;
      height: 24px;
      position: absolute;
      width: 24px;
    }

    .label-custom {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding-left: 35px !important;
      position: relative;
    }

    @media (min-width: 1100px) {
      width: 100%;
    }
  }

  // Custom style alignment for checkbox semantic
  .ui.radio.checkbox .box:before, .ui.radio.checkbox label:before {
    top: 50%;
    transform: translateY(-50%);
  }
`

const LocationButton = styled(({iconBg, ...props}) => <Button {...props} />)`
  background: transparent !important;
  border-radius: 5px !important;
  letter-spacing: 2px;
  padding: 20px !important;
  min-width: 320px;
  position: relative;
  text-align: left !important;

  &:after {
    background: url(${({ iconBg }) => iconBg}) no-repeat center center / contain;
    content: '';
    height: 15px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
  }
`

const BottomWrapper = styled.div`
  float-right;
  margin-top: 30px;
`

const ButtonContainer = styled.div`
  text-align: right;

  .ui.button.primary {
    padding: 20px 40px !important;
  }
`

const ReviewContainer = styled.div`
  margin-bottom: 65px;
`

const ProductContainer = styled.div`
  // align-items: center;
  // display: flex;
  // justify-content: space-between;
  // margin: 20px 0;
  padding: 20px 30px;
`

const ProductDetails = styled.div`
  flex-grow: 2;
  text-align: center;

  .base-price {
    // font-size: 2.714286rem !important;
    font-size: 30px !important;
    letter-spacing: -2px;
    padding: 0;
  }

  .orig-price {
    letter-spacing: -2px;
    text-decoration: line-through;
    margin-left: 10px;
  }

  .strike {
    align-self: flex-end;
    letter-spacing: -2px;
    margin-left: 10px;
    text-decoration: line-through;
  }
`

const LabelTitle = styled.div`
  font-size: 14px;
  margin: 0;
  flex: 1;

  img {
    width: 28px;
  }
`

const LabelPrice = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  line-height: normal;
  margin-top: 5px;
  text-align: right;

  .total {
    width: 100%;
    font-size: 35px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-right: 10px;
    margin: 0;

    @media (min-width: 1024px) {
      font-size: ${props => props.length > 4 ? '30px' : '35px'};
      line-height: 41px;
    }
  }
  .strike {
    align-self: flex-end;
    width: 100%;
    font-weight: 700;
    line-height: initial;
    text-decoration: line-through;
  }
`

const BlockWrapper = styled.div`
  display: flex;
  padding: 20px 30px;
  align-items: ${props => props.verticalCentered ? 'center' : 'flex-start'};
  width: 100%;

  .icon {
    margin-right: 20px;
  }
`

const LabelFullPointsPrice = styled(LabelPrice)`
  align-items: center;
  flex-wrap: initial;
  justify-content: flex-end;
`

const FullPointsWrapper = styled.div`
  align-items: center;
  display: flex;
`

const MethodTitle = styled.div`
  margin-top: 10px;
  padding: 0 14px;
`

const InfoBlock = styled.div`
  position: absolute;
  z-index: 1;
  // width: 300px;
  top: ${props => props.top}px;
  right: -10px;
`

const PointsPlusCash = styled.div`
  display: flex;
`

const StoreLocatorRow = styled.div`
  display: ${props => props.visibility ? 'block' : 'none'};
`

export {
  MethodTitle,
  BottomWrapper,
  ButtonContainer,
  DetailsWrapper,
  LabelPrice,
  LabelTitle,
  LocationButton,
  ProductContainer,
  ProductDetails,
  ProductItem,
  ReviewContainer,
  SelectMethodWrapper,
  StepWrapper,
  BlockWrapper,
  LabelFullPointsPrice,
  FullPointsWrapper,
  InfoBlock,
  CashPrepaidInfo,
  PointsPlusCash,
  StoreLocatorRow
}
