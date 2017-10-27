/**
*
* ProductView
*
*/

import React from 'react'
import { range } from 'lodash'

import {
  identity,
  ifElse
} from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Image, Label } from 'semantic-ui-react'

import messages from './messages'
import {
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  ProductWrapper
} from './styles'

import EmptyDataBlock from 'components/EmptyDataBlock'
import defaultImage from 'images/default-product.jpg'

import ParagraphImage from 'images/test-images/short-paragraph.png'

import { imageStock, paramsImgix } from 'utils/image-stock'

function ProductView ({
  loader,
  products,
  changeRoute,
  windowWidth
}) {
  const imgixOptions = {
    w: 175,
    h: 175,
    fit: 'clamp',
    auto: 'compress',
    q: 35,
    lossless: 0
  }

  const productName = (data) => {
    let maxChar = 33
    switch (true) {
      case (windowWidth >= 767):
        maxChar = 100
        break
    }

    if (data.length > maxChar) {
      return `${data.slice(0, maxChar)}...`
    }
    return data
  }

  const toggleOrigDiscountPrice = (product) => {
    return (product.get('discountPrice') && parseFloat(product.get('discountPrice')).toLocaleString()) ||
    parseFloat(product.get('price')).toLocaleString()
  }

  const showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)

  return (
    <Grid padded stretched columns={2}>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
        : products.valueSeq().map((product, index) => {
          const goToProduct = () => changeRoute(`/product/${product.get('cliqqCode').first()}`)
          const toggleDiscountLabel = showDiscountPrice(
            <FormattedMessage {...messages.peso} />,
            null
          )
          const toggleDiscountValue = showDiscountPrice(
            parseFloat(product.get('price')).toLocaleString(),
            null
          )

          return (
            <Grid.Column
              key={`${product.get('cliqqCode')}-${index}`}
              onClick={goToProduct}>
              <ProductWrapper>
                <ImageWrapper>
                  <Image alt={productName(product.get('title'))} src={(product.get('image') && `${paramsImgix(product.get('image'), imgixOptions)}`) || defaultImage} />
                </ImageWrapper>
                <ProductInfo brandName={product.get('brand')}>
                  <Label as='span' className='brand-name color__secondary' basic size='medium'>{product.getIn(['brand', 'name'])}</Label>
                  <Label className='no-bottom-margin product-name color__secondary' as='p' basic size='tiny'>{productName(product.get('title'))}</Label>
                  <ProductPriceWrapper>
                    <Label className='product-price' as='b' color='orange' basic size='massive'>
                      <FormattedMessage {...messages.peso} />
                      { toggleOrigDiscountPrice(product) }
                    </Label>
                    <Label className='product-discount' as='span' color='grey' basic size='large'>
                      { toggleDiscountLabel(product.get('discountPrice') !== 0) }
                      { toggleDiscountValue(product.get('discountPrice') !== 0) }
                    </Label>
                  </ProductPriceWrapper>
                </ProductInfo>
              </ProductWrapper>
            </Grid.Column>
          )
        })
      }
    </Grid>
  )
}

const DefaultState = () => {
  const imgixOptions = {
    auto: 'compress',
    q: 75,
    lossless: 0
  }

  return (
    <Grid.Column width={8}>
      <EmptyDataBlock>
        <ProductWrapper>
          <ImageWrapper>
            <Image alt='Cliqq' src={paramsImgix(imageStock('default-product-loader.jpg'), imgixOptions)} className='empty-image' />
          </ImageWrapper>
          <Image alt='Cliqq' src={ParagraphImage} height={50} />
        </ProductWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

ProductView.propTypes = {

}

export default ProductView
