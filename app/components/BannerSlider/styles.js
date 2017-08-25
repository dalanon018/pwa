import styled from 'styled-components'

const BannerSliderWrapper = styled.div`
  background: #F0F0F0;
  color: #333;
  display: ${props => props.productPageSlider ? 'none' : 'block'};
  margin: ${props => props.productPageTrigger ? '' : 'auto auto 20px'};
  width: 100%;

  img {
    width: 100%;
  }

  .slick-slide {
    background-color: #F0F0F0;
    position: relative;
  }

  .slick-dots {
    bottom: 0;

    li {
      height: 25px;
      margin: 0;
      width: 15px;
      button {
        height: 17px;
        padding: 3px;
        width: 17px;
      }
      &.slick-active {
        button:before {
          color: #FFFFFF;
          opacity: .90;
        }
      }
      button:before {
        color: #FFFFFF;
        font-size: 10px;
        opacity: .50;
      }
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`

const ImageWrapper = styled.div`
  background: url(${props => props.image}) no-repeat center center / cover;
  height: 200px;
  width: 100%;

  @media (min-width: 768px) {
    height: 350px;
  }
`

const BrandLogo = styled.div`
  height: 45px;
  position: absolute;
  top: 15px;
  width: 100%;

  &:before {
    background: url(${props => props.brand}) no-repeat center center / contain;
    content: '';
    height: 100%;
    left: 50%;
    margin-right: -50%;
    position: absolute;
    top: 0;
    transform: translate(-50%);
    width: 70%;
  }
`

export {
  BannerSliderWrapper,
  ImageWrapper,
  BrandLogo
}
