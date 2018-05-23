import styled from 'styled-components'
import BoxBorder from 'images/backgrounds/box-border.png'

const PopupWrapper = styled.div`
  bottom: 0;
  height: ${props => props.toggle ? '100vh' : '0'};
  left: 0;
  overflow: auto;
  position: fixed;
  transition: all .3s ease;
  width: 100%;
  z-index: 999;
  text-align: center;
`

const PopupContainer = styled.div`
  display: block;
`

const PopupContent = styled.div`
  padding: 15px 35px;
  max-width: 355px;
  margin: 0 auto;
`

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 30px;
  justify-content: center;
  margin-bottom: 20px;
  width: 150px;
  margin: 0 auto 20px;

  input {
    font-size: 2.514286rem;
    margin-left: 10px;
    padding: 4px 6px 0 6px;
    width: 100%%;
    text-align: center;
  }

  span {
    font-size: 2.514286rem;
  }
`

const TextWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
`

const ResendWrapper = styled.div`
  display: flex;
  margin: 20px 0 30px;
  text-align: center;

  .resend-content {
    display: flex;
    margin: 0 auto;
  }

  span {
    margin-left: 10px;
  }

  img {
    width: 16px;
    height: 16px;
    margin: auto 0;
  }
`

const RegistrationWrapper = styled.div`
  background-color: #F7F7F7;
  height: 100vh;

  .ui.primary.button {
    margin: 0 auto;
    padding: 20px 40px !important;
    width: 200px;
  }
`

const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 230px;
`

const BoxWrapper = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 2px solid #EBEBEB;
  min-height: 360px;
  padding: 30px;
  position: relative;
  width: 100%;

  &:before {
    background: url(${BoxBorder}) no-repeat;
    bottom: 0;
    content: '';
    height: 90%;
    left: -60px;
    position: absolute;
    width: 96px;
    z-index: -1;
  }

  &:after {
    background: url(${BoxBorder}) no-repeat;
    top: 0;
    content: '';
    height: 90%;
    right: -60px;
    position: absolute;
    width: 96px;
    transform: scale(-1, -1);
    z-index: -1;
  }
`

const ImageLogo = styled.img`
  width: 115px;
  margin-bottom: 20px;
`

export {
  PopupWrapper,
  TextWrapper,
  PopupContainer,
  InputWrapper,
  PopupContent,
  ResendWrapper,
  RegistrationWrapper,
  ContentWrapper,
  BoxWrapper,
  ImageLogo
}
