import styled from 'styled-components'

const BannerSliderWrapper = styled.div`
  color: #333;
  margin: auto auto 20px;
  position: relative;
  width: 100%;
  display: block;

  img {
    width: 100%;
    margin: 0 auto;
  }

  

  .slick-initialized {
    // left: 50%;
    //   position: absolute;
    //   top: 50%;
    //   transform: translate(-50%, -50%);
    //   width: 100%;
  }

  .slick-slide {
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

// const BrandLogo = styled.div`
//   height: 45px;
//   position: absolute;
//   top: 15px;
//   width: 100%;

//   &:before {
//     background: url(${props => props.brand}) no-repeat center center / contain;
//     content: '';
//     height: 100%;
//     left: 50%;
//     margin-right: -50%;
//     position: absolute;
//     top: 0;
//     transform: translate(-50%);
//     width: 60%;
//   }

//   @media (min-width: 768px) {
//     height: 80px;
//     top: 10px;

//     &:before {
//       width: 80%;
//     }
//   }
// `

export {
  BannerSliderWrapper,
  ImageWrapper
}
