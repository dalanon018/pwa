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

  .checkbox-label {
    text-align: left;
  }
`

const PopupContent = styled.div`
  padding: 15px 35px;
  max-width: 355px;
  margin: 0 auto;

  @media screen and (max-width: 374px) {
    padding: 15px;
  }

`

const InputWrapper = styled.div`
  display: flex;
  font-size: 30px;
  margin-bottom: 20px;
  margin: 20px auto;

  input {
    font-size: 2.514286rem;
    margin-left: 10px;
    padding: 2px 6px 0 6px;
    width: 100%;
    font-weight: bold !important;

    @media screen and (max-width: 374px) {
      font-size: 2.5rem;
      padding: 1px 6px 0 6px;
    }
  }
  
  span {
    font-size: 2.514286rem;
    @media screen and (max-width: 374px) {
      font-size: 2.5rem;
    }
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
    border-radius: 50px;
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

const TermsConditionsWrapper = styled.div`
  bottom: 0;
  height: ${props => props.toggle ? '100vh' : '0'};
  left: 0;
  overflow: auto;
  position: fixed;
  transition: all .3s ease;
  -webkit-transition: all .3s ease;
  width: 100%;
  z-index: 1000;

  .ui.button.primary {
    padding: 25px 0;
    bottom: 0;
  }

  .terms-conditions {
    margin-bottom: 70px !important;
  }

  .tc-content {
    padding-top: 80px;
    overflow-y: auto;
    height: 100vh;
  }
`

const ButtonWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: ${props => props.toggle ? 'fixed' : 'static'};
  width: 100%;
  z-index: 1;
  padding: 0 !important;

  .ui.button.primary {
    padding: 20px 40px !important;
  }
`

const TermsConditionsHeader = styled.div`
  padding: 0.2rem 0;
  box-shadow: 1px 1px 5px rgba(174,174,174, 0.8);
  width: 100%;
  margin-bottom: 30px;
  position: ${props => props.toggle ? 'fixed' : 'static'};
  top: 0;
  left: 0;
  z-index: 1000;

  .tc-header-label {
    width: 100%;
    text-align: center;
  }

  .back-icon-container {
    display: flex;
    height: 100%;

    img {
      margin: auto 0;
      width: 20px;
      height: 20px;
    }
  }
`

export {
  PopupWrapper,
  TextWrapper,
  PopupContainer,
  BannerHeader,
  InputWrapper,
  PopupContent,
  TermsConditionsWrapper,
  ButtonWrapper,
  TermsConditionsHeader
}
