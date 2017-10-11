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
`

const StepHead = styled.div`
  align-items: center;
  color: #5B5B5B;
  display: flex;
  flex-wrap: wrap;
  font-family: 'Cabin';
  font-size: 13px;
  letter-spacing: 3px;
  margin-bottom: 15px;
  text-transform: uppercase;

  p {
    width: 60%;
    align-self: flex-start;
    color: #AEAEAE;
    flex: none;
    font-family: 'Roboto';
    font-size: 14px;
    letter-spacing: initial;
    font-weight: 100;
    text-transform: none;
  }

  span {
    margin: 0 auto;
  }

  // &:before {
  //   align-items: center;
  //   border-radius: 50px;
  //   border: 2px solid #8DC640;
  //   color: #8DC640;
  //   content: '${props => props.step}'
  //   display: flex;
  //   flex: none;
  //   font-size: 14px;
  //   height: 30px;
  //   justify-content: center;
  //   padding: 1px 0 1px 3px;
  //   text-align: center;
  //   width: 30px;
  // }

  @media (min-width: 768px) {
    margin-top: 20px;

    span {
      font-family: 'Cabin';
      font-size: 16px;
      letter-spacing: 4px;
      margin: 0;
    }

    &:before {
      font-family: 'Cabin';
      font-size: 16px;
      height: 33px;
      justify-content: center;
      padding-top: 0'
      width: 33px;
    }
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

const CliqqCodeWrapper = styled.div`
  align-items: center;
  color: #AEAEAE;
  display: flex;
  font-size: 18px;
  justify-content: center;
  letter-spacing: 2px;
  margin: 10px 0;

  .image {
    width: 25px;
    margin-right: 10px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    justify-content: flex-start;
    letter-spacing: 4px;
    margin: 10px 0 40px;

    .image {
      width: 20px;
    }
  }
`

const ProductName = styled.div`
  color: #5B5B5B;
  font-family: 'Cabin';
  font-size: 18px;
  letter-spacing: 2px;
  margin: 20px 0;
  text-align: center;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 25px;
    letter-spacing: 4px;
    line-height: 32px;
    margin-bottom: 15px;
    text-align: left;
    margin: 0;
  }
`

const StepWrapper = styled.div`
  border-bottom: 1px solid #F0F0F0;
  border-top: 1px solid #F0F0F0;
  margin-bottom: 90px;
  padding: 10px 14px;

  &.visibility {
    display: ${({ visibility }) => visibility ? 'block' : 'none'};

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

const ViewDetails = styled.div`
  .title {
    border-bottom: 1px solid #F0F0F0;
    border-top: 1px solid #F0F0F0;
    color: #5B5B5B !important;
    font-family: 'Cabin' !important;
    letter-spacing: 2px;
    padding: 15px 0 !important;
    text-align: center;
  }
`

const DetailsWrapper = styled.div`
  color: #5B5B5B;
  padding: 15px;

  span {
    font-size: 14px;
    text-transform: capitalize;
  }

  p {
    margin: 10px 0 20px 0;
  }

  @media (min-width: 768px) {
    font-family: 'Cabin';
    font-size: 14px;
    margin-bottom: 35px;
    margin: 30px 0;
    padding: 0;

    span {
      display: block;
      font-family: 'Cabin';
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
    padding: 20px 10px;
    position: relative;
    width: 100%;
    margin: 10px 0;

    &.checked {
      border: 2px solid #8DC640;
    }

    input:checked~label:after {
      // Don't sort this block
      content: '';
      background-color: #8DC640 !important;
      color: #FFFFFF !important;
      left: 6px;
      top: 4px;
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
  .ui.radio.checkbox .box:after, .ui.radio.checkbox label:after {
    top: 39%;
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

const LabelTitle = styled.p`
  color: #333333 !important;
  font-family: 'Cabin';
  font-size: 14px;
  margin: 0;

  @media (min-width: 768px) {
    color: #5B5B5B !important;
    font-family: 'Cabin';
    font-size: 16px;
    letter-spacing: 5px;
  }
`

const LabelSubTitle = styled.span`
  color: #AEAEAE;
  font-size: 10px;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 14px;
    margin: 10px 0;
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
    color: #f58322;
    font-family: 'Roboto';
    font-size: 35px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-right: 10px;
    margin: 0;
  }
  .strike {
    align-self: flex-end;
    color: #AEAEAE;
    font-size: 20px;
    width: 100%;
    font-family: 'Roboto';
    font-weight: 700;
    line-height: initial;
    text-decoration: line-through;
  }

  @media (min-width: 768px) {
    margin-top: 0;

    .total {
      font-size: 41px;
      font-weight: bolder;
      letter-spacing: 3px;
    }
    .strike {
      margin-left: 10px;
      font-family: 'helveticalight';
      font-size: 14px;
    }
  }

  @media (min-width: 900px) {
    .strike {
      margin-left: 20px;
      font-size: 16px;
    }
  }
`

const LocationButton = styled(({iconBg, ...props}) => <Button {...props} />)`
  background: transparent !important;
  border-radius: 5px !important;
  border: 2px solid #F0F0F0 !important;
  font-family: 'Cabin' !important;
  letter-spacing: 2px;
  padding: 20px 10px !important;
  position: relative;
  text-align: left !important;

  span {
    color: #333333;
  }

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
    padding: 0;
    position: static;
    

    button {
      padding: 20px 70px!important;
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

export {
  StepHead,
  SelectMethodWrapper,
  LabelSubTitle,
  ProductItem,
  ReviewContainer,
  DetailsWrapper,
  LocationButton,
  CliqqCodeWrapper,
  ProductReviewWrapper,
  ViewDetails,
  ButtonContainer,
  ProductName,
  MethodTitle,
  LabelPrice,
  StepWrapper,
  LabelTitle
}
