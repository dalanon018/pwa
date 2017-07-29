import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

const StepHead = styled.div`
  align-items: center;
  color: #5B5B5B;
  display: flex;
  flex-wrap: wrap;
  font-family: 'helveticabold';
  font-size: 13px;
  letter-spacing: 3px;
  margin-bottom: 15px;
  text-transform: uppercase;

  p {
    align-self: flex-start;
    color: #AEAEAE;
    flex: none;
    font-family: 'helveticamedium';
    font-size: 10px;
    letter-spacing: initial;
    margin-left: 40px;
    margin-top: -10px;
    text-transform: none;
  }

  span {
    margin-left: 10px;
  }

  &:before {
    align-items: center;
    border-radius: 50px;
    border: 2px solid #9BCB49;
    color: #9BCB49;
    content: '${props => props.step}'
    display: flex;
    flex: none;
    font-size: 14px;
    height: 30px;
    justify-content: center;
    padding: 1px 0 1px 3px;
    text-align: center;
    width: 30px;
  }
`

const ProductItem = styled.div`
  background-color: #F0F0F0;
  padding: 20px 10px 8px;
  position: relative;
  text-align: center;
  width: 100%;

  &:before {
    background: url(${props => props.brand})no-repeat center center / contain;
    content: '';
    height: 17px;
    left: 50%;
    margin-right: -50%;
    position: absolute;
    text-align: center;
    top: 10px;
    transform: translate(-50%);
    width: 180px;
    z-index: 2;
  }

  .image {
    margin: 0 auto;
    width: 80px;
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
`

const ProductName = styled.div`
  color: #5B5B5B;
  font-family: 'helveticabold';
  font-size: 18px;
  letter-spacing: 2px;
  margin: 20px 0;
  text-align: center;
  text-transform: uppercase;
`

const StepContent = styled.div`
  padding: 0 15px;
`

const StepWrapper = styled.div`
  border-top: 3px solid #AEAEAE;
  margin-bottom: 15px;

  &.visibility {
    display: ${props => props.visibility ? 'block' : 'none'};

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
    font-family: 'helveticamedium' !important;
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
    letter-spacing: 2px;
  }

  p {
    margin: 10px 0 20px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const SelectMethodWrapper = styled.div`
  .checkbox {
    border-radius: 5px;
    border: 1px solid #F0F0F0;
    height: 100%;
    padding: 20px 10px;
    position: relative;
    width: 100%;

    &.checked {
      border: 2px solid #9BCB49;
    }
    
    input:checked~label:after {
      // Don't sort this block
      content: '';
      background-color: #9BCB49 !important;
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
      background-color: #9BCB49 !important;
      border-color: #9BCB49 !important;
      height: 18px;
      width: 18px;
    }

    .label-custom {
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }
  }

  // Custom style alignment for checkbox semantic
  .ui.radio.checkbox .box:before, .ui.radio.checkbox label:before {
    top: 50%;
    transform: translateY(-50%);
  }
  .ui.radio.checkbox .box:after, .ui.radio.checkbox label:after {
    top: 41%;
    transform: translateY(-50%);
  }
`

const LabelTitle = styled.p`
  color: #333333 !important;
  font-family: 'helveticabold';
  font-size: 14px;
  letter-spacing: 2px;
  margin: 0;
`

const LabelSubTitle = styled.span`
  font-size: 10px;
  color: #AEAEAE;
`

const LabelPrice = styled.div`
  margin-top: 10px;

  .total {
    color: #F88728;
    font-family: 'helveticabold';
    font-size: 25px;
    line-height: inherit;
    margin-right: 10px;
    margin: 0;
    text-transform: uppercase;
  }
  .strike {
    align-self: flex-end;
    color: #aeaeae;
    font-size: 9px;
    line-height: initial;
    text-decoration: line-through;
    text-transform: uppercase;
  }
`

const LocationButton = styled(Button)`
  background: transparent !important;
  border-radius: 5px !important;
  border: 1px solid #F0F0F0 !important;
  font-family: 'helveticabold' !important;
  letter-spacing: 2px;
  padding: 20px 10px !important;
  position: relative;
  text-align: left !important;
  
  span {
    color: #333333;
  }

  &:after {
    background: url(${props => props.icon}) no-repeat center center / contain;
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
  background: #FFFFFF;
  bottom: 0;
  left: 0;
  padding: 0 10px 10px;
  position: fixed;
  width: 100%;
`

const ReviewContainer = styled.div`
  margin-bottom: 50px;
`

export {
  StepHead,
  StepContent,
  SelectMethodWrapper,
  LabelSubTitle,
  ProductItem,
  ReviewContainer,
  DetailsWrapper,
  LocationButton,
  CliqqCodeWrapper,
  ViewDetails,
  ButtonContainer,
  ProductName,
  LabelPrice,
  StepWrapper,
  LabelTitle
}