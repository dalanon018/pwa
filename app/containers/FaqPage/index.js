/*
 *
 * FaqPage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'

import { connect } from 'react-redux'
import { compose as ReduxCompose } from 'redux'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { Container, Grid } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import MobileFooter from 'components/Mobile/Footer'
import OrderTip from 'components/Mobile/OrderTip'
import SectionTitle from 'components/Shared/SectionTitle'

import { LoadingStateInfo } from 'components/Shared/LoadingBlock'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import { FAQ_NAME } from 'containers/Buckets/constants'

import messages from './messages'
import reducer from './reducer'
import saga from './saga'

import { getMarkDownAction } from './actions'
import { selectMarkdown, selectLoading } from './selectors'

export class FaqPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    markdown: PropTypes.string,
    getMarkDown: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    loader: PropTypes.bool
  }

  componentDidMount () {
    this.props.getMarkDown()
    this.props.setRouteName(FAQ_NAME)
    this.props.setPageTitle(this.props.intl.formatMessage(messages.header))
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(false)
  }

  render () {
    const { markdown, loader, intl } = this.props
    const converter = new showdown.Converter()
    const html = converter.makeHtml(markdown)
    // const filteredHtml = html.replace('{{< img src="../img/device_widget.png" alt="widget" >}}', `<img src='https://cliqq.imgix.net/000CE.png?w=175&h=175&fit=clamp'>`)
    return (
      <div>
        <AccessView
          mobileView={
            <div className='document-helper'>
              <Grid padded>
                <LoadingStateInfo loading={loader} count='4'>
                  <div className='animation-fade color__secondary' dangerouslySetInnerHTML={{__html: html}} />
                </LoadingStateInfo>
              </Grid>
            </div>
          }
          desktopView={
            <div className='document-helper'>
              <Container>
                <div className='padding__medium'>
                  <Grid padded>
                    <LoadingStateInfo loading={loader} count='4'>
                      <SectionTitle title={intl.formatMessage(messages.header)} centered />
                      <div className='animation-fade color__secondary' dangerouslySetInnerHTML={{__html: html}} />
                    </LoadingStateInfo>
                  </Grid>
                </div>
              </Container>
            </div>
          }
        />
        <AccessView
          mobileView={<OrderTip />}
          desktopView={null}
        />

        <AccessView
          mobileView={<MobileFooter />}
          desktopView={null}
        />
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
    setRouteName: (payload) => dispatch(setRouteNameAction(payload)),
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getMarkDown: payload => dispatch(getMarkDownAction()),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'faqPage', reducer })
const withSaga = injectSaga({ key: 'faqPage', saga })

export default ReduxCompose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(FaqPage))
