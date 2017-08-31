import React, { PropTypes } from 'react'
import JsBarcode from 'jsbarcode'

import { FormattedMessage } from 'react-intl'
import { Grid } from 'semantic-ui-react'

import Button from 'components/Button'
import H6 from 'components/H6'
import ProductSlider from 'components/BannerSlider'

import CliqqLogo from 'images/icons/cliqq.png'
import WarningIcon from 'images/icons/notice.png'
import defaultImage from 'images/default-slider.jpg'

import { DateFormater } from 'utils/date'

import PurchaseOrder from './PurchaseOrder'
import PurchaseUsecase from './PurchaseUsecase'
import messages from './messages'

import {
  ReceiptWrapper,
  ProductWrapper,
  ProductImage,
  ProductDescription,
  CodeWrapper,
  CodeImage,
  ProductLogoImage,
  ReceiptDescription,
  PurchaseGeneralInfo,
  DetailTitle,
  ProductPrice,
  BarcodeSVG,
  WrapperWarning,
  WarningDescription,
  ButtonWrapper
} from './styled'

import {
  HIDE_BARCODE
} from './constants'

const ComponentDetail = components => component => key =>
 key in components ? components[key] : component

const DetailsContent = ({ title, children }) => (
  <div className='item'>
    <DetailTitle> { title } </DetailTitle>
    { children }
  </div>
)

const DetailStatus = ({ status, receipt }) => {
  return ComponentDetail({
    RESERVED: null,
    UNPAID: null
  })(
    <PurchaseGeneralInfo>
      <DetailsContent title={<FormattedMessage {...messages.receiptTrackingTitle} />}>
        { receipt.get('trackingNumber') }
      </DetailsContent>
      <DetailsContent title={<FormattedMessage {...messages.receiptDatePurchasedTitle} />}>
        { DateFormater(receipt.get('dateCreated'), 'MMM DD, YYYY | h:mm A') }
      </DetailsContent>
    </PurchaseGeneralInfo>
  )(status)
}

const WarningContent = ({ children }) => (
  <WrapperWarning>
    <Grid padded>
      <Grid.Row>
        <Grid.Column verticalAlign='middle' width={3}>
          <img src={WarningIcon} />
        </Grid.Column>
        <Grid.Column textAlign='center' verticalAlign='middle' width={12}>
          <WarningDescription>
            { children }
          </WarningDescription>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </WrapperWarning>
)

const WarningStatus = ({status}) => {
  return ComponentDetail({
    RESERVED: (
      <FormattedMessage {...messages.receiptInfoMessageReserve} />
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
  <Button onClick={onClick} size={12} primary className='custom-button'>
    { children }
  </Button>
)

const ButtonRepurchaseHome = ({ status, goReceiptPage, repurchaseFn }) =>
  ComponentDetail({
    RESERVED: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.goToTrackOrder} />
      </ButtonTrigger>
    ),
    UNPAID: (
      <ButtonTrigger onClick={repurchaseFn} >
        <FormattedMessage {...messages.rePurchase} />
      </ButtonTrigger>),
    CONFIRMED: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.goToTrackOrder} />
      </ButtonTrigger>),
    INTRANSIT: (
      <ButtonTrigger onClick={goReceiptPage} >
        <FormattedMessage {...messages.goToTrackOrder} />
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

const HideStoreLocations = ({ status, store }) =>
  ComponentDetail({
    RESERVED: null,
    UNPAID: null
  })(
    <div className='item'>
      <DetailTitle>
        <FormattedMessage {...messages.receiptStoreLocationTitle} />
      </DetailTitle>
      { store }
    </div>
  )(status)

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

    this._renderPurchaseBanner = this._renderPurchaseBanner.bind(this)
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

  _renderPurchaseBanner () {
    const { statuses, receipt, purchaseOrder } = this.props
    const currentStatus = statuses[receipt.get('status')] || ''

    if (purchaseOrder.includes(currentStatus)) {
      return (
        <PurchaseOrder status={currentStatus} receipt={receipt} />
      )
    }

    return <PurchaseUsecase status={currentStatus} />
  }

  render () {
    const { receipt, statuses, goReceiptPage, repurchaseFn, windowWidth, loading, receiptPageName } = this.props
    const resposiveColumns = () => {
      if (windowWidth >= 768) {
        return 2
      } else {
        return 1
      }
    }
    const productImageHandler = () => {
      if (windowWidth >= 768) {
        return <Grid.Column>
          <ProductSlider
            receiptPageName={receiptPageName}
            images={productImages}
            windowWidth={windowWidth}
            loader={loading} />
        </Grid.Column>
      }
    }
    const productImages = [receipt]

    return (
      <ReceiptWrapper>
        <ProductWrapper className='mobile-visibility'>
          <ProductImage background={receipt.getIn(['products', 'image']) ? receipt.getIn(['products', 'image']) : defaultImage} />
          <ProductDescription>
            <CodeWrapper> <CodeImage src={CliqqLogo} />
              { receipt.getIn(['products', 'cliqqCode']) }
            </CodeWrapper>
            <H6 uppercase> { receipt.getIn(['products', 'name']) } </H6>
            {
              receipt.getIn(['products', 'brandLogo']) &&
              <ProductLogoImage src={receipt.getIn(['products', 'brandLogo'])} />
            }
          </ProductDescription>
        </ProductWrapper>

        <ReceiptDescription>
          <Grid>
            <Grid.Row columns={resposiveColumns()} stretched className='custom-row'>
              {React.Children.toArray(productImageHandler())}

              <Grid.Column>
                <div className='desktop-padding-wrapper'>
                  <ProductDescription className='desktop-visibility'>
                    <H6 uppercase> { receipt.getIn(['products', 'name']) } </H6>
                    <CodeWrapper> <CodeImage src={CliqqLogo} />
                      { receipt.getIn(['products', 'cliqqCode']) }
                    </CodeWrapper>
                  </ProductDescription>
                  { this._renderPurchaseBanner() }
                  <div className='desktop-list-margin'>
                    <PurchaseGeneralInfo>
                      <div className='item'>
                        <DetailTitle>
                          <FormattedMessage {...messages.receiptPriceTitle} />
                        </DetailTitle>
                        <ProductPrice> PHP { receipt.get('amount') } </ProductPrice>
                      </div>
                    </PurchaseGeneralInfo>
                    <DetailStatus {...{ status: statuses[receipt.get('status')], receipt }} />
                    <PurchaseGeneralInfo>
                      <HideStoreLocations {...{
                        status: statuses[receipt.get('status')],
                        store: receipt.getIn(['storeName'])
                      }} />
                    </PurchaseGeneralInfo>
                  </div>
                  <BarcodeSVG id='barcode' {...{ status: statuses[receipt.get('status')] }} />
                  <WarningContent>
                    <WarningStatus {...{ status: statuses[receipt.get('status')] }} />
                  </WarningContent>
                  <ButtonWrapper>
                    <ButtonRepurchaseHome {...{ status: statuses[receipt.get('status')], goReceiptPage, repurchaseFn }} />
                  </ButtonWrapper>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </ReceiptDescription>
      </ReceiptWrapper>
    )
  }
}

export default Receipt
