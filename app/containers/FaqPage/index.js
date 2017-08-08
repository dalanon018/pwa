/*
 *
 * FaqPage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'
import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import showdown from 'showdown'

import H1 from 'components/H1'
import Footer from 'components/Footer'
import { LoadingStateInfo } from 'components/LoadingBlock'

import claimIcon from 'images/icons/faq-claiming-icon.svg'
import deliveryIcon from 'images/icons/faq-delivery-icon.svg'
import orderingIcon from 'images/icons/faq-ordering-icon.svg'
import paymentIcon from 'images/icons/faq-payment-icon.svg'
import pointsIcon from 'images/icons/faq-points-icon.svg'
import returnIcon from 'images/icons/faq-return-icon.svg'

import { getMarkDownAction } from './actions'
import { selectMarkdown, selectLoading } from './selectors'

const IconWrapper = styled.div`
  margin-bottom: 20px;
  img {
    padding: 10px 23px;
  }
  span {
    color: #5B5B5B;
  }
`

export class FaqPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
        <div className='document-helper'>
          <Grid padded>
            <H1 center className='padding__top--25 padding__none--horizontal'>
              <FormattedMessage {...messages.header} />
            </H1>
            <LoadingStateInfo loading={loader} count='4'>
              <div className='animation-fade' dangerouslySetInnerHTML={{__html: html}} />
            </LoadingStateInfo>
            <Grid.Row textAlign='center' columns={3}>
              <Grid.Column>
                <IconWrapper>
                  <Image src={pointsIcon} />
                  <span>CLIQQ POINTS</span>
                </IconWrapper>
              </Grid.Column>
              <Grid.Column>
                <IconWrapper>
                  <Image src={orderingIcon} />
                  <span>ORDERING</span>
                </IconWrapper>
              </Grid.Column>
              <Grid.Column>
                <IconWrapper>
                  <Image src={claimIcon} />
                  <span>CLAIMING</span>
                </IconWrapper>
              </Grid.Column>
              <Grid.Column>
                <IconWrapper>
                  <Image src={deliveryIcon} />
                  <span>DELIVERY</span>
                </IconWrapper>
              </Grid.Column>
              <Grid.Column>
                <IconWrapper>
                  <Image src={paymentIcon} />
                  <span>PAYMENT</span>
                </IconWrapper>
              </Grid.Column>
              <Grid.Column>
                <IconWrapper>
                  <Image src={returnIcon} />
                  <span>RETURNS</span>
                </IconWrapper>
              </Grid.Column>
            </Grid.Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(FaqPage)
