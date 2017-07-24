/*
 *
 * BarcodeLists
 *
 */

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'

import H1 from 'components/H1'
import Purchase from 'components/Purchase'

import ConfirmImage from 'images/CONFIRM-BG.png'
import IntransitImage from 'images/IN-TRANSIT-BG.png'
import PickupImage from 'images/PICK-UP-BG.png'

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
  height: 100%;
  overflow: auto;
`

export class Purchases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getPurchases: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    current: null
  }

  constructor () {
    super()

    this._afterChange = this._afterChange.bind(this)
    this._identifyBackground = this._identifyBackground.bind(this)
  }

  _afterChange (index) {
    console.log(index)
  }

  _identifyBackground () {
    const { current } = this.state
    // means its still loading
    if (current === null) {
      return PickupImage
    }

    switch (current.get('status')) {
      case 'INTRANSIT': return IntransitImage
      case 'CONFIRMED': return ConfirmImage
      default: return PickupImage
    }
  }

  componentDidMount () {
    this.props.getPurchases()
  }

  render () {
    return (
      <BarcodeListWrapper>
        <Helmet
          title='Barcodes'
          meta={[
            { name: 'description', content: 'List of barcodes' }
          ]}
        />
        <H1 center>
          <FormattedMessage {...messages.receiptsTitle} />
        </H1>
        <PurchasesList>
          <Purchase />
        </PurchasesList>
      </BarcodeListWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  purchases: selectPurchases(),
  loader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    getPurchases: (payload) => dispatch(getPurchasesAction(payload)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchases)
