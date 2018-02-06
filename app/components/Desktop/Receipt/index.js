import React from 'react'
import PropTypes from 'prop-types'
import JsBarcode from 'jsbarcode'

import {
  T,
  always,
  both,
  compose,
  cond,
  contains,
  complement,
  equals,
  ifElse,
  partialRight
} from 'ramda'
import { noop } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { Container, Grid, Label, Button, Image, Checkbox } from 'semantic-ui-react'

import Countdown from 'components/Shared/Countdown'
import LoadingIndicator from 'components/Shared/LoadingIndicator'

import ReturnIcon from 'images/icons/receipts/return-icon-receipt.svg'

import { DateFormater } from 'utils/date' // DateFormater
import { PhoneFormatter } from 'utils/string'
import { handlingStatus } from 'utils/ordersHelper'
import { isIphone } from 'utils/http'
import { switchFn } from 'utils/logicHelper'

import PurchaseOrder from './PurchaseOrder'
import PurchaseUsecase from './PurchaseUsecase'
import messages from './messages'

import {
  WrapperWarning,
  WarningDescription,
  BarcodeSVG,
  ButtonContainer,
  ReceiptContainer,
  ReceiptHeader,
  ReceiptContent,
  InfoContainer,
  Scanner,
  CustomContainer,
  ReceiptWrapper,
  ScannerWrapper,
  PushNotificationWrapper,
  MatchCode,
  PayCode
  // InstructionsWrapper
} from './styled'

import {
  HIDE_BARCODE
} from './constants'

import purchasesMessages from 'containers/Purchases/messages'

import {
  COMPLETED,
  EXPIRED,
  DEFAULT_METHOD_PAYMENT
} from 'containers/Buckets/constants'

const ReturnInfo = ({ returnable, actionButton }) => (
  <WarningDescription>
    <Image src={ReturnIcon} />
    <section>
      <Label className='text__roboto' as='span' basic size='large'>
        <FormattedMessage {...messages.returnPolicyTitle} />
      </Label>
      <Label className='text__roboto--light' as='p' size='large'>
        <FormattedMessage {...messages[`returnPolicyDescription${returnable}`]} />
      </Label>
      <Label className='text__roboto--light' as='p' size='small'>
        <FormattedMessage
          {...messages[`returnPolicyDescriptionWarning${returnable}`]}
          values={{ actionButton }}
          />
      </Label>
    </section>
  </WarningDescription>
)

const WarningStatus = ({ status, returnable }) => {
  const isReturnabled = returnable ? 'Valid' : 'Invalid'
  return switchFn({
    CLAIMED: (
      <ReturnInfo
        returnable={isReturnabled}
        actionButton={(
          <a href='mailto:cliqqsupport@7-eleven.com.ph?Subject=Returns' target='_top'>
            cliqqsupport@7-eleven.com.ph
          </a>
        )}
      />
    )
  })(null)(status)
}

class Receipt extends React.PureComponent {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
    statuses: PropTypes.object.isRequired,
    goHomeFn: PropTypes.func.isRequired,
    goToProduct: PropTypes.func.isRequired,
    goReceiptPage: PropTypes.func.isRequired,
    isRegisteredPush: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]).isRequired,
    registerPushNotification: PropTypes.func.isRequired,
    loadingPushToggle: PropTypes.bool.isRequired
  }

  _defaultModePayment = DEFAULT_METHOD_PAYMENT

  constructor () {
    super()

    this.state = {
      show: '0'
    }
    this._renderPurchaseBanner = this._renderPurchaseBanner.bind(this)
  }

  _renderPurchaseBanner () {
    const { timer, statuses, receipt, purchaseOrder } = this.props
    const status = statuses[receipt.get('status')] || ''
    const defaultProps = {
      status,
      modePayment: receipt.get('modePayment') || this._defaultModePayment,
      storeName: receipt.get('storeName')
    }

    if (purchaseOrder.includes(status) && receipt.get('modePayment') === this._defaultModePayment) {
      return (
        <PurchaseOrder
          {...defaultProps}
          receipt={receipt}
          timer={timer}
        />
      )
    }

    return <PurchaseUsecase {...defaultProps} />
  }

  _handleScanAnimate = (e, data) => {
    const block = document.getElementsByClassName('scan')[0]

    setTimeout(() => {
      this.setState({
        show: block ? block.offsetHeight : 0
      })
    }, 500)
  }

  _handleStatusTitle = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || 'UNKNOWN'
    const handleStatus = handlingStatus(this._handleModePayment())

    return (
      <FormattedMessage {...purchasesMessages[`titleStatus${handleStatus(currentStatus)}`]} />
    )
  }

  // simply handle the color of the status
  _handleColorStatus = cond([
    [partialRight(contains, [COMPLETED]), always('green')],
    [partialRight(contains, [EXPIRED]), always('red')],
    [T, always('orange')]
  ])

  _handleModePayment = () => {
    const { receipt } = this.props
    return receipt.get('modePayment') || this._defaultModePayment
  }

  _handleDateString = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || 'FieldDefault'
    const modePayment = this._handleModePayment()
    return (
      <FormattedMessage {...messages[`date${modePayment}${currentStatus}`]} />
    )
  }

  _handleDateValue = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''
    const handleStatus = handlingStatus(this._handleModePayment())

    const handleDate = compose(
      partialRight(DateFormater, ['MM-DD-YYYY']),
      switchFn({
        PROCESSING: receipt.get('dateCreated'),
        CONFIRMED: receipt.get('lastUpdated'),
        INTRANSIT: receipt.get('lastUpdated'),
        LOSTINTRANSIT: receipt.get('lastUpdated'),
        CLAIMED: receipt.get('lastUpdated'),
        DELIVERED: receipt.get('lastUpdated'),
        UNPAID: receipt.get('lastUpdated'),
        UNCLAIMED: receipt.get('lastUpdated')
      })(receipt.get('expiryDate')),
      handleStatus
    )

    return handleDate(currentStatus)
  }

  _handlePushRegistrationUI = () => {
    const { isRegisteredPush, registerPushNotification, loadingPushToggle } = this.props
    const displayUI = ifElse(
      both(equals(false), complement(isIphone)),
      () => (
        <PushNotificationWrapper>
          <Grid padded>
            <Grid.Row columns={2}>
              { loadingPushToggle && <LoadingIndicator /> }
              <Grid.Column width={11}>
                <Label as='p' basic size='large'>
                  <FormattedMessage {...messages.pushNotifLabel} />
                </Label>
                <Label as='span' basic size='medium' className='text__roboto--light'>
                  <FormattedMessage {...messages.pushNotifDescription} />
                </Label>
              </Grid.Column>
              <Grid.Column width={5} textAlign='right'>
                <Checkbox
                  toggle
                  checked={isRegisteredPush}
                  value='register'
                  onChange={registerPushNotification}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </PushNotificationWrapper>
      ),
      () => null
    )

    return displayUI(isRegisteredPush)
  }

  _handleButtonFunctionality = () => {
    const { receipt, statuses, goReceiptPage, goToProduct } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''

    return switchFn({
      UNPAID: (
        <Button onClick={goToProduct} primary>
          <FormattedMessage {...messages.rePurchase} />
        </Button>
      )
    })(
      <Button onClick={goReceiptPage} primary>
        <FormattedMessage {...messages.viewActivity} />
      </Button>
    )(currentStatus)
  }

  _handleMatchCode = (str) => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''
    const handleStatus = handlingStatus(this._handleModePayment())

    const handleMatchCodeComponent = compose(
      switchFn({
        RESERVED: null,
        UNPAID: null
      })(
        <MatchCode>
          <div className='border-divider' />
          <Label as='span' basic size='huge' className='color__secondary color__secondary background__light-grey'>
            {str && str.slice(-3)}
          </Label>
        </MatchCode>
      ),
      handleStatus
    )

    return handleMatchCodeComponent(currentStatus)
  }

  _displayReferenceNumber = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''
    const handleStatus = handlingStatus(this._handleModePayment())

    const _handleReferenceNumber = compose(
      switchFn({
        PROCESSING: receipt.get('payCode'),
        RESERVED: receipt.get('payCode'),
        UNPAID: null
      })(
        receipt.get('claimCode')
      ),
      handleStatus
    )

    return _handleReferenceNumber(currentStatus)
  }

  _displayBarcode = (code) => {
    // we need to make sure we have code.
    if (code) {
      return JsBarcode('#barcode', code.split('-').join(''), {
        format: 'CODE128',
        lineColor: '#5B5B5B',
        width: 3,
        height: 60,
        displayValue: false
      })
    }

    return null
  }

  _handeDisplayBarcode = (props) => {
    const { receipt, statuses } = props
    const currentStatus = statuses[receipt.get('status')] || ''
    const handleStatus = handlingStatus(receipt.get('modePayment') || this._defaultModePayment)
    /**
     * we have to make sure that we will initialize JsBarcode only if it is on the dom
     */
    const _handleDisplayBarCode = compose(
      ifElse(
        both(() => receipt.get('payCode'), complement(partialRight(contains, [HIDE_BARCODE]))),
        compose(
          this._displayBarcode,
          switchFn({
            PROCESSING: receipt.get('payCode'),
            RESERVED: receipt.get('payCode'),
            UNPAID: receipt.get('payCode')
          })(receipt.get('claimCode'))
        ),
        noop
      ),
      handleStatus
    )
    return _handleDisplayBarCode(currentStatus)
  }

  componentDidMount () {
    this._handleScanAnimate()
    const fadeMeElement = document.getElementById('fadeMe')

    if (fadeMeElement) {
      setTimeout(() => {
        fadeMeElement.style.opacity = '1'
      }, 800)
    }
  }

  componentWillReceiveProps (nextProps) {
    this._handeDisplayBarcode(nextProps)
  }

  render () {
    const { show } = this.state
    const { receipt, statuses } = this.props

    return (
      <Container>
        <ReceiptWrapper>
          <ReceiptContainer className='background__white'>
            <ReceiptHeader className='background__light-grey'>
              <CustomContainer>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column floated='left' width={9} className='product-status'>
                      <Label className='weight-400 color__secondary' as='span' basic size='small'>
                        <FormattedMessage {...messages.statusLabel} />
                      </Label>
                      <Label as='p' basic size='huge' color={this._handleColorStatus(statuses[receipt.get('status')])}>
                        { this._handleStatusTitle() }
                      </Label>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={7}>
                      <Label className='weight-400 color__secondary' as='span' basic size='small'>
                        <FormattedMessage {...messages.paymentMethod} />
                      </Label>
                      <Label as='p' basic size='large' className='color__secondary'>
                        <FormattedMessage {...messages[`${this._handleModePayment()}methodType`]} />
                      </Label>
                    </Grid.Column>

                    <Grid.Column floated='left' className='order-number' width={9}>
                      <Label className='weight-400 color__secondary' as='span' basic size='small'>
                        <FormattedMessage {...messages.trackingNumber} />
                      </Label>
                      <Label as='p' basic size='big' className='color__secondary'>{receipt.get('trackingNumber')}</Label>
                    </Grid.Column>
                    <Grid.Column floated='right' textAlign='right' width={7}>
                      <Label className='weight-400 color__secondary' as='span' basic size='small'>
                        { this._handleDateString() }
                      </Label>
                      <Label as='p' basic size='large' className='color__secondary'>{ this._handleDateValue()}</Label>
                    </Grid.Column>
                    <Grid.Column width={16}>
                      {this._handleMatchCode(receipt.get('trackingNumber'))}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </CustomContainer>
            </ReceiptHeader>
            <ReceiptContent id='fadeMe' show={show}>
              <Grid padded className='scan padding__14' centered textAlign='center'>
                {
                  receipt.getIn(['products', 'brand'])
                  ? <Label as='span' basic size='large' className='color__secondary'>{receipt.getIn(['products', 'brand', 'name'])}</Label>
                  : null
                }
                <Label as='p' basic size='large' className='color__secondary margin__none'>{receipt.getIn(['products', 'name'])}</Label>
                <Label className='product-current-price text__roboto--bold' basic color='orange'>
                  <FormattedMessage {...messages.peso} />
                  { parseFloat(receipt.get('amount')).toLocaleString() }
                </Label>
                <Label className='text__roboto--light color__secondary mobile-number' as='p' basic size='medium' >
                  <FormattedMessage {...messages.mobileNumberLabel} />

                  <FormattedMessage {...messages.mobileNumberCode} />
                  { PhoneFormatter(receipt.get('mobileNumber')) }
                </Label>
                <BarcodeSVG id='barcode' {...{ status: statuses[receipt.get('status')] }} />
                <PayCode>
                  { this._displayReferenceNumber() }
                </PayCode>
                <Grid.Row>
                  { this._renderPurchaseBanner() }
                </Grid.Row>
              </Grid>
            </ReceiptContent>
            <ScannerWrapper>
              <Scanner className='background__black' />
            </ScannerWrapper>
          </ReceiptContainer>
        </ReceiptWrapper>

        <InfoContainer>
          <Grid padded centered textAlign='left'>
            <Grid.Row>
              <Grid.Column>
                <WrapperWarning>
                  <WarningStatus {
                    ...{
                      status: statuses[receipt.get('status')],
                      returnable: receipt.get('returnable')
                    }} />
                </WrapperWarning>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </InfoContainer>
        { /*
        <InfoContainer>
          <Grid padded centered textAlign='left'>
            <Grid.Row>
              <Grid.Column>
                <InstructionsWrapper>
                  <WarningDescription className='color__secondary'>
                    <Image src={ScreenshotIcon} />
                    <Label className='text__roboto--light screenshot-label' as='span' size='large'>
                      <FormattedMessage {...messages.instructionsLabel} />
                    </Label>
                  </WarningDescription>
                </InstructionsWrapper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </InfoContainer>
        */ }
        <ButtonContainer>
          { this._handleButtonFunctionality() }
        </ButtonContainer>

        { this._handlePushRegistrationUI() }
      </Container>
    )
  }
}

export default Countdown(Receipt)
