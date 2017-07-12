import styled from 'styled-components'

const ProductWrapper = styled.div`
  border-bottom: 3px solid #C5C5C5;
  display: block;
  margin-bottom: 20px;
  position: relative;
  opacity: ${props => props.opacity ? 1 : 0};
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
  // max-height: 260px;

  .image {
    width: 100%;
    // height: 260px;
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
    justify-content: center;
    display: flex;
    position: relative;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: 0;
    height: 60px;
    border: 30px solid #71BA08;
    border-top: 0 solid;
    border-bottom: 18px solid rgba(0,0,0,0);
    -o-text-overflow: clip;
    text-overflow: clip;

    .ribbon-text {
      align-items: center;
      color: #FFFFFF;
      display: inline-flex;
      font-size: 1.5em;
      padding: 5px;
      line-height: 1em;
      text-align: center;
    }
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
