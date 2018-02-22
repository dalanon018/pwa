/**
*
* ProductView
*
*/

import React from 'react'
import LazyLoad from 'react-lazyload'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'


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

const cache = new CellMeasurerCache({
  minHeight: 100,
  fixedWidth: true,
  fixedHeight: true,
});

function ProductView ({
  loader,
  products,
  changeRoute,
  windowWidth,
  customElement
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

  const ProductEntity = ({ index, isScrolling, key, style }) => {

    if (products.size === 0 ) {
      return (
        <div key={index}>
          loading..
        </div>
      )
    }
    console.log(index, key)
    const entity = products.get(index)
    return (
      <ProductWrapper key={`${key}`} style={style}>
        <ProductInfo brandName={entity.get('brand')}>
          <Label as='span' className='brand-name color__secondary' basic size='medium'>{entity.getIn(['brand', 'name'])}</Label>
          <Label className='no-bottom-margin product-name color__secondary' as='p' basic size='tiny'>{entity.get('title')}</Label>
        </ProductInfo>
      </ProductWrapper>
    )
  }

  return (
    <WindowScroller
      scrollElement={customElement || window}
    >
      {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              autoHeight
              height={height}
              width={width}
              rowHeight={cache.rowHeight}
              rowCount={products.size}
              rowRenderer={ProductEntity}
              overscanRowCount={15}
              scrollTop={scrollTop}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
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
