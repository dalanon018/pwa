import styled from 'styled-components'
import { Modal } from 'semantic-ui-react'
import LeftDesign from 'images/backgrounds/prompt-left.png'
import RightDesign from 'images/backgrounds/prompt-right.png'

const CustomModal = styled(Modal)`
  background: transparent !important;
  border-radius: 5px;
  box-shadow: none !important;
`

const DetailsWrapper = styled.div`
  margin: 10px;
`

const ButtonWrapper = styled.div`
  text-align: center;
`

const BannerHeader = styled.div`
  // background: url(${props => props.background}) no-repeat top right / cover;
  height: 62px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;

  @media (min-width: 320px) {
    border-radius: 4px 4px 0 0;
  }

  @media (min-width: 768px) {
    border-radius: 10px 10px 0 0;
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
  background-color: #FFFFFF;
  border-radius: 10px !important;
  margin: 0 240px;
  position: relative;

  .content {
    padding: 0 50px 30px !important;
  }

  .ui.button.primary {
    padding: 18px 45px !important;
  }

  // &:before {
  //   background: url(${LeftDesign})no-repeat;
  //   border-radius: 5px;
  //   bottom: 0;
  //   content: '';
  //   height: 47px;
  //   left: 0;
  //   position: absolute;
  //   width: 120px;
  // }

  // &:after {
  //   background: url(${RightDesign})no-repeat;
  //   border-radius: 5px;
  //   bottom: 0;
  //   content: '';
  //   height: 44px;
  //   position: absolute;
  //   right: 0;
  //   width: 106px;
  // }
`

export {
  BannerHeader,
  DetailsWrapper,
  ModalContainer,
  ButtonWrapper,
  CustomModal
}
