/*
 *
 * ProductReview
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'

import {
  getOrderProductAction,
  getMobileNumberAction
} from './actions'

import {
  selectOrderProduct,
  makeSelectProductReview,
  selectLoader,
  selectMobileNumber
} from './selectors'

import {
  Grid,
  Image,
  Form,
  Checkbox,
  Accordion } from 'semantic-ui-react'

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

export class ProductReview extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()
    this.state = {
      value: '',
      visibility: false,
      registeredMobileNumber: '',
      modalToggle: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleToBottom = this.handleToBottom.bind(this)
    this.handleProceed = this.handleProceed.bind(this)
    this.handleStoreLocator = this.handleStoreLocator.bind(this)
  }

  static propTypes = {
    getOrderProduct: PropTypes.func.isRequired,
    loader: PropTypes.bool.isRequired,
    orderedProduct: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    mobileNumber: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  }

  handleChange = (e, { value }) => {
    this.setState({
      value: value,
      visibility: value === 'COD'
    })
  }

  handleToBottom = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 50)
  }

  componentDidMount () {
    this.props.getOrderProduct()
    // this.props.getMobileNumber()
  }

  componentWillReceiveProps (nextProps) {
    const { mobileNumber } = nextProps
    if (mobileNumber.size > 1) {
      this.setState({
        registeredMobileNumber: mobileNumber.last(),
        modalToggle: false
      })
    } else {
      /**
       * @chino please make sure that this will not trigger immediately
       * there should be an identifier that it is done requesting the mobile number
       * TODO:
       */
      // this.setState({
      //   modalToggle: true
      // })
      // setTimeout(() => {
      //   this.props.changeRoute('/')
      // }, 5000)
    }
  }

  handleProceed () {
    this.props.changeRoute('purchases/344760497230963777') // Temporary route
  }

  handleStoreLocator () {
    window.location.replace('https://store-locator-7-eleven.appspot.com')
  }

  render () {
    const { orderedProduct } = this.props
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
                          // checked={this.state.value === 'CASH'}
                          defaultChecked
                          onChange={this.handleChange}
                          />
                      </Form.Field>
                      <Form.Field className='display__none'> {/* Cash on Deliver option */}
                        <Checkbox
                          radio
                          name='cod'
                          value='COD'
                          label={labelTwo}
                          checked={this.state.value === 'COD'}
                          onChange={this.handleChange}
                          onClick={this.handleToBottom}
                          />
                      </Form.Field>
                    </Form>
                  </SelectMethodWrapper>
                </StepContent>
              </StepWrapper>

              {/* <StepWrapper className='visibility' visibility={this.state.visibility}> */}
              <StepWrapper>
                <StepContent>
                  <StepHead step='3' className='margin__top-positive--20'>
                    <FormattedMessage {...messages.stepThree} />
                    <p>Your default store will be the last store you visited</p>
                  </StepHead>
                  <LocationButton onClick={this.handleStoreLocator} fluid icon={NextIcon}>
                    <span>FIND STORE NEARBY</span>
                  </LocationButton>
                </StepContent>
              </StepWrapper>

              <ButtonContainer>
                <Button onClick={this.handleProceed} primary fluid><FormattedMessage {...messages.proceedNext} /></Button>
              </ButtonContainer>
            </ReviewContainer>

            <Modal
              open={this.state.modalToggle}
              name='warning'
              title='Something Wrong'
              content='No registered mobile number.' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

ProductReview.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  ProductReview: makeSelectProductReview(),
  orderedProduct: selectOrderProduct(),
  mobileNumber: selectMobileNumber(),
  loader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    getOrderProduct: (payload) => dispatch(getOrderProductAction(payload)),
    getMobileNumber: (payload) => dispatch(getMobileNumberAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductReview)
