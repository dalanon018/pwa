import React, { PropTypes } from 'react'
import JsBarcode from 'jsbarcode'

import { isNil } from 'ramda'
import { FormattedMessage } from 'react-intl'
import { Grid, Label, Button, Image } from 'semantic-ui-react'

import WarningIcon from 'images/icons/instructions-icon.svg'
import ReturnIcon from 'images/icons/receipts/return-icon-receipt.svg'

import { DateFormater } from 'utils/date' // DateFormater
import Countdown from 'components/Countdown'

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
  Scanner,
  ReceiptWrapper,
  ScannerWrapper
} from './styled'

import {
  HIDE_BARCODE,
  COMPLETED
} from './constants'

// @TODO: Mode of payment needed to come from receipt
const modePayment = 'Cod'

const ComponentDetail = components => component => key =>
 key in components ? components[key] : component

const GeneralInfo = ({ children }) => (
  <WarningDescription>
    <Image src={WarningIcon} />
    { children }
  </WarningDescription>
)

const ReturnInfo = () => (
  <WarningDescription>
    <Image src={ReturnIcon} />
    <section>
      <Label as='p' size='large'>
        <FormattedMessage {...messages.returnPolicyTitle} />
      </Label>
      <Label className='text__roboto--light' as='p' size='large'>
        <FormattedMessage {...messages.returnPolicyDescription} />
      </Label>
    </section>
  </WarningDescription>
)

const WarningCTAReserved = ({ timer }) => {
  if (timer === '00:00:00') {
    return (
      <FormattedMessage {...messages.receiptInfoMessageReserveExpired} />
    )
  }

  return <FormattedMessage {...messages.receiptInfoMessageReserve} />
}

const WarningStatus = ({ status, timer, storeName, modePayment }) => {
  const keyMessage = modePayment === 'Cash' ? 'receiptInfoMessageCashDelivered' : 'receiptInfoMessageCodDelivered'
  return ComponentDetail({
    RESERVED: (
      <GeneralInfo>
        <WarningCTAReserved timer={timer} />
      </GeneralInfo>
    ),
    UNPAID: (
      <GeneralInfo>
        <FormattedMessage {...messages.receiptInfoMessageUnpaid} />
      </GeneralInfo>
    ),
    PROCESSING: (
      <GeneralInfo>
        <FormattedMessage {...messages.receiptInfoMessagePaid} />
      </GeneralInfo>
    ),
    CONFIRMED: (
      <GeneralInfo>
        <FormattedMessage {...messages.receiptInfoMessagePaid} />
      </GeneralInfo>
    ),
    INTRANSIT: (
      <GeneralInfo>
        <FormattedMessage {...messages.receiptInfoMessagePaid} />
      </GeneralInfo>
    ),
    DELIVERED: (
      <GeneralInfo>
        <FormattedMessage
          {...messages[keyMessage]}
          values={{ storeName }}
        />
      </GeneralInfo>
    ),
    CLAIMED: (
      <ReturnInfo />
    ),
    UNCLAIMED: (
      <GeneralInfo>
        <FormattedMessage {...messages.receiptInfoMessagePaid} />
      </GeneralInfo>
    )
  })(null)(status)
}

class Receipt extends React.PureComponent {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
    statuses: PropTypes.object.isRequired,
    goHomeFn: PropTypes.func.isRequired,
    repurchaseFn: PropTypes.func.isRequired,
    goReceiptPage: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.state = {
      show: '0'
    }
    this._renderPurchaseBanner = this._renderPurchaseBanner.bind(this)
  }

  _renderPurchaseBanner () {
    const { timer, statuses, receipt, purchaseOrder } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''

    if (purchaseOrder.includes(currentStatus)) {
      return (
        <PurchaseOrder status={currentStatus} receipt={receipt} timer={timer} />
      )
    }

    return <PurchaseUsecase status={currentStatus} />
  }

  _handleScanAnimate = (e, data) => {
    const block = document.getElementsByClassName('scan')

    setTimeout(() => {
      this.setState({
        show: block[0].offsetHeight
      })
    }, 500)
  }

  _handleStatusString = (status) => {
    const index = status && status.slice(0, 1)
    const body = status && status.toLowerCase().slice(1)
    const text = `${index}${body}`

    if (!isNil(index && body)) {
      return text
    }
  }

  // simply handle the color of the status
  _handleColorStatus = (status) => {
    return COMPLETED.includes(status) ? 'green' : 'orange'
  }

  _handleDateString = () => {
    const { receipt, statuses } = this.props
    const currentStatus = statuses[receipt.get('status')] || 'FieldDefault'

    return (
      <FormattedMessage {...messages[`date${modePayment}${currentStatus}`]} />
    )
  }

  componentDidMount () {
    this._handleScanAnimate()
    setTimeout(() => {
      document.getElementById('fadeMe').style.opacity = '1'
    }, 800)
  }

  componentWillReceiveProps (nextProps) {
    const { receipt, statuses } = nextProps

    /**
     * we have to make sure that we will initialize JsBarcode only if it is on the dom
     */
    if (receipt.get('payCode') && !HIDE_BARCODE.includes(statuses[receipt.get('status')])) {
      const payCode = receipt.get('payCode').split('-').join('')
      JsBarcode('#barcode', payCode, {
        format: 'CODE128',
        lineColor: '#5B5B5B',
        width: 3,
        height: 60,
        displayValue: false
      })
    }
  }

  render () {
    const { show } = this.state
    const { timer, receipt, statuses, goReceiptPage } = this.props
    return (
      <div>
        <ReceiptWrapper>
          <ReceiptContainer>
            <ReceiptHeader>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column floated='left'>
                    <Label className='weight-400' as='span' basic size='tiny'>
                      <FormattedMessage {...messages.statusLabel} />
                    </Label>
                    <Label as='p' basic size='huge' color={this._handleColorStatus(statuses[receipt.get('status')])}>
                      {this._handleStatusString(receipt.get('status'))}
                    </Label>
                  </Grid.Column>
                  <Grid.Column floated='right' textAlign='right'>
                    <Label className='weight-400' as='span' basic size='tiny'>
                      <FormattedMessage {...messages.paymentMethod} />
                    </Label>
                    <Label as='p' basic size='large'>Cash Prepaid</Label>
                  </Grid.Column>

                  <Grid.Column floated='left'>
                    <Label className='weight-400' as='span' basic size='tiny'>
                      <FormattedMessage {...messages.orderNumber} />
                    </Label>
                    <Label as='p' basic size='big'>{receipt.get('payCode')}</Label>
                  </Grid.Column>
                  <Grid.Column floated='right' textAlign='right'>
                    <Label className='weight-400' as='span' basic size='tiny'>
                      { this._handleDateString() }
                    </Label>
                    <Label as='p' basic size='large'>{DateFormater(receipt.get('claimExpiry'), 'MM-DD-YYYY')}</Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </ReceiptHeader>
            <ReceiptContent id='fadeMe' show={show}>
              <Grid padded className='scan padding__14' centered textAlign='center'>
                <Label as='span' basic size='huge'>Brand Name</Label>
                <Label as='p' basic size='huge'>{receipt.getIn(['products', 'name'])}</Label>
                <Label className='product-current-price text__roboto--bold' basic color='orange'>
                  <FormattedMessage {...messages.peso} />
                  { receipt.get('amount') }
                </Label>
                <Label className='text__roboto--light' as='p' basic size='large' >
                  <FormattedMessage {...messages.mobileNumberLabel} />
                (+63) 927-753-9249
              </Label>
                <BarcodeSVG id='barcode' {...{ status: statuses[receipt.get('status')] }} />
                <Grid.Row>
                  { this._renderPurchaseBanner() }
                </Grid.Row>
              </Grid>
            </ReceiptContent>
            <ScannerWrapper>
              <Scanner />
            </ScannerWrapper>
          </ReceiptContainer>
        </ReceiptWrapper>
        <Grid padded centered textAlign='left'>
          <Grid.Row>
            <Grid.Column>
              <WrapperWarning>
                <WarningStatus {
                  ...{
                    status: statuses[receipt.get('status')],
                    storeName: receipt.get('storeName'),
                    modePayment,
                    timer }} />
              </WrapperWarning>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ButtonContainer>
          <Button fluid onClick={goReceiptPage} primary>
            <FormattedMessage {...messages.viewActivity} />
          </Button>
        </ButtonContainer>
      </div>
    )
  }
}

export default Countdown(Receipt)
