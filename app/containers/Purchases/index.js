/*
 *
 * BarcodeLists
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Tab } from 'semantic-ui-react'

import WindowWidth from 'components/WindowWidth'

import {
  userIsAuthenticated
} from 'containers/App/auth'

import {
  selectLoyaltyToken
} from 'containers/Buckets/selectors'

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
    current: null
  }

  _goToHome = () => {
    this.props.changeRoute('/')
  }

  _handleShow = (entity) => {
    const { loading, changeRoute, windowWidth } = this.props

    if (loading === false && entity.size === 0) {
      return <EmptyPurchase />
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

  componentWillReceiveProps (nextProps) {
    const { loyaltyToken } = nextProps
    console.log(loyaltyToken)
  }

  render () {
    const { activePurchases, completedPurchases, expiredPurchases } = this.props

    const panes = [
      { menuItem: 'Active', render: () => <Tab.Pane>{this._handleShow(activePurchases)}</Tab.Pane> },
      { menuItem: 'Compeleted', render: () => <Tab.Pane>{this._handleShow(completedPurchases)}</Tab.Pane> },
      { menuItem: 'Expired', render: () => <Tab.Pane>{this._handleShow(expiredPurchases)}</Tab.Pane> }
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
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  activePurchases: selectActivePurchases(),
  completedPurchases: selectCompletedPurchases(),
  expiredPurchases: selectExpiredPurchases(),
  loading: selectLoader(),
  loyaltyToken: selectLoyaltyToken()
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
