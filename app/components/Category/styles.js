import styled from 'styled-components'

const CategoryBlock = styled.div`
  // background: url(${props => props.background}) no-repeat center center / cover;
  // display: flex;
  // justify-content: center;
  // margin: ${props => props.margin}px;
  // position: relative;
  // text-align: center;
  margin: ${props => props.margin ? props.margin : '2'}px;

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

  .category-image {
    position: relative;
  }

  // @media (min-width: 320px) {
  //   &.responsive-width {
  //     height: ${props => props.height}px;
  //   }
  // }
`

const CategoryLabel = styled.span`
  color: #5b5b5b;
  font-family: helveticabold;
  font-size: ${props => props.fontSize}px;
  line-height: 0;
  text-transform: uppercase;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`

const CategoryItem = styled.div`
  align-self: center;
  padding: 0 5px;
  text-align: center;
  z-index: 2;

  @media (min-width: 320px) {
    img {
      margin: 0 auto;
      width: ${props => props.width ? props.width : '30'}px;
    }
  }

  // This is for Home page only
  @media (min-width: 768px) {
    img {
      width: 60px;
    }
  }
`

const CategoryContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export {
  CategoryLabel,
  CategoryBlock,
  CategoryContent,
  CategoryItem
}
