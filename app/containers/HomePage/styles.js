import styled from 'styled-components'

const BannerWrapper = styled.div`
  display: block;
  min-height: 200px;
  padding: 0 10px;
`
const SearchWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`

const SearchContainer = styled.div`
  display: block;
`

const CategoryWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    padding: 0 250px;
  }
`

const LazyLoadWrapper = styled.div`
  padding-top: 14px;
`

export {
  BannerWrapper,
  SearchWrapper,
  SearchContainer,
  CategoryWrapper,
  LazyLoadWrapper
}
