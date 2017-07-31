import styled from 'styled-components'

const CategoryBlock = styled.div`
  background: url(${props => props.background}) no-repeat center center / cover;
  display: flex;
  justify-content: center;
  margin: ${props => props.margin}px;
  position: relative;
  text-align: center;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;

  &:before {
    background-color: rgba(255, 255, 255, 0.7);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  @media (min-width: 320px) {
    &.responsive-width {
      height: ${props => props.height}px;
    }
    img {
      margin: 0 auto;
      width: ${props => props.width}px;
    }
  }
`

const CategoryLabel = styled.span`
  color: #5b5b5b;
  font-family: helveticabold;
  font-size: ${props => props.fontSize}px;
  line-height: 0;
  text-transform: uppercase;
`

const CategoryItem = styled.div`
  align-self: center;
  padding: 0 5px;
  position: relative;
  z-index: 2;
`

export {
  CategoryLabel,
  CategoryBlock,
  CategoryItem
}
