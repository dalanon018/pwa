/**
*
* ProductView
*
*/

import React from 'react'
import {
  range,
  isEmpty
} from 'lodash'

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

import PromoTag from './sections/PromoTag'
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
    let maxChar = 40
    switch (true) {
      case (windowWidth >= 768 && windowWidth < 897):
        maxChar = 26
        break
      case (windowWidth >= 897 && windowWidth < 1192):
        maxChar = 37
        break
    }

    if (data.length > maxChar) {
      return `${data.slice(0, maxChar)}...`
    }
    return data
  }

  const toggleOrigDiscountPrice = (product) => {
    return product.get('discountPrice') || product.get('price')
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
            parseFloat(product.get('discountPrice')).toLocaleString(),
            null
          )

          return (
            <Grid.Column
              key={`${product.get('cliqqCode')}-${index}`}
              onClick={goToProduct}>
              <ProductWrapper>
                {
                  !isEmpty(product.get('discount')) &&
                  <PromoTag discount={product.get('discount')} />
                }
                <ImageWrapper>
                  <Image alt={productName(product.get('title'))} src={(product.get('image') && `${paramsImgix(product.get('image'), imgixOptions)}`) || defaultImage} />
                </ImageWrapper>
                <ProductInfo>
                  <Label as='span' className='product-name' basic size='medium'>Brand Name</Label>
                  {/* <Label as='p' basic size='small'>{productName(product.get('title'))}</Label> */}
                  <Label className='no-bottom-margin' as='p' basic size='tiny'>All Day Backpack | Blue</Label>
                  <ProductPriceWrapper>
                    <Label className='product-price' as='b' basic size='massive'>
                      <FormattedMessage {...messages.peso} />
                      { toggleOrigDiscountPrice(product) }
                    </Label>
                    <Label className='product-discount' as='span' basic size='large'>
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
