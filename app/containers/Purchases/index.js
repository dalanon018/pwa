/*
 *
 * BarcodeLists
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Tab, Container } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import WindowWidth from 'components/Shared/WindowWidth'

import { userIsAuthenticated } from 'containers/App/auth'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import { PURCHASES_NAME } from 'containers/Buckets/constants'

import EmptyPurchase from './EmptyPurchases'
import EntityPurchases from './EntityPurchases'
import reducer from './reducer'
import saga from './saga'

import {
  selectLoader,
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
      padding: 0 10px 20px;
  
      .item {
        cursor: pointer;
        font-weight: 700;
        margin-right: 40px;
        padding: 0 0 7px;
  
        &:last-child {
          margin-right: 0;
        }
  
        &.active {
          border-bottom: 2px solid #8DC640;
        }
      }
    }
  }
`

export class Purchases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool.isRequired,
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
    const { loading, changeRoute, windowWidth } = this.props
    const stickyFooter = document.getElementsByTagName('footer')[0]

    if (stickyFooter) {
      if (entity.size === 0) {
        stickyFooter.classList.contains('sticky') &&
        stickyFooter.classList.remove('sticky')
      } else if (entity.size > 0) {
        stickyFooter.classList.contains('sticky') &&
        stickyFooter.classList.remove('sticky')

        entity.size <= 2 &&
        stickyFooter.classList.add('sticky')
      } else {
        stickyFooter.classList.add('sticky')
      }
    }

    if (loading === false && entity.size === 0) {
      return <EmptyPurchase active={activePane} />
    }

    return (
      <EntityPurchases
        entity={entity}
        changeRoute={changeRoute}
        windowWidth={windowWidth}
      />
    )
  }

  componentWillMount () {
    this.props.setPageTitle('My Activity')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(false)
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
    const { activePurchases, completedPurchases, expiredPurchases, windowWidth } = this.props

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

          <Container>
            <div className={windowWidth >= 1024 && 'padding__medium'}>
              <Tab
                onTabChange={this._onTabChange}
                panes={panes}
              />
            </div>
          </Container>
        </PurchaseWrapper>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  activePurchases: selectActivePurchases(),
  completedPurchases: selectCompletedPurchases(),
  expiredPurchases: selectExpiredPurchases(),
  loading: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
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
)(WindowWidth(userIsAuthenticated(Purchases)))
