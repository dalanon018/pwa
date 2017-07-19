import styled from 'styled-components'

export const ProductWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: relative;

  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`
export const ImageBanner = styled.div`
  align-self: stretch;
  background-color: #F0F0F0;
  display: flex;
  justify-content: center;
`

export const ProductMainContent = styled.div`
  margin: 20px 10px;
`

export const HeaderWrapper = styled.div`
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
export const ProductPriceWrapper = styled.div`
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
export const ShareItemWrapper = styled.div`
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
`
export const DetailsWrapper = styled.div`
  align-self: stretch;
`
export const ProductDetailsContainer = styled.div`
  padding: 25px 15px;
  color: #5B5B5B;
  font-weight: 100;
`
export const ProductDetails = styled(ProductDetailsContainer)`
  border-bottom: 1px solid #F0F0F0;
`
export const ShippingDetails = styled(ProductDetailsContainer)`
  // margin-bottom: 60px;
`
export const DetailsTitle = styled.p`
  text-transform: uppercase;
  font-size: 14px
  letter-spacing: 3px;
  margin: 10px 0;
`
export const DetailsDescription = styled.p`
  font-size: 12px
  letter-spacing: 1px;
  line-height: 1.5;
`
export const ButtonContainer = styled.div`
  // bottom: 0;
  // left: 0;
  // position: fixed;
  // width: 100%;
  padding: 10px;
`
