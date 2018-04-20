import styled from 'styled-components'

const BannerWrapper = styled.div`
  display: block;
  // min-height: 200px;
  min-height: 140px;
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

const CategoryIconsWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px;
`

const CategoryItem = styled.div`
  text-align: center;

  .item-label {
    padding: 0;

    @media (max-width: 375px) {
      font-size: 2.5vw !important;
    }
  }
  img {
    margin: 0 auto;
    width: 35px;
  }
`

const CustomHr = styled.div`
  border-top: 2px solid #E3E3E3;
  margin-top: 10px;
  width: 100%;
`

export {
  BannerWrapper,
  SearchWrapper,
  SearchContainer,
  CategoryWrapper,
  LazyLoadWrapper,
  CategoryIconsWrapper,
  CategoryItem,
  CustomHr
}
