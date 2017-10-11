import styled from 'styled-components'

const PopupWrapper = styled.div`
  background-color: #FFFFFF;;
  bottom: 0;
  height: ${props => props.toggle ? '100vh' : '0'};
  color: #5B5B5B;
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
  @media (min-width: 375px) {
    padding: 15px 50px;
  }
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

const BannerHeader = styled.div`
  background: url(${props => props.background}) no-repeat top right / cover;
  height: 85px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;

  .image {
    align-self: center;
    width: 20px;
  }

  span {
    background-color: #D7D7D7;
    border-radius: 50px;
    border: 3px solid #FFFFFF;
    bottom: -35px;
    display: flex;
    height: 75px;
    justify-content: center;
    left: 50%;
    transform: translate(-50%);
    margin-right: -50%;
    margin: 0 auto;
    position: absolute;
    width: 75px;
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

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
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
