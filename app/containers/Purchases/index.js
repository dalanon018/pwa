/*
 *
 * BarcodeLists
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import {
  T,
  both,
  cond,
  equals,
  identity
} from 'ramda'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Tab, Container } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import messages from './messages'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import WindowWidth from 'components/Shared/WindowWidth'

import { userIsAuthenticated } from 'containers/App/auth'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction,
  setShowPointsIconAction
} from 'containers/Buckets/actions'
import { PURCHASES_NAME } from 'containers/Buckets/constants'

import EmptyPurchase from './EmptyPurchases'
import EntityPurchases from './EntityPurchases'
import AccessView from 'components/Shared/AccessMobileDesktopView'
import SectionTitle from 'components/Shared/SectionTitle'
import LoadingIndicator from 'components/Shared/LoadingIndicator'
import reducer from './reducer'
import saga from './saga'

import {
  selectLocalLoader,
  selectApiLoader,
  selectActivePurchases,
  selectCompletedPurchases,
  selectExpiredPurchases
} from './selectors'
import {
  getApiPurchasesAction,
  getStoragePurchasesAction
} from './actions'

const PurchaseWrapper = styled.div`
  @media (max-width: 1024px) {
    .ui.tabular{
      .item {
        margin: 0 auto;
      }
    }
  }

  @media (min-width: 1024px) {
    .ui.tabular{
      background-color: transparent;
      display: inline-block;
      padding: 0 10px 5px;
      border-bottom: 1px solid #E8E8E8;
      margin-bottom: 20px;

      .item {
        cursor: pointer;
        font-weight: 400;
        margin-right: 40px;
        padding: 0 0 7px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`

export class Purchases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    localLoading: PropTypes.bool.isRequired,
    apiLoading: PropTypes.bool.isRequired,
    activePurchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    completedPurchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    expiredPurchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowPointsIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    getApiPurchases: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired
  }

  state = {
    current: null,
    activePane: 'Active'
  }

  _goToHome = () => {
    this.props.changeRoute('/')
  }

  _onTabChange = (e, { panes, activeIndex }) => {
    const { activePane } = this.state
    const { menuItem } = panes[activeIndex]

    this.setState({
      activePane: menuItem || activePane
    })
  }

  _handleShow = (entity) => {
    const { activePane } = this.state
    const { apiLoading, changeRoute, windowWidth } = this.props
    const stickyFooter = document.getElementsByTagName('footer')[0]

    if (stickyFooter) {
      if (entity.size === 0) {
        stickyFooter.classList.contains('sticky') &&
        stickyFooter.classList.remove('sticky')
      } else if (entity.size > 0) {
        stickyFooter.classList.contains('sticky') &&
        stickyFooter.classList.remove('sticky')

        entity.size <= 1 &&
        stickyFooter.classList.add('sticky')
      } else {
        stickyFooter.classList.add('sticky')
      }
    }

    const isEntityEmpty = () => equals(0, entity.size)

    const componentWillLoad = cond([
      [both(equals(false), isEntityEmpty), () => <EmptyPurchase active={activePane} />],
      [identity, () => <LoadingIndicator />],
      [T, () => (
        <EntityPurchases
          entity={entity}
          changeRoute={changeRoute}
          windowWidth={windowWidth}
        />
      )]
    ])

    return componentWillLoad(apiLoading)
  }

  componentWillMount () {
    this.props.setPageTitle('My Activity')
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(false)
    this.props.setShowPointsIcon(true)
  }

  componentDidMount () {
    const { getApiPurchases, getLocalPurchases, setRouteName } = this.props

    setRouteName(PURCHASES_NAME)
    // first we have to fetch what we already have on our local storage
    getLocalPurchases()
    // then we will call from our API
    getApiPurchases()
  }

  render () {
    const { activePurchases, completedPurchases, expiredPurchases, intl } = this.props

    const panes = [
      { menuItem: 'Active', render: () => <Tab.Pane>{this._handleShow(activePurchases)}</Tab.Pane> },
      { menuItem: 'Completed', render: () => <Tab.Pane>{this._handleShow(completedPurchases)}</Tab.Pane> },
      { menuItem: 'Expired', render: () => <Tab.Pane>{this._handleShow(expiredPurchases)}</Tab.Pane> }
    ]

    return (
      <div>
        <PurchaseWrapper>
          <Helmet
            title='Receipts'
            meta={[
              { name: 'description', content: 'List of barcodes' }
            ]}
          />

          <AccessView
            mobileView={null}
            desktopView={
              <Container>
                <div className='padding__medium'>
                  <div className='padding__horizontal--10'>
                    <SectionTitle colorGrey title={intl.formatMessage(messages.header)} />
                  </div>
                </div>
              </Container>
            }
          />

          <AccessView
            mobileView={
              <Tab
                onTabChange={this._onTabChange}
                panes={panes}
                className='mobile-tab'
              />
            }
            desktopView={
              <Container className='padding__none--top'>
                <div className='padding__medium'>
                  <Tab
                    onTabChange={this._onTabChange}
                    panes={panes}
                  />
                </div>
              </Container>
            }
          />
        </PurchaseWrapper>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  activePurchases: selectActivePurchases(),
  completedPurchases: selectCompletedPurchases(),
  expiredPurchases: selectExpiredPurchases(),
  localLoading: selectLocalLoader(),
  apiLoading: selectApiLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getApiPurchases: (payload) => dispatch(getApiPurchasesAction(payload)),
    getLocalPurchases: () => dispatch(getStoragePurchasesAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'purchases', reducer })
const withSaga = injectSaga({ key: 'purchases', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(userIsAuthenticated(injectIntl(Purchases))))
