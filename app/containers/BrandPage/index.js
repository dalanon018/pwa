/*
 *
 * BrandPage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import makeSelectBrandPage from './selectors'
import messages from './messages'

export class BrandPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

BrandPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  BrandPage: makeSelectBrandPage()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandPage)
