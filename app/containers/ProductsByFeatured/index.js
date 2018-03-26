/*
 *
 * ProductsByFeatured
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  allPass,
  compose,
  cond,
  equals,
  ifElse,
  partial,
  path
} from 'ramda'
import { Container } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'
import MobileFooter from 'components/Mobile/Footer'

import WindowWidth from 'components/Shared/WindowWidth'
import H3 from 'components/Shared/H3'
import H4 from 'components/Shared/H4'
import EmptyProducts from 'components/Shared/EmptyProductsBlock'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import AccessView from 'components/Shared/AccessMobileDesktopView'

import { InfiniteLoading, InfiniteWrapper } from 'components/Shared/InfiniteLoading'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import { PRODUCTS_FEATURED_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getProductsByFeaturedAction,
  getProductsViewedAction,
  resetProductsByFeaturedAction
} from './actions'

import {
  selectLazyload,
  selectLoading,
  selectProducts,
  selectProductsViewed,
  selectTotalCount
} from './selectors'

import {
  LIMIT_ITEMS
} from './constants'

const ContentWrapper = styled(Container)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;

  h4.ui.header {
    margin-top: 0 !important;
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

const DesktopTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`

const DesktopItemCount = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
`

export class ProductsByFeatured extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    getProductsViewed: PropTypes.func.isRequired,
    resetProductsByFeatured: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowPointsIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    loader: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    products: PropTypes.object.isRequired,
    productsViewed: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  }

  state = {
    pageOffset: 0,
    offset: 0,
    limit: LIMIT_ITEMS // we need this since we are including the feature items.
  }

  constructor () {
    super()
    this._fetchProductByFeatured = this._fetchProductByFeatured.bind(this)
    this._displayMoreProducts = this._displayMoreProducts.bind(this)
    this._resetValuesAndFetch = this._resetValuesAndFetch.bind(this)
    this._displayProducts = this._displayProducts.bind(this)
    this._displayNumberProducts = this._displayNumberProducts.bind(this)
    this._displayRecentlyViewedHeader = this._displayRecentlyViewedHeader.bind(this)
    this._displayEmpty = this._displayEmpty.bind(this)
  }

  _displayMoreProducts () {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchProductByFeatured(this.props))
  }

  _displayProducts () {
    const { products, changeRoute, loader, lazyload, windowWidth, totalCount } = this.props
    if (products.size) {
      return (
        <InfiniteLoading
          results={products}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={loader}
          rowCount={totalCount}
        >
          {(props) => (
            <AccessView
              mobileView={
                <MobileProductView changeRoute={changeRoute} loader={loader} products={products} windowWidth={windowWidth} {...props} />
              }
              desktopView={
                <DesktopProductView changeRoute={changeRoute} loader={loader} products={products} windowWidth={windowWidth} {...props} />
              }
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  _displayNumberProducts () {
    const { totalCount, windowWidth } = this.props
    if (totalCount) {
      return (
        windowWidth >= 1024
        ? <DesktopItemCount className='color__grey'>
          { totalCount }
          <FormattedMessage {...messages.items} />
        </DesktopItemCount>
        : <H4 className='color__grey'>
          { totalCount }
          <FormattedMessage {...messages.items} />
        </H4>
      )
    }

    return null
  }

  _displayRecentlyViewedHeader () {
    const { productsViewed, lazyload } = this.props

    // we only show if items are not empty and not lazyloading
    if (productsViewed.size && !lazyload) {
      return (
        <H3>
          <FormattedMessage {...messages.viewed} />
        </H3>
      )
    }

    return null
  }

  _displayRecentlyViewedItems () {
    const { productsViewed, lazyload, changeRoute, loader, windowWidth } = this.props
    // we only show if items are not empty and not lazyloading
    if (productsViewed.size && !lazyload) {
      return (
        <AccessView
          mobileView={
            <MobileProductView changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
          }
          desktopView={
            <DesktopProductView changeRoute={changeRoute} loader={loader} products={productsViewed} windowWidth={windowWidth} />
          }
        />
      )
    }

    return null
  }

  /**
   * this will simply display items that we are loading
   */
  _displayEmptyProductViewLoading = () => {
    const { changeRoute, windowWidth, products } = this.props

    return (
      <AccessView
        mobileView={
          <MobileProductView changeRoute={changeRoute} loader products={products} windowWidth={windowWidth} />
        }
        desktopView={
          <DesktopProductView changeRoute={changeRoute} loader products={products} windowWidth={windowWidth} />
        }
      />
    )
  }

  _displayEmptyLoadingIndicator = () => {
    const { loader, lazyload, products } = this.props
    const display = cond([
      [allPass([
        equals(false),
        partial(equals(0), [products.size]),
        partial(equals(false), [lazyload])
      ]), this._displayEmpty],
      [allPass([
        equals(true),
        partial(equals(0), [products.size])
      ]), this._displayEmptyProductViewLoading],
      [allPass([
        equals(true),
        partial(equals(false), [lazyload])
      ]), this._displayLoader],
      [equals(false), () => null]
    ])

    return display(loader)
  }

  _displayEmpty () {
    return (
      <EmptyProducts>
        <FormattedMessage {...messages.emptyMessage} />
      </EmptyProducts>
    )
  }

  _displayLoader = () => {
    return (
      <LoadingIndicator />
    )
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchProductByFeatured (props) {
    const { getProducts, match: { params: { id } } } = props
    const { offset, limit } = this.state

    getProducts({ offset, limit, id })
  }

  _resetValuesAndFetch (props) {
    const { resetProductsByFeatured } = props

    resetProductsByFeatured()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchProductByFeatured(props))
  }

  componentDidMount () {
    const { getProductsViewed, setRouteName, setPageTitle, setShowSearchIcon, setShowPointsIcon, setShowActivityIcon, intl } = this.props

    setPageTitle(intl.formatMessage(messages.headerTitle))
    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)

    setRouteName(PRODUCTS_FEATURED_NAME)
    getProductsViewed()

    this._fetchProductByFeatured(this.props)
  }

  componentWillUnmount () {
    this.props.resetProductsByFeatured()
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

    updateFetchProduct(nextProps)
  }

  render () {
    const { loader, lazyload, windowWidth } = this.props

    return (
      <div>
        <ContentWrapper>
          <InfiniteWrapper
            hasMoreData={lazyload}
            isLoading={loader}
          >
            {
              windowWidth >= 1024
              ? <DesktopTitle>
                <FormattedMessage {...messages.headerTitle} />
              </DesktopTitle>
              : <H3 className='margin__none'>
                <FormattedMessage {...messages.headerTitle} />
              </H3>
            }

            { this._displayNumberProducts() }
            { this._displayEmptyLoadingIndicator() }
            { this._displayProducts() }

            { this._displayRecentlyViewedHeader() }
            { this._displayRecentlyViewedItems() }
          </InfiniteWrapper>
        </ContentWrapper>
        <AccessView
          mobileView={<MobileFooter />}
          desktopView={null}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  products: selectProducts(),
  productsViewed: selectProductsViewed(),
  loader: selectLoading(),
  lazyload: selectLazyload(),
  totalCount: selectTotalCount()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProducts: payload => dispatch(getProductsByFeaturedAction(payload)),
    getProductsViewed: () => dispatch(getProductsViewedAction()),
    resetProductsByFeatured: () => dispatch(resetProductsByFeaturedAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'productsByFeatured', reducer })
const withSaga = injectSaga({ key: 'productsByFeatured', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(ProductsByFeatured)))
