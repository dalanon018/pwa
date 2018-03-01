import styled from 'styled-components'

const DetailsWrapper = styled.div`
  margin: 10px;
`

const ButtonWrapper = styled.div`
  text-align: center;
`

const BannerHeader = styled.div`
  background: url(${props => props.background}) no-repeat top right / cover;
  height: 85px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;

  @media (min-width: 320px) {
    border-radius: 4px 4px 0 0;
  }

  @media (min-width: 768px) {
    border-radius: 30px 30px 0 0;
  }

  .image {
    height: 35px;
    width: 30px;
  }

  span {
    align-items: center;
    background-color: ${props => props.iconBg ? props.iconBg : '#AEAEAE'};
    border-radius: 50px;
    bottom: -35px;
    display: flex;
    height: 75px;
    justify-content: center;
    left: 50%;
    margin-right: -50%;
    margin: 0 auto;
    position: absolute;
    transform: translate(-50%);
    width: 75px;
    z-index: 1;
  }
`

const ModalContainer = styled.div`
  border-radius: 30px;

  @media (min-width: 768px) {
    .content {
      padding: 30px 50px !important;
    }
  }

  @media (min-width: 320px) {
    .content {
      padding: 15px 25px 0;
    }
  }
`

export {
  BannerHeader,
  DetailsWrapper,
  ModalContainer,
  ButtonWrapper
}
