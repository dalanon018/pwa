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
  border-bottom: 1px solid #EBEBEB;

  img {
    width: 60%;
  }
`

export const ImageBanner = styled(AnimateDiv)`
  align-self: stretch;
  background-color: #F0F0F0;
  display: flex;
  justify-content: center;
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
export const CodeImage = styled.img`
  float: left;
  width: 32px;
  margin-right: 10px;

  @media (min-width: 768px) {
    width: 20px;
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

export const ShareIcon = styled.img`
  width: 23px;
  margin-right: 10px;
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
  border-bottom: 1px solid #F0F0F0;
  @media (min-width: 768px) {
    border-bottom: 0;
  }
`
export const DetailsTitle = styled.p`
  text-transform: uppercase;
  font-size: 14px
  letter-spacing: 3px;
  margin: 10px 0;

  @media (min-width: 768px) {
    font-family: 'helveticabold';
    font-size: 16px;
    letter-spacing: 4px;
  }
`
export const DetailsDescription = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-family: 'helveticamedium';
    font-size: 14px;
  }
`
export const ButtonContainer = styled(AnimateDiv)`
  background-color: #FFFFFF;
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
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
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

// Desktop
export const BrandInfo = styled(AnimateDiv)`
  .brand-wrapper {
    display: block;
    margin-bottom: 20px;
    overflow: hidden;
    img {
      float: right;
      width: 300px;
    }
  }
`

export const OrderButtonWrapper = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    .custom-button {
      text-align: left !important;
    }
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
