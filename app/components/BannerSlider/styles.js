import styled from 'styled-components'

const BannerSliderWrapper = styled.div`
  background: #FFFFFF;
  color: #333;
  margin: auto auto 20px;
  width: 100%;

  img {
    width: 100%;
  }

  img {
    width: 100%;
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

export {
  BannerSliderWrapper
}
