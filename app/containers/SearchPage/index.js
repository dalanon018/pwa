/*
 *
 * SearchPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { FormattedMessage, injectIntl } from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { createStructuredSelector } from 'reselect'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

// import ProductResults from 'components/Shared/ProductResults'

import MobileSearchResult from 'components/Mobile/SearchResult'
// import DesktopSearchResult from 'components/Desktop/SearchResult'
import DesktopFooter from 'components/Desktop/Footer'

import H3 from 'components/Shared/H3'
import WindowWidth from 'components/Shared/WindowWidth'
import AccessView from 'components/Shared/AccessMobileDesktopView'

import {
  setToggleAction
} from 'containers/Buckets/actions'

import {
  selectToggle
} from 'containers/Buckets/selectors'

import EmptyProducts from './EmptyProducts'
import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  selectSearchProductLoading,
  selectSearchProduct,
  selectProductSuccess,
  selectProductError
} from './selectors'

import {
  setCurrentProductAction,
  setMobileNumbersAction,
  setProductHandlersDefaultAction
} from './actions'

const SearchListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`

const SearchPageWrapper = styled.div`
`

const FooterWrapperAbsolute = styled.div`
  position:absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`

export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * Handler where we will able to identify if the user click search
   * since search input component is not here.
   */
  _userSearch = false

  static propTypes = {
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setHandlersDefault: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired,
    productSuccess: PropTypes.bool.isRequired,
    productError: PropTypes.bool.isRequired
  }

  constructor () {
    super()

    this.state = {
      modalToggle: false
    }

    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleToggle = this._handleToggle.bind(this)
    this._displayProduct = this._displayProduct.bind(this)
    this._displayEmpty = this._displayEmpty.bind(this)
  }

  _handleSubmit ({ value }) {
    const { product, setCurrentProduct, setMobileNumbers } = this.props

    this.successSubmission = true

    setCurrentProduct(product)
    setMobileNumbers(value)
  }

  _handleClose () {
    this.setState({
      modalToggle: false
    })
  }

  _handleToggle = () => {
    this.props.setToggle()
  }

  _displayProduct () {
    const { product, changeRoute, windowWidth } = this.props

    if (product.size > 0) {
      return (
        <div>
          <H3><FormattedMessage {...messages.header} /></H3>
          <MobileSearchResult
            product={product}
            windowWidth={windowWidth}
            changeRoute={changeRoute} />
        </div>
      )
    }

    return null
  }

  _displayEmpty () {
    const { product, loading } = this.props

    if (loading === false && product.size === 0 && this._userSearch === true) {
      return (
        <EmptyProducts />
      )
    }

    return null
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentWillReceiveProps (nextProps) {
    this._userSearch = true
  }

  render () {
    return (
      <SearchPageWrapper>
        <SearchListWrapper>
          <Helmet
            title='Search'
            meta={[
              { name: 'description', content: 'Description of SearchPage' }
            ]}
          />
          { this._displayEmpty() }
          { this._displayProduct() }
        </SearchListWrapper>
        <AccessView
          mobileView={null}
          desktopView={
            <FooterWrapperAbsolute>
              <DesktopFooter />
            </FooterWrapperAbsolute>
          }
        />
      </SearchPageWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  product: selectSearchProduct(),
  loading: selectSearchProductLoading(),
  toggle: selectToggle(),
  productSuccess: selectProductSuccess(),
  productError: selectProductError()
})

function mapDispatchToProps (dispatch) {
  return {
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    setMobileNumbers: (payload) => dispatch(setMobileNumbersAction(payload)),
    setToggle: (payload) => dispatch(setToggleAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'searchPage', reducer })
const withSaga = injectSaga({ key: 'searchPage', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(SearchPage)))
