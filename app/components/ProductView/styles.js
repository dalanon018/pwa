import styled from 'styled-components'

const ProductWrapper = styled.div`
  border-bottom: 3px solid #C5C5C5;
  display: block;
  margin-bottom: 20px;
  position: relative;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
  animation-delay: 1.5s

  &:first-child {
    margin-right: 4px;
  }
  &:last-child {
    margin-left: 4px;
  }
`

const ImageWrapper = styled.div`
  background-color: #F0F0F0;
  margin-bottom: 15px;

  .image {
    width: 100%;
  }
`

const ProductName = styled.p`
  color: #555555;
  font-size: .9em;
  text-transform: uppercase;
`

const ProductPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const ProductPrice = styled.p`
  color: #F88728;
  font-size: 2.3em;
  line-height: 1em;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: 320px) {
    font-size: 2.1em;
  }
  @media (min-width: 375px) {
    font-size: 2.3em;
  }
`

const ProductPriceStrike = styled.span`
  align-self: flex-end;
  color: #C5C5C5;
  font-size: .8em;
  text-decoration: line-through;
  text-transform: uppercase;
  
  @media (min-width: 375px) {
    font-size: .9em;
  }
`

const RibbonWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 8px;

  // sorting styles is sensitive on ribbon-tag class
  .ribbon-tag {
    background: #9bcb49;
    border-bottom: 2px solid #9bcb49;
    display: flex;
    height: 60px;
    justify-content: center;
    line-height: 60px;
    position: relative;
    text-align: center;
    vertical-align: middle;
    width: 60px;

    &:after, &:before {
      content: '';
      position: absolute;
      border-top: 25px solid #9bcb49;
      height: 0;
      width: 0;
      top: 100%;
    }

    &:after {
      border-left: 50px solid transparent;
      right: 0px;
    }

    &:before {
      border-right: 50px solid transparent;
      left: 0px;
    }

    .ribbon-text {
      align-items: center;
      color: #FFFFFF;
      display: inline-flex;
      margin-top: 10px;
      font-size: 1.5em;
      padding: 5px;
      line-height: 1em;
      text-align: center;
    }
`

export {
  ImageWrapper,
  ProductName,
  ProductPrice,
  ProductPriceStrike,
  ProductPriceWrapper,
  ProductWrapper,
  RibbonWrapper
}
