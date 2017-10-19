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
  width: 100%;

  .image {
    width: 100%;
  }
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
    padding: 0 5px !important;
  }

  @media (min-width: 767px) {
    .product-name {
      min-height: auto;
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

export {
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  ProductWrapper
}
