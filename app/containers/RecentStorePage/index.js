/**
 *
 * RecentStorePage
 *
 */

import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

import { fromJS } from 'immutable'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { Grid } from 'semantic-ui-react'
import { noop } from 'lodash'
import {
  ifElse,
  isEmpty,
  both,
  compose as RCompose,
  propOr
} from 'ramda'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import { fnQueryObject } from 'utils/http'

import RecentStore from 'components/Shared/RecentStore'
import WindowWidth from 'components/Shared/WindowWidth'

import { userIsAuthenticated } from 'containers/App/auth'
import {
  setPageTitleAction,
  setRouteNameAction,
  storeLocatorAction
} from 'containers/Buckets/actions'

import {
  RECENT_STORE_NAME
} from 'containers/Buckets/constants'

import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import {
  getVisitedStoresAction
} from './actions'

import {
  selectVisitedStores,
  selectVisitedStoresLoading
} from './selectors'

export class RecentStorePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setPageTitle: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getVisitedStores: PropTypes.func.isRequired,
    storeLocator: PropTypes.func.isRequired,
    visitedStores: PropTypes.object.isRequired,
    visitedStoresLoading: PropTypes.bool.isRequired
  }

  state = {
    type: '',
    stores: fromJS([]),
    toggle: ''
  }

  _handleGoToStoreLocator = () => {
    const { type } = this.state
    this.props.storeLocator({ modePayment: type })
  }

  _implementStore = () => {
    const { visitedStores } = this.props
    const { stores } = this.state
    return visitedStores.size ? visitedStores : stores
  }

  _handleToggle = (_, { value }) => {
    const { changeRoute } = this.props
    const { type } = this.state
    const implementStore = this._implementStore()
    const selectedStore = implementStore.find((entity) => entity.get('id') === value)
    this.setState({
      toggle: value
    }, () => {
      changeRoute(`/review?type=${type}&storeId=${selectedStore.get('id')}&storeName=${selectedStore.get('name')}`)
    })
  }

  componentDidMount () {
    const { location: { search }, setPageTitle, setRouteName, intl, getVisitedStores } = this.props

    const query = fnQueryObject(search)
    const selectQuery = ifElse(
      both(
        RCompose(isEmpty, propOr('', 'id')),
        RCompose(isEmpty, propOr('', 'type'))
      ),
      noop,
      ({type, ...rest}) => {
        const stores = !isEmpty(rest) ? [rest] : []
        this.setState({
          type,
          stores: fromJS(stores) // we update our store
        })
      }
    )
    selectQuery(query)
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(RECENT_STORE_NAME)
    getVisitedStores()
  }

  render () {
    const { windowWidth } = this.props
    const implementStore = this._implementStore()
    return (
      <div>
        <Helmet
          title='Recently Visited'
          meta={[
            { name: 'description', content: '7-eleven CLiQQ Recently Visited Page' }
          ]}
        />
        {
          implementStore.map((visited, index) =>
            <RecentStore
              key={index}
              value={visited}
              toggle={this.state.toggle}
              windowWidth={windowWidth}
              handleToggle={this._handleToggle} />)
        }
        <div className='margin__top-positive--20'>
          <Grid padded>
            <Grid.Row>
              <Grid.Column>
                <FormattedMessage
                  {...messages.findStore}
                  values={{storeLocator: (
                    <span className='color__primary' onClick={this._handleGoToStoreLocator}>
                      <FormattedMessage
                        {...messages.storeLocator}
                      />
                    </span>
                  )}}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  visitedStores: selectVisitedStores(),
  visitedStoresLoading: selectVisitedStoresLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: payload => dispatch(setPageTitleAction(payload)),
    setRouteName: payload => dispatch(setRouteNameAction(payload)),
    getVisitedStores: () => dispatch(getVisitedStoresAction()),
    storeLocator: (payload) => dispatch(storeLocatorAction(payload)),
    changeRoute: url => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'recentStorePage', reducer })
const withSaga = injectSaga({ key: 'recentStorePage', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(userIsAuthenticated(RecentStorePage))))
