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

import { getMarkDownAction } from './actions'
import { selectMarkdown } from './selectors'

import { ContainerWrapper } from './styles'

export class TermsConditions extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    markdown: PropTypes.string,
    getMarkDown: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.getMarkDown()
  }

  render () {
    const { markdown } = this.props
    const converter = new showdown.Converter()
    const html = converter.makeHtml(markdown)
    console.log(html)
    return (
      <div>
        <ContainerWrapper>
          <Grid padded>
            <H1 center className='padding__top--25 padding__none--horizontal'>
              <FormattedMessage {...messages.header} />
            </H1>
            <div dangerouslySetInnerHTML={{__html: html}} />
          </Grid>
        </ContainerWrapper>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  markdown: selectMarkdown()
})

function mapDispatchToProps (dispatch) {
  return {
    getMarkDown: payload => dispatch(getMarkDownAction()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions)
