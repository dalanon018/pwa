/*
 *
 * ProductsByCategory
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  F,
  T,
  compose,
  contains,
  curry,
  equals,
  identity,
  ifElse,
  partial,
  path,
  toUpper
} from 'ramda'
import messages from './messages'
import styled from 'styled-components'

import { Grid } from 'semantic-ui-react'

import H1 from 'components/H1'
import NavCategories from 'components/NavCategories'
import ProductView from 'components/ProductView'
import Footer from 'components/Footer'
import WindowWidth from 'components/WindowWidth'
// import Promo from 'components/Promo'

import {
  getProductCategoriesAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories
} from 'containers/Buckets/selectors'

import {
  getProductsByCategoryAction,
  getProductsByTagsAction,
  getProductsViewedAction,
  resetProductsByCategoryAction,
  getFeaturedProductsAction
} from './actions'

import {
  selectProductsByCategory,
  selectLoading,
  selectProductsViewed,
  selectLazyload,
  selectFeaturedProducts
} from './selectors'

const ItemCount = styled.p`
  font-family: 'helveticalight';
  letter-spacing: 2px;
  text-align: center;
  width: 100%;
`
const isTag = curry((tags, id) => contains(id, tags))

export class ProductsByCategory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProductsByCategory: PropTypes.func.isRequired,
    getProductCategories: PropTypes.func.isRequired,
    getProductsViewed: PropTypes.func.isRequired,
    resetProductsByCategory: PropTypes.func.isRequired,
    getProductFeatured: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    productsByCategory: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  state = {
    offset: 0,
    limit: 12
  }

  _tags = ['featured', 'sale']

  constructor () {
    super()

    this._handlePageTitle = this._handlePageTitle.bind(this)
    this._isCategoryExist = this._isCategoryExist.bind(this)
    this._fetchProductByTagCategory = this._fetchProductByTagCategory.bind(this)
    this._fetchProductFeatured = this._fetchProductFeatured.bind(this)
    this._displayMoreProducts = this._displayMoreProducts.bind(this)
    this._onScrollElement = this._onScrollElement.bind(this)
    this._resetValuesAndFetch = this._resetValuesAndFetch.bind(this)
    this._handleFeaturedProductsPerCategory = this._handleFeaturedProductsPerCategory.bind(this)
    this._displayFeaturesProduct = this._displayFeaturesProduct.bind(this)
    this._displayHeaderFeaturesProduct = this._displayHeaderFeaturesProduct.bind(this)
  }

  _onScrollElement (evt) {
    const { lazyload } = this.props
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    const offset = 200

    if (window.innerHeight < (scrollY + offset) && lazyload) {
      this._displayMoreProducts()
    }
  }

  _isCategoryExist () {
    const { categories, params: { id } } = this.props

    if (categories.size) {
      const category = categories.find((cat) => cat.get('id') === id)
      return category ? category.get('name') : ''
    }

    return ''
  }

  _handlePageTitle () {
    const { params: { id } } = this.props

    const titleCondition = ifElse(isTag(this._tags), identity, this._isCategoryExist)
    const titleComposition = compose(toUpper, titleCondition)

    return titleComposition(id)
  }

  _displayMoreProducts () {
    const { offset } = this.state
    const updatedOffset = offset + 1
    this.setState({
      offset: updatedOffset
    }, () => this._fetchProductByTagCategory(this.props))
  }

  _displayHeaderFeaturesProduct () {
    const { productsFeatured } = this.props
    if (this._handleFeaturedProductsPerCategory() && productsFeatured.size) {
      return (
        <H1 center className='padding__top--25'>
          <FormattedMessage {...messages.feature} />
        </H1>
      )
    }

    return null
  }

  _displayFeaturesProduct () {
    const { productsFeatured, changeRoute, loader, windowWidth } = this.props
    if (this._handleFeaturedProductsPerCategory() && productsFeatured.size) {
      return (
        <ProductView changeRoute={changeRoute} loader={loader} products={productsFeatured} windowWidth={windowWidth} />
      )
    }

    return null
  }

  _handleFeaturedProductsPerCategory () {
    const { params: { id } } = this.props
    const shouldNotDisplay = (id) => (isTag(this._tags)(id))

    const showFeaturedItem = ifElse(shouldNotDisplay, F, T)

    return showFeaturedItem(id)
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByTagCategory (props) {
    const { getProductsByTags, getProductsByCategory, params: { id } } = props
    const { offset, limit } = this.state
    const requestData = curry((fn, id) => fn({ offset, limit, id }))

    const executeFetchData = ifElse(
      isTag(this._tags),
      requestData(getProductsByTags),
      requestData(getProductsByCategory)
    )

    // since this data is change and we know exactly
    executeFetchData(id)
  }

  /**
   * Here we will request for our data base on change of route. FEATURED
   * @param {*w} props
   */
  _fetchProductFeatured (props) {
    const { getProductFeatured, params: { id } } = props

    // since this data is change and we know exactly
    getProductFeatured(id)
  }

  _resetValuesAndFetch (props) {
    const { resetProductsByCategory } = props

    resetProductsByCategory()

    this.setState({
      offset: 0
    }, () => this._fetchProductByTagCategory(props))
  }

  componentDidMount () {
    const { getProductsViewed, getProductCategories } = this.props

    getProductCategories()
    getProductsViewed()

    this._fetchProductByTagCategory(this.props)
    this._fetchProductFeatured(this.props)

    window.addEventListener('scroll', this._onScrollElement)
  }

  componentWillUnmount () {
    const { resetProductsByCategory } = this.props

    window.removeEventListener('scroll', this._onScrollElement)

    resetProductsByCategory()
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

    const updateFeaturedProducts = ifElse(
      partial(isParamsEqual, [params.id]),
      noop,
      this._fetchProductFeatured
    )

    updateFetchProduct(nextProps)
    updateFeaturedProducts(nextProps)
  }

  render () {
    const { productsByCategory, categories, productsViewed, loader, changeRoute, windowWidth } = this.props

    return (
      <div>
        <NavCategories changeRoute={changeRoute} categories={categories} />
        <div className='padding__horizontal--10'>
          <Grid padded>
            { this._displayHeaderFeaturesProduct() }
            { this._displayFeaturesProduct() }
            <H1 center className='padding__top--25'>{ this._handlePageTitle() }</H1>
            <ItemCount>
              { productsByCategory.size } <FormattedMessage {...messages.items} />
            </ItemCount>
            <ProductView changeRoute={changeRoute} loader={loader} products={productsByCategory} windowWidth={windowWidth} />
            {/* <Promo loader={loader} /> */}
            <H1 center><FormattedMessage {...messages.viewed} /></H1>
            <ProductView changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  productsByCategory: selectProductsByCategory(),
  productsViewed: selectProductsViewed(),
  productsFeatured: selectFeaturedProducts(),
  categories: selectProductCategories(),
  loader: selectLoading(),
  lazyload: selectLazyload()
})

function mapDispatchToProps (dispatch) {
  return {
    getProductCategories: payload => dispatch(getProductCategoriesAction(payload)),
    getProductsByCategory: payload => dispatch(getProductsByCategoryAction(payload)),
    getProductsByTags: payload => dispatch(getProductsByTagsAction(payload)),
    getProductsViewed: () => dispatch(getProductsViewedAction()),
    getProductFeatured: payload => dispatch(getFeaturedProductsAction(payload)),
    resetProductsByCategory: () => dispatch(resetProductsByCategoryAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(ProductsByCategory))
