/*
 *
 * WalletPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { noop } from 'lodash'
import {
  allPass,
  complement,
  compose,
  cond,
  equals,
  ifElse,
  partial,
  propOr
} from 'ramda'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import MobileWalletSection from 'components/Mobile/WalletSection'
import DesktopWalletSection from 'components/Desktop/WalletSection'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import EmptyProducts from 'components/Shared/EmptyProductsBlock'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import { userIsAuthenticated } from 'containers/App/auth'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import { WALLET_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getWalletAction,
  getMobileNumberAction,
  resetWalletTransactionsAction
} from './actions'

import {
  selectWallet,
  selectTransactions,
  selectTransactionsCount,
  selectTransactionsLoading,
  selectLazyload,
  selectMobileNumber
} from './selectors'

import {
  LIMIT_ITEMS
} from './constants'

const DesktopItemCount = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
`

const DesktopTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0;
`

export class WalletPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getWallet: PropTypes.func.isRequired,
    getMobileNumber: PropTypes.func.isRequired,
    resetWallet: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowPointsIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    transactionsLoading: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    mobileNumber: PropTypes.string,
    transactions: PropTypes.object.isRequired,
    transactionsCount: PropTypes.number.isRequired,
    match: PropTypes.object.isRequired,
    intl: intlShape.isRequired
  }

  state = {
    pageOffset: 0,
    offset: 0,
    limit: LIMIT_ITEMS
  }

  _displayMoreProducts = () => {
    const { pageOffset, limit } = this.state
    const incrementOffset = pageOffset + 1

    this.setState({
      pageOffset: incrementOffset,
      offset: (incrementOffset * limit)
    }, () => this._fetchWalletTransactions(this.props))
  }

  _displayLoader = () => {
    return (
      <LoadingIndicator />
    )
  }

  _displayEmpty = () => {
    return (
      <EmptyProducts>
        <FormattedMessage {...messages.emptyMessage} />
      </EmptyProducts>
    )
  }

  _displayEmptyLoadingIndicator = () => {
    const { transactionsLoading, lazyload, transactions } = this.props

    const display = cond([
      [allPass([
        equals(false),
        partial(equals(0), [transactions.size]),
        partial(equals(false), [lazyload])
      ]), this._displayEmpty],
      [allPass([
        equals(true),
        partial(equals(false), [lazyload])
      ]), this._displayLoader],
      [equals(false), () => null]
    ])

    return display(transactionsLoading)
  }

  _resetValuesAndFetch = (props) => {
    const { resetWallet } = props

    resetWallet()

    this.setState({
      pageOffset: 0,
      offset: 0
    }, () => this._fetchWalletTransactions(props))
  }

  /**
   * Here we will request for our data base on change of route.
   * @param {*w} props
   */
  _fetchWalletTransactions = (props) => {
    const { getWallet, mobileNumber } = props
    const { offset, limit } = this.state
    // only request if mobile number is available
    if (mobileNumber) {
      // since this data is change and we know exactly
      getWallet({ offset, limit, mobileNumber })
    }
  }

  _displayHeaderTransactions = () => {
    const { lazyload, transactions, transactionsCount } = this.props

    if (lazyload && transactions.size === 0) {
      return null
    }

    return (
      <AccessView
        mobileView={
          null
        }
        desktopView={
          <div className='margin__vertical--30'>
            <DesktopTitle>
              <FormattedMessage {...messages.walletTransactionsTitle} />
            </DesktopTitle>
            <DesktopItemCount className='color__grey'>
              { transactionsCount }
              <FormattedMessage {...messages.items} />
            </DesktopItemCount>
          </div>
        }
      />
    )
  }

  componentDidMount () {
    const { setRouteName, setPageTitle, setShowSearchIcon, setShowPointsIcon, setShowActivityIcon, intl, getMobileNumber } = this.props
    // initial data
    // this._fetchWalletTransactions(this.props)

    // we set this as text so it doesnt look
    setPageTitle(intl.formatMessage(messages.title))
    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)
    setRouteName(WALLET_NAME)
    getMobileNumber()
  }

  componentWillUnmount () {
    this.props.resetWallet()
  }

  componentWillReceiveProps (nextProps) {
    const { mobileNumber } = this.props
    const updateWalletTransactions = ifElse(
      compose(complement(equals(mobileNumber)), propOr(null, 'mobileNumber')),
      this._fetchWalletTransactions,
      noop
    )

    updateWalletTransactions(nextProps)
  }

  render () {
    const { transactionsLoading, lazyload, transactions, wallet, intl, changeRoute } = this.props

    return (
      <AccessView
        mobileView={
          <MobileWalletSection
            lazyload={lazyload}
            transactions={transactions}
            transactionsLoading={transactionsLoading}
            wallet={wallet}

            changeRoute={changeRoute}
            _displayHeaderTransactions={this._displayHeaderTransactions}
            _displayEmptyLoadingIndicator={this._displayEmptyLoadingIndicator}
          />
        }
        desktopView={
          <DesktopWalletSection
            lazyload={lazyload}
            transactions={transactions}
            transactionsLoading={transactionsLoading}
            wallet={wallet}
            intl={intl}

            changeRoute={changeRoute}
            _displayEmptyLoadingIndicator={this._displayEmptyLoadingIndicator}
          />
        }
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  wallet: selectWallet(),
  transactions: selectTransactions(),
  transactionsCount: selectTransactionsCount(),
  transactionsLoading: selectTransactionsLoading(),
  mobileNumber: selectMobileNumber(),
  lazyload: selectLazyload()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getWallet: payload => dispatch(getWalletAction(payload)),
    getMobileNumber: () => (dispatch(getMobileNumberAction())),
    resetWallet: () => dispatch(resetWalletTransactionsAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'walletPage', reducer })
const withSaga = injectSaga({ key: 'walletPage', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(userIsAuthenticated(WalletPage)))
