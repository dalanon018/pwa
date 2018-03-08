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

  @media (min-width: 768px) {
    .brand-logo {
      width: 300px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1365px) {
    .accordion.ui .title {
      padding: 25px 200px !important;
    }
    .collapse-content {
      padding: 5px 200px !important;
    }
  }
  @media (min-width: 1366px) {
    .accordion.ui .title {
      margin: 0 auto;
      width: 700px;
    }
    .collapse-content {
      margin: 0 auto;
      width: 700px;
    }
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
  position: relative;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;

  .image {
    margin: 0 auto;
    position: relative;
    width: 200px;
    z-index: 2;
  }

  @media (min-width: 768px) {
    .image {
      width: 350px;
    }
  }
`
const StepWrapper = styled.div`
  margin-bottom: 90px;
  padding: 15px 14px;

  &.visibility {
    display: ${({ visibility }) => visibility ? 'block' : 'none'};
    // height: ${({ visibility }) => visibility ? '175px' : '0'};
    // margin-bottom: ${({ visibility }) => visibility ? '90px' : '0'}; !important;
    // padding: ${({ visibility }) => visibility ? '15px 14px' : '0'}; !important;
    transition: all .3s ease;

    span {
      align-self: flex-start;
      flex: none;
    }

    @media (min-width: 1024px) and (max-width: 1365px) {
      padding: 15px 200px;
    }
    @media (min-width: 1366px) {
      margin: 0 auto;
      width: 700px;
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

  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 35px;
    margin: 30px 0;
    padding: 0;

    span {
      display: block;
      font-size: 16px;
      font-weight: 100;
      letter-spacing: 4px;
      margin-bottom: 20px;
    }

    &.step-three {
      margin-bottom: 10px;
    }
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

  @media (min-width: 768px) {
    .checkbox {

      .label-custom {
        flex-wrap: wrap;
        padding-left: 50px !important;
      }
      input:before {
        border: 3px solid #F0F0F0 !important;
      }
      input:checked~label:before {
        border: 3px solid #8DC640 !important;
        height: 22px;
        width: 22px;
      }
      input:checked~label:after {
        width: 5px;
        height: 11px;
        left: 8px;
        top: 42% !important;
      }
    }
    .checkbox {
      border-radius: 10px;
      padding: 40px 30px;
    }
  }
`

const LocationButton = styled(({iconBg, ...props}) => <Button {...props} />)`
  background: transparent !important;
  border-radius: 5px !important;
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

  @media (min-width: 768px) {
    button {
      padding: 20px 70px!important;
    }
  }

  @media (min-width: 1024px) {
    button {
      span {
        font-size: 21px;
      }
    }
  }
`

const ReviewContainer = styled.div`
  margin-bottom: 65px;
`

const MethodTitle = styled.div`
  margin-top: 10px;
  padding: 0 14px;
`

const CustomGrid = styled.div`
  @media (min-width: 1024px) and (max-width: 1365px) {
    padding: 0 200px !important;
  }
  @media (min-width: 1366px) {
    margin: 0 auto !important;
    width: 700px;
  }
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
  CustomGrid
}
