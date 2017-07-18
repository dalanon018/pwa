import styled from 'styled-components'

const ProductWrapper = styled.div`
  border-bottom: 2px solid #aeaeae;
  display: block;
  margin: 0 3px 20px;
  position: relative;

  // not included on sorting
  animation:fadeIn ease-in 1;
  animation-duration: .5s;
`

const ImageWrapper = styled.div`
  background-color: #f0f0f0;
  background: url(${props => props.background}) no-repeat center center / cover;
  margin-bottom: 10px;
  width: 100%;

  .image {
    width: 100%;
  }
  &.custom-height {
    height: 37vh;
  }
`

const ProductName = styled.p`
  color: #5b5b5b;
  font-family: 'helveticabold';
  font-size: .58em;
  margin-bottom: 3px;
  text-transform: uppercase;
`

const ProductPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const ProductPrice = styled.p`
  color: #F88728;
  font-family: 'helveticabold';
  font-size: 2.3em;
  line-height: inherit;
  margin: 0;
  text-transform: uppercase;

  @media (min-width: 320px) {
    font-size: 1.6em;
  }
  @media (min-width: 375px) {
    font-size: 1.75em;
    line-height: initial;
  }
`

const ProductPriceStrike = styled.span`
  align-self: flex-end;
  color: #aeaeae;
  font-size: .6em;
  line-height: initial;
  text-decoration: line-through;
  text-transform: uppercase;
  
  @media (min-width: 375px) {
    font-size: .7em;
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
      font-family: 'helveticabold';
      font-size: 1.4em;
      line-height: 1em;
      margin-top: 10px;
      padding: 5px;
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
