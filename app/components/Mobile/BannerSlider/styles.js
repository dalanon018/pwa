import styled from 'styled-components'

const BannerSliderWrapper = styled.div`
  color: #333;
  position: relative;
  width: 100%;
  display: block;
  margin-bottom: 10px;

  img {
    ${props => props.curved && 'border-radius: 2px;'}
    ${props => props.curved && 'box-shadow: 0 0 5px rgba(120,120,120, 0.1);'}
    margin: 0 auto;
    width: 100%;
  }

  .slick-list {
    ${props => props.curved && 'border-radius: 5px;'}
    padding-bottom: ${props => props.isLowerdots ? '15px' : '0'};
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
    position: relative;

    li {
      height: 25px;
      margin: 0;
      width: 13px;
      button {
        height: 17px;
        padding: 3px;
        width: 17px;
      }
      &.slick-active {
        button:before {
          color: #7D878C;
          opacity: .90;
        }
      }
      button:before {
        color: #A7B4BD;
        font-size: 6px;
        opacity: .50;
      }
    }
  }
`

const ImageWrapper = styled.div`
  background: url(${props => props.image}) no-repeat center center / cover;
  height: 200px;
  width: 100%;
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
