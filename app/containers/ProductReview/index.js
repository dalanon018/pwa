/*
 *
 * ProductReview
 *
 */

import React, { PropTypes } from 'react'

import { noop, isEmpty } from 'lodash'
import { ifElse, equals, both, compose, prop } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'

import {
  getOrderProductAction,
  getMobileNumberAction,
  submitOrderAction,
  setOrderHandlersDefaultAction
} from './actions'

import {
  selectOrderProduct,
  selectProductLoader,
  selectMobileNumber,
  selectMobileLoader,
  selectSubmitting,
  selectSubmissionSuccess,
  selectSubmissionError
} from './selectors'

import Modal from 'components/PromptModal'
import WindowWidth from 'components/WindowWidth'
import DesktopBlock from './DesktopBlock'
import MobileBlock from './MobileBlock'

import { calculateProductPrice } from 'utils/promo'

import {
  LabelTitle,
  LabelSubTitle,
  LabelPrice
} from './styles'

// Helper
const isDoneRequesting = (loader) => () => (loader === false)
const isEntityEmpty = compose(equals(0), prop('size'))

export class ProductReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getOrderProduct: PropTypes.func.isRequired,
    productLoader: PropTypes.bool.isRequired,
    mobileLoader: PropTypes.bool.isRequired,
    orderedProduct: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    mobileNumber: PropTypes.string,
    orderRequesting: PropTypes.bool.isRequired,
    orderSuccess: PropTypes.object.isRequired,
    orderFail: PropTypes.object.isRequired
  }

  state = {
    modePayment: 'COD',
    visibility: false,
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
    // this._handleStoreLocator = this._handleStoreLocator.bind(this)
    this._handleDoneFetchOrderNoProductNorMobile = this._handleDoneFetchOrderNoProductNorMobile.bind(this)
    this._handleSubmissionSuccess = this._handleSubmissionSuccess.bind(this)
    this._handleSubmissionError = this._handleSubmissionError.bind(this)
  }

  _handleModalClose () {
    this.setState({
      modalToggle: false
    })
  }

  _handleChange = (e, { value }) => {
    this.setState({
      modePayment: value,
      visibility: value === 'COD'
    })
  }

  _handleToBottom = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 50)
  }

  _handleProceed () {
    const { mobileNumber, orderedProduct, submitOrder } = this.props
    const { modePayment } = this.state

    submitOrder({
      modePayment,
      orderedProduct,
      mobileNumber
    })

    this.submitting = true
  }

  // _handleStoreLocator () {
  //   window.location.replace('https://store-locator-7-eleven.appspot.com')
  // }

  _handleDoneFetchOrderNoProductNorMobile () {
    this.setState({
      modalToggle: true,
      errorMessage: <FormattedMessage {...messages.errorNoMobileProduct} />
    })
    setTimeout(() => {
      this.props.changeRoute('/')
    }, 5000)
  }

  _handleSubmissionSuccess (success) {
    const { changeRoute } = this.props
    if (this.submitting) {
      changeRoute(`/purchases/${success.get('trackingNumber')}`)
      this.submitting = false
    }
  }

  _handleSubmissionError () {
    if (this.submitting) {
      this.setState({
        modalToggle: true,
        errorMessage: <FormattedMessage {...messages.errorSubmission} />
      })
      this.submitting = false
    }
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentDidMount () {
    this.props.getOrderProduct()
    this.props.getMobileNumber()
  }

  componentWillReceiveProps (nextProps) {
    const { orderedProduct, productLoader, mobileNumber, mobileLoader, orderSuccess, orderFail } = nextProps

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
  }

  render () {
    const { orderedProduct, orderRequesting, mobileNumber } = this.props
    const { errorMessage, modePayment, modalToggle } = this.state
    const cliqqCode = orderedProduct.get('cliqqCode') && orderedProduct.get('cliqqCode').first()

    const labelOne = <label className='label-custom'>
      <LabelTitle className='desktop__width--full'>
        <FormattedMessage {...messages.cashPrepaid} />
      </LabelTitle>
      <LabelSubTitle className='desktop__width--full'>
        Get free 10points by paying through prepaid!
      </LabelSubTitle>
      <LabelPrice className='desktop__width--full'>
        <span className='total'>PHP {calculateProductPrice(orderedProduct)}</span>
        {
          !isEmpty(orderedProduct.get('discount')) &&
          <span className='strike'>PHP {orderedProduct.get('price')}</span>
        }
      </LabelPrice>
    </label>

    const labelTwo = <label className='label-custom'>
      <LabelTitle>
        <FormattedMessage {...messages.cashDelivery} />
      </LabelTitle>
      <LabelPrice>
        <span className='total'>PHP {calculateProductPrice(orderedProduct)}</span>
        <span className='strike'>PHP {orderedProduct.get('price')}</span>
      </LabelPrice>
    </label>

    return (
      <div>
        <div className='mobile-visibility'>
          <MobileBlock
            orderedProduct={orderedProduct}
            orderRequesting={orderRequesting}
            mobileNumber={mobileNumber}
            errorMessage={errorMessage}
            modePayment={modePayment}
            modalToggle={modalToggle}
            cliqqCode={cliqqCode}
            labelOne={labelOne}
            labelTwo={labelTwo}

            // function props
            handleChange={this._handleChange}
            handleStoreLocator={this._handleStoreLocator}
            handleToBottom={this._handleToBottom}
            handleProceed={this._handleProceed} />
        </div>
        <div className='desktop-visibility'>
          <DesktopBlock
            orderedProduct={orderedProduct}
            orderRequesting={orderRequesting}
            mobileNumber={mobileNumber}
            errorMessage={errorMessage}
            modePayment={modePayment}
            modalToggle={modalToggle}
            cliqqCode={cliqqCode}
            labelOne={labelOne}
            labelTwo={labelTwo}

            // function props
            handleChange={this._handleChange}
            handleStoreLocator={this._handleStoreLocator}
            handleToBottom={this._handleToBottom}
            handleProceed={this._handleProceed} />
        </div>
        <Modal
          open={modalToggle}
          name='warning'
          title={<FormattedMessage {...messages.errorHeader} />}
          content={errorMessage}
          {
            ...Object.assign({}, (!isEntityEmpty(orderedProduct) && mobileNumber) ? {
              close: this._handleModalClose
            } : {})
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
  orderFail: selectSubmissionError()
})

function mapDispatchToProps (dispatch) {
  return {
    getOrderProduct: () => dispatch(getOrderProductAction()),
    getMobileNumber: () => dispatch(getMobileNumberAction()),
    submitOrder: (payload) => dispatch(submitOrderAction(payload)),
    setHandlersDefault: () => dispatch(setOrderHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(ProductReview))
