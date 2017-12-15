/*
 *
 * ProductReview
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { noop, isEmpty } from 'lodash'
import { ifElse, equals, both, compose, prop, propOr, either, identity } from 'ramda'
import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { replace } from 'react-router-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'

import { Grid, Label, Form, Checkbox, Image, Button } from 'semantic-ui-react'

import scrollPolyfill from 'utils/scrollPolyfill'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import NextIcon from 'images/icons/greater-than-icon.svg'

import { paramsImgix } from 'utils/image-stock'
import { transformStore } from 'utils/transforms'
import { FbEventTracking } from 'utils/seo'
import { switchFn } from 'utils/logicHelper'
import { fnQueryObject } from 'utils/http'

import Modal from 'components/PromptModal'
import WindowWidth from 'components/WindowWidth'
import ListCollapse from 'components/ListCollapse'

import { LoadingStateImage } from 'components/LoadingBlock'
import { userIsAuthenticated } from 'containers/App/auth'
import { PRODUCTREVIEW_NAME, RAW_PAYMENT_METHODS } from 'containers/Buckets/constants'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction
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
  storeLocatorAction,
  getBlackListAction
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
  selectBlackListed
} from './selectors'

import {
  LabelTitle,
  LabelPrice,
  DetailsWrapper,
  ButtonContainer,
  SelectMethodWrapper,
  ProductItem,
  ProductReviewWrapper,
  MethodTitle,
  StepWrapper,
  StepHead,
  LocationButton,
  CustomGrid
} from './styles'

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
    storeLocator: PropTypes.func.isRequired,
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
      PropTypes.object
    ]).isRequired,
    storeLocation: PropTypes.object,
    setRouteName: PropTypes.func.isRequired
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
    this._handleErrorMessage = this._handleErrorMessage.bind(this)

    scrollPolyfill.polyfill()
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
      visibility: value === this.showStoreLocator
    })
  }

  _handleToBottom = () => {
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
    const { modePayment, store } = this.state
    const CODPayment = (mode) => equals(this.showStoreLocator)(mode) &&
    !isEmpty(store)
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
        store
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

  _toggleOrigDiscountPrice = (product) => {
    const showPrice = product.get('discountPrice') || product.get('price')

    return showPrice ? showPrice.toLocaleString() : 0
  }

  _showDiscountPrice = (component1, component2) => (condition) => ifElse(
    identity,
    () => component1,
    () => component2
  )(condition)

  _updateParamsImages = (images, opt = {}) => {
    const options = {
      w: 414,
      h: 246,
      fit: 'fill',
      auto: 'compress',
      q: 35,
      lossless: 0,
      ...opt
    }

    return images ? paramsImgix(images, options) : ''
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentDidMount () {
    const { location: { search }, getOrderProduct, getMobileNumber, getStore, getBlackList, setRouteName } = this.props

    const query = fnQueryObject(search)
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

    setRouteName(PRODUCTREVIEW_NAME)
    getOrderProduct()
    getMobileNumber()
    getBlackList()
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
    const { orderedProduct, orderRequesting, isBlackListed, productLoader } = this.props
    const { errorMessage, modePayment, modalToggle, visibility, store } = this.state
    const toggleDiscount = this._showDiscountPrice(
      <span className='strike color__grey'>
        <FormattedMessage {...messages.peso} />
        { orderedProduct.get('price') &&
          parseFloat(orderedProduct.get('price')).toLocaleString() }
      </span>,
      null
    )
    const labelOne = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashPrepaid} />
        </Label>
      </LabelTitle>
      <LabelPrice>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(orderedProduct) }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>
    const labelTwo = <label className='label-custom'>
      <LabelTitle>
        <Label as='span' basic size='big' className='color__secondary'>
          <FormattedMessage {...messages.cashDelivery} />
        </Label>
      </LabelTitle>
      <LabelPrice>
        <span className='total color__orange'>
          <FormattedMessage {...messages.peso} />
          { this._toggleOrigDiscountPrice(orderedProduct) }
        </span>
        { toggleDiscount(orderedProduct.get('discountPrice')) }
      </LabelPrice>
    </label>
    const brandLogo = orderedProduct.get('brandLogo') ? (
      <Image
        className='brand-logo'
        alt='CLiQQ'
        src={this._updateParamsImages(orderedProduct.get('brandLogo'), { w: 200, h: 30 })} />) : ''

    return (
      <ProductReviewWrapper>
        { productLoader || brandLogo }
        <LoadingStateImage loading={productLoader} center>
          <ProductItem>
            <Image alt='CLiQQ' src={this._updateParamsImages(orderedProduct.get('image'))} />
            {
              orderedProduct.get('brand')
              ? <Label as='span' basic size='big' className='color__secondary'>{orderedProduct.getIn(['brand', 'name'])}</Label>
              : null
            }
            <Label as='p' basic size='big' className='color__secondary'>{orderedProduct.get('title')}</Label>
          </ProductItem>
        </LoadingStateImage>
        <ListCollapse title={
          <Label as='p' className='margin__none color__secondary' size='large'>
            <FormattedMessage {...messages.viewDetails} />
          </Label>
        }>
          <DetailsWrapper>
            <div className='sub-title color__secondary'>
              <FormattedMessage {...messages.productDetailsTitle} />
            </div>
            <div className='margin__bottom-positive--10 text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: orderedProduct.get('details')}} />
            <div className='sub-title color__secondary'>
              <FormattedMessage {...messages.productDeliveryTitle} />
            </div>
            <div className='text__roboto--light color__dark-grey' dangerouslySetInnerHTML={{__html: orderedProduct.get('deliveryPromiseMessage')}} />
          </DetailsWrapper>
        </ListCollapse>
        <CustomGrid>
          <Grid padded>
            <Grid.Row>
              <MethodTitle>
                <Label as='span' basic size='huge' className='color__secondary'>
                  <FormattedMessage {...messages.methodPayment} />
                </Label>
              </MethodTitle>
            </Grid.Row>
            <Grid.Row>
              <SelectMethodWrapper checkHeight={orderedProduct.get('discountPrice') !== 0}>
                <Form>
                  <Form.Field>
                    <Checkbox
                      radio
                      className='margin__bottom-positive--20'
                      name='cash-prepaid'
                      value='CASH'
                      label={labelOne}
                      checked={modePayment === 'CASH'}
                      onChange={this._handleChange}
                      />
                  </Form.Field>
                  <ShowCodComponent
                    radio
                    isBlackListed={isBlackListed}
                    name='cod'
                    value='COD'
                    label={labelTwo}
                    checked={modePayment === 'COD'}
                    onChange={this._handleChange}
                    onClick={this._handleToBottom}
                  />
                </Form>
              </SelectMethodWrapper>
            </Grid.Row>
          </Grid>
        </CustomGrid>
        <StepWrapper innerRef={this._stepWrapperRef} className='visibility border_top__one--light-grey border_bottom__one--light-grey' visibility={visibility}>
          <Label as='p' basic size='big' className='color__secondary'>
            <FormattedMessage {...messages.chooseStore} />
          </Label>
          <StepHead step='2'>
            <p><FormattedMessage {...messages.defaultStore} /></p>
          </StepHead>
          <LocationButton id='scrollToAnimate' className='color__secondary border__two--light-grey' onClick={this._handleStoreLocator} fluid iconBg={NextIcon}>
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
  previousStore: selectStoreLocation(),
  isBlackListed: selectBlackListed()
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
    storeLocator: (payload) => dispatch(storeLocatorAction(payload)),
    setHandlersDefault: () => dispatch(setOrderHandlersDefaultAction()),
    changeRoute: (url) => dispatch(replace(url)),
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
