import styled from 'styled-components'

const BannerWrapper = styled.div`
  display: block;
  height: 100%;
  
  @media (max-width: 320px) {
    min-height: 224px;
  }

  @media (min-width: 768px) {
    padding: 0 14px;
  }
`
const ContentWrapper = styled.div`
  @media(min-width: 768px) {
    .header-label {
      padding: 35px 15px 14px;
    }

    .header-label span {
      font-size: 20px;
    }
  }
`

export {
  BannerWrapper,
  ContentWrapper
}
