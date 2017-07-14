import styled from 'styled-components'

const NavCategoriesWrapper = styled.div`
  background-color: #71BA08;
  color: #FFFFFF;
  font-size: .6em;
  width: 100%;

  .column.row {
    padding: 7px 0;
  }
  img {
    margin: 0 auto;
  }
  p {
    margin-top: 5px;
  }
`

const CategoryIcon = styled.div`
  background: url(${props => props.background}) no-repeat center center / cover;
  content: '';
  height: 35px;
  margin: 0 auto;
  width: 35px;
`

export {
  CategoryIcon,
  NavCategoriesWrapper
}
