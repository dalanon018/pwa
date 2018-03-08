import styled from 'styled-components'

const ProductWrapper = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(120,120,120, 0.1);


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
  padding: 0 15px;

  .brand-name {
    display: block;
    height: ${props => props.brandName ? 'auto' : '19px'};
    min-height: 19px;
    max-height: 19px;
  }

  .product-name {
    min-height: 37px;
    max-height: 37px;
    overflow: hidden;
    // padding: 0 15px !important;
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
  justify-content: flex-start;

  .product-price {
    color: #FF4814 !important;
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
  top: 10px;
  right: 0;

  .ribbon-tag {
    align-items: middle;
    background: #FFC60B;
    border-radius: 3px 0 0 3px;
    display: flex;
    flex-wrap: wrap;
    font-size: 11px;
    font-weight: 700;
    height: 38px;
    justify-content: center;
    line-height: 14px;
    padding: 4px;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 40px;

    span {
      line-height: 10px;
      margin-top: -5px;
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
