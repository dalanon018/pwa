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
  padding-bottom: 58px;
  margin-top: 20px;
  position: relative;

  .brand-logo {
    width: 160px;
    height: auto;
    margin: 0 auto;
  }

  @media (min-width: 1024px) and (max-width: 1365px) {
    .brand-logo {
      width: 300px;
    }
    .accordion.ui .title {
      padding: 25px 200px !important;
    }
    .collapse-content {
      padding: 5px 200px !important;
    }
  }
  @media (min-width: 1366px) {
    .brand-logo {
      width: 300px;
    }
    .accordion.ui .title {
      margin: 0 auto;
      width: 700px;
    }
    .collapse-content {
      margin: 0 auto;
      width: 700px;
    }
  }
`
export const ProductImageSlider = styled.div`
  img {
    width: 60%;
  }

  @media screen and (min-width: 768px) {
    img {
      width: 350px;
    }
  }
`

export const ProductMainContent = styled(AnimateDiv)`
  margin: 10px 0;
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

  .product-price {
    // font-size: 2.714286rem !important;
    font-size: 30px !important;
    letter-spacing: -2px;
    padding: 0;
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
    padding: 20px;
  }
`

export const ProductDetailsContainer = styled(AnimateDiv)`
  padding: 30px 20px;
  font-weight: 100;

  @media (min-width: 1024px) and (max-width: 1365px) {
    padding: 35px 200px;
  }
  @media (min-width: 1366px) {
    margin: 0 auto;
    width: 700px;
  }
`

export const ProductDetails = styled(ProductDetailsContainer)`
  .product-details {
    p {
      line-height: 1.4285em !important;
    }
  }

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
  padding: 10px 0;
  text-align: center;

  img {
    width: 35px;
  }
`

export const ShareWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;

  .share-button {
    cursor: pointer;
    margin: 0 5px;
  }

  .mail.icon {
    font-size: 17px;
    line-height: 15px !important;
  }
`

export const CollapseContent = styled.div`
  display: flex;
  padding: 5px 15px !important;

  img {
    width: auto;
    height: 30px;
    min-width: 40px;
    flex: 0.1;
    margin-top: 8px;
  }

  div.collapse-description {
    padding-left: 10px !important;
  }
`
export const EmailDesktopWarning = styled.div`
  .notification {
    margin: 100px 0px 0px !important;
  }
`

export const SizesWrapper = styled.div`
  padding: 10px 0 20px;
  text-align: center;

  .no-margin {
    margin: 0 !important;
  }
`

export const SizesButton = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .button-size-styled {
    background: transparent;
    border-radius: 5px;
    border: 2px solid #F0F0F0;
    height: 50px;
    margin: 5px;
    width: 50px;

    &:focus, &:active, &:visited {
      border: 2px solid #FF4813;
    }
  }
`

export const PointsInfo = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 10px;

  img{
    margin-right: 10px;
    margin-top: 2px;
    width: 16px;
  }
`
