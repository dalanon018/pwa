/*
 *
 * BrandPage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  compose,
  equals,
  ifElse,
  lt,
  partial,
  path
} from 'ramda'
import styled from 'styled-components'
import { Container } from 'semantic-ui-react'

import ProductView from 'components/ProductView'
import Footer from 'components/Footer'
import WindowWidth from 'components/WindowWidth'
import BannerSlider from 'components/BannerSlider'
import H3 from 'components/H3'
import EmptyProducts from 'components/EmptyProductsBlock'
// import Promo from 'components/Promo'
import LazyLoading from 'components/LazyLoading'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectBrands,
  selectLoader
} from 'containers/Buckets/selectors'

import messages from './messages'

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
    setShowActivityIcon: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    productsByBrands: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    brands: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  state = {
    brandImages: [],
    pageOffset: 0,
    offset: 0,
    limit: 12
  }

  _handlePageTitle = (nextProps) => {
    const { brands, params: { id } } = nextProps

    if (brands.size) {
      const brand = brands.find((entity) => entity.get('id') === id)
      const brandImages = brand.size ? brand.get('sliders').toArray() : []

      this.setState({
        brandImages
      })

      return brand ? brand.get('name') : ''
    }
    return ''
  }

  _displayMoreProducts = () => {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchProductByBrands(this.props))
  }

  _displayEmpty = () => {
    const { productsByBrands, loader } = this.props

    if (loader === false && !(productsByBrands.size > 0)) {
      return (
        <EmptyProducts>
          <FormattedMessage {...messages.emptyMessage} />
        </EmptyProducts>
      )
    }

    return null
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
    const { getProductsByBrands, params: { id } } = props
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
  }

  componentWillUnmount () {
    this.props.resetProductsByBrands()
  }

  componentWillReceiveProps (nextProps) {
    const { params } = this.props

    const isParamsEqual = (id, props) => compose(
      equals(id),
      path(['params', 'id'])
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
        <BannerSlider isInfinite loader={loader} images={brandImages} />
        <ContentWrapper className='padding__horizontal--10'>
          <LazyLoading
            lazyload={lazyload}
            results={productsByBrands}
            onScroll={this._displayMoreProducts}
            limit={limit}
          >
            { this._displayFeaturedProducts() }
            <H3>
              <FormattedMessage {...messages.brandsTitle} />
            </H3>
            { this._displayEmpty() }
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
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProductsByBrands: payload => dispatch(getProductsByBrandsAction(payload)),
    resetProductsByBrands: () => dispatch(resetProductsByBrandsAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(BrandPage))
