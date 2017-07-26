/*
 *
 * BarcodeLists
 *
 */

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'

import H1 from 'components/H1'
import Purchase from 'components/Purchase'
import {
  STATUSES
} from 'containers/Buckets/constants'

import EmptyPurchase from 'images/empty-purchases.svg'

import messages from './messages'

import {
  selectLoader,
  selectPurchases
} from './selectors'

import {
  getPurchasesAction
} from './actions'

const BarcodeListWrapper = styled.div`
  display: flex;
  height: 94vh;
  flex-direction: column;
  padding: 20px 10px;
`

const PurchasesList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({purchases}) => purchases ? 'flex-start' : 'center'};
  align-items: center;
  height: 100%;
  overflow: auto;
`

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const EmptyWrapperImg = styled.img`
  margin-bottom: 20px;
  max-width: 200px;
`

const EmptyWrapperText = styled.p`
  color: #F0F0F0;
  font-size: 21px;
  letter-spacing: 1px;
  line-height: 1.5;
  text-align: center;
`

export const EmptyPurchases = () => (
  <EmptyWrapper>
    <EmptyWrapperImg src={EmptyPurchase} />
    <EmptyWrapperText>
      <FormattedMessage {...messages.emptyPurchases} />
    </EmptyWrapperText>

  </EmptyWrapper>
)

export class Purchases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    purchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    getPurchases: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    current: null
  }

  constructor () {
    super()

    this._displayEmpty = this._displayEmpty.bind(this)
  }

  _displayEmpty () {
    const { purchases, loading } = this.props

    if (loading === false && !(purchases.size > 0)) {
      return (
        <EmptyPurchases />
      )
    }

    return null
  }

  componentDidMount () {
    this.props.getPurchases()
  }

  render () {
    const { purchases, changeRoute } = this.props

    return (
      <BarcodeListWrapper>
        <Helmet
          title='Receipts'
          meta={[
            { name: 'description', content: 'List of barcodes' }
          ]}
        />
        <H1 center>
          <FormattedMessage {...messages.receiptsTitle} />
        </H1>
        <PurchasesList purchases={(purchases.size > 0)}>
          { this._displayEmpty() }
          {
            purchases.map((order) =>
              <Purchase
                key={order.get('trackingNumber')}
                order={order}
                statuses={STATUSES}
                changeRoute={changeRoute}
              />
            )
          }
        </PurchasesList>
      </BarcodeListWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  purchases: selectPurchases(),
  loading: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    getPurchases: (payload) => dispatch(getPurchasesAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchases)
