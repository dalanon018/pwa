/*
 *
 * TermsConditions
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import makeSelectTermsConditions from './selectors'
import messages from './messages'

import { Grid } from 'semantic-ui-react'

import H1 from 'components/H1'
import ListBlock from 'components/ListBlock'
import Footer from 'components/Footer'

export class TermsConditions extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <div className='padding__horizontal--10'>
          <Grid padded>
            <H1 center className='padding__top--25 padding__none--horizontal'>
              <FormattedMessage {...messages.header} />
            </H1>
            <ListBlock />
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

TermsConditions.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  TermsConditions: makeSelectTermsConditions()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions)
