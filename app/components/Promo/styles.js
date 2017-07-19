import styled from 'styled-components'

const PromoWrapper = styled.div`
  background: url(${props => props.background}) no-repeat center / cover;
  padding: 20px 15px;
  text-align: center;
  margin: 20px 0;
  width: 100%;

  h1 {
    color: #FFFFFF;
  }

  p {
    color: #FFFFFF;
    font-family: helveticabold;
    font-size: 65px;
  }
  
  img {
    width: 100%;
    
    // not included on sorting
    animation:fadeIn ease-in 1;
    animation-duration: .5s;
  }

  .item {
    margin: 10px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 375px) {
    p {
      font-size: 80px;
    }
  }
`

const DefaultPromoImage = styled.div`
  background: url(${props => props.background}) no-repeat center center / cover;
  height: 110px;
  width: 100%;
`

export {
  DefaultPromoImage,
  PromoWrapper
}
