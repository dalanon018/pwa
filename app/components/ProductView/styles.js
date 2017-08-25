import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

const ProductWrapper = styled.div`
  border-bottom: 3px solid #aeaeae;
  cursor: pointer;
  display: block;
  margin: 0 3px 20px;
  position: relative;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;

  @media (min-width: 768px) {
    border-bottom: 4px solid #aeaeae;
    margin: 0 0 20px 0;
  }
`

const ImageWrapper = styled.div`
  background-color: #F0F0F0;
  margin-bottom: 10px;
  width: 100%;

  .empty-image {
    background: url(${props => props.background}) no-repeat center center / cover;
  }

  .image {
    width: 100%;
  }
  &.custom-height {
    height: 37vh;
  }
`

const ProductName = styled.p`
  color: #5b5b5b;
  font-family: 'helveticabold';
  font-size: 9px;
  margin-bottom: 3px;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`

const ProductPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`

const ProductPrice = styled.p`
  color: #F88728;
  font-family: 'helveticabold';
  line-height: inherit;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: 320px) {
    font-size: 23px;
  }
  @media (min-width: 375px) {
    font-size: 25px;
    line-height: initial;
  }
`

const ProductPriceStrike = styled.span`
  align-self: flex-end;
  color: #aeaeae;
  font-size: 9px;
  line-height: initial;
  text-decoration: line-through;
  text-transform: uppercase;
  
  @media (min-width: 375px) {
    font-size: 10px;
  }
  @media (min-width: 768px) {
    font-size: 12px;
  }
`

const RibbonWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 8px;

  // sorting styles is sensitive on ribbon-tag class
  .ribbon-tag {
    background: #8DC640;
    border-bottom: 2px solid #8DC640;
    display: flex;
    height: 60px;
    justify-content: center;
    line-height: 60px;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 60px;

    &:after, &:before {
      content: '';
      position: absolute;
      border-top: 25px solid #8DC640;
      height: 0;
      width: 0;
      top: 100%;
    }

    &:after {
      border-left: 50px solid transparent;
      right: 0px;
    }

    &:before {
      border-right: 50px solid transparent;
      left: 0px;
    }

    .ribbon-text {
      align-items: center;
      color: #FFFFFF;
      display: inline-flex;
      font-family: 'helveticabold';
      font-size: 20px;
      line-height: 20px;
      margin-top: 10px;
      padding: 5px;
      text-align: center;
      text-transform: uppercase;
    }
`

const CustomGridRow = styled(Grid.Row)`
  @media (min-width: 320px) {
    padding-bottom: 0 !important;
  }
  @media (min-width: 768px) {
    .padding__none--horizontal {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
  }
`

export {
  CustomGridRow,
  ImageWrapper,
  ProductName,
  ProductPrice,
  ProductPriceStrike,
  ProductPriceWrapper,
  ProductWrapper,
  RibbonWrapper
}
