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

export const HeaderWrapper = styled(AnimateDiv)`
  align-items: center;
  color: #AEAEAE;
  display: flex;
  font-size: 21px;
  justify-content: center;
  letter-spacing: 2px;

  @media (min-width: 768px) {
    font-size: 16px;
    justify-content: flex-start;
    letter-spacing: 4px;
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
    color: #AEAEAE !important;
    font-family: 'Roboto';
    letter-spacing: -2px;
    text-decoration: line-through;
    margin-left: 10px;
  }
`
export const ProductPriceTitle = styled.p`
  color: #AEAEAE;
  font-size: 12px;
  font-weight: 100;
  text-transform: uppercase;
`
export const ProductPrice = styled.p`
  color: #F88728;
  font-family: 'helveticabold';
  font-size: 29px;
  line-height: inherit;
  margin: 10px 0;
  text-transform: uppercase;
`
export const ProductPriceStrike = styled.span`
  color: #aeaeae;
  font-size: 16px;
  line-height: initial;
  text-decoration: line-through;
  text-transform: uppercase;

  @media (min-width: 375px) {
    font-size: 16px;
  }
`
export const ShareItemWrapper = styled(AnimateDiv)`
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid #F0F0F0;
  border-top: 1px solid #F0F0F0;
  color: #5B5B5B;
  display: flex;
  font-size: 16px;
  justify-content: center;
  letter-spacing: 1px;
  padding: 17px 0;
  text-transform: uppercase;
  width: 100%;
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
  color: #5B5B5B;
  font-weight: 100;

  @media (min-width: 768px) {
   padding: 15px 0;
  }
`
export const ProductDetails = styled(ProductDetailsContainer)`
  border-bottom: 1px solid #F0F0F0;
  color: #aeaeae;
  @media (min-width: 768px) {
    border-bottom: 0;
  }
`
export const ShippingDetails = styled(ProductDetailsContainer)`
  margin-bottom: 60px;
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

export const SocialButtonWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  height: ${props => props.visibility ? '60px' : '0'};
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;

  .SocialMediaShareButton {
    margin: 0 10px;
  }

  .copy-to-clipboard {
    align-items: center;
    background-color: #F6A22D;
    border-radius: 50px;
    color: #FFFFFF;
    display: flex;
    font-size: 18px;
    height: 40px;
    justify-content: center;
    margin: 0 10px;
    width: 40px;

    &:before {
      margin-top: 3px;
    }
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

  .copy-to-clipboard {
    align-items: center;
    background-color: #F6A22D;
    border-radius: 50px;
    color: #FFFFFF;
    display: flex;
    font-size: 18px;
    height: 30px;
    justify-content: center;
    width: 30px;

    &:before {
      margin-top: 3px;
    }
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

export const CodeWrapper = styled(AnimateDiv)`
  align-items: center;
  color: #AEAEAE;
  display: flex;
  font-size: 21px;
  justify-content: flex-end;
  letter-spacing: 2px;
`

export const ShareIcons = styled(AnimateDiv)`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;

  p {
    color: #5B5B5B;
    margin-bottom: 0;
    margin-right: 10px;
  }

  .icons-wrapper {
    display: flex;

    .SocialMediaShareButton {
      margin: 0 2px;
    }
  }

  svg {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    margin: 20px 0;
  }
`
export const DigitsWrapper = styled(AnimateDiv)`
  margin: 10px 0;

  label {
    color: #aeaeae;
    font-family: 'helveticalight';
    font-size: 16px;
    text-transform: uppercase;
  }

  @media (min-width: 768px) {
    label {
      font-size: 15px;
    }
  }
`

export const DesktopPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  
  p {
    color: ${props => props.colorHex ? props.colorHex : '#5B5B5B'};
    font-family: 'helveticabold';
    font-size: 40px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 0;
    margin-right: 20px;
  }

  span {
    font-family: 'helveticalight';
    line-height: 20px;
  }

  @media (min-width: 768px) {
    margin-top: 5px;
    
    p {
      font-size: 41px;
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

  img {
    width: auto;
    height: 30px;
  }

  div.collapse-description {
    padding-left: 10px !important;
  }

  .description-title {
    margin-bottom: 5px !important;
  }
`
