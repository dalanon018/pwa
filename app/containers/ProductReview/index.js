/*
 *
 * ProductReview
 *
 */

import React, { PropTypes } from 'react'

import { noop, isEmpty } from 'lodash'
import { ifElse, equals, both, compose, prop, propOr, either, identity } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'

import { Grid, Label, Form, Checkbox, Image, Button } from 'semantic-ui-react'

import { imageStock } from 'utils/image-stock'
import { transformStore } from 'utils/transforms'

import {
  getOrderProductAction,
  getMobileNumberAction,
  submitOrderAction,
  setOrderHandlersDefaultAction,
  getStoreAction,
  storeLocatorAction
} from './actions'

import {
  selectOrderProduct,
  selectProductLoader,
  selectMobileNumber,
  selectMobileLoader,
  selectSubmitting,
  selectSubmissionSuccess,
  selectSubmissionError,
  selectStoreLocation
} from './selectors'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import Modal from 'components/PromptModal'
import WindowWidth from 'components/WindowWidth'
import ListCollapse from 'components/ListCollapse'

import NextIcon from 'images/icons/greater-than-icon.svg'

import {
  LabelTitle,
  // LabelSubTitle,
  LabelPrice,
  DetailsWrapper,
  ButtonContainer,
  SelectMethodWrapper,
  ProductItem,
  ProductReviewWrapper,
  MethodTitle,
  StepWrapper,
  StepHead,
  LocationButton
} from './styles'

// Helper
const isDoneRequesting = (loader) => () => (loader === false)
const isEntityEmpty = compose(equals(0), prop('size'))

export class ProductReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getOrderProduct: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
    storeLocator: PropTypes.func.isRequired,
    productLoader: PropTypes.bool.isRequired,
    mobileLoader: PropTypes.bool.isRequired,
    orderedProduct: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    mobileNumber: PropTypes.string,
    orderRequesting: PropTypes.bool.isRequired,
    orderSuccess: PropTypes.object.isRequired,
    orderFail: PropTypes.object.isRequired,
    storeLocation: PropTypes.object
  }

  showStoreLocator = 'COD'

  state = {
    store: {},
    modePayment: 'CASH',
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
    this._handleStoreLocator = this._handleStoreLocator.bind(this)
    this._handleDoneFetchOrderNoProductNorMobile = this._handleDoneFetchOrderNoProductNorMobile.bind(this)
    this._handleSubmissionSuccess = this._handleSubmissionSuccess.bind(this)
    this._handleSubmissionError = this._handleSubmissionError.bind(this)
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
      visibility: value === this.showStoreLocator
    })
  }

  _handleToBottom = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 50)
  }

  _handleProceed () {
    const { mobileNumber, orderedProduct, submitOrder } = this.props
    const { modePayment, store } = this.state
    const CODPayment = (mode) => equals(this.showStoreLocator)(mode) &&
    !isEmpty(store)
    const CashPayment = equals('CASH')

    const proceedOrder = ifElse(
      either(CODPayment, CashPayment),
      () => submitOrder({ modePayment, orderedProduct, mobileNumber, store }),
      () => this.setState({
        modalToggle: true,
        errorMessage: <FormattedMessage {...messages.storeEmpty} />
      })
    )

    this.submitting = true
    return proceedOrder(modePayment)
  }

  _handleStoreLocator () {
    this.props.storeLocator()
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

  _handleSubmissionError () {
    if (this.submitting) {
      this.setState({
        modalToggle: true,
        errorMessage: <FormattedMessage {...messages.errorSubmission} />
      })
      this.submitting = false
    }
  }

  _toggleOrigDiscountPrice = (product) => {
    return product.get('discountPrice') || product.get('price')
  }

  _showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  async componentDidMount () {
    const { router: { location: { query } }, getOrderProduct, getMobileNumber, getStore } = this.props

    const selectQuery = compose(
      ifElse(
        isEmpty,
        noop,
        async (type) => this.setState({
          modePayment: type.toUpperCase(),
          visibility: type.toUpperCase() === this.showStoreLocator,
          store: await transformStore(query) // we update our store
        })
      ),
      propOr('', 'type')
    )

    getOrderProduct()
    getMobileNumber()
    getStore()
    selectQuery(query)

    this.props.setPageTitle('Review Order')
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(false)
  }

  componentWillReceiveProps (nextProps) {
    const { orderedProduct, productLoader, mobileNumber, mobileLoader, orderSuccess, orderFail, previousStore } = nextProps
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

    // handle populating store details
    ifElse(
      isEmpty,
      () => this.setState({
        store: previousStore.toJSON()
      }),
      noop
    )(store)
  }

  render () {
    const { orderedProduct, orderRequesting } = this.props
    const { errorMessage, modePayment, modalToggle, visibility, store } = this.state
    const toggleDiscount = this._showDiscountPrice(
      <span className='strike'>
        <FormattedMessage {...messages.peso} />
        { orderedProduct.get('price') &&
          parseFloat(orderedProduct.get('price')).toLocaleString() }
      </span>,
      null
    )
    const labelOne = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big'>
          <FormattedMessage {...messages.cashPrepaid} />
        </Label>
      </LabelTitle>
      <LabelPrice>
        <span className='total'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(orderedProduct) }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice') !== 0) }
      </LabelPrice>
    </label>
    const labelTwo = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big'>
          <FormattedMessage {...messages.cashDelivery} />
        </Label>
      </LabelTitle>
      <LabelPrice>
        <span className='total'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(orderedProduct) }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice') !== 0) }
      </LabelPrice>
    </label>

    const brandLogo = orderedProduct.get('brandLogo') ? (<Image className='brand-logo' alt='Cliqq' src={orderedProduct.get('brandLogo')} />) : ''

    return (
      <ProductReviewWrapper>
        {brandLogo}
        <ProductItem>
          <Image alt='Cliqq' src={orderedProduct.get('image') ? orderedProduct.get('image') : imageStock('default-slider.jpg')} />
          <Label as='p' basic size='big'>Brand Name</Label>
          <Label as='p' basic size='big'>{orderedProduct.get('title')}</Label>
        </ProductItem>
        <ListCollapse title={
          <Label as='p' className='margin__none' size='large'>
            <FormattedMessage {...messages.viewDetails} />
          </Label>
        }>
          <DetailsWrapper>
            <div className='sub-title'>
              <FormattedMessage {...messages.productDetailsTitle} />
            </div>
            <div className='margin__bottom-positive--10' dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
            <div className='sub-title'>
              <FormattedMessage {...messages.productDeliveryTitle} />
            </div>
            <div dangerouslySetInnerHTML={{__html: orderedProduct.get('deliveryPromiseMessage')}} />
          </DetailsWrapper>
        </ListCollapse>
        <Grid padded>
          <Grid.Row>
            <MethodTitle>
              <Label as='span' basic size='huge'>
                <FormattedMessage {...messages.methodPayment} />
              </Label>
            </MethodTitle>
          </Grid.Row>
          <Grid.Row>
            <SelectMethodWrapper>
              <Form>
                <Form.Field>
                  <Checkbox
                    radio
                    name='cash-prepaid'
                    value='CASH'
                    label={labelOne}
                    checked={modePayment === 'CASH'}
                    onChange={this._handleChange}
                    />
                </Form.Field>
                <Form.Field> {/* Cash on Deliver option */}
                  <Checkbox
                    radio
                    name='cod'
                    value='COD'
                    label={labelTwo}
                    checked={modePayment === 'COD'}
                    onChange={this._handleChange}
                    onClick={this._handleToBottom}
                    />
                </Form.Field>
              </Form>
            </SelectMethodWrapper>
          </Grid.Row>
        </Grid>
        <StepWrapper className='visibility' visibility={visibility}>
          <Label as='p' basic size='large'>
            <FormattedMessage {...messages.chooseStore} />
          </Label>
          <StepHead step='2'>
            <p><FormattedMessage {...messages.defaultStore} /></p>
          </StepHead>
          <LocationButton onClick={this._handleStoreLocator} fluid iconBg={NextIcon}>
            {
              store && isEmpty(store)
              ? <FormattedMessage {...messages.findStore} />
              : <span>{store.id} {store.name}</span>
            }
          </LocationButton>
        </StepWrapper>

        <ButtonContainer>
          <Button onClick={this._handleProceed} primary fluid loading={orderRequesting}>
            <FormattedMessage {...messages.proceedNext} />
          </Button>
        </ButtonContainer>

        <Modal
          open={modalToggle}
          name='warning'
          title={errorMessage}
          content=''
          close={this._handleModalClose}
        />
      </ProductReviewWrapper>
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
  previousStore: selectStoreLocation()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getOrderProduct: () => dispatch(getOrderProductAction()),
    getMobileNumber: () => dispatch(getMobileNumberAction()),
    submitOrder: (payload) => dispatch(submitOrderAction(payload)),
    getStore: () => dispatch(getStoreAction()),
    storeLocator: (payload) => dispatch(storeLocatorAction(payload)),
    setHandlersDefault: () => dispatch(setOrderHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProductReview)))
