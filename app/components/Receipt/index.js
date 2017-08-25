import React, { PropTypes } from 'react'
import JsBarcode from 'jsbarcode'

import { FormattedMessage } from 'react-intl'
import { Grid } from 'semantic-ui-react'

import Button from 'components/Button'
import H6 from 'components/H6'

import TestBackPack from 'images/test-images/BACKPACK-TICKET.png'
import TestLogo from 'images/test-images/PENSHOPPE-TICKET.png'
import CliqqLogo from 'images/icons/cliqq.png'
import WarningIcon from 'images/icons/notice.png'

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

const ComponentDetail = components => component => key =>
 key in components ? components[key] : component

const DetailsContent = ({ title, children }) => (
  <Grid>
    <Grid.Row columns={2}>
      <Grid.Column verticalAlign='middle'>
        <DetailTitle> { title } </DetailTitle>
      </Grid.Column>
      <Grid.Column textAlign='right' verticalAlign='middle'>
        { children }
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const DetailStatus = ({ status, receipt }) => {
  return ComponentDetail({
    RESERVED: null,
    UNPAID: null,
    CONFIRMED: (
      <DetailsContent title={<FormattedMessage {...messages.receiptDatePurchasedTitle} />}>
        { DateFormater(receipt.get('dateCreated')) }
      </DetailsContent>
    ),
    INTRANSIT: (
      <DetailsContent title={<FormattedMessage {...messages.receiptTrackingTitle} />}>
        { receipt.get('trackingNumber') }
      </DetailsContent>
    ),
    DELIVERED: (
      <DetailsContent title={<FormattedMessage {...messages.receiptTrackingTitle} />}>
        { receipt.get('trackingNumber') }
      </DetailsContent>
    ),
    CLAIMED: (
      <DetailsContent title={<FormattedMessage {...messages.receiptTrackingTitle} />}>
        { receipt.get('trackingNumber') }
      </DetailsContent>
    ),
    UNCLAIMED: (
      <DetailsContent title={<FormattedMessage {...messages.receiptDatePurchasedTitle} />}>
        { DateFormater(receipt.get('dateCreated')) }
      </DetailsContent>
    )
  })(null)(status)
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
  <Button onClick={onClick} size={12} primary>
    { children }
  </Button>
)

const ButtonRepurchaseHome = ({ status, goHomeFn, repurchaseFn }) =>
  ComponentDetail({
    RESERVED: (
      <ButtonTrigger onClick={goHomeFn} >
        <FormattedMessage {...messages.returnToHome} />
      </ButtonTrigger>
    ),
    UNPAID: (
      <ButtonTrigger onClick={repurchaseFn} >
        <FormattedMessage {...messages.rePurchase} />
      </ButtonTrigger>),
    CONFIRMED: (
      <ButtonTrigger onClick={goHomeFn} >
        <FormattedMessage {...messages.returnToHome} />
      </ButtonTrigger>),
    INTRANSIT: (
      <ButtonTrigger onClick={goHomeFn} >
        <FormattedMessage {...messages.returnToHome} />
      </ButtonTrigger>),
    DELIVERED: (
      <ButtonTrigger onClick={goHomeFn} >
        <FormattedMessage {...messages.returnToHome} />
      </ButtonTrigger>),
    CLAIMED: (
      <ButtonTrigger onClick={goHomeFn} >
        <FormattedMessage {...messages.returnToHome} />
      </ButtonTrigger>),
    UNCLAIMED: (
      <ButtonTrigger onClick={goHomeFn} >
        <FormattedMessage {...messages.returnToHome} />
      </ButtonTrigger>)
  })(null)(status)

const BarcodeDisplay = ({ status }) =>
  ComponentDetail({
    UNPAID: null
  })(
    <BarcodeSVG id='barcode' />
  )(status)

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
    repurchaseFn: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._renderPurchaseBanner = this._renderPurchaseBanner.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { receipt, statuses } = nextProps
    const HIDE_BARCODE = ['UNPAID']

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
    const { receipt, statuses, goHomeFn, repurchaseFn, windowWidth } = this.props
    const resposiveColumns = () => {
      if (windowWidth >= 768) {
        return 2
      } else {
        return 1
      }
    }

    return (
      <ReceiptWrapper>
        <ProductWrapper >
          <ProductImage background={TestBackPack} />
          <ProductDescription>
            <CodeWrapper> <CodeImage src={CliqqLogo} />
              { receipt.getIn(['products', 'cliqqCode']) }
            </CodeWrapper>
            <H6 uppercase> { receipt.getIn(['products', 'name']) } </H6>
            <ProductLogoImage src={TestLogo} />
          </ProductDescription>
        </ProductWrapper>

        <ReceiptDescription>
          <Grid>
            <Grid.Row columns={resposiveColumns()} stretched>
              { this._renderPurchaseBanner() }

              <Grid.Column>
                <PurchaseGeneralInfo>
                  <div className='item'>
                    <DetailTitle>
                      <FormattedMessage {...messages.receiptPriceTitle} />
                    </DetailTitle>
                    <ProductPrice> PHP { receipt.get('amount') } </ProductPrice>
                  </div>
                  <HideStoreLocations {...{
                    status: statuses[receipt.get('status')],
                    store: receipt.getIn(['storeName'])
                  }} />
                </PurchaseGeneralInfo>
                <DetailStatus {...{ status: statuses[receipt.get('status')], receipt }} />
                <BarcodeDisplay {...{ status: statuses[receipt.get('status')] }} />
                <WarningContent>
                  <WarningStatus {...{ status: statuses[receipt.get('status')] }} />
                </WarningContent>
                <ButtonWrapper>
                  <ButtonRepurchaseHome {...{ status: statuses[receipt.get('status')], goHomeFn, repurchaseFn }} />
                </ButtonWrapper>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </ReceiptDescription>

      </ReceiptWrapper>

    )
  }
}

export default Receipt
