import styled from 'styled-components'

const PopupWrapper = styled.div`
  background-color: #FFFFFF;;
  bottom: 0;
  height: ${props => props.toggle ? '100vh' : '0'};
  // height: 100vh;
  color: #5B5B5B;
  left: 0;
  overflow: auto;
  position: fixed;
  transition: all .3s ease;
  width: 100%;
  z-index: 999999;
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

  input {
    font-size: 30px;
    margin-left: 10px;
    padding: 4px 6px 0 6px;
    width: 73%;
  }
  
  span {
    color: #AEAEAE;
  }
`

const TextWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;
`

const BannerHeader = styled.div`
  background: url(${props => props.background}) no-repeat top right / cover;
  height: 85px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;

  .image {
    width: 20px;
  }

  span {
    background-color: #F6A22D;
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

const TitleHead = styled.div`
  font-size:  14px;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-family: 'helveticabold';
  letter-spacing: 2px;
`

export {
  PopupWrapper,
  TextWrapper,
  PopupContainer,
  BannerHeader,
  InputWrapper,
  TitleHead,
  PopupContent
}
