import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

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
  margin-bottom: 58px;

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
  .slick-slider {
    z-index: 1;
  }

  img {
    width: 60%;
  }

  @media screen and (min-width: 1024px) {
    img {
      width: 350px;
    }
  }
`

export const ProductMainContent = styled(AnimateDiv)`
  margin: 20px 0;

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
    letter-spacing: -2px;
    padding: 0;
    font-size: 2rem !important;
  }

  .product-discount {
    letter-spacing: -2px;
    text-decoration: line-through;
    margin-left: 10px;
  }
`

export const FullPointsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  img {
    width: 32px !important;
    height: 32px !important;
    margin-right: 5px!important;
  }

  .product-price {
    // font-size: 2.714286rem !important;
    font-size: 30px !important;
    letter-spacing: -2px;
    padding: 0;
  }
`

export const DetailsWrapper = styled(AnimateDiv)`
  align-self: stretch;

  .brand-title {
    cursor: pointer;
  }

  .accordion.ui .title {
    padding: 25px;
  }
`

export const DeliveryPolicy = styled(AnimateDiv)`
  // padding: 20px 0;
`

export const ProductDetailsContainer = styled(AnimateDiv)`
  padding: 20px 0 35px 0;
  font-weight: 100;

  .dangerous-html {
    font-size: 15px;
    font-weight: 400;
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
  .ui.button.primary {
    padding: 16px 40px !important;
  }
`

export const SocialContainer = styled.div`
  padding: 10px 0;
  text-align: center;
  width: 100%;
`

export const ShareWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;

  .share-item {
    display: flex;
    align-items: center;
    margin-bottom: 0 !important;
    margin-right: 5px;
  }

  .share-button {
    cursor: pointer;
    margin: 0 5px;
  }

  .mail.icon {
    font-size: 20px;
    line-height: 18px !important;
  }
`

export const DetailsContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px 0 !important;

  img {
    width: 40px;
    margin-top: 8px;

    &.deliver-icon {
      width: 55px;
    }

    &.return-icon {
      margin: 0 8px 0 7px;
    }
  }

  div.collapse-description {
    padding-left: 10px !important;
  }

  .description-title {
    margin-bottom: 5px !important;
  }
`
export const EmailDesktopWarning = styled.div`
  .notification {
    margin: 100px 0px 0px !important;
  }
`

export const SizesWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  .no-margin {
    margin: 0 !important;
  }

  .ui.radio.checkbox {
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
    height: 45px;
    margin: 5px;
    width: 45px;

    &:focus, &:active, &:visited {
      border: 2px solid #FF4813;
    }
  }
`

export const CustomGrid = styled(Grid.Column)`
  &.active {
    z-index: -1;
  }
`

export const LeftColumnWrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`

export const CustomRow = styled(Grid.Row)`
  background: #FFFFFF;
  border-radius: 10px;
  padding: 50px 0 !important;
`

export const PointsInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;

  img{
    margin-right: 12px;
    width: 25px;
  }
`
