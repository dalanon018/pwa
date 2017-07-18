import styled from 'styled-components'

const NavCategoriesWrapper = styled.div`
  background-color: #9bcb49;
  color: #FFFFFF;
  font-size: .5em;
  text-align: center;
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
  height: 30px;
  margin: 0 auto;
  width: 30px;
`

export {
  CategoryIcon,
  NavCategoriesWrapper
}
