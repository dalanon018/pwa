/**
 *
 * RecentStorePage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import Helmet from 'react-helmet'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import { Grid, Container } from 'semantic-ui-react'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import { userIsAuthenticated } from 'containers/App/auth'
import {
  setPageTitleAction,
  setRouteNameAction
} from 'containers/Buckets/actions'

import {
  getVisitedStoresAction
} from './actions'

import {
  selectVisitedStores,
  selectVisitedStoresLoading
} from './selectors'
import { RECENT_STORE_NAME } from 'containers/Buckets/constants'

export class RecentStorePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setPageTitle: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getVisitedStores: PropTypes.func.isRequired,
    visitedStores: PropTypes.object.isRequired,
    visitedStoresLoading: PropTypes.bool.isRequired
  }

  _handleGoTo = (id, name) => () => {
    const { changeRoute } = this.props

    changeRoute(`/products-category/${id}?name=${name}`)
  }

  componentDidMount () {
    const { setPageTitle, setRouteName, intl, getVisitedStores } = this.props
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(RECENT_STORE_NAME)
    getVisitedStores()
  }

  render () {
    return (
      <div>
        <Helmet
          title='Recently Visited'
          meta={[
            { name: 'description', content: '7-eleven CLiQQ Recently Visited Page' }
          ]}
        />
        <Container>
          <Grid padded>
            <Grid.Row columns={2} stretched />
          </Grid>
        </Container>
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
)(injectIntl(userIsAuthenticated(RecentStorePage)))
