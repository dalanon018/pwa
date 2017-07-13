/**
*
* ProductView
*
*/

import React from 'react'
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
import EmptyImage from 'images/test-images/empty-image.png'
import ParagraphImage from 'images/test-images/short-paragraph.png'

function ProductView ({
  loader
}) {
  return (
    <Grid.Row stretched columns={2}>
      <Grid.Column className='padding__none' mobile={8} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <ProductWrapper>
            <ImageWrapper>
              <Image src={ProductImage} />
            </ImageWrapper>
            <ProductName>all day backpack all day backfdgffd  hdfghpack | (WINE)</ProductName>
            <ProductPriceWrapper>
              <ProductPrice>php 549</ProductPrice>
              <ProductPriceStrike>php 1000</ProductPriceStrike>
            </ProductPriceWrapper>
          </ProductWrapper>
        }
      </Grid.Column>

      <Grid.Column className='padding__none' mobile={8} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <ProductWrapper>
            { true && <PromoTag text='SALE!' /> }
            <ImageWrapper>
              <Image src={ProductImage} />
            </ImageWrapper>
            <ProductName>all day bachfghfg all day backpack | (WINE)</ProductName>
            <ProductPriceWrapper>
              <ProductPrice>php 549</ProductPrice>
              <ProductPriceStrike>php 1000</ProductPriceStrike>
            </ProductPriceWrapper>
          </ProductWrapper>
        }
      </Grid.Column>

      <Grid.Column className='padding__none' mobile={8} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <ProductWrapper>
            { true && <PromoTag text='25% OFF' /> }
            <ImageWrapper>
              <Image src={ProductImage} />
            </ImageWrapper>
            <ProductName>all day backpack all day backpack | (WINE)</ProductName>
            <ProductPriceWrapper>
              <ProductPrice>php 549</ProductPrice>
              <ProductPriceStrike>php 1000</ProductPriceStrike>
            </ProductPriceWrapper>
          </ProductWrapper>
        }
      </Grid.Column>

      <Grid.Column className='padding__none' mobile={8} tablet={4} computer={3} widescreen={3}>
        {
          !loader ? <DefaultState loader={loader} />
          : <ProductWrapper>
            <ImageWrapper>
              <Image src={ProductImage} />
            </ImageWrapper>
            <ProductName>all day backpack all day backpack | (WINE)</ProductName>
            <ProductPriceWrapper>
              <ProductPrice>php 549</ProductPrice>
              <ProductPriceStrike>php 1000</ProductPriceStrike>
            </ProductPriceWrapper>
          </ProductWrapper>
        }
      </Grid.Column>
    </Grid.Row>
  )
}

const DefaultState = ({loader}) => {
  return (
    <EmptyDataBlock>
      <ProductWrapper>
        <ImageWrapper>
          <Image src={EmptyImage} />
        </ImageWrapper>
        <Image src={ParagraphImage} height={50} />
      </ProductWrapper>
    </EmptyDataBlock>
  )
}

ProductView.propTypes = {

}

export default ProductView
