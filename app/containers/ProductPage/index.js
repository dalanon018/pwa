/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { noop } from 'lodash'
import {
  both,
  complement,
  compose,
  cond,
  equals,
  ifElse,
  prop,
  when,
  T
} from 'ramda'
import { isMobileDevice } from 'utils/http'
import { FbEventTracking } from 'utils/seo'
import { imageStock } from 'utils/image-stock'

import Product from 'components/Product'
import WindowWidth from 'components/WindowWidth'
import Modal from 'components/PromptModal'

import messages from './messages'

import {
  selectLoader,
  selectProduct,
  selectProductSuccess,
  selectProductError
} from './selectors'

import {
  getProductAction,
  setProductAction,
  setCurrentProductAction,
  setProductHandlersDefaultAction
} from './actions'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction,
  setHeaderFullScreenAction
} from 'containers/Buckets/actions'

export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    setProduct: PropTypes.func.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    setHandlersDefault: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    productSuccess: PropTypes.bool.isRequired,
    productError: PropTypes.bool.isRequired,
    intl: intlShape.isRequired
  }

  /**
   * this will handle if success is valid after verification code
   */
  successSubmission = false

  constructor () {
    super()
    this.state = {
      socialToggle: false,
      copied: false,
      errModalToggle: false,
      errModalName: 'warning',
      errorTitle: '',
      errorMessage: '',
      togglePrompt: false
    }
  }

  _setCurrentProduct = () => {
    const { product, setCurrentProduct } = this.props
    this.successSubmission = true
    // before we can submit we need to make sure that the product is not empty
    const submissionOrder = () => {
      FbEventTracking('InitiateCheckout', {
        currency: 'PHP',
        value: product.get('price'),
        content_name: product.get('title'),
        content_ids: product.get('cliqqCode').first(),
        content_type: 'product'
      })

      return setCurrentProduct(product)
    }

    const submitProductOrder = cond([
      [equals(0), () => this.setState({
        errModalToggle: true,
        errorTitle: <FormattedMessage {...messages.errorProductQuantity} />,
        errModalName: 'warning',
        errorMessage: ''
      })],
      [equals(NaN), noop],
      [T, submissionOrder]
    ])

    return submitProductOrder(parseInt(product.get('quantity')))
  }

  _handleSizeChange = (e, { value }) => {
    const { setProduct, product } = this.props
    const selectedProductSize = product.get('association').find((entity) => entity.get('size') === value)
    setProduct(
      product.merge(selectedProductSize)
    )
  }

  _handleSuccess = () => {
    const { changeRoute } = this.props
    this.successSubmission = false
    this._handleErrModalClose()
    changeRoute('/review')
  }

  _handleError = () => {
    this.successSubmission = false
    this._handleSetStateErrorMessages(
      <FormattedMessage {...messages.errorProductOrder} />
    )
  }

  _handleErrModalClose = () => {
    this.setState({
      errModalToggle: false
    })
  }

  _handleSetStateErrorMessages = (error) => {
    this.setState({
      errModalToggle: true,
      errorTitle: error,
      errModalName: 'warning',
      errorMessage: ''
    })
  }

  _handleSocialToggle = () => {
    this.setState({
      socialToggle: !this.state.socialToggle
    })
  }

  _handleCopy = () => {
    this.setState({
      copied: true
    })
  }

  _handletoggleOrigDiscountPrice = (product) => {
    const showPrice = product.get('discountPrice') || product.get('price')

    return showPrice ? showPrice.toLocaleString() : 0
  }

  _handleOpenEmailWarning = () => {
    this.setState({
      togglePrompt: true
    })
  }

  _handleCloseEmailWarning = () => {
    const { product } = this.props
    this.setState({
      togglePrompt: false
    }, () => {
      window.location.href = `mailto:?subject=₱${this._handletoggleOrigDiscountPrice(product)} ${product.get('title')}&body=Click this link to see the product: ${window.location.href}`
    })
  }

  componentWillMount () {
    this.props.setPageTitle('Product Details')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    const { params: { id }, getProduct } = this.props

    getProduct({ id })
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentWillReceiveProps (nextProps) {
    const { product, productSuccess, productError } = nextProps

    const triggerFBEventProduct = when(
      compose(complement(equals(0)), prop('size')),
      (data) => FbEventTracking('ViewContent', {
        content_name: data.get('title'),
        content_ids: data.get('cliqqCode').first(),
        content_type: 'product'
      })
    )

    // handle if submission is success
    ifElse(both(equals(true), () => this.successSubmission), this._handleSuccess, noop)(productSuccess)

    // handle if submission is error
    ifElse(both(equals(true), () => this.successSubmission), this._handleError, noop)(productError)

    triggerFBEventProduct(product)
  }

  render () {
    const { loading, product, route, windowWidth, changeRoute, isMobile, intl } = this.props
    const { errModalToggle, errModalName, errorTitle, errorMessage, togglePrompt } = this.state
    const productPageTrigger = route && route

    return (
      <div>
        <Helmet
          title={`ProductPage - ${product.get('title') || ''}`}
        />
        <div>
          <Product
            loading={loading}
            product={product}
            windowWidth={windowWidth}
            onSubmit={this._setCurrentProduct}
            copied={this._handleCopy}
            defaultImage={imageStock('default-slider.jpg')}
            toggle={this.state.socialToggle}
            toggleClick={this._handleSocialToggle}
            productPageTrigger={productPageTrigger}
            changeRoute={changeRoute}
            openEmailPrompt={this._handleOpenEmailWarning}
            closeEmailPrompt={this._handleCloseEmailWarning}
            isMobile={isMobile}
            togglePrompt={togglePrompt}
            intl={intl}
            origPrice={this._handletoggleOrigDiscountPrice}
            onSizeChange={this._handleSizeChange}
          />
        </div>

        <Modal
          open={errModalToggle}
          name={errModalName}
          title={errorTitle}
          content={errorMessage}
          close={this._handleErrModalClose}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isMobile: () => isMobileDevice(),
  loading: selectLoader(),
  product: selectProduct(),
  productSuccess: selectProductSuccess(),
  productError: selectProductError()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setHeaderMenuFullScreen: (payload) => dispatch(setHeaderFullScreenAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getProduct: (payload) => dispatch(getProductAction(payload)),
    setProduct: (payload) => dispatch(setProductAction(payload)),
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProductPage)))
