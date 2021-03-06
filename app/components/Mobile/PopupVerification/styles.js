import styled from 'styled-components'

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
  padding: 10px;
`

const PopupContent = styled.div`
  padding: 15px 35px;
  max-width: 355px;
  margin: 0 auto;

  @media (min-width: 375px) {
    padding: 15px 50px;
  }
`

const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 30px;
  justify-content: center;
  width: 150px;
  margin: 25px auto;

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

const BannerHeader = styled.div`
  background: url(${props => props.background}) no-repeat top right / cover;
  height: 100px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;

  .image {
    align-self: center;
    width: 20px;
  }

  span {
    border-radius: 50px;
    bottom: -35px;
    display: flex;
    height: 80px;
    justify-content: center;
    left: 50%;
    transform: translate(-50%);
    margin-right: -50%;
    margin: 0 auto;
    position: absolute;
    width: 80px;
    z-index: 1;
  }
`

const ResendWrapper = styled.div`
  text-align: center;
  display: flex;
  margin-bottom: 55px;

  .resend-content {
    display: flex;
    margin: 0 auto;
  }

  span {
    margin-left: 5px;
  }

  img {
    width: 16px;
    height: 16px;
    margin: auto 0;
  }
`

export {
  PopupWrapper,
  TextWrapper,
  PopupContainer,
  BannerHeader,
  InputWrapper,
  PopupContent,
  ResendWrapper
}
