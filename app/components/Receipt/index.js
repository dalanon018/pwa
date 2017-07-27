import React, { PropTypes } from 'react'
import JsBarcode from 'jsbarcode'

import { FormattedMessage } from 'react-intl'
import {
  Grid
} from 'semantic-ui-react'

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
  <Grid.Row className='padding__none--vertical'>
    <Grid.Column width={8} verticalAlign='middle'>
      <DetailTitle> { title } </DetailTitle>
    </Grid.Column>
    <Grid.Column width={8} textAlign='right' verticalAlign='middle'>
      { children }
    </Grid.Column>
  </Grid.Row>
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
      <DetailsContent title={<FormattedMessage {...messages.receiptDateClaimedTitle} />}>
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
  <WrapperWarning padded>
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

class Receipt extends React.PureComponent {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
    statuses: PropTypes.object.isRequired,
    goHome: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._renderPurchaseBanner = this._renderPurchaseBanner.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { receipt } = nextProps

    if (receipt.get('trackingNumber')) {
      JsBarcode('#barcode', receipt.get('trackingNumber'), {
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
    const { receipt, statuses, goHome } = this.props

    return (
      <ReceiptWrapper>
        <ProductWrapper >
          <ProductImage background={TestBackPack} />
          <ProductDescription>
            <CodeWrapper> <CodeImage src={CliqqLogo} />
              { receipt.getIn(['products', 'product_id']) }
            </CodeWrapper>
            <H6 uppercase> { receipt.getIn(['products', 'name']) } </H6>
            <ProductLogoImage src={TestLogo} />
          </ProductDescription>
        </ProductWrapper>
        <ReceiptDescription >
          { this._renderPurchaseBanner() }
          <PurchaseGeneralInfo>
            <Grid padded='vertically'>
              <Grid.Row className='padding__none--vertical'>
                <Grid.Column width={4} verticalAlign='middle'>
                  <DetailTitle>
                    <FormattedMessage {...messages.receiptPriceTitle} />
                  </DetailTitle>
                </Grid.Column>
                <Grid.Column width={12} textAlign='right' verticalAlign='middle'>
                  <ProductPrice> PHP { receipt.get('amount') } </ProductPrice>
                </Grid.Column>
              </Grid.Row>
              <DetailStatus {...{ status: statuses[receipt.get('status')], receipt }} />
              <Grid.Row className='padding__none--vertical'>
                <Grid.Column width={7} verticalAlign='middle'>
                  <DetailTitle>
                    <FormattedMessage {...messages.receiptStoreLocationTitle} />
                  </DetailTitle>
                </Grid.Column>
                <Grid.Column width={9} textAlign='right' verticalAlign='middle'>
                  IBM - EASTWOOD
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <BarcodeSVG id='barcode' />
            <WarningContent>
              <WarningStatus {...{ status: statuses[receipt.get('status')] }} />
            </WarningContent>
            <ButtonWrapper>
              <Button
                onClick={goHome}
                size={12}
                primary
              > <FormattedMessage {...messages.returnToHome} /> </Button>
            </ButtonWrapper>
          </PurchaseGeneralInfo>
        </ReceiptDescription>
      </ReceiptWrapper>
    )
  }
}

export default Receipt
