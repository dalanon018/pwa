/**
*
* ProductView
*
*/

import React from 'react'
import LazyLoad from 'react-lazyload'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Grid from 'react-virtualized/dist/commonjs/Grid'


import { range } from 'lodash'

import {
  identity,
  ifElse
} from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Image, Label } from 'semantic-ui-react'

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

  const ProductEntity = ({ rowIndex, isScrolling, key, style }) => {

    if (products.size === 0 ) {
      return (
        <div key={rowIndex}>
          loading..
        </div>
      )
    }
    console.log(rowIndex, key)
    const entity = products.get(rowIndex)
    return (
        <ProductWrapper key={`${key}`}>
          <ImageWrapper>
            <ImageContent>
              <LazyLoad
                height={300}
                offset={300}
                placeholder={<LoadingIndicator />}
                once
              >
                <Image alt={entity.get('title')} src={(entity.get('image') && `${paramsImgix(entity.get('image'), imgixOptions)}`) || imageStock('Brands-Default.jpg', imgixOptions)} />
              </LazyLoad>
            </ImageContent>
          </ImageWrapper>
          <ProductInfo brandName={entity.get('brand')}>
            <Label as='span' className='brand-name color__secondary' basic size='medium'>{entity.getIn(['brand', 'name'])}</Label>
            <Label className='no-bottom-margin product-name color__secondary' as='p' basic size='tiny'>{entity.get('title')}</Label>
          </ProductInfo>
        </ProductWrapper>
    )
  }

  return (
    <AutoSizer disableHeight>
    {
      ({ width, height }) => (
        <Grid
          autoContainerWidth
          autoHeight
          columnWidth={(width)}
          height={200}
          width={width}
          rowHeight={200}
          columnCount={1}
          rowCount={(products.size)}
          cellRenderer={ProductEntity}
        />
      )
    }
    </AutoSizer>
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
