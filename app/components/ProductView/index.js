/**
*
* ProductView
*
*/

import React from 'react'
import LazyLoad from 'react-lazyload'

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
  ProductWrapper,
  ImageContent
} from './styles'

import EmptyDataBlock from 'components/EmptyDataBlock'
import LoadingIndicator from 'components/LoadingIndicator'

import ParagraphImage from 'images/test-images/short-paragraph.png'

import { imageStock, paramsImgix } from 'utils/image-stock'

const imgixOptions = {
  w: 300,
  h: 300,
  fit: 'clamp',
  auto: 'compress',
  q: 35,
  lossless: 0
}

function ProductView ({
  loader,
  products,
  changeRoute,
  windowWidth
}) {
  const columnCount = windowWidth > 767 ? 4 : 2

  const toggleOrigDiscountPrice = (product) => {
    const showPrice = product.get('discountPrice') || product.get('price')

    return showPrice ? showPrice.toLocaleString() : 0
  }

  const showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)
  return (
    <Grid padded stretched columns={columnCount}>
      {
        // we need to make sure to show this only if only if not items yet and we are loading
        (loader && products.size === 0) ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
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
                  <ImageContent>
                    <LazyLoad
                      height={300}
                      offset={300}
                      placeholder={<LoadingIndicator />}
                      once
                    >
                      <Image alt={product.get('title')} src={(product.get('image') && `${paramsImgix(product.get('image'), imgixOptions)}`) || imageStock('Brands-Default.jpg', imgixOptions)} />
                    </LazyLoad>
                  </ImageContent>
                </ImageWrapper>
                <ProductInfo brandName={product.get('brand')}>
                  <Label as='span' className='brand-name color__secondary' basic size='medium'>{product.getIn(['brand', 'name'])}</Label>
                  <Label className='no-bottom-margin product-name color__secondary' as='p' basic size='tiny'>{product.get('title')}</Label>
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
  return (
    <Grid.Column>
      <EmptyDataBlock>
        <ProductWrapper>
          <ImageWrapper>
            <Image alt='CLiQQ' src={imageStock('Brands-Default.jpg', imgixOptions)} className='empty-image' />
          </ImageWrapper>
          <Image alt='CLiQQ' src={ParagraphImage} height={50} />
        </ProductWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

ProductView.propTypes = {

}

export default ProductView
