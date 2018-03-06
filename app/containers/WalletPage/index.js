/*
 *
 * WalletPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop } from 'lodash'
import {
  allPass,
  compose,
  cond,
  equals,
  ifElse,
  partial,
  path
} from 'ramda'
import { Container } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import MobileProductView from 'components/Mobile/ProductView'
import DesktopProductView from 'components/Desktop/ProductView'

import MobileFooter from 'components/Mobile/Footer'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import WindowWidth from 'components/Shared/WindowWidth'
import H3 from 'components/Shared/H3'
import EmptyProducts from 'components/Shared/EmptyProductsBlock'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import { InfiniteLoading, InfiniteWrapper } from 'components/Shared/InfiniteLoading'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import { WALLET_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import {
  getWalletAction,
  resetWalletTransactionsAction
} from './actions'
import {
  selectWallet,
  selectTransactions,
  selectTransactionsCount,
  selectTransactionsLoading,
  selectLazyload
} from './selectors'

import {
  LIMIT_ITEMS
} from './constants'

const ContentWrapper = styled(Container)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;
`

const DesktopItemCount = styled.p`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
`

const DesktopTitle = styled.p`
  font-family: Lato,Cabin,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0;
`

export class WalletPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getWallet: PropTypes.func.isRequired,
    resetWallet: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    transactionsLoading: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    transactions: PropTypes.object.isRequired,
    transactionsCount: PropTypes.number.isRequired,
    match: PropTypes.object.isRequired
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
    const { getWallet, match: { params: { id } } } = props
    const { offset, limit } = this.state

    // since this data is change and we know exactly
    getWallet({ offset, limit, id })
  }

  _displayHeaderTransactions () {
    const { lazyload, transactions, transactionsCount } = this.props

    if (lazyload && transactions.size === 0) {
      return null
    }

    return (
      <AccessView
        mobileView={
          <H3>
            <FormattedMessage {...messages.walletTransactionsTitle} />
          </H3>
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

  _displayTransactionsItems = () => {
    const { transactions, changeRoute, transactionsLoading, lazyload, windowWidth, transactionsCount } = this.props
    if (transactions.size > 0 || lazyload === false) {
      return (
        <InfiniteLoading
          results={transactions}
          hasMoreData={lazyload}
          loadMoreData={this._displayMoreProducts}
          isLoading={transactionsLoading}
          rowCount={transactionsCount}
        >
          {(props) => (
            <AccessView
              mobileView={
                <MobileProductView changeRoute={changeRoute} loader={transactionsLoading} products={transactions} windowWidth={windowWidth} {...props} />
              }
              desktopView={
                <DesktopProductView changeRoute={changeRoute} loader={transactionsLoading} products={transactions} windowWidth={windowWidth} {...props} />
              }
            />
          )}
        </InfiniteLoading>
      )
    }

    return null
  }

  componentWillMount () {
    // we set this as text so it doesnt look
    this.props.setPageTitle(<FormattedMessage {...messages.title} />)
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(true)
  }

  componentDidMount () {
    // initial data
    this._fetchWalletTransactions(this.props)
    this.props.setRouteName(WALLET_NAME)
  }

  componentWillUnmount () {
    this.props.resetWallet()
  }

  componentWillReceiveProps (nextProps) {
    const { match: { params } } = this.props

    const isParamsEqual = (id, props) => compose(
      equals(id),
      path(['match', 'params', 'id'])
    )(props)

    const updateWalletTransactions = ifElse(
      partial(isParamsEqual, [params.id]),
      noop,
      this._resetValuesAndFetch
    )

    updateWalletTransactions(nextProps)
  }

  render () {
    const { transactionsLoading, lazyload } = this.props
    return (
      <div>
        <ContentWrapper>
          <div className='margin__top-positive--30'>
            <InfiniteWrapper
              hasMoreData={lazyload}
              isLoading={transactionsLoading}
            >

              { this._displayHeaderTransactions() }
              { this._displayEmptyLoadingIndicator() }
              { this._displayTransactionsItems() }
            </InfiniteWrapper>
          </div>
        </ContentWrapper>
        <AccessView
          mobileView={<MobileFooter />}
          desktopView={null}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  wallet: selectWallet(),
  transactions: selectTransactions(),
  transactionsCount: selectTransactionsCount(),
  transactionsLoading: selectTransactionsLoading(),
  lazyload: selectLazyload()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getWallet: payload => dispatch(getWalletAction(payload)),
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
)(WindowWidth(WalletPage))
