/**
*
* ProductView
*
*/

import React from 'react'
import {
  range
} from 'lodash'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'
import { Grid, Image } from 'semantic-ui-react'

import {
  ImageWrapper,
  ProductName,
  ProductPrice,
  ProductPriceStrike,
  ProductPriceWrapper,
  ProductWrapper
} from './styles'

import EmptyDataBlock from 'components/EmptyDataBlock'

import PromoTag from './sections/PromoTag'
import ProductImage from 'images/test-images/samplebag.png'
import EmptyImage from 'images/broken-image.jpg'
import ParagraphImage from 'images/test-images/short-paragraph.png'

function ProductView ({
  loader,
  products
}) {
  console.log(range(4))
  return (
    <Grid.Row stretched columns={2}>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
        : products.valueSeq().map((product) => {
          return (
            <Grid.Column key={product.get('product_id')} className='padding__none' mobile={8} tablet={4} computer={3} widescreen={3}>
              <ProductWrapper>
                <PromoTag text='sale!' />
                <ImageWrapper>
                  <Image src={ProductImage} />
                </ImageWrapper>
                <ProductName>all day backpack all day backfdgffd  hdfghpack | (WINE)</ProductName>
                <ProductPriceWrapper>
                  <ProductPrice>php 549</ProductPrice>
                  <ProductPriceStrike>php 1000</ProductPriceStrike>
                </ProductPriceWrapper>
              </ProductWrapper>
            </Grid.Column>
          )
        })
      }
    </Grid.Row>
  )
}

const DefaultState = () => {
  return (
    <Grid.Column className='padding__none' mobile={8} tablet={4} computer={3} widescreen={3}>
      <EmptyDataBlock>
        <ProductWrapper>
          <ImageWrapper background={EmptyImage} className='custom-height' />
          <Image src={ParagraphImage} height={50} />
        </ProductWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

ProductView.propTypes = {

}

export default ProductView
