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

import { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'
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

const cache = new CellMeasurerCache({
  minHeight: 300,
  fixedWidth: true,
  fixedHeight: true
})

function ProductView ({
  loader,
  products,
  changeRoute,
  windowWidth,
  customElement
}) {
  const columnCount = windowWidth > 767 ? 4 : 2
  const rowCount = Math.ceil(products.size / columnCount)

  const toggleOrigDiscountPrice = (product) => {
    const showPrice = product.get('discountPrice') || product.get('price')

    return showPrice ? showPrice.toLocaleString() : 0
  }

  const showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)

  const ProductEntityInfo = (entity) => {
    const toggleDiscountLabel = showDiscountPrice(
      <FormattedMessage {...messages.peso} />,
      null
    )
    const toggleDiscountValue = showDiscountPrice(
      parseFloat(entity.get('price')).toLocaleString(),
      null
    )

    return (
      <ProductWrapper>
        <ImageWrapper>
          <ImageContent>
            <LazyLoad
              height={300}
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
          <ProductPriceWrapper>
            <Label className='product-price' as='b' color='orange' basic size='massive'>
              <FormattedMessage {...messages.peso} />
              { toggleOrigDiscountPrice(entity) }
            </Label>
            <Label className='product-discount' as='span' color='grey' basic size='large'>
              { toggleDiscountLabel(entity.get('discountPrice') !== 0) }
              { toggleDiscountValue(entity.get('discountPrice') !== 0) }
            </Label>
          </ProductPriceWrapper>
        </ProductInfo>
      </ProductWrapper>
    )
  }

  const ProductEntity = ({ index, isScrolling, key, style }) => {
    const entity1 = products.get(index)
    const entity2 = products.get(index * columnCount)

    return (
      <Grid
        padded
        stretched
        columns={columnCount}
        key={`${key}`}
        style={style}
      >
        <Grid.Column>
          { ProductEntityInfo(entity1) }
        </Grid.Column>
        <Grid.Column>
          { ProductEntityInfo(entity2) }
        </Grid.Column>
      </Grid>
    )
  }

  return (
    <WindowScroller
      scrollElement={customElement || window}
    >
      {({height, isScrolling, registerChild, onChildScroll, scrollTop}) =>
        (loader && products.size === 0) ? (
          <Grid
            padded
            stretched
            columns={columnCount}>
            <DefaultState key={1} loader={loader} />
            <DefaultState key={2} loader={loader} />
          </Grid>
        ) : (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                autoHeight
                height={height}
                width={width}
                rowHeight={cache.rowHeight}
                rowCount={rowCount}
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
