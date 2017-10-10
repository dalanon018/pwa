import styled from 'styled-components'

const BannerWrapper = styled.div`
  @media (min-width: 768px) {
    padding: 0 14px;
  }
`
const SearchWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`

const SearchContainer = styled.div`
  @media (min-width: 767px) {
    margin: 0 14px;
  }
`

export {
  BannerWrapper,
  SearchWrapper,
  SearchContainer
}
