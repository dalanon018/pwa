import styled from 'styled-components'

const ProductWrapper = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  text-align: center;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 175px;
  width: 100%;

  .image {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .image {
      width: 420px;
      margin: 0 auto;
    }
  }
`

const ImageContent = styled.div`
  position: relative;
  min-height: 175px;
`

const ProductInfo = styled.div`
  display: block;

  .brand-name {
    display: block;
    height: ${props => props.brandName ? 'auto' : '19px'};
    min-height: 19px;
    max-height: 19px;
  }

  .product-name {
    min-height: 30px;
    max-height: 30px;
    overflow: hidden;
    padding: 0 15px !important;
  }

  @media (min-width: 767px) {
    .product-name {
      min-height: 40px;
    }
  }
`

const ProductPriceWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;

  .product-price {
    font-family: 'Roboto';
    letter-spacing: -1.5px;
    line-height: 30px;
    padding: 0;
  }

  .product-discount {
    font-family: 'Roboto';
    letter-spacing: -1.5px;
    margin-left: 5px;
    text-decoration: line-through;
  }
`

const RibbonWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 8px;

  .ribbon-tag {
    background: #db2828;
    border-bottom: 2px solid #db2828;
    display: flex;
    height: 40px;
    justify-content: center;
    position: relative;
    font-size: 11px;
    line-height: 14px;
    font-weight: 700;
    text-align: center;
    vertical-align: middle;
    width: 50px;
    align-items: middle;

    &:after, &:before {
      content: '';
      position: absolute;
      border-top: 10px solid #db2828;
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

    span {
      align-items: center;
      color: #FFFFFF !important;
      // display: inline-flex;
      padding: 5px;
      text-align: center;
      text-transform: uppercase;
    }
  }
`

export {
  RibbonWrapper,
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  ProductWrapper,
  ImageContent
}
