import styled from 'styled-components'

const BannerWrapper = styled.div`
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

const SearchWrapper = styled.div`
  background-color: #F0F0F0;
  padding: 6px 14px;

  .input {
    width: 100%;
  }
`

export {
  BannerWrapper,
  ContentWrapper,
  SearchWrapper
}
