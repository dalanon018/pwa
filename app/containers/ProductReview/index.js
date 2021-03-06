/*
 *
 * ProductReview
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { noop, isEmpty } from 'lodash'
import {
  __,
  always,
  both,
  complement,
  compose,
  contains,
  either,
  equals,
  identity,
  ifElse,
  is,
  partial,
  prop,
  propOr,
  toLower,
  toUpper,
  when
} from 'ramda'
import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { replace, push } from 'react-router-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'

import { Form, Checkbox } from 'semantic-ui-react'

import scrollPolyfill from 'utils/scrollPolyfill'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { transformStore } from 'utils/transforms'
import { FbEventTracking } from 'utils/seo'
import { switchFn } from 'utils/logicHelper'
import { fnQueryObject } from 'utils/http'
import { isFullPointsOnly } from 'utils/payment'
import {
  handleErrorMessage,
  sevenElevenCouponPromoErrorHandling
} from 'utils/errorHandling'

import WindowWidth from 'components/Shared/WindowWidth'

import MobileOrderSummary from 'components/Mobile/OrderSummary'
import DesktopOrderSummary from 'components/Desktop/OrderSummary'

import AccessView from 'components/Shared/AccessMobileDesktopView'

import { userIsAuthenticated } from 'containers/App/auth'
import { PRODUCTREVIEW_NAME, RAW_PAYMENT_METHODS, PAYMENTS_OPTIONS } from 'containers/Buckets/constants'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction,
  storeLocatorAction,
  recentStoreLocationAction
} from 'containers/Buckets/actions'

import {
  selectMobileNumbers
} from 'containers/Buckets/selectors'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getOrderProductAction,
  getMobileNumberAction,
  submitOrderAction,
  setOrderHandlersDefaultAction,
  getStoreAction,
  getBlackListAction,
  getCurrentPointsAction,
  getLastSelectedMethodAction,
  submitCouponAction,
  removeCouponAction,
  getEmailAction
} from './actions'

import {
  selectOrderProduct,
  selectProductLoader,
  selectMobileNumber,
  selectMobileLoader,
  selectSubmitting,
  selectSubmissionSuccess,
  selectSubmissionError,
  selectStoreLocation,
  selectBlackListed,
  selectCurrentPoints,
  selectCurrentPointsLoading,
  selectLastSelectedMethod,
  selectCouponApplied,
  selectCouponLoader,
  selectCouponSuccess,
  selectCouponError
} from './selectors'

import {
  ALLOWED_POINTS
} from './constants'

// Helper
const isDoneRequesting = (loader) => () => (loader === false)
const isEntityEmpty = compose(equals(0), prop('size'))

export const ShowCodComponent = ({ isBlackListed, ...rest }) => (
  <Form.Field> {/* Cash on Deliver option */}
    <Checkbox disabled={isBlackListed} {...rest} />
  </Form.Field>
)
export class ProductReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getOrderProduct: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
    getLastSelectedMethod: PropTypes.func.isRequired,
    storeLocator: PropTypes.func.isRequired,
    recentStoreLocation: PropTypes.func.isRequired,
    getCurrentPoints: PropTypes.func.isRequired,
    productLoader: PropTypes.bool.isRequired,
    mobileLoader: PropTypes.bool.isRequired,
    isBlackListed: PropTypes.bool.isRequired,
    orderedProduct: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    mobileNumber: PropTypes.string,
    orderRequesting: PropTypes.bool.isRequired,
    getBlackList: PropTypes.func.isRequired,
    orderSuccess: PropTypes.object.isRequired,
    orderFail: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.number
    ]).isRequired,
    storeLocation: PropTypes.object,
    setRouteName: PropTypes.func.isRequired,
    currentPoints: PropTypes.object.isRequired,
    currentPointsLoading: PropTypes.bool.isRequired,
    pushRoute: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    couponApplied: PropTypes.bool.isRequired,
    couponLoader: PropTypes.bool.isRequired,
    getEmail: PropTypes.func.isRequired,
    couponSuccess: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]).isRequired,
    couponError: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]).isRequired
  }

  showStoreLocator = [PAYMENTS_OPTIONS.COD, PAYMENTS_OPTIONS.POINTS, PAYMENTS_OPTIONS.FULL_POINTS]
  showPointsModifier = PAYMENTS_OPTIONS.POINTS

  state = {
    store: {},
    modePayment: PAYMENTS_OPTIONS.COD,
    usePoints: 0,
    storeLocatorVisibility: true,
    pointsModifierVisibility: false,
    modalToggle: false,
    modalIcon: 'warning',
    modalMessage: '',
    modalContent: '',
    couponCode: '',
    couponPrompt: false,
    couponPromptTitle: '',
    couponPromptDescription: '',
    couponSubmitText: '',
    couponApplied: false
  }

  /**
   * Native handler so we know our form is submitting
   */
  submitting = false

  /**
   * Native handler for submitting coupon
   */
  couponRequest = false

  constructor () {
    super()

    scrollPolyfill.polyfill()
  }

  /**
   * we need to have a way to update usepoints since we will be needing this on submission
   */
  _updateUsePoints = (value) => {
    this.setState(() => ({
      usePoints: value
    }))
  }

  _isFullPointsOnly = () => {
    const { orderedProduct } = this.props
    return isFullPointsOnly({ identifier: orderedProduct.get('title') })
  }

  _stepWrapperRef = (ref) => {
    this._innerStepRef = ref
  }

  _shouldRedirectAccessFromURL = () => {
    const { changeRoute, orderedProduct } = this.props
    // if orderFail size === 0  || submitting == false then means its not submission error
    // its safe to redirect the user.
    // user get here directly w/o ordering
    if (orderedProduct.size === 0) {
      changeRoute('/')
    }
  }

  _handleModalClose = () => {
    this.setState({
      modalToggle: false
    })

    this._shouldRedirectAccessFromURL()
  }

  _handleChange = (e, { value }) => {
    this.setState({
      modePayment: value,
      storeLocatorVisibility: (this.showStoreLocator.indexOf(value)) !== -1,
      pointsModifierVisibility: value === this.showPointsModifier
    })
    console.log(`${value}`)
  }

  _handleToBottom = () => {
    const { windowWidth } = this.props
    windowWidth <= 1024 &&
    setTimeout(() => {
      // parentScrollTo.scrollTo(0, ChildTop)
      this._innerStepRef &&
      this._innerStepRef.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }, 100)
  }

  _handleNotEnoughFullPointsProceed = () => {
    this.setState({
      modalToggle: true,
      modalIcon: 'warning',
      modalMessage: <FormattedMessage {...messages.notEnoughFullPointsTitle} />,
      modalContent: <FormattedMessage {...messages.notEnoughFullPointsContent} />
    })
  }

  _handleNotEnoughFullPointsCloseModal = () => {
    this.setState({
      modalToggle: false
    })
  }

  /**
   * We have to modify since FULL_POINTS is actually a points and cash
   */
  _modifyModePaymentValue = (modePayment) => switchFn({
    [PAYMENTS_OPTIONS.FULL_POINTS]: PAYMENTS_OPTIONS.POINTS
  })(modePayment)(modePayment)

  _handleProceed = () => {
    const { mobileNumber, orderedProduct, submitOrder, couponApplied } = this.props
    const { modePayment, store, usePoints, couponCode } = this.state
    const isShouldHaveStore = both(
      contains(__, this.showStoreLocator),
      () => !isEmpty(store)
    )

    const CashPayment = equals('CASH')
    const submissionOrder = () => {
      FbEventTracking('Purchase', {
        currency: 'PHP',
        pay_method: RAW_PAYMENT_METHODS[modePayment],
        value: orderedProduct.get('price'),
        content_name: orderedProduct.get('title'),
        content_ids: orderedProduct.get('cliqqCode').first(),
        content_type: 'product'
      })

      // we have to modify the mode of payment here.

      return submitOrder({
        modePayment: this._modifyModePaymentValue(modePayment),
        orderedProduct,
        mobileNumber,
        store,
        usePoints,
        ...(couponApplied ? { couponCode } : {})
      })
    }

    const proceedOrder = ifElse(
      either(isShouldHaveStore, CashPayment),
      submissionOrder,
      () => this.setState({
        modalToggle: true,
        modalIcon: 'warning',
        modalMessage: <FormattedMessage {...messages.storeEmpty} />,
        modalContent: ''
      })
    )

    this.submitting = true
    return (orderedProduct.size > 0) ? proceedOrder(modePayment) : null
  }

  _handleStoreLocator = () => {
    const { modePayment } = this.state
    this.props.storeLocator({ modePayment })
  }

  _handleRecentStore = () => {
    const { store, modePayment } = this.state
    const queryParams = {
      ...store,
      type: toLower(modePayment)
    }
    // this.props.pushRoute(`/recent-store${fnSearchParams(queryParams)}`)
    this.props.recentStoreLocation(queryParams)
  }

  _handleDoneFetchOrderNoProductNorMobile = () => {
    this.setState({
      modalToggle: true,
      modalIcon: 'warning',
      modalMessage: <FormattedMessage {...messages.errorHeader} />,
      modalContent: ''
    })
  }

  _handleSubmissionSuccess = (success) => {
    const { changeRoute } = this.props
    if (this.submitting) {
      changeRoute(`/purchases/${success.get('trackingNumber')}`)
      this.submitting = false
    }
  }

  _handleErrorMessage = (code) => {
    return handleErrorMessage({
      code,
      errors: {
        VERIFICATION_EXPIRES: <FormattedMessage {...messages.errorVeriTokenExpired} />,
        EMPTY_QUANTITY: <FormattedMessage {...messages.emptyQuantity} />,
        ERROR_SUBMISSION: <FormattedMessage {...messages.errorSubmission} />,
        COUPON_INVALID: <FormattedMessage {...messages.couponPromptDescriptionError} />
      },
      defaultError: <FormattedMessage {...messages.errorSubmission} />
    })
  }

  _handleCouponErrorMessage =(code) => {
    return sevenElevenCouponPromoErrorHandling({code})
  }

  _handleSubmissionError = (code) => {
    if (this.submitting) {
      this.setState({
        modalToggle: true,
        modalIcon: 'warning',
        modalMessage: this._handleErrorMessage(code),
        modalContent: ''
      })
      this.submitting = false
    }
  }

  _handleCouponError = (code) => {
    const shouldTriggerError = when(
      both(always(this.couponRequest), complement(is(Boolean))),
      (code) => {
        this.setState({
          modalToggle: true,
          modalIcon: 'warning',
          modalMessage: this._handleCouponErrorMessage(code),
          modalContent: ''
        })
        this.couponRequest = false
      }
    )

    shouldTriggerError(code)
  }

  _handleCouponSuccess = (code) => {
    const shouldTriggerSuccess = when(
      both(always(this.couponRequest), identity),
      (code) => {
        this.setState({
          modalIcon: 'checkmark',
          modalToggle: true,
          modalContent: <FormattedMessage {...messages.couponPromptDescriptionSuccess} />,
          modalMessage: <FormattedMessage {...messages.couponPromptTitleSuccess} />
        })
        this.couponRequest = false
      }
    )

    shouldTriggerSuccess(code)
  }

  _isDisabledPointsOptions = () => {
    const { currentPoints } = this.props
    return currentPoints.get('points') < ALLOWED_POINTS
  }

  _handleStoreVisible = (props) => {
    const { location: { search }, previousStore, lastSelectedMethod } = props
    const { store } = this.state
    // handle populating store details
    const populateFromStorage = ifElse(
      isEmpty,
      () => this.setState({
        store: previousStore.toJSON()
      }),
      noop
    )

    const query = fnQueryObject(search)
    const selectQuery = compose(
      ifElse(
        isEmpty,
        partial(populateFromStorage, [store]),
        async (type) => {
          const modePayment = compose(
            toUpper,
            ifElse(
              isEmpty,
              always(type),
              identity
            )
          )(lastSelectedMethod)

          this.setState({
            modePayment,
            storeLocatorVisibility: (this.showStoreLocator.indexOf(modePayment)) !== -1,
            pointsModifierVisibility: modePayment === this.showPointsModifier,
            store: await transformStore(query) // we update our store
          })
        }
      ),
      propOr('', 'type')
    )

    selectQuery(query)
  }

  _handleCouponEntry = e => {
    this.setState({
      couponCode: e.target.value.toUpperCase(),
      couponSubmitText: this.props.intl.formatMessage(messages.couponButtonLabelApply)
    })
  }

  _handleSubmitCoupon = () => {
    const { mobileNumber, orderedProduct, submitCoupon } = this.props
    const { couponCode } = this.state

    this.couponRequest = true

    submitCoupon({
      mobileNumber,
      orderedProduct,
      couponCode
    })
  }

  _handleRemoveCoupon = () => {
    const { orderedProduct, removeCoupon } = this.props
    removeCoupon({ orderedProduct })
  }

  _handleCouponClose = () => {
    this.setState({couponPrompt: false})
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  // componentWillMount () {
  //   this.setState({ALLOWED_POINTS: product.get('poc')})
  // }

  // _handleSetMinimumPoints = () => {
  //   const { product } = this.props
  //   return isFullPointsOnly({ ALLOWED_POINTS: product.get('poc') })
  // }

  componentDidMount () {
    const { getLastSelectedMethod, getCurrentPoints, getOrderProduct, getMobileNumber, getStore, getBlackList, setRouteName, getEmail } = this.props

    setRouteName(PRODUCTREVIEW_NAME)
    getOrderProduct()
    getCurrentPoints()
    getMobileNumber()
    getEmail()
    getBlackList()
    getStore()
    // getStoreDeliveryMessage()
    getLastSelectedMethod()
    this.props.setPageTitle('Review Order')
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(false)

    this._handleStoreVisible(this.props)

    this.setState({couponSubmitText: this.props.intl.formatMessage(messages.couponButtonLabelApply)})
  }

  componentWillReceiveProps (nextProps) {
    const { orderedProduct, productLoader, mobileNumber, mobileLoader, orderSuccess, orderFail, couponSuccess, couponError } = nextProps
    const { store } = this.state

    if (!isEmpty(store)) {
      this._handleToBottom()
    }
    // handle once done fetching our ordered product
    ifElse(
      both(isEntityEmpty, isDoneRequesting(productLoader)), this._handleDoneFetchOrderNoProductNorMobile, noop
    )(orderedProduct)

    // handle once done fetching our use mobile number
    ifElse(
      both(equals('null'), isDoneRequesting(mobileLoader)), this._handleDoneFetchOrderNoProductNorMobile, noop
    )(mobileNumber)

    // handle once done submitting and success
    ifElse(
      isEntityEmpty, noop, this._handleSubmissionSuccess
    )(orderSuccess)

    // handle once done submitting and theres error
    ifElse(
      isEntityEmpty, noop, this._handleSubmissionError
    )(orderFail)

    // handle once done applying and theres error
    ifElse(
      isEntityEmpty, noop, this._handleCouponError
    )(couponError)

    ifElse(
      isEntityEmpty, noop, this._handleCouponSuccess
    )(couponSuccess)

    this._handleStoreVisible(nextProps)
  }

  render () {
    const { currentPoints, orderedProduct, orderRequesting, isBlackListed, productLoader, intl, mobileNumbers, couponApplied, couponLoader } = this.props
    const { modalIcon, modalMessage, modalContent, modePayment, modalToggle, storeLocatorVisibility, pointsModifierVisibility, store, usePoints, couponCode } = this.state

    return (
      <div>
        <AccessView
          mobileView={
            <MobileOrderSummary
              isDisabledPointsOptions={this._isDisabledPointsOptions()}
              currentPoints={currentPoints.get('points') || 0}
              usePoints={usePoints}
              ShowCodComponent={ShowCodComponent}
              _handleChange={this._handleChange}
              _handleModalClose={this._handleModalClose}
              _handleProceed={this._handleProceed}
              _handleNotEnoughFullPointsProceed={this._handleNotEnoughFullPointsProceed}
              _handleNotEnoughFullPointsCloseModal={this._handleNotEnoughFullPointsCloseModal}
              _handleStoreLocator={this._handleStoreLocator}
              _handleRecentStore={this._handleRecentStore}
              _handleToBottom={this._handleToBottom}
              _stepWrapperRef={this._stepWrapperRef}
              _updateUsePoints={this._updateUsePoints}
              _isFullPointsOnly={this._isFullPointsOnly()}
              _handleSetMinimumPoints={this._handleSetMinimumPoints}
              _handleCouponEntry={this._handleCouponEntry}
              _handleSubmitCoupon={this._handleSubmitCoupon}
              _handleRemoveCoupon={this._handleRemoveCoupon}

              modalToggle={modalToggle}
              modalIcon={modalIcon}
              modalMessage={modalMessage}
              modalContent={modalContent}

              isBlackListed={isBlackListed}
              modePayment={modePayment}
              orderRequesting={orderRequesting}
              orderedProduct={orderedProduct}
              productLoader={productLoader}
              store={store}
              storeLocatorVisibility={storeLocatorVisibility}
              pointsModifierVisibility={pointsModifierVisibility}

              couponCode={couponCode}
              couponApplied={couponApplied}
              couponLoader={couponLoader}

            />
          }
          desktopView={
            <div>
              <DesktopOrderSummary
                _handleChange={this._handleChange}
                _handleModalClose={this._handleModalClose}
                _handleProceed={this._handleProceed}
                _handleStoreLocator={this._handleStoreLocator}
                _handleToBottom={this._handleToBottom}
                _stepWrapperRef={this._stepWrapperRef}
                _updateUsePoints={this._updateUsePoints}
                _isFullPointsOnly={this._isFullPointsOnly()}
                _handleCouponEntry={this._handleCouponEntry}
                _handleSubmitCoupon={this._handleSubmitCoupon}
                _handleRemoveCoupon={this._handleRemoveCoupon}

                modalToggle={modalToggle}
                modalIcon={modalIcon}
                modalMessage={modalMessage}
                modalContent={modalContent}
                isBlackListed={isBlackListed}

                isDisabledPointsOptions={this._isDisabledPointsOptions()}
                ShowCodComponent={ShowCodComponent}
                currentPoints={currentPoints.get('points') || 0}
                usePoints={usePoints}
                modePayment={modePayment}
                orderRequesting={orderRequesting}
                orderedProduct={orderedProduct}
                productLoader={productLoader}
                store={store}
                storeLocatorVisibility={storeLocatorVisibility}
                intl={intl}
                mobileNumbers={mobileNumbers}
                pointsModifierVisibility={pointsModifierVisibility}

                couponCode={couponCode}
                couponApplied={couponApplied}
                couponLoader={couponLoader}
              />
            </div>
          }
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  orderedProduct: selectOrderProduct(),
  mobileNumber: selectMobileNumber(),
  productLoader: selectProductLoader(),
  mobileLoader: selectMobileLoader(),
  orderRequesting: selectSubmitting(),
  orderSuccess: selectSubmissionSuccess(),
  orderFail: selectSubmissionError(),
  lastSelectedMethod: selectLastSelectedMethod(),
  previousStore: selectStoreLocation(),
  isBlackListed: selectBlackListed(),
  currentPoints: selectCurrentPoints(),
  currentPointsLoading: selectCurrentPointsLoading(),
  mobileNumbers: selectMobileNumbers(),
  couponApplied: selectCouponApplied(),
  couponLoader: selectCouponLoader(),
  couponSuccess: selectCouponSuccess(),
  couponError: selectCouponError()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getBlackList: () => dispatch(getBlackListAction()),
    getOrderProduct: () => dispatch(getOrderProductAction()),
    getMobileNumber: () => dispatch(getMobileNumberAction()),
    submitOrder: (payload) => dispatch(submitOrderAction(payload)),
    getStore: () => dispatch(getStoreAction()),
    getLastSelectedMethod: () => dispatch(getLastSelectedMethodAction()),
    storeLocator: (payload) => dispatch(storeLocatorAction(payload)),
    recentStoreLocation: (payload) => dispatch(recentStoreLocationAction(payload)),
    getCurrentPoints: () => dispatch(getCurrentPointsAction()),
    setHandlersDefault: () => dispatch(setOrderHandlersDefaultAction()),
    submitCoupon: (payload) => dispatch(submitCouponAction(payload)),
    removeCoupon: (payload) => dispatch(removeCouponAction(payload)),
    changeRoute: (url) => dispatch(replace(url)),
    pushRoute: (url) => dispatch(push(url)),
    getEmail: (payload) => dispatch(getEmailAction(payload)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'productReview', reducer })
const withSaga = injectSaga({ key: 'productReview', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(userIsAuthenticated(ProductReview))))
