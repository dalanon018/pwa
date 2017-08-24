import styled from 'styled-components'

const NavCategoriesWrapper = styled.div`
  background-color: #8DC640;
  color: #FFFFFF;
  font-size: 7px;
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

const NavCategoriesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 40px;
  padding: 0 20px;
  position: relative;
  width: 100%;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`

const CategoryItem = styled.div`
  position: relative;
  text-align: center;

  p {
    text-transform: uppercase;
  }
`

const DefaultName = styled.p`
  background-color: #AEAEAE;
  height: 3px;
  overflow: hidden;
  width: 100%;
`

const DefaultIcon = styled.div`
  background: url(${props => props.background})no-repeat center center / cover;
  border-radius: 50px;
  height: 30px;
  margin: 0 auto;
  width: 30px;
`

export {
  CategoryIcon,
  DefaultName,
  NavCategoriesWrapper,
  DefaultIcon,
  CategoryItem,
  NavCategoriesContainer
}
