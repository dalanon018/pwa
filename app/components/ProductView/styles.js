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
`

const ProductPriceWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: center;

  .product-price {
    font-family: 'Roboto';
    letter-spacing: -2px;
    line-height: 30px;
    padding: 0;
  }

  .product-discount {
    font-family: 'Roboto';
    letter-spacing: -2px;
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
