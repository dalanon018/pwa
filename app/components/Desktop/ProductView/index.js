/**
*
* ProductView
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import LazyLoad from 'react-lazyload'
import Waypoint from 'react-waypoint'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

// import { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'
import {
  allPass,
  both,
  compose,
  complement,
  cond,
  equals,
  identity,
  ifElse,
  range
} from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Image, Label } from 'semantic-ui-react'

import CliqqIcon from 'images/icons/cliqq.png'
import ParagraphImage from 'images/test-images/short-paragraph.png'

import { imageStock, paramsImgix } from 'utils/image-stock'
import { toggleOrigDiscountPrice } from 'utils/product'
import { isFullPointsOnly } from 'utils/payment'

import EmptyDataBlock from 'components/Shared/EmptyDataBlock'
import RibbonWrapper from 'components/Shared/RibbonWrapper'
import LoadingIndicator from 'components/Shared/LoadingIndicator'

import messages from './messages'
import {
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  FullPointsWrapper,
  ProductWrapper,
  ImageContent
} from './styles'

const imgixOptions = {
  w: 300,
  h: 300,
  auto: 'compress',
  q: 35,
  lossless: 0
}

// const cache = new CellMeasurerCache({
//   minHeight: 300,
//   fixedWidth: true,
//   fixedHeight: true
// })

const _toggleOrigDiscountPrice = (product) => {
  const showPrice = toggleOrigDiscountPrice(product)

  return showPrice.toLocaleString()
}

const showDiscountPrice = (component1, component2) => (condition) => ifElse(
  identity,
  () => component1,
  () => component2
)(condition)

const _displayFullPointsPrice = (entity) => {
  const pointsPrice = entity.get('pointsPrice') ? entity.get('pointsPrice') : 0
  return (
    <FullPointsWrapper>
      <Image src={CliqqIcon} className='cliqq-plain-icon' alt='CLiQQ' />
      <Label as='b' basic size='big' className='product-price color__primary text__weight--700'>
        { pointsPrice.toLocaleString() }
      </Label>
    </FullPointsWrapper>
  )
}

const _displayProductPrice = (entity) => {
  const toggleDiscountLabel = showDiscountPrice(
    <FormattedMessage {...messages.peso} />,
    null
  )
  const toggleDiscountValue = showDiscountPrice(
    parseFloat(entity.get('price')).toLocaleString(),
    null
  )

  return (
    <ProductPriceWrapper>
      <Label className='product-price color__primary text__weight--700' as='b' basic size='big'>
        <FormattedMessage {...messages.peso} />
        { _toggleOrigDiscountPrice(entity) }
      </Label>
      <Label className='product-discount text__weight--500 color__grey' as='span' basic size='small'>
        { toggleDiscountLabel(entity.get('discountPrice') !== 0) }
        { toggleDiscountValue(entity.get('discountPrice') !== 0) }
      </Label>
    </ProductPriceWrapper>
  )
}

const _toggleFullPointsOnly = (entity) => {
  const togglePrice = ifElse(
    (product) => isFullPointsOnly({ identifier: product.get('title') }),
    _displayFullPointsPrice,
    _displayProductPrice
  )

  return togglePrice(entity)
}

const ProductEntityInfo = ({ entity, isMinor, over18, changeRoute }) => {
  // make sure not to display if undefined
  if (!entity) {
    return null
  }

  const goToProduct = () => !isMinor || over18
    ? changeRoute(`/product/${entity.get('cliqqCode').first()}`)
    : changeRoute('/')

  const togglePromoTag = () => {
    const discountInfo = entity.get('discountInfo')

    return (
      discountInfo !== null && <RibbonWrapper percentage={discountInfo && discountInfo} />
    )
  }

  return (
    <ProductWrapper onClick={goToProduct}>
      {togglePromoTag()}
      <ImageWrapper>
        <ImageContent>

          {
            !isMinor || over18
              ? <Image alt={entity.get('title')} src={(entity.get('image') && `${paramsImgix(entity.get('image'), imgixOptions)}`) || imageStock('Brands-Default.jpg', imgixOptions)} />
              : <Image alt='CLiQQ' src={imageStock('Brands-Default.jpg', imgixOptions)} className='empty-image' />
          }
        </ImageContent>
      </ImageWrapper>
      <ProductInfo brandName={entity.get('brand')}>
        <Label as='span' className='brand-name text__weight--400 color__grey' basic size='small'>{entity.getIn(['brand', 'name'])}</Label>
        <Label className='no-bottom-margin text__weight--400 product-name color__secondary margin__none' as='p' basic size='medium'>{entity.get('title')}</Label>
        { _toggleFullPointsOnly(entity) }
      </ProductInfo>
    </ProductWrapper>
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

class ProductView extends React.PureComponent {
  static defaultProps = {
    columns: 6,
    scrollToAlignment: 'start'
  }

  static propTypes = {
    showElement: PropTypes.bool,
    products: PropTypes.object.isRequired,
    columns: PropTypes.number,
    scrollToAlignment: PropTypes.string
  }

  updateWindowScroller = false

  _innerWindowScrollerRef = null

  _windowScrollerRef = (ref) => {
    this._innerWindowScrollerRef = ref
  }

  _productEntity = ({ index, isScrolling, key, style }) => {
    const { products, isMinor, over18, changeRoute, columns } = this.props
    const columnCount = columns
    const fromIndex = index * columnCount
    const toIndex = fromIndex + columnCount
    const render = range(fromIndex, toIndex).map((rangeIndex) =>
      isScrolling ? (
        <LoadingIndicator />
      ) : (
        <Grid.Column key={rangeIndex}>
          <ProductEntityInfo
            entity={products.get(rangeIndex)}
            isMinor={isMinor}
            over18={over18}
            changeRoute={changeRoute}
          />
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

  handleUpdateWindowScrollerPosition = () => {
    // means we haven't update the scroller
    // this will cause incorrect showing of the items inside the windowScroller since the items on top changes.
    // so we need to call it manually, after that we dont need to call this again.
    if (this.updateWindowScroller === false) {
      if (this._innerWindowScrollerRef) {
        this._innerWindowScrollerRef.updatePosition()
        this.updateWindowScroller = true
      }
    }
  }

  _loadingState = () => {
    const { loader, columns } = this.props
    const columnCount = columns
    return (
      <Grid
        padded
        stretched
        columns={columnCount}>
        {range(0, columnCount).map((ranger) => (
          <DefaultState key={ranger} loader={loader} />
        ))}
      </Grid>
    )
  }

  _productList = () => {
    const { products } = this.props

    return products.map((_, index) =>
      this._productEntity({
        index,
        key: index
      })
    )
  }

  _virtualizedElement = () => {
    const { products, onRowsRendered, registerChild, scrollToAlignment, columns } = this.props
    const columnCount = columns
    const rowCount = Math.ceil(products.size / columnCount)

    return (
      <WindowScroller
        ref={this._windowScrollerRef}
      >
        {({height, scrollTop}) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              return (
                <div ref={registerChild}>
                  <List
                    autoHeight
                    onRowsRendered={onRowsRendered}
                    height={height}
                    width={width}
                    rowHeight={300}
                    rowCount={rowCount}
                    rowRenderer={this._productEntity}
                    scrollToAlignment={scrollToAlignment}
                    scrollTop={scrollTop}
                    overscanRowCount={6}
                  />
                </div>
              )
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    )
  }

  render () {
    const {
      virtualized = true,
      loader,
      products
    } = this.props

    const isLoading = () => equals(true, loader)
    const recordsEmpty = () => equals(0, products.size)
    const displayLoading = both(isLoading, recordsEmpty)
    /** isLoading
     * we have to identify wether we will need to render it virtualized of simple product view
     * we do this since we are having problem if there are multiple virtualization on the same page.
     */

    const ProductRender = cond([
      [displayLoading, this._loadingState],
      [allPass([equals(true), compose(complement, displayLoading)]), this._virtualizedElement],
      [allPass([equals(false), compose(complement, displayLoading)]), this._productList]
    ])

    return (
      <Waypoint
        bottomOffset='-200px'
        onEnter={this.handleUpdateWindowScrollerPosition}
      >
        <div>
          { ProductRender(virtualized) }
        </div>
      </Waypoint>
    )
  }
}

export default ProductView
