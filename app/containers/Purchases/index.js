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
import { Grid, Tab, Label, Image } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'
import { isEmpty } from 'ramda'

import Purchase from 'components/Purchase'
import PopupSlide from 'components/PopupSlide'
import WindowWidth from 'components/WindowWidth'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import EmptyPurchase from 'images/icons/sad-icon.svg'

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

const EmptyPurchaseWrapper = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 72vh;
  padding: 0 30px;

  .image {
    margin: 20px auto;
    width: 80px;
  }
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
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
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

  _handlePurchases = () => {
    const { purchases, changeRoute, windowWidth } = this.props

    return (
      <Grid padded>
        {/* purchases={(purchases.size > 0)} */}
        { this._displayEmpty() }
        {
          purchases.map((order, index) =>
            <Purchase
              className='padding__bottom--15'
              defaultImage={imageStock('default-slider.jpg')}
              key={order.get('trackingNumber')}
              order={order}
              windowWidth={windowWidth}
              statuses={STATUSES}
              purchaseUsecases={PURCHASE_USECASE}
              purchaseOrders={PURCHASE_ORDER}
              changeRoute={changeRoute}
            />)
        }
      </Grid>

    )
  }

  _handleEmptyPurchase = () => {
    return (
      <Grid padded>
        <Grid.Row centered>
          <Grid.Column textAlign='center'>
            <EmptyPurchaseWrapper>
              <Image src={EmptyPurchase} />
              <Label className='text__roboto--light' as='p' basic size='large'>
                Woops! It seems like you haven't bought anything yet. Let's fix that!
              </Label>
            </EmptyPurchaseWrapper>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  _handleShow = () => {
    const { purchases } = this.props

    if (isEmpty(purchases)) {
      return this._handleEmptyPurchase()
    }

    return this._handlePurchases()
  }

  componentWillMount () {
    this.props.setPageTitle('My Activity')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(false)
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
    const { modalToggle, setMobileNumber } = this.props

    const panes = [
      { menuItem: 'Active', render: () => <Tab.Pane>{this._handleShow()}</Tab.Pane> },
      { menuItem: 'Compeleted', render: () => <Tab.Pane>{this._handleShow()}</Tab.Pane> },
      { menuItem: 'Expired', render: () => <Tab.Pane>{this._handleEmptyPurchase()}</Tab.Pane> }
    ]

    return (
      <div>
        <Helmet
          title='Receipts'
          meta={[
            { name: 'description', content: 'List of barcodes' }
          ]}
        />

        <Tab panes={panes} />

        <PopupSlide
          submit={setMobileNumber}
          toggle={modalToggle}
          onClose={this._goToHome}
        />
      </div>
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
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
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
