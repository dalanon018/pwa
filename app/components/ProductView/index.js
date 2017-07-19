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

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Grid, Image } from 'semantic-ui-react'

import {
  CustomGridRow,
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
  products,
  changeRoute
}) {
  return (
    <CustomGridRow stretched columns={2}>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
        : products.valueSeq().map((product) => {
          return (
            <Grid.Column key={product.get('product_id')} className='padding__none' mobile={8} tablet={4} computer={3} widescreen={3} onClick={() => changeRoute(`/product/${product.get('product_id')}`)}>
              <ProductWrapper>
                {
                  product.getIn(['discount']).size &&
                  <PromoTag text={product.getIn(['discount', 'percent'])} />
                }
                <ImageWrapper>
                  <Image src={ProductImage} />
                </ImageWrapper>
                <ProductName>{product.get('title')}</ProductName>
                <ProductPriceWrapper>
                  <ProductPrice>
                    <FormattedMessage {...messages.peso} />
                    {
                      product.getIn(['discount']).size
                      ? Math.abs(
                        parseFloat(
                          product.get('price') *
                          `.${
                            product.getIn(['discount', 'percent']).length > 1
                            ? product.getIn(['discount', 'percent'])
                            : `0${product.getIn(['discount', 'percent'])}`
                          }` -
                          product.get('price').toLocaleString()
                        )
                      )
                      : parseFloat(product.get('price')).toLocaleString()
                    }
                  </ProductPrice>
                  <ProductPriceStrike>
                    <FormattedMessage {...messages.peso} />
                    {
                      product.getIn(['discount']).size >= 1 &&
                      parseFloat(product.get('price')).toLocaleString()
                    }
                  </ProductPriceStrike>
                </ProductPriceWrapper>
              </ProductWrapper>
            </Grid.Column>
          )
        })
      }
    </CustomGridRow>
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
