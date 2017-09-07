import styled from 'styled-components'
import { isNil } from 'ramda'

const BannerSliderWrapper = styled.div`
  background: #F0F0F0;
  color: #333;
  margin: ${props => !props.homeRouteName ? 'inherit' : 'auto auto 20px'};
  position: relative;
  width: 100%;
  display: block;

  img {
    width: ${props => !props.homeRouteName ? 'initial' : '100%'};
    margin: ${props => !props.homeRouteName ? '15px auto 0' : 'inherit'};
  }

  ${
    props =>
    (props.windowWidth >= 768 &&
      !props.receiptPageName) &&
    `max-height: 600px;
    min-height: 600px;`
  }

  .slick-initialized {
    ${
      props =>
      (props.windowWidth >= 768 &&
      isNil(props.homeRouteName)) &&
      `left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;`
    }
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
    width: 60%;
  }

  @media (min-width: 768px) {
    height: 80px;
    top: 10px;

    &:before {
      width: 80%;
    }
  }
`

export {
  BannerSliderWrapper,
  ImageWrapper,
  BrandLogo
}
