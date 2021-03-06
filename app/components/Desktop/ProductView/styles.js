import styled from 'styled-components'

const ProductWrapper = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  background-color: #FFFFFF;
  border-radius: 10px;
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
  max-height: 175px;
  width: 100%;

  .image {
    border-radius: 10px 10px 0 0;;
    height: 100%;
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
  height: 175px;
  max-height: 175px;
`

const ProductInfo = styled.div`
  display: block;
  margin-top: 10px;
  padding: 0 15px 10px;

  .brand-name {
    display: block;
    height: ${props => props.brandName ? 'auto' : '19px'};
    min-height: 19px;
    max-height: 19px;
  }

  .product-name {
    min-height: 34px;
    max-height: 34px;
    overflow: hidden;
    // padding: 0 15px !important;
  }

  @media (min-width: 767px) {
    .product-name {
      min-height: 35px;
    }
  }
`

const ProductPriceWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;

  .product-price {
    letter-spacing: -1.5px;
    line-height: 22px;
    padding: 0;
  }

  .product-discount {
    letter-spacing: -1.5px;
    margin-left: 5px;
    text-decoration: line-through;
  }
`

const FullPointsWrapper = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;

  img {
    width: 24px !important;
    margin-right: 5px!important;
  }

  .product-price {
    letter-spacing: -1.5px;
    line-height: 22px;
    padding: 0;
  }
`

export {
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  FullPointsWrapper,
  ProductWrapper,
  ImageContent
}
