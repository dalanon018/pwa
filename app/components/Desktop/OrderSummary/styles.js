import React from 'react'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const ProductReviewWrapper = styled.div`
  margin: 20px 0 60px;

  .brand-logo {
    width: 200px;
    height: auto;
    margin: 0 auto;
  }
`

const StepHead = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  letter-spacing: 3px;
  margin-bottom: 15px;
  text-transform: uppercase;

  p {
    font-family: 'Roboto';
    font-size: 14px;
    letter-spacing: initial;
    font-weight: 100;
    text-transform: none;
  }

  span {
    margin: 0 auto;
  }
`

const ProductItem = styled.div`
  flex-grow: 1;
  text-align: center;

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

const DetailsWrapper = styled.div`
  padding: 15px;

  .sub-title {
    margin-bottom: 10px;
    span {
      font-size: 14px;
      text-transform: capitalize;
    }
  }

  p {
    margin-bottom: 7px;
  }
`

const SelectMethodWrapper = styled.div`
  .payment-wrapper {
    display: flex;
  }

  .label {
    letter-spacing: 2px;
  }

  .checkbox {
    border-radius: 5px;
    border: 2px solid #F0F0F0;
    margin-right: 20px;
    padding: 15px 10px;
    position: relative;
    width: 335px;

    &.checked {
      border: 2px solid #8DC640;
    }

    input:checked~label:after {
      // Don't sort this block
      content: '';
      background-color: #8DC640 !important;
      left: 6px;
      top: ${props => props.checkHeight ? '29px' : '18px'};
      display: block;
      width: 5px;
      height: 9px;
      border: solid #FFFFFF;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg) !important;
    }

    input:checked~label:before {
      background-color: #8DC640 !important;
      border-color: #8DC640 !important;
      height: 18px;
      width: 18px;
    }

    .label-custom {
      align-items: center;
      display: flex;
      justify-content: space-between;
      position: relative;
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
  padding: 20px 100px !important;
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
  align-items: center;
  border-top: 2px solid #ebebeb;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-top: 30px;
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

const MethodTitle = styled.div`
  margin-top: 10px;
`

const ProductContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 15px;
`

const ProductMain = styled.div`
  border-radius: 3px;
  border: 2px solid #ebebeb;
`

const ProductDetails = styled.div`
  flex-grow: 2;

  .base-price {
    font-family: 'Roboto';
    font-size: 35px !important;
    letter-spacing: -2px;
    margin-right: 10px;
  }

  .orig-price {
    font-family: 'Roboto';
    font-size: 20px !important;
    letter-spacing: -2px;
    text-decoration: line-through;
  }
`

const LabelTitle = styled.p`
  font-family: 'Cabin';
  font-size: 14px;
  margin: 0;

  @media (min-width: 768px) {
    font-family: 'Cabin';
    font-size: 16px;
    letter-spacing: 5px;
  }
`

const LabelPrice = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  text-align: right;
  line-height: normal;

  .total {
    width: 100%;
    font-family: 'Roboto';
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
    font-size: 20px;
    width: 100%;
    font-family: 'Roboto';
    font-weight: 700;
    line-height: initial;
    text-decoration: line-through;
  }
`

export {
  BottomWrapper,
  ButtonContainer,
  DetailsWrapper,
  LabelPrice,
  LabelTitle,
  LocationButton,
  MethodTitle,
  ProductContainer,
  ProductDetails,
  ProductItem,
  ProductMain,
  ProductReviewWrapper,
  ReviewContainer,
  SelectMethodWrapper,
  StepHead,
  StepWrapper
}
