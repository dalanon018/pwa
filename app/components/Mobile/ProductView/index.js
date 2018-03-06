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
  ifElse,
  range
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
  // RibbonWrapper
} from './styles'

import EmptyDataBlock from 'components/Shared/EmptyDataBlock'
import LoadingIndicator from 'components/Shared/LoadingIndicator'

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
  customElement,
  onRowsRendered,
  registerChild,
  over18,
  isMinor
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
    // make sure not to display if undefined
    if (!entity) {
      return null
    }

    const toggleDiscountLabel = showDiscountPrice(
      <FormattedMessage {...messages.peso} />,
      null
    )
    const toggleDiscountValue = showDiscountPrice(
      parseFloat(entity.get('price')).toLocaleString(),
      null
    )
    const goToProduct = () => !isMinor || over18
    ? changeRoute(`/product/${entity.get('cliqqCode').first()}`)
    : changeRoute('/')

    // const togglePromoTage = () => {
    //   return (
    //     <RibbonWrapper>
    //       <div className='ribbon-tag'>
    //         <Label as='b' className='color__white padding__none' basic size='medium'>20%</Label>
    //         <Label as='span' className='color__white padding__none' basic size='small'>OFF</Label>
    //       </div>
    //     </RibbonWrapper>
    //   )
    // }

    return (
      <ProductWrapper onClick={goToProduct}>
        <ImageWrapper>
          <ImageContent>
            <LazyLoad
              height={300}
              offset={300}
              placeholder={<LoadingIndicator />}
          >
              {
              !isMinor || over18
              ? <Image alt={entity.get('title')} src={(entity.get('image') && `${paramsImgix(entity.get('image'), imgixOptions)}`) || imageStock('Brands-Default.jpg', imgixOptions)} />
              : <Image alt='CLiQQ' src={imageStock('Brands-Default.jpg', imgixOptions)} className='empty-image' />
            }
            </LazyLoad>
          </ImageContent>
        </ImageWrapper>
        <ProductInfo brandName={entity.get('brand')}>
          <Label as='span' className='brand-name color__grey' basic size='small'>{entity.getIn(['brand', 'name'])}</Label>
          <Label className='no-bottom-margin product-name color__secondary' as='p' basic size='medium'>{entity.get('title')}</Label>
          <ProductPriceWrapper>
            <Label className='product-price' as='b' basic size='massive'>
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
    const fromIndex = index * columnCount
    const toIndex = fromIndex + columnCount
    const render = range(fromIndex, toIndex).map((rangeIndex) => (
      <Grid.Column key={rangeIndex}>
        { ProductEntityInfo(products.get(rangeIndex)) }
      </Grid.Column>
    ))

    return (
      <Grid
        padded
        stretched
        columns={columnCount}
        key={`${key}`}
        style={style}
      >
        { render }
      </Grid>
    )
  }

  return (
    <WindowScroller
      scrollElement={customElement || window}
    >
      {({height, scrollTop}) =>
        (loader && products.size === 0) ? (
          <Grid
            padded
            stretched
            columns={columnCount}>
            {range(1, columnCount).map((ranger) => (
              <DefaultState key={ranger} loader={loader} />
            ))}
          </Grid>
        ) : (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                onRowsRendered={onRowsRendered}
                ref={registerChild}
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
