import styled from 'styled-components'

const BannerSliderWrapper = styled.div`
  color: #333;
  position: relative;
  width: 100%;
  display: block;
  margin-bottom: 10px;

  img {
    width: 100%;
    margin: 0 auto;
  }

  .slick-list {
    padding-bottom: ${props => props.isLowerdots ? '15px' : '0'};
    overflow: ${props => props.hover && 'inherit'};
    ${
      props =>
      (!props.active && props.toggleLightBox) &&
      'width: 350px; margin: 0 auto;'
    }
    
  }

  .slick-slide {
    opacity: ${props => props.hover && 0};
  }

  .slick-prev:before, .slick-next:before {
    color: #000000 !important;
  }

  .slick-active {
    opacity: 1;
    position: relative;
    z-index: 1;
  }
  
  .slick-cloned {
    overflow: ${props => props.hover && 'hidden'};
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
    
    // div[style='cursor: crosshair; width: 350px; height: 350px; position: relative; user-select: none;'] {
    //   margin: 0 auto;
    // }
  }

  .slick-dots {
    ${
      props => props.isProductPage
      ? `
        align-content: baseline;
        bottom: inherit;
        display: ${props => props.active ? 'none' : 'flex'} !important;
        flex-wrap: wrap;
        height: 350px;
        left: 0;
        overflow: auto;
        top: 0;
        width: 90px;
        z-index: 1;

        li {
          height: auto;
          margin: 0;
          width: inherit;
    
          img {
            width: 60px;
          }
          &.slick-active {
            img {
              border: 2px solid #AEAEAE;
            }
          }
        }
      `
      : `
        bottom: 0;
        
        li {
          margin: 0;
        }
      `
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
