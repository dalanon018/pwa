import React, { PropTypes } from 'react'
import JsBarcode from 'jsbarcode'
import moment from 'moment'

import { FormattedMessage } from 'react-intl'
import { Grid, Label, Button, Image } from 'semantic-ui-react'

// import { imageStock } from 'utils/image-stock'

import { isNil } from 'ramda'

// import H6 from 'components/H6'
// import ProductSlider from 'components/BannerSlider'

// import CliqqLogo from 'images/icons/cliqq.png'
import WarningIcon from 'images/icons/instructions-icon.svg'

import { CountdownParser } from 'utils/date' // DateFormater

import PurchaseOrder from './PurchaseOrder'
import PurchaseUsecase from './PurchaseUsecase'
import messages from './messages'

import {
  // ProductWrapper,
  // ProductImage,
  // ProductDescription,
  // CodeWrapper,
  // CodeImage,
  // ProductLogoImage,
  // ReceiptDescription,
  // PurchaseGeneralInfo,
  // DetailTitle,
  // ProductPrice,
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
  HIDE_BARCODE
} from './constants'

const ComponentDetail = components => component => key =>
 key in components ? components[key] : component

// const DetailsContent = ({ title, children }) => (
//   <div className='item'>
//     <DetailTitle> { title } </DetailTitle>
//     { children }
//   </div>
// )

// const DetailStatus = ({ status, receipt }) => {
//   return ComponentDetail({
//     RESERVED: null,
//     UNPAID: null
//   })(
//     <PurchaseGeneralInfo>
//       <DetailsContent title={<FormattedMessage {...messages.receiptTrackingTitle} />}>
//         { receipt.get('trackingNumber') }
//       </DetailsContent>
//       <DetailsContent title={<FormattedMessage {...messages.receiptDatePurchasedTitle} />}>
//         { DateFormater(receipt.get('dateCreated'), 'MMM DD, YYYY | h:mm A') }
//       </DetailsContent>
//     </PurchaseGeneralInfo>
//   )(status)
// }

const WarningContent = ({ children }) => (
  <WrapperWarning>
    <WarningDescription>
      { children }
    </WarningDescription>
  </WrapperWarning>
)

const WarningCTAReserved = ({ timer }) => {
  if (timer === '00:00:00') {
    return (
      <FormattedMessage {...messages.receiptInfoMessageReserveExpired} />
    )
  }

  return <FormattedMessage {...messages.receiptInfoMessageReserve} />
}

const WarningStatus = ({status, timer}) => {
  return ComponentDetail({
    RESERVED: (
      <WarningCTAReserved timer={timer} />
    ),
    UNPAID: (
      <FormattedMessage {...messages.receiptInfoMessageUnpaid} />
    ),
    CONFIRMED: (
      <FormattedMessage {...messages.receiptInfoMessageClaimEarly} />
    ),
    INTRANSIT: (
      <FormattedMessage {...messages.receiptInfoMessageClaimEarly} />
    ),
    DELIVERED: (
      <FormattedMessage {...messages.receiptInfoMessageClaimEarly} />
    ),
    CLAIMED: (
      <FormattedMessage {...messages.receiptInfoMessageClaimEarly} />
    ),
    UNCLAIMED: (
      <FormattedMessage {...messages.receiptInfoMessageUnclaimed} />
    )
  })(null)(status)
}

const ButtonTrigger = ({ onClick, children }) => (
  <Button fluid onClick={onClick} primary>
    { children }
  </Button>
)

const ButtonRepurchaseHome = ({ status, goReceiptPage, repurchaseFn }) =>
  ComponentDetail({
    RESERVED: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.viewActivity} />
      </ButtonTrigger>
    ),
    UNPAID: (
      <ButtonTrigger onClick={repurchaseFn} >
        <FormattedMessage {...messages.rePurchase} />
      </ButtonTrigger>),
    CONFIRMED: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.viewActivity} />
      </ButtonTrigger>),
    INTRANSIT: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.viewActivity} />
      </ButtonTrigger>),
    DELIVERED: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.goToHistory} />
      </ButtonTrigger>),
    CLAIMED: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.goToHistory} />
      </ButtonTrigger>),
    UNCLAIMED: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.goToHistory} />
      </ButtonTrigger>)
  })(null)(status)

// const HideStoreLocations = ({ status, store }) =>
//   ComponentDetail({
//     RESERVED: null,
//     UNPAID: null
//   })(
//     <div className='item'>
//       <DetailTitle>
//         <FormattedMessage {...messages.receiptStoreLocationTitle} />
//       </DetailTitle>
//       { store }
//     </div>
//   )(status)

class Receipt extends React.PureComponent {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
    statuses: PropTypes.object.isRequired,
    goHomeFn: PropTypes.func.isRequired,
    repurchaseFn: PropTypes.func.isRequired,
    goReceiptPage: PropTypes.func.isRequired
  }

  /**
   * holder for countdown interval
   */
  countdownInterval

  state = {
    timer: ''
  }

  constructor () {
    super()

    this.state = {
      show: '0'
    }
    this._renderPurchaseBanner = this._renderPurchaseBanner.bind(this)
    this._countdownTimer = this._countdownTimer.bind(this)
    this._startCountDownTimer = this._startCountDownTimer.bind(this)
    this._disableTimer = this._disableTimer.bind(this)
  }

  _startCountDownTimer (props) {
    const { receipt, statuses } = props

    if (statuses[receipt.get('status')] === 'RESERVED') {
      const endDate = CountdownParser(receipt.get('claimExpiry'))

      clearInterval(this.countdownInterval)

      this._countdownTimer(endDate)
    }
  }

  _countdownTimer (endDate) {
    let currentTime = moment().unix()
    let diffTime = endDate - currentTime
    let duration = moment.duration(diffTime * 1000, 'milliseconds')
    let interval = 1000

    this.countdownInterval = setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds')
      const countHours = () => {
        if (duration.hours().toString().length > 1) {
          return duration.hours()
        } else {
          return '0' + duration.hours()
        }
      }
      const countMinutes = () => {
        if (duration.minutes().toString().length > 1) {
          return duration.minutes()
        } else {
          return '0' + duration.minutes()
        }
      }
      const countSeconds = () => {
        if (duration.seconds().toString().length > 1) {
          return duration.seconds()
        } else {
          return '0' + duration.seconds()
        }
      }

      this.setState({
        timer: `${countHours()}:${countMinutes()}:${countSeconds()}`
      })
    }, 1000)
  }

    /**
   * we need to make sure that once the timer goes to negative then
   * we need to clear our interval means its done
   */
  _disableTimer () {
    const { timer } = this.state
    const pT = parseInt

    const [ hh, mm, ss ] = timer.split(':')

    if ((pT(hh) + pT(mm) + pT(ss)) < 0) {
      clearInterval(this.countdownInterval)
      this.setState({
        timer: '00:00:00'
      })
    }
  }

  _renderPurchaseBanner () {
    const { timer } = this.state
    const { statuses, receipt, purchaseOrder } = this.props
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
    const body = status && status.toLowerCase().slice(1, -1)
    const text = `${index}${body}`

    if (!isNil(index && body)) {
      return text
    }
  }

  componentDidMount () {
    this._handleScanAnimate()
    setTimeout(() => {
      document.getElementById('fadeMe').style.opacity = '1'
    }, 800)
  }

  componentDidUpdate (prevProps, prevState) {
    this._disableTimer()
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

    this._startCountDownTimer(nextProps)
  }

  componentWillUnmount () {
    clearInterval(this.countdownInterval)
  }

  render () {
    const { timer, show } = this.state
    const { receipt, statuses, goReceiptPage, repurchaseFn } = this.props

    // const resposiveColumns = () => {
    //   if (windowWidth >= 768) {
    //     return 2
    //   } else {
    //     return 1
    //   }
    // }
    // const productImageHandler = () => {
    //   if (windowWidth >= 768) {
    //     return <Grid.Column>
    //       <ProductSlider
    //         receiptPageName={receiptPageName}
    //         images={productImages}
    //         windowWidth={windowWidth}
    //         loader={loading} />
    //     </Grid.Column>
    //   }
    // }
    // const productImages = [receipt]

    return (
      <div>
        <ReceiptWrapper>
          <ReceiptContainer>
            <ReceiptHeader>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column floated='left'>
                    <Label as='span' basic size='tiny'>
                      <FormattedMessage {...messages.statusLabel} />
                    </Label>
                    <Label as='p' basic size='huge' color='orange'>
                      {this._handleStatusString(receipt.get('status'))}
                    </Label>
                  </Grid.Column>
                  <Grid.Column floated='right' textAlign='right'>
                    <Label as='span' basic size='tiny'>
                      <FormattedMessage {...messages.paymentMethod} />
                    </Label>
                    <Label as='p' basic size='large'>Cash Prepaid</Label>
                  </Grid.Column>

                  <Grid.Column floated='left'>
                    <Label as='span' basic size='tiny'>
                      <FormattedMessage {...messages.orderNumber} />
                    </Label>
                    <Label as='p' basic size='big'>{receipt.get('payCode')}</Label>
                  </Grid.Column>
                  <Grid.Column floated='right' textAlign='right'>
                    <Label as='span' basic size='tiny'>
                      <FormattedMessage {...messages.validUntil} />
                    </Label>
                    <Label as='p' basic size='large'>{moment(receipt.get('dateCreated')).format('L')}</Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </ReceiptHeader>
            <ReceiptContent id='fadeMe' show={show}>
              <Grid padded className='scan padding__14' centered textAlign='center'>
                <Label as='span' basic size='large'>Brand Name</Label>
                <Label as='p' basic size='large'>{receipt.getIn(['products', 'name'])}</Label>
                <Grid.Row>
                  <Label className='product-current-price text__roboto--bold' as='span' basic color='orange'>
                    <FormattedMessage {...messages.peso} />
                    {receipt.get('amount')}
                  </Label>
                  <Label className='product-price text__roboto--bold' as='span' basic size='huge'>
                    <FormattedMessage {...messages.peso} />
                    {receipt.get('amount')}
                  </Label>
                </Grid.Row>
                <Label className='text__roboto--light' as='p' basic size='small' >
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
              <WarningContent>
                <Image src={WarningIcon} />
                <WarningStatus {...{ status: statuses[receipt.get('status')], timer }} />
              </WarningContent>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ButtonContainer>
          <ButtonRepurchaseHome {...{ status: statuses[receipt.get('status')], goReceiptPage, repurchaseFn }} />
        </ButtonContainer>
      </div>

      // <ReceiptWrapper>
      //   <ProductWrapper className='mobile-visibility'>
      //     <ProductImage background={receipt.getIn(['products', 'image']) ? receipt.getIn(['products', 'image']) : imageStock('default-slider.jpg')} />
      //     <ProductDescription>
      //       <CodeWrapper> <CodeImage src={CliqqLogo} />
      //         { receipt.getIn(['products', 'cliqqCode']) }
      //       </CodeWrapper>
      //       <H6 uppercase> { receipt.getIn(['products', 'name']) } </H6>
      //       {
      //         receipt.getIn(['products', 'brandLogo']) &&
      //         <ProductLogoImage src={receipt.getIn(['products', 'brandLogo'])} />
      //       }
      //     </ProductDescription>
      //   </ProductWrapper>
      //
      //   <ReceiptDescription>
      //     <Grid>
      //       <Grid.Row columns={resposiveColumns()} stretched className='custom-row'>
      //         {React.Children.toArray(productImageHandler())}
      //
      //         <Grid.Column>
      //           <div className='desktop-padding-wrapper'>
      //             <ProductDescription className='desktop-visibility'>
      //               <H6 uppercase> { receipt.getIn(['products', 'name']) } </H6>
      //               <CodeWrapper> <CodeImage src={CliqqLogo} />
      //                 { receipt.getIn(['products', 'cliqqCode']) }
      //               </CodeWrapper>
      //             </ProductDescription>
      //             { this._renderPurchaseBanner() }
      //             <div className='desktop-list-margin'>
      //               <PurchaseGeneralInfo>
      //                 <div className='item'>
      //                   <DetailTitle>
      //                     <FormattedMessage {...messages.receiptPriceTitle} />
      //                   </DetailTitle>
      //                   <ProductPrice> PHP { receipt.get('amount') } </ProductPrice>
      //                 </div>
      //               </PurchaseGeneralInfo>
      //               <DetailStatus {...{ status: statuses[receipt.get('status')], receipt }} />
      //               <PurchaseGeneralInfo>
      //                 <HideStoreLocations {...{
      //                   status: statuses[receipt.get('status')],
      //                   store: receipt.getIn(['storeName'])
      //                 }} />
      //               </PurchaseGeneralInfo>
      //             </div>
      //             <BarcodeSVG id='barcode' {...{ status: statuses[receipt.get('status')] }} />
      //             <WarningContent>
      //               <WarningStatus {...{ status: statuses[receipt.get('status')], timer }} />
      //             </WarningContent>
      //             <ButtonWrapper>
      //               <ButtonRepurchaseHome {...{ status: statuses[receipt.get('status')], goReceiptPage, repurchaseFn }} />
      //             </ButtonWrapper>
      //           </div>
      //         </Grid.Column>
      //       </Grid.Row>
      //     </Grid>
      //   </ReceiptDescription>
      // </ReceiptWrapper>
    )
  }
}

export default Receipt
