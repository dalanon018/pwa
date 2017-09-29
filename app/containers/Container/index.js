/**
 *
 * Container
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { Switch, Route } from 'react-router-dom'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import HomePage from 'containers/HomePage/Loadable'

import {
  selectMobileNumbers,
  selectReceiptsUpdated,
  selectToggleError,
  selectToggleMessage
} from './selectors'

import {
  getMobileNumbersAction,
  getUpdatedReceiptsAction,
  setUpdatedReceiptsAction,
  setNetworkErrorAction
} from './actions'

import reducer from './reducer'
import saga from './saga'

export class Container extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    )
  }
}

Container.propTypes = {
  getUpdatedReceipts: PropTypes.func.isRequired,
  setNetworkError: PropTypes.func.isRequired,
  mobileNumbers: PropTypes.object,
  toggleError: PropTypes.bool.isRequired,
  toggleMessage: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  mobileNumbers: selectMobileNumbers(),
  receiptsUpdated: selectReceiptsUpdated(),
  toggleError: selectToggleError(),
  toggleMessage: selectToggleMessage()
})

function mapDispatchToProps (dispatch) {
  return {
    getMobileNumbers: () => dispatch(getMobileNumbersAction()),
    getUpdatedReceipts: (payload) => dispatch(getUpdatedReceiptsAction(payload)),
    setUpdatedReceipts: (payload) => dispatch(setUpdatedReceiptsAction(payload)),
    setNetworkError: (payload) => dispatch(setNetworkErrorAction(payload)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'container', reducer })
const withSaga = injectSaga({ key: 'container', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Container)
