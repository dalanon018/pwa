import styled from 'styled-components'

const BannerWrapper = styled.div`
  @media (min-width: 768px) {
    padding: 0 14px;
  }
`
const ContentWrapper = styled.div`
  @media(min-width: 768px) {
    .header-label {
      padding: 35px 15px 14px !important;
    }

    .header-label span {
      font-size: 20px !important;
    }
  }
`

export {
  BannerWrapper,
  ContentWrapper
}
