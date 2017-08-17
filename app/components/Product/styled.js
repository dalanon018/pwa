import styled from 'styled-components'

const AnimateDiv = styled.div`
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`
export const ProductWrapper = styled(AnimateDiv)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: relative;

 ;
`
export const ImageBanner = styled(AnimateDiv)`
  align-self: stretch;
  background-color: #F0F0F0;
  display: flex;
  justify-content: center;
`

export const ProductMainContent = styled(AnimateDiv)`
  margin: 20px 10px;
`

export const HeaderWrapper = styled(AnimateDiv)`
  align-items: center;
  color: #AEAEAE;
  display: flex;
  font-size: 21px;
  justify-content: center;
  letter-spacing: 2px;

`
export const CodeImage = styled.img`
  float: left;
  width: 32px;
  margin-right: 10px;
`
export const ProductPriceWrapper = styled(AnimateDiv)`
  align-self: stretch;
  display: flex;
  align-items: center;
  flex-direction: column;
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
`
export const ProductDetailsContainer = styled(AnimateDiv)`
  padding: 25px 15px;
  color: #5B5B5B;
  font-weight: 100;

  @media (min-width: 768px) {
   padding: 15px 0;
  }
`
export const ProductDetails = styled(ProductDetailsContainer)`
  border-bottom: 1px solid #F0F0F0;

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
    font-size: 18px;
  }
`
export const DetailsDescription = styled.p`
  font-size: 12px
  letter-spacing: 1px;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-family: 'helveticalight';
    font-size: 14px;
  }
`
export const ButtonContainer = styled(AnimateDiv)`
  bottom: 0;
  left: 0;
  padding: 10px;
  position: fixed;
  width: 100%;
  z-index: 1;
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
`

// Desktop
export const DesktopImageBanner = styled(AnimateDiv)`
  width: 100%;

  .background-wrapper {
    background-color: #F0F0F0;
    margin: 10px 14px;
  }

  .product-image {
    margin: 0 auto;
  }
`

export const BrandInfo = styled(AnimateDiv)`
  .brand-wrapper {
    display: block;
    margin-bottom: 20px;
    overflow: hidden;
    img {
      float: right;
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

export const DesktopProductDetails = styled(AnimateDiv)`
  display: block;
  width: 100%;
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
`
export const DigitsWrapper = styled(AnimateDiv)`
  label {
    color: #aeaeae;
    font-family: 'helveticalight';
    font-size: 16px;
    text-transform: uppercase;
  }
`

export const DesktopPriceWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  p {
    color: ${props => props.colorHex ? props.colorHex : '#5B5B5B'};
    font-family: 'helveticabold';
    font-size: 50px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 0;
    margin-right: 20px;
  }

  span {
    font-family: 'helveticalight';
    line-height: 20px;
  }
`

export const OrderButtonWrapper = styled.div`
  text-align: center;
`
