import styled from 'styled-components'

const AnimateDiv = styled.div`
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`
export const ProductWrapper = styled(AnimateDiv)`
  // align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: relative;
  padding-top: 20px;
  margin-bottom: 70px;

  .brand-logo {
    width: 160px;
    height: auto;
    margin: 0 auto;
  }
`
export const ProductImageSlider = styled.div`

  img {
    width: 60%;
  }
`

export const ProductMainContent = styled(AnimateDiv)`
  margin: 20px 0;
  text-align: center;
  
  @media (min-width: 768px) {
    h3 {
      font-size: 25px;
      margin-bottom: 15px;
      text-align: left;
    }
  }

  .no-margin-bottom {
    margin-bottom: 0 !important;
  }
`

export const ProductPriceWrapper = styled(AnimateDiv)`
  align-self: stretch;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;

  .product-price {
    font-family: 'Roboto';
    letter-spacing: -2px;
    padding: 0;
    font-size: 2.714286rem !important;
  }

  .product-discount {
    font-family: 'Roboto';
    letter-spacing: -2px;
    text-decoration: line-through;
    margin-left: 10px;
  }
`

export const DetailsWrapper = styled(AnimateDiv)`
  align-self: stretch;

  .accordion.ui .title {
    padding: 25px !important;
  }
`

export const ProductDetailsContainer = styled(AnimateDiv)`
  padding: 35px 25px;
  font-weight: 100;
`

export const ProductDetails = styled(ProductDetailsContainer)`
  @media (min-width: 768px) {
    border-bottom: 0;
  }
`

export const ButtonContainer = styled(AnimateDiv)`
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1;

  .ui.button.primary {
    padding: 20px 40px !important;
  }
`

export const SocialContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0;
  text-align: center;
`

export const ShareWrapper = styled.div`
  display: flex;
  margin: 0 auto;

  .share-item {
    display: flex;
    align-items: center;
    margin-bottom: 0 !important;
    margin-right: 5px;
  }

  .share-button {
    margin: 0 5px;
  }
`

export const CollapseContent = styled.div`
  display: flex;
  padding: 5px 15px !important;

  img {
    width: auto;
    height: 30px;
    min-width: 45px; 
    flex: 0.1;
    margin-top: 8px;
  }

  div.collapse-description {
    padding-left: 10px !important;
  }

  .description-title {
    margin-bottom: 5px !important;
  }
`
