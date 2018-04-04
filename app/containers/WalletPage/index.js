/*
 *
 * WalletPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { noop, isEmpty } from 'lodash'
import {
  allPass,
  compose,
  cond,
  equals,
  ifElse,
  partial,
  path
} from 'ramda'
import { Container, Label, Image, Grid } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import OrderTip from 'components/Mobile/OrderTip'
import PlainCard from 'components/Mobile/PlainCard'
import MobileTransactions from 'components/Mobile/PointsHistory'

import MobileFooter from 'components/Mobile/Footer'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import EmptyProducts from 'components/Shared/EmptyProductsBlock'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'
import { userIsAuthenticated } from 'containers/App/auth'

import TealIcon from 'images/icons/plain-cliqq-teal-icon.svg'

import {
  getMobileNumbersAction,
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import {
  selectMobileNumbers
} from 'containers/Buckets/selectors'

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

const PointsPreviewWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  padding: 30px 14px;
  position: relative;
  width: 100%;
  z-index: 2;

  &:before {
    border-color: transparent transparent transparent #F9F9F9;
    border-style: solid;
    border-width: 170px 0 0 335px;
    bottom: 0;
    content: '';
    height: 0;
    height: 100%;
    left: 0;
    opacity: 0.7;
    position: absolute;
    width: 0;
    z-index: -1;
  }
`

const UserPointsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 35px;
  }

  .my-points {
    font-size: 36px !important;
    line-height: inherit;
    margin-left: 8px;
  }
`

export class WalletPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    getWallet: PropTypes.func.isRequired,
    getMobileNumbers: PropTypes.func.isRequired,
    resetWallet: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowPointsIcon: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    transactionsLoading: PropTypes.bool.isRequired,
    lazyload: PropTypes.bool.isRequired,
    mobileNumbers: PropTypes.object.isRequired,
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
    const { getWallet, mobileNumbers } = props
    const { offset, limit } = this.state
    // only request if mobile number is available
    if (mobileNumbers.size > 0) {
      // since this data is change and we know exactly
      getWallet({ offset, limit, mobileNumber: mobileNumbers.last() })
    }
  }

  _displayHeaderTransactions () {
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

  _displayTransactionsItems = () => {
    const { transactions, changeRoute, transactionsLoading, lazyload, wallet } = this.props
    if (transactions.size > 0 || lazyload === false) {
      const getLatestTransaction = transactions.first() && transactions.first().get('datetime')

      return (
        <div>
          <Container className='padding__none--vertical'>
            <Grid padded>
              <Grid.Row className='padding__none--vertical'>
                <PlainCard>
                  <PointsPreviewWrapper className='text__align--center'>
                    <Label as='p' className='text__weight--500' size='large' >
                      <FormattedMessage {...messages.currentPoints} />
                    </Label>
                    <Label as='p' className='color__grey text__weight--400' size='medium' >
                      <FormattedMessage
                        {...messages.asOf}
                        values={{date: moment(getLatestTransaction).format('LL')}} />
                    </Label>
                    <UserPointsWrapper>
                      <Image src={TealIcon} alt='CLiQQ' />
                      <Label as='span' className='my-points color__teal text__weight--700' size='massive' >
                        {!isEmpty(wallet) && wallet.get('currentPoints') ? parseFloat(wallet.get('currentPoints')).toLocaleString() : '---'}
                      </Label>
                    </UserPointsWrapper>
                  </PointsPreviewWrapper>
                </PlainCard>
              </Grid.Row>
            </Grid>
          </Container>

          <MobileTransactions changeRoute={changeRoute} loader={transactionsLoading} wallet={wallet} transactions={transactions} />
        </div>
      )
    }

    return null
  }

  componentDidMount () {
    const { setRouteName, setPageTitle, setShowSearchIcon, setShowPointsIcon, setShowActivityIcon, intl, getMobileNumbers } = this.props
    // initial data
    this._fetchWalletTransactions(this.props)

    // we set this as text so it doesnt look
    setPageTitle(intl.formatMessage(messages.title))
    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)
    setRouteName(WALLET_NAME)
    getMobileNumbers()
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
          <div>
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

        <OrderTip />

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
  mobileNumbers: selectMobileNumbers(),
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
    getMobileNumbers: () => (dispatch(getMobileNumbersAction())),
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
