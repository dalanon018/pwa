import styled from 'styled-components'

const TextWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;

  p {
    font-size: 12px !important;
    letter-spacing: 2px;
    line-height: 14px;

    span {
      b {
        color: #5B5B5B;
      }
    }
  }
`

const TitleHead = styled.div`
  color: #5B5B5B;
  font-family: 'helveticabold';
  font-size:  14px;
  letter-spacing: 2px;
  margin-bottom: 15px;
  text-transform: uppercase;
`

const BannerHeader = styled.div`
  background: url(${props => props.background}) no-repeat top right / cover;
  border-radius: 30px 30px 0 0;
  height: 85px;
  margin-bottom: 40px;
  position: relative;
  width: 100%;

  .image {
    height: 35px;
    width: 30px;
  }

  span {
    align-items: center;
    background-color: ${props => props.iconBg ? props.iconBg : '#F6A22D'};
    border-radius: 50px;
    border: 3px solid #FFFFFF;
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

const ButtonWrapper = styled.div`
  padding: 0 20px;
  text-align: center;
  button {
    &:last-child {
      font-size: 12px;
      margin-right: 0;
      margin-top: 15px;
    }
  }

  @media (min-width: 768px) {
    padding: 0 80px;
  }
`

const ModalContainer = styled.div`
  border-radius: 30px;
  
  .content {
    padding: 30px 50px;
  }
`

export {
  BannerHeader,
  ButtonWrapper,
  TextWrapper,
  ModalContainer,
  TitleHead
}
