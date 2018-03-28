/**
*
* ProductView
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import Waypoint from 'react-waypoint'

import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller'
import List from 'react-virtualized/dist/commonjs/List'

import { CellMeasurerCache } from 'react-virtualized/dist/commonjs/CellMeasurer'
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

import messages from './messages'
import {
  ImageWrapper,
  ProductInfo,
  ProductPriceWrapper,
  ProductWrapper,
  ImageContent
} from './styles'

import EmptyDataBlock from 'components/Shared/EmptyDataBlock'
import RibbonWrapper from 'components/Shared/RibbonWrapper'
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

const toggleOrigDiscountPrice = (product) => {
  const showPrice = product.get('discountPrice') || product.get('price')

  return showPrice ? showPrice.toLocaleString() : 0
}

const showDiscountPrice = (component1, component2) => (condition) => ifElse(
  identity,
  () => component1,
  () => component2
)(condition)

const ProductEntityInfo = ({ entity, isMinor, over18, changeRoute }) => {
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
        <Label as='span' className='brand-name text__weight--400 color__grey' basic size='small'>{entity.getIn(['brand', 'name'])}</Label>
        <Label className='no-bottom-margin text__weight--400 product-name color__secondary margin__none' as='p' basic size='medium'>{entity.get('title')}</Label>
        <ProductPriceWrapper>
          <Label className='product-price color__primary text__weight--700' as='b' basic size='big'>
            <FormattedMessage {...messages.peso} />
            { toggleOrigDiscountPrice(entity) }
          </Label>
          <Label className='product-discount text__weight--500 color__grey' as='span' basic size='small'>
            { toggleDiscountLabel(entity.get('discountPrice') !== 0) }
            { toggleDiscountValue(entity.get('discountPrice') !== 0) }
          </Label>
        </ProductPriceWrapper>
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
  static propTypes = {
    showElement: PropTypes.bool,
    products: PropTypes.object.isRequired
  }

  state = {
    columnCount: 2, // default mobile,
    showElement: true
  }

  _innerWindowScrollerRef = null

  _windowScrollerRef = (ref) => {
    this._innerWindowScrollerRef = ref
  }

  _productEntity = ({ index, isScrolling, key, style }) => {
    const { products, isMinor, over18, changeRoute } = this.props
    const { columnCount } = this.state

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

  _handleShowList = (show) => () => {
    this.setState({
      showElement: show
    }, () => {
      if (this._innerWindowScrollerRef) {
        this._innerWindowScrollerRef.updatePosition()
      }
    })
  }

  _loadingState = () => {
    const { loader } = this.props
    const { columnCount } = this.state
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
    const { products, onRowsRendered, registerChild } = this.props
    const { columnCount } = this.state
    const rowCount = Math.ceil(products.size / columnCount)
    return (
      <WindowScroller
        ref={this._windowScrollerRef}
      >
        {({height, width, scrollTop}) => (
          <div ref={registerChild}>
            <List
              autoHeight
              onRowsRendered={onRowsRendered}
              height={height}
              width={(width - 20)}
              rowHeight={cache.rowHeight}
              rowCount={rowCount}
              rowRenderer={this._productEntity}
              scrollToAlignment='start'
              scrollTop={scrollTop}
              overscanRowCount={30}
            />
          </div>
        )}
      </WindowScroller>
    )
  }

  componentDidMount () {
    // default to true
    const { windowWidth, showElement = true } = this.props

    this.setState({
      columnCount: windowWidth > 767 ? 4 : 2,
      showElement
    })
  }

  render () {
    const {
      virtualized = true,
      loader,
      products
    } = this.props
    const { showElement } = this.state

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
        onEnter={this._handleShowList(true)}
      >
        <div>
          { showElement && ProductRender(virtualized) }
        </div>
      </Waypoint>
    )
  }
}

export default ProductView
