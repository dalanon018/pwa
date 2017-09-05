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
import { Grid, Modal } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'

import H1 from 'components/H1'
import Purchase from 'components/Purchase'
import PopupSlide from 'components/PopupSlide'
import WindowWidth from 'components/WindowWidth'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

import EmptyPurchase from 'images/empty-purchases.svg'

import messages from './messages'

import {
  selectLoader,
  selectPurchases,
  selectModalToggle
} from './selectors'

import {
  getApiPurchasesAction,
  getStoragePurchasesAction,

  getModalToggleAction,
  setModalToggleAction,

  setMobileNumberAction
} from './actions'

const BarcodeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;

  @media (min-width: 768px) {
    height: auto;

    .header-label {
      font-size: 17px;
      font-weight: bold;
    }
  }
`

const PurchasesList = styled.div`
  align-items: center;
  display: flex;
  // flex-direction: column;
  justify-content: ${({purchases}) => purchases ? 'flex-start' : 'center'};

  @media (min-width: 768px) {
    display: block;
    flex-direction: inherit;
    justify-content: flex-start;
    margin-top: 30px;
  }
`

const EmptyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
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
    modalToggle: PropTypes.bool.isRequired,
    purchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    getApiPurchases: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    getModalToggle: PropTypes.func.isRequired,
    setModalToggle: PropTypes.func.isRequired,
    setMobileNumber: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    current: null
  }

  constructor () {
    super()

    this._displayEmpty = this._displayEmpty.bind(this)
    this._goToHome = this._goToHome.bind(this)
  }

  _goToHome () {
    this.props.changeRoute('/')
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
    const { getApiPurchases, getLocalPurchases, getModalToggle } = this.props
    // fetch
    getModalToggle()
    // first we have to fetch what we already have on our local storage
    getLocalPurchases()
    // then we will call from our API
    getApiPurchases()
  }

  render () {
    const { purchases, changeRoute, modalToggle, setMobileNumber, windowWidth } = this.props

    const resposiveColumns = () => {
      if (windowWidth >= 768 && windowWidth <= 1200) {
        return 2
      } else if (windowWidth >= 1200) {
        return 3
      } else {
        return 1
      }
    }

    return (
      <BarcodeListWrapper>
        <Helmet
          title='Receipts'
          meta={[
            { name: 'description', content: 'List of barcodes' }
          ]}
        />
        <H1 className='header-label' center>
          <FormattedMessage {...messages.receiptsTitle} />
        </H1>
        <PurchasesList purchases={(purchases.size > 0)}>
          <Grid>
            <Grid.Row columns={resposiveColumns()}>
              { this._displayEmpty() }
              {
                  purchases.map((order, index) =>
                    <Grid.Column key={index} className='padding__bottom--15'>
                      <Purchase
                        defaultImage={imageStock('default-slider.jpg')}
                        key={order.get('trackingNumber')}
                        order={order}
                        statuses={STATUSES}
                        purchaseUsecases={PURCHASE_USECASE}
                        purchaseOrders={PURCHASE_ORDER}
                        changeRoute={changeRoute}
                        />
                    </Grid.Column>
                  )
                }
            </Grid.Row>
          </Grid>
        </PurchasesList>

        <div className='mobile-visibility'>
          <PopupSlide
            submit={setMobileNumber}
            toggle={modalToggle}
            onClose={this._goToHome}
          />
        </div>
        <Modal open={windowWidth >= 768 && modalToggle}>
          <div className='modal-popup-slide'>
            <PopupSlide
              submit={setMobileNumber}
              toggle={modalToggle}
              onClose={this._goToHome} />
          </div>
        </Modal>
      </BarcodeListWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  purchases: selectPurchases(),
  loading: selectLoader(),
  modalToggle: selectModalToggle()
})

function mapDispatchToProps (dispatch) {
  return {
    getApiPurchases: (payload) => dispatch(getApiPurchasesAction(payload)),
    getLocalPurchases: () => dispatch(getStoragePurchasesAction()),
    getModalToggle: () => dispatch(getModalToggleAction()),
    setModalToggle: (payload) => dispatch(setModalToggleAction(payload)),
    setMobileNumber: (payload) => dispatch(setMobileNumberAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(Purchases))
