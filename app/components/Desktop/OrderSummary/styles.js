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
  font-family: 'Cabin';
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
  margin-bottom: 90px;
  padding: 15px 14px;

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
  padding: 0 14px;
  width: 100%;

  .checkbox {
    border-radius: 5px;
    border: 2px solid #F0F0F0;
    height: 100%;
    padding: 10px;
    position: relative;
    width: 100%;

    &.checked {
      border: 2px solid #8DC640;
    }

    input:checked~label:after {
      // Don't sort this block
      content: '';
      background-color: #8DC640 !important;
      left: 6px;
      top: ${props => props.checkHeight ? '29px' : '17px'};
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
  font-family: 'Cabin' !important;
  letter-spacing: 2px;
  padding: 20px 10px !important;
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

const ButtonContainer = styled.div`
  background: #f58322;
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;

  .ui.button.primary {
    padding: 20px 40px !important;
  }
`

const ReviewContainer = styled.div`
  margin-bottom: 65px;
`

const MethodTitle = styled.div`
  margin-top: 10px;
  padding: 0 14px;
`

const ProductContainer = styled.div`
  align-items: center;
  border-radius: 3px;
  border: 2px solid #ebebeb;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 15px;
`

const ProductDetails = styled.div`
  flex-grow: 2;
`

export {
  StepHead,
  SelectMethodWrapper,
  ProductItem,
  ReviewContainer,
  DetailsWrapper,
  LocationButton,
  ProductReviewWrapper,
  ButtonContainer,
  MethodTitle,
  StepWrapper,
  ProductDetails,
  ProductContainer
}
