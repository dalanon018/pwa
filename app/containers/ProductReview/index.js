/*
 *
 * ProductReview
 *
 */

import React, { PropTypes } from 'react'

import { noop } from 'lodash'
import { ifElse, equals, both, compose, prop } from 'ramda'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'

import messages from './messages'

import {
  getOrderProductAction,
  getMobileNumberAction,
  submitOrderAction
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

import {
  Grid,
  Image,
  Form,
  Checkbox,
  Accordion
} from 'semantic-ui-react'

import Button from 'components/Button'
import Modal from 'components/PromptModal'

import { calculateProductPrice } from 'utils/promo'

import SampleProduct from 'images/test-images/samplebag.png'
import SampleBrand from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
import NextIcon from 'images/icons/greater-than-icon.svg'

import {
  StepHead,
  ProductItem,
  StepContent,
  CliqqCodeWrapper,
  ProductName,
  SelectMethodWrapper,
  DetailsWrapper,
  ViewDetails,
  ButtonContainer,
  StepWrapper,
  LabelTitle,
  ReviewContainer,
  LocationButton,
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
    modePayment: '',
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

  _handleStoreLocator () {
    window.location.replace('https://store-locator-7-eleven.appspot.com')
  }

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
    const cliqqCode = orderedProduct.get('cliqqCode') && orderedProduct.get('cliqqCode').join(', ')

    const labelOne = <label className='label-custom'>
      <LabelTitle>
        <FormattedMessage {...messages.cashPrepaid} />
      </LabelTitle>
      <LabelSubTitle>
        Get free 10points by paying through prepaid!
      </LabelSubTitle>
      <LabelPrice>
        <span className='total'>PHP {calculateProductPrice(orderedProduct)}</span>
        <span className='strike'>PHP {orderedProduct.get('price')}</span>
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
      <Grid padded>
        <Grid.Row>
          <Grid.Column className='padding__none--horizontal'>

            <ReviewContainer>
              <StepWrapper>
                <StepContent>
                  <StepHead step='1'>
                    <FormattedMessage {...messages.stepOne} />
                  </StepHead>
                  <ProductItem brand={SampleBrand}>
                    <Image src={SampleProduct} />
                  </ProductItem>
                  <CliqqCodeWrapper>
                    <Image src={CliqqLogo} /> { cliqqCode }
                  </CliqqCodeWrapper>
                  <ProductName className='text-center'>{orderedProduct.get('title')}</ProductName>
                </StepContent>
                <ViewDetails>
                  <Accordion fluid>
                    <Accordion.Title>
                      <FormattedMessage {...messages.viewDetails} />
                    </Accordion.Title>
                    <Accordion.Content>
                      <DetailsWrapper>
                        <FormattedMessage {...messages.productDetailsTitle} />
                        <p>{orderedProduct.get('details')}</p>
                        <FormattedMessage {...messages.productDeliveryTitle} />
                        <p>{orderedProduct.get('shipping')}</p>
                      </DetailsWrapper>
                    </Accordion.Content>
                  </Accordion>
                </ViewDetails>
              </StepWrapper>

              <StepWrapper>
                <StepContent>
                  <StepHead step='2' className='margin__top-positive--20'>
                    <FormattedMessage {...messages.stepTwo} />
                  </StepHead>
                  <SelectMethodWrapper>
                    <Form>
                      <Form.Field>
                        <Checkbox
                          radio
                          name='cash-prepaid'
                          value='CASH'
                          label={labelOne}
                          // checked={modePayment === 'CASH'}
                          defaultChecked
                          onChange={this._handleChange}
                          />
                      </Form.Field>
                      <Form.Field className='display__none'> {/* Cash on Deliver option */}
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
                </StepContent>
              </StepWrapper>

              {/* <StepWrapper className='visibility' visibility={visibility}> */}
              <StepWrapper>
                <StepContent>
                  <StepHead step='3' className='margin__top-positive--20'>
                    <FormattedMessage {...messages.stepThree} />
                    <p>Your default store will be the last store you visited</p>
                  </StepHead>
                  <LocationButton onClick={this._handleStoreLocator} fluid icon={NextIcon}>
                    <span>FIND STORE NEARBY</span>
                  </LocationButton>
                </StepContent>
              </StepWrapper>

              <ButtonContainer>
                <Button onClick={this._handleProceed} primary fluid loading={orderRequesting}><FormattedMessage {...messages.proceedNext} /></Button>
              </ButtonContainer>
            </ReviewContainer>

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
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview)
