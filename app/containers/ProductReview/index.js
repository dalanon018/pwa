/*
 *
 * ProductReview
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { noop, isEmpty } from 'lodash'
import {
  always,
  anyPass,
  both,
  compose,
  either,
  equals,
  ifElse,
  partial,
  prop,
  propOr,
  toLower,
  toUpper,
  identity
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
import { fnQueryObject, fnSearchParams } from 'utils/http'

import WindowWidth from 'components/Shared/WindowWidth'

import MobileOrderSummary from 'components/Mobile/OrderSummary'
import DesktopOrderSummary from 'components/Desktop/OrderSummary'

import AccessView from 'components/Shared/AccessMobileDesktopView'

import { userIsAuthenticated } from 'containers/App/auth'
import { PRODUCTREVIEW_NAME, RAW_PAYMENT_METHODS } from 'containers/Buckets/constants'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction,
  storeLocatorAction
} from 'containers/Buckets/actions'

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
  getLastSelectedMethodAction
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
  selectLastSelectedMethod
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
    changeRoute: PropTypes.func.isRequired
  }

  showStoreLocator = 'COD'
  showPointsModifier = 'POINTS'

  state = {
    store: {},
    modePayment: 'COD',
    usePoints: 0,
    storeLocatorVisibility: true,
    pointsModifierVisibility: false,
    modalToggle: false,
    errorMessage: ''
  }

  /**
   * Native handler so we know our form is submitting
   */
  submitting = false

  constructor () {
    super()

    this._handleChange = this._handleChange.bind(this)
    this._handleModalClose = this._handleModalClose.bind(this)
    this._handleToBottom = this._handleToBottom.bind(this)
    this._handleProceed = this._handleProceed.bind(this)
    this._handleStoreLocator = this._handleStoreLocator.bind(this)
    this._handleDoneFetchOrderNoProductNorMobile = this._handleDoneFetchOrderNoProductNorMobile.bind(this)
    this._handleSubmissionSuccess = this._handleSubmissionSuccess.bind(this)
    this._handleSubmissionError = this._handleSubmissionError.bind(this)
    this._handleErrorMessage = this._handleErrorMessage.bind(this)

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

  _stepWrapperRef = (ref) => {
    this._innerStepRef = ref
  }

  _handleModalClose () {
    const { orderFail } = this.props
    this.setState({
      modalToggle: false
    })

    // if orderFail size === 0  || submitting == false then means its not submission error
    // its safe to redirect the user.
    if (orderFail.size === 0 && Boolean(this.submitting) === false) {
      this.props.changeRoute('/')
    }
  }

  _handleChange = (e, { value }) => {
    this.setState({
      modePayment: value,
      storeLocatorVisibility: (value === this.showStoreLocator || value === this.showPointsModifier),
      pointsModifierVisibility: value === this.showPointsModifier
    })
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

  _handleProceed () {
    const { mobileNumber, orderedProduct, submitOrder } = this.props
    const { modePayment, store, usePoints } = this.state
    const CODPayment = both(
      anyPass([
        equals(this.showStoreLocator),
        equals(this.showPointsModifier)
      ]),
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

      return submitOrder({
        modePayment,
        orderedProduct,
        mobileNumber,
        store,
        usePoints
      })
    }

    const proceedOrder = ifElse(
      either(CODPayment, CashPayment),
      submissionOrder,
      () => this.setState({
        modalToggle: true,
        errorMessage: <FormattedMessage {...messages.storeEmpty} />
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
    this.props.pushRoute(`/recent-store${fnSearchParams(queryParams)}`)
  }

  _handleDoneFetchOrderNoProductNorMobile () {
    this.setState({
      modalToggle: true,
      errorMessage: <FormattedMessage {...messages.errorHeader} />
    })
  }

  _handleSubmissionSuccess (success) {
    const { changeRoute } = this.props
    if (this.submitting) {
      changeRoute(`/purchases/${success.get('trackingNumber')}`)
      this.submitting = false
    }
  }

  _handleErrorMessage = switchFn({
    400: <FormattedMessage {...messages.emptyQuantity} />,
    500: <FormattedMessage {...messages.errorSubmission} />
  })(<FormattedMessage {...messages.errorSubmission} />)

  _handleSubmissionError (code) {
    if (this.submitting) {
      this.setState({
        modalToggle: true,
        errorMessage: this._handleErrorMessage(code)
      })
      this.submitting = false
    }
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
            storeLocatorVisibility: (modePayment === this.showStoreLocator || modePayment === this.showPointsModifier),
            pointsModifierVisibility: modePayment === this.showPointsModifier,
            store: await transformStore(query) // we update our store
          })
        }
      ),
      propOr('', 'type')
    )

    selectQuery(query)
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentDidMount () {
    const { getLastSelectedMethod, getCurrentPoints, getOrderProduct, getMobileNumber, getStore, getBlackList, setRouteName } = this.props

    setRouteName(PRODUCTREVIEW_NAME)
    getOrderProduct()
    getCurrentPoints()
    getMobileNumber()
    getBlackList()
    getStore()
    getLastSelectedMethod()

    this.props.setPageTitle('Review Order')
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(false)

    this._handleStoreVisible(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const { orderedProduct, productLoader, mobileNumber, mobileLoader, orderSuccess, orderFail } = nextProps
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

    this._handleStoreVisible(nextProps)
  }

  render () {
    const { currentPoints, orderedProduct, orderRequesting, isBlackListed, productLoader } = this.props
    const { errorMessage, modePayment, modalToggle, storeLocatorVisibility, pointsModifierVisibility, store, usePoints } = this.state
    return (
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
            _handleStoreLocator={this._handleStoreLocator}
            _handleRecentStore={this._handleRecentStore}
            _handleToBottom={this._handleToBottom}
            _stepWrapperRef={this._stepWrapperRef}
            _updateUsePoints={this._updateUsePoints}

            errorMessage={errorMessage}
            isBlackListed={isBlackListed}

            modalToggle={modalToggle}
            modePayment={modePayment}
            orderRequesting={orderRequesting}
            orderedProduct={orderedProduct}
            productLoader={productLoader}
            store={store}
            storeLocatorVisibility={storeLocatorVisibility}
            pointsModifierVisibility={pointsModifierVisibility}
          />
        }
        desktopView={
          <div>
            <DesktopOrderSummary
              ShowCodComponent={ShowCodComponent}
              _handleChange={this._handleChange}
              _handleModalClose={this._handleModalClose}
              _handleProceed={this._handleProceed}
              _handleStoreLocator={this._handleStoreLocator}
              _handleToBottom={this._handleToBottom}
              _stepWrapperRef={this._stepWrapperRef}

              errorMessage={errorMessage}
              isBlackListed={isBlackListed}

              modalToggle={modalToggle}
              modePayment={modePayment}
              orderRequesting={orderRequesting}
              orderedProduct={orderedProduct}
              productLoader={productLoader}
              store={store}
              storeLocatorVisibility={storeLocatorVisibility}
            />
          </div>
        }
      />
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
  currentPointsLoading: selectCurrentPointsLoading()
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
    getCurrentPoints: () => dispatch(getCurrentPointsAction()),
    setHandlersDefault: () => dispatch(setOrderHandlersDefaultAction()),
    changeRoute: (url) => dispatch(replace(url)),
    pushRoute: (url) => dispatch(push(url)),
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
