import styled from 'styled-components'

const CategoryBlock = styled.div`
  background: url(${props => props.background}) no-repeat center center / cover;
  display: flex;
  justify-content: center;
  margin: 2px;
  position: relative;
  text-align: center;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;

  &:before {
    background-color: rgba(255, 255, 255, 0.7);
    content: '';
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  @media (min-width: 320px) {
    &.responsive-width {
      height: 22vw;
    }
    img {
      margin: 0 auto;
      width: 6vw;
    }
  }
`

const CategoryLabel = styled.span`
  color: #5b5b5b;
  font-size: .6em;
  font-weight: bold;
  text-transform: uppercase;
`

const CategoryItem = styled.div`
  align-self: center;
  position: relative;
  z-index: 2;
`

export {
  CategoryLabel,
  CategoryBlock,
  CategoryItem
}
