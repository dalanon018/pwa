import styled from 'styled-components'

const TextWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;

  p {
    letter-spacing: 2px;
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

const ButtonWrapper = styled.div`
  padding: 0 20px;
`

export {
  BannerHeader,
  ButtonWrapper,
  TextWrapper,
  TitleHead
}
