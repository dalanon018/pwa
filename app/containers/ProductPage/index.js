/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { FormattedMessage } from 'react-intl'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { noop } from 'lodash'
import { ifElse, both, equals } from 'ramda'

import { imageStock } from 'utils/image-stock'

import Product from 'components/Product'
import WindowWidth from 'components/WindowWidth'
import Modal from 'components/PromptModal'

import { isMobileDevice } from 'utils/http'

import messages from './messages'

import {
  selectLoader,
  selectProduct,
  selectProductSuccess,
  selectProductError
} from './selectors'

import {
  getProductAction,
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
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    setHandlersDefault: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    productSuccess: PropTypes.bool.isRequired,
    productError: PropTypes.bool.isRequired
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
      errorMessage: ''
    }
  }

  _reactNotificationRef = (ref) => {
    this._notificationRef = ref
  }

  _eMailShareNotification = () =>
  setTimeout(() =>
    this._notificationRef.addNotification({
      title: <FormattedMessage {...messages.emailWarningInfo} />,
      message: <FormattedMessage {...messages.emailWarningDescription} />,
      position: 'tr',
      autoDismiss: 0,
      level: 'info'
    })
  , 2000)

  _setCurrentProduct = () => {
    const { product, setCurrentProduct } = this.props
    this.successSubmission = true
    setCurrentProduct(product)
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
    const { productSuccess, productError } = nextProps

    // handle if submission is success
    ifElse(both(equals(true), () => this.successSubmission), this._handleSuccess, noop)(productSuccess)

    // handle if submission is error
    ifElse(both(equals(true), () => this.successSubmission), this._handleError, noop)(productError)
  }

  render () {
    const { loading, product, route, windowWidth, changeRoute, isMobile } = this.props
    const { errModalToggle, errModalName, errorTitle, errorMessage } = this.state
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
            notificationRef={this._reactNotificationRef}
            emailWarning={this._eMailShareNotification}
            isMobile={isMobile}
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
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(ProductPage))
