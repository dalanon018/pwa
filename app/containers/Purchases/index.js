/*
 *
 * BarcodeLists
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Tab } from 'semantic-ui-react'

import WindowWidth from 'components/WindowWidth'

import {
  userIsAuthenticated
} from 'containers/App/auth'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import EmptyPurchase from './EmptyPurchases'
import EntityPurchases from './EntityPurchases'

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
  .ui.tabular{
    .item {
      margin: 0 auto;
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
    dispatch: PropTypes.func.isRequired
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
    const { getApiPurchases, getLocalPurchases } = this.props

    // first we have to fetch what we already have on our local storage
    getLocalPurchases()
    // then we will call from our API
    getApiPurchases()
  }

  render () {
    const { activePurchases, completedPurchases, expiredPurchases } = this.props

    const panes = [
      { menuItem: 'Active', render: () => <Tab.Pane>{this._handleShow(activePurchases)}</Tab.Pane> },
      { menuItem: 'Completed', render: () => <Tab.Pane>{this._handleShow(completedPurchases)}</Tab.Pane> },
      { menuItem: 'Expired', render: () => <Tab.Pane>{this._handleShow(expiredPurchases)}</Tab.Pane> }
    ]

    return (
      <PurchaseWrapper>
        <Helmet
          title='Receipts'
          meta={[
            { name: 'description', content: 'List of barcodes' }
          ]}
        />

        <Tab
          onTabChange={this._onTabChange}
          panes={panes}
        />
      </PurchaseWrapper>
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
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getApiPurchases: (payload) => dispatch(getApiPurchasesAction(payload)),
    getLocalPurchases: () => dispatch(getStoragePurchasesAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(userIsAuthenticated(Purchases)))
