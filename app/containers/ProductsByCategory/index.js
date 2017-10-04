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
  ifElse,
  partial,
  path
} from 'ramda'
import styled from 'styled-components'

import H1 from 'components/H1'
import NavCategories from 'components/NavCategories'
import ProductView from 'components/ProductView'
import Footer from 'components/Footer'
import WindowWidth from 'components/WindowWidth'
import { Label } from 'semantic-ui-react'
// import Promo from 'components/Promo'

import {
  getProductCategoriesAction,
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import {
  selectProductCategories,
  selectLoader
} from 'containers/Buckets/selectors'

import messages from './messages'
import EmptyProducts from './EmptyProducts'

import {
  getFeaturedProductsAction,
  getProductsByCategoryAction,
  getProductsByTagsAction,
  getProductsViewedAction,
  resetProductsByCategoryAction
} from './actions'

import {
  selectFeaturedProducts,
  selectLazyload,
  selectLoading,
  selectProductsByCategory,
  selectProductsViewed,
  selectTotalCount
} from './selectors'

// const ItemCount = styled.p`
//   font-family: 'helveticalight';
//   letter-spacing: 2px;
//   text-align: center;
//   width: 100%;

//   @media (min-width: 768px) {
//     margin: 10px 0px 57px;
//   }
// `

const ContentWrapper = styled.div`

  .center-label {
    text-align: center;
  }

  .no-bottom-margin {
    margin-bottom: 0 !important;
  }

  .num-count {
    font-family: Lato,Cabin,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-weight: 300;
  }
  
  @media (min-width: 768px) {
    .header-label {
      padding-bottom: 20px;
    }

    .header-label span {
      font-size: 20px;
    }

    .category-title {
      font-size: 20px;
    }

    .num-item-label, .num-item-label span {
      color: #656565;
      font-size: 17px;
      letter-spacing: 3px;
    }

    .recent-label {
      padding-bottom: 20px;
      padding-top: 25px;
    }

    .recent-label span {
      font-size: 20px;
    }
  }
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
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    productsByCategory: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    productsFeatured: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  state = {
    pageOffset: 0,
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
    this._displayNumberProducts = this._displayNumberProducts.bind(this)
    this._displayRecentlyViewedHeader = this._displayRecentlyViewedHeader.bind(this)
    this._displayEmpty = this._displayEmpty.bind(this)
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
    const IstagText = (tag) => `${tag} Items`

    const titleCondition = ifElse(isTag(this._tags), IstagText, this._isCategoryExist)
    const titleComposition = compose(titleCondition)
    return titleComposition(id)
  }

  _displayMoreProducts () {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchProductByTagCategory(this.props))
  }

  _displayHeaderFeaturesProduct () {
    const { productsFeatured } = this.props
    if (this._handleFeaturedProductsPerCategory() && productsFeatured.size) {
      return (
        <H1 className='header-label padding__top--25'>
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

  _displayNumberProducts () {
    const { productsByCategory, totalCount } = this.props

    if (productsByCategory.size) {
      return (
        <Label className='num-count center-label' as='p' basic size='mini'>
          { totalCount }
          <FormattedMessage {...messages.items} />
        </Label>
      )
    }

    return null
  }

  _displayRecentlyViewedHeader () {
    const { productsViewed } = this.props

    if (productsViewed.size) {
      return (
        <H1 className='recent-label'><FormattedMessage {...messages.viewed} /></H1>
      )
    }

    return null
  }

  _displayEmpty () {
    const { productsByCategory, loader } = this.props

    if (loader === false && !(productsByCategory.size > 0)) {
      return (
        <EmptyProducts />
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
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByTagCategory(props))
  }

  componentWillMount () {
    console.log(this.props.setPageTitle)
    const { categories, params: { id } } = this.props
    const category = categories.find((cat) => cat.get('id') === id)
    let categoryName = category ? category.get('name') : ' '

    this.props.setPageTitle(categoryName)
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
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
    const { productsByCategory, categories, productsViewed, loader, changeRoute, windowWidth, categoryLoader } = this.props
    return (
      <div>
        <NavCategories changeRoute={changeRoute} categories={categories} categoryLoader={categoryLoader} />
        <ContentWrapper className='padding__horizontal--10'>
          { this._displayHeaderFeaturesProduct() }
          <Label className='center-label' as='p' basic size='large'>
            <FormattedMessage {...messages.feature} />
          </Label>
          { this._displayFeaturesProduct() }
          <Label className='center-label no-bottom-margin' as='p' basic size='large'>
            { this._handlePageTitle() }
          </Label>
          { this._displayNumberProducts() }
          { this._displayEmpty() }
          <ProductView changeRoute={changeRoute} loader={loader} products={productsByCategory} windowWidth={windowWidth} />
          {/* <Promo loader={loader} /> */}
          { this._displayRecentlyViewedHeader() }
          <ProductView changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
        </ContentWrapper>
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
  lazyload: selectLazyload(),
  totalCount: selectTotalCount(),
  categoryLoader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
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
