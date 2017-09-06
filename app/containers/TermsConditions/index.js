/*
 *
 * TermsConditions
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'
import showdown from 'showdown'

import { Grid } from 'semantic-ui-react'

import H1 from 'components/H1'
import Footer from 'components/Footer'
import { LoadingStateInfo } from 'components/LoadingBlock'

import { getMarkDownAction } from './actions'
import { selectMarkdown, selectLoading } from './selectors'

export class TermsConditions extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    markdown: PropTypes.string,
    getMarkDown: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    loader: PropTypes.bool
  }
  componentDidMount () {
    this.props.getMarkDown()
  }

  render () {
    const { markdown, loader } = this.props
    const converter = new showdown.Converter()
    const html = converter.makeHtml(markdown)
    return (
      <div>
        <div className='document-helper terms-conditions'>
          <Grid padded>
            <H1 center className='padding__top--25 padding__none--horizontal'>
              <FormattedMessage {...messages.header} />
            </H1>
            <LoadingStateInfo loading={loader} count='4'>
              <div className='animation-fade' dangerouslySetInnerHTML={{__html: html}} />
            </LoadingStateInfo>
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  markdown: selectMarkdown(),
  loader: selectLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getMarkDown: payload => dispatch(getMarkDownAction()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions)
