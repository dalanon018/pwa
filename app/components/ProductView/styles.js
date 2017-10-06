import styled from 'styled-components'

const ProductWrapper = styled.div`
  cursor: pointer;
  display: block;
  margin-bottom: 10px;
  position: relative;
  text-align: center;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`

const ImageWrapper = styled.div`
  width: 100%;

  .image {
    width: 100%;
  }
`

const ProductInfo = styled.div`

`

const ProductPriceWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  .product-price {
    color: #F58322 !important;
    font-family: 'Roboto';
    letter-spacing: -2px;
    padding: 0;
  }

  .product-discount {
    color: #AEAEAE !important;
    font-family: 'Roboto';
    letter-spacing: -2px;
    text-decoration: line-through;
  }
`

const ProductPrice = styled.p`
  color: #F88728;
  font-family: 'helveticabold';
  line-height: inherit;
  margin-top: 0;
  text-transform: uppercase;

  @media (min-width: 320px) {
    font-size: 23px;
  }
  @media (min-width: 375px) {
    font-size: 25px;
    line-height: initial;
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

export {
  ImageWrapper,
  ProductInfo,
  ProductPrice,
  ProductPriceWrapper,
  ProductWrapper,
  RibbonWrapper
}
