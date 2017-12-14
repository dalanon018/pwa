/*
 *
 * BrandPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  allPass,
  compose,
  cond,
  equals,
  ifElse,
  lt,
  partial,
  path
} from 'ramda'
import { Container } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { paramsImgix } from 'utils/image-stock'

import ProductView from 'components/ProductView'
import Footer from 'components/Footer'
import WindowWidth from 'components/WindowWidth'
import BannerSlider from 'components/BannerSlider'
import H3 from 'components/H3'
import EmptyProducts from 'components/EmptyProductsBlock'
import LoadingIndicator from 'components/LoadingIndicator'
import LazyLoading from 'components/LazyLoading'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import {
  selectBrands,
  selectLoader
} from 'containers/Buckets/selectors'
import { BRAND_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getProductsByBrandsAction,
  resetProductsByBrandsAction
} from './actions'
import {
  selectLazyload,
  selectLoading,
  selectProductsByBrandsItems,
  selectProductsByBrandsFeatured
} from './selectors'
import {
  LIMIT_ITEMS
} from './constants'

const ContentWrapper = styled(Container)`
  padding-top: 20px;
  padding-bottom: 20px;
`

export class BrandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProductsByBrands: PropTypes.func.isRequired,
    resetProductsByBrands: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    productsByBrands: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    brands: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    brandImages: [],
    pageOffset: 0,
    offset: 0,
    limit: LIMIT_ITEMS
  }

  _updateParamsImages = (images) => {
    const options = {
      w: 800,
      h: 400,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return images ? paramsImgix(images, options) : ''
  }

  _handlePageTitle = (nextProps) => {
    const { brands, match: { params: { id } } } = nextProps

    if (brands.size) {
      const brand = brands.find((entity) => entity.get('id') === id)
      const brandImages = brand.size ? brand.get('sliders').toArray().map(this._updateParamsImages) : []

      this.setState({
        brandImages
      })

      return brand ? brand.get('name') : ''
    }
    return ''
  }

  _displayHeaderTitle = () => {
    const { lazyload, productsByBrands } = this.props

    if (lazyload && productsByBrands.size === 0) {
      return null
    }

    return (
      <H3>
        <FormattedMessage {...messages.brandsTitle} />
      </H3>
    )
  }

  _displayMoreProducts = () => {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    })

    this._fetchProductByBrands(this.props)
  }

  _displayLoader = () => {
    return (
      <LoadingIndicator />
    )
  }

  _displayEmpty = () => {
    return (
      <EmptyProducts>
        <FormattedMessage {...messages.emptyMessage} />
      </EmptyProducts>
    )
  }

  /**
   * this will simply display items that we are loading
   */
  _displayEmptyProductViewLoading = () => {
    const { changeRoute, windowWidth, productsByBrands } = this.props
    return (
      <ProductView changeRoute={changeRoute} loader products={productsByBrands} windowWidth={windowWidth} />
    )
  }

  _displayEmptyLoadingIndicator = () => {
    const { loader, lazyload, productsByBrands } = this.props

    const display = cond([
      [allPass([
        equals(false),
        partial(equals(0), [productsByBrands.size]),
        partial(equals(false), [lazyload])
      ]), this._displayEmpty],
      [allPass([
        equals(true),
        partial(equals(false), [lazyload])
      ]), this._displayLoader],
      [equals(false), () => null]
    ])

    return display(loader)
  }

  _resetValuesAndFetch = (props) => {
    const { resetProductsByBrands } = props

    resetProductsByBrands()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByBrands(props))
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByBrands = (props) => {
    const { getProductsByBrands, match: { params: { id } } } = props
    const { offset, limit } = this.state

    // since this data is change and we know exactly
    getProductsByBrands({ offset, limit, id })
  }

  _displayFeaturedProducts = () => {
    const { productsFeatured, loader, changeRoute, windowWidth } = this.props

    const displayFeatured = ifElse(
      lt(0),
      () => (
        <div>
          <H3>
            <FormattedMessage {...messages.feature} />
          </H3>
          <ProductView changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} />
        </div>
      ),
      noop
    )

    return displayFeatured(productsFeatured.size)
  }

  componentWillMount () {
    // we set this as text so it doesnt look
    this.props.setPageTitle('..')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    // initial data
    this._fetchProductByBrands(this.props)
    this.props.setRouteName(BRAND_NAME)
  }

  componentWillUnmount () {
    this.props.resetProductsByBrands()
  }

  componentWillReceiveProps (nextProps) {
    const { match: { params } } = this.props

    const isParamsEqual = (id, props) => compose(
      equals(id),
      path(['match', 'params', 'id'])
    )(props)

    const updateFetchProduct = ifElse(
      partial(isParamsEqual, [params.id]),
      noop,
      this._resetValuesAndFetch
    )

    const updatePageTitle = ifElse(
      compose(lt(0), path(['brands', 'size'])),
      compose(
        this.props.setPageTitle,
        this._handlePageTitle
      ),
      noop
    )

    updateFetchProduct(nextProps)
    updatePageTitle(nextProps)
  }

  render () {
    const { productsByBrands, loader, changeRoute, windowWidth, lazyload } = this.props
    const { brandImages, limit } = this.state

    return (
      <div>
        <BannerSlider
          isInfinite
          results={productsByBrands}
          loader={loader}
          images={brandImages}
        />
        <ContentWrapper className='padding__horizontal--10'>
          <LazyLoading
            isLoading={loader}
            lazyload={lazyload}
            results={productsByBrands}
            onScroll={this._displayMoreProducts}
            limit={limit}
          >
            { this._displayFeaturedProducts() }
            { this._displayHeaderTitle() }
            { this._displayEmptyLoadingIndicator() }
            <ProductView changeRoute={changeRoute} loader={loader} products={productsByBrands} windowWidth={windowWidth} />
          </LazyLoading>
        </ContentWrapper>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  productsByBrands: selectProductsByBrandsItems(),
  productsFeatured: selectProductsByBrandsFeatured(),
  brands: selectBrands(),
  loader: selectLoading(),
  lazyload: selectLazyload(),
  brandsLoader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProductsByBrands: payload => dispatch(getProductsByBrandsAction(payload)),
    resetProductsByBrands: () => dispatch(resetProductsByBrandsAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'brandPage', reducer })
const withSaga = injectSaga({ key: 'brandPage', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(BrandPage))
