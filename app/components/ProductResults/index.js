import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { Grid } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'

import H6 from 'components/H6'

import CliqqLogo from 'images/icons/cliqq.png'

const PurchaseWrapper = styled.div`
  cursor: pointer;
  height: 100%;
  margin: 5px 0;
`

const ProductWrapper = styled.div`
  background-color: #F0F0F0;
  border: 2px solid  #AEAEAE;
  border-radius: 5px;
  display: flex;
  height: 100%;
  margin: 0 auto;
  min-height: 140px;
`
const ProductImage = styled.div`
  background: url(${({background}) => background}) no-repeat center / contain;
  margin: 10px;
  width: 100%;
`

const ProductDescription = styled.div`
  padding: 20px
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  justify-content: center;
  letter-spacing: 2px;
  width: 65%;
  
  h6 {
    line-height: 10px;
    text-align: right;
    width: 100%;
  }

  @media (min-width: 992px) {
    width: 60%;
  }
`

const CodeWrapper = styled.span`
  color: #AEAEAE;
`

const CodeImage = styled.img`
  float: left;
  width: 19px;
  margin-right: 10px;
`

const ProductLogoImage = styled.img`
  width: 180px;
  max-width: 100%;
`

class ProductResult extends React.PureComponent {
  static propTypes = {
    product: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._goToProduct = this._goToProduct.bind(this)
  }

  _goToProduct () {
    const { product, changeRoute } = this.props
    changeRoute(`/product/${product.get('cliqqCode').first()}`)
  }

  render () {
    const { product } = this.props

    return (
      <Grid.Column>
        <PurchaseWrapper>
          <ProductWrapper onClick={this._goToProduct}>
            <ProductImage background={product.get('image') ? product.get('image') : imageStock('default-slider.jpg')} />
            <ProductDescription>
              <CodeWrapper> <CodeImage src={CliqqLogo} />
                { product.get('cliqqCode').join(', ') }
              </CodeWrapper>
              <H6 uppercase> { product.get('title') } </H6>
              {
                product.get('brandLogo') &&
                <ProductLogoImage src={product.get('brandLogo')} />
              }
            </ProductDescription>
          </ProductWrapper>
        </PurchaseWrapper>
      </Grid.Column>
    )
  }
}

export default ProductResult
