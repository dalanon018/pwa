/*
 *
 * FaqPage
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import messages from './messages'
import { Grid } from 'semantic-ui-react'
// import styled from 'styled-components'
import showdown from 'showdown'

import Footer from 'components/Footer'
import { LoadingStateInfo } from 'components/LoadingBlock'

// import claimIcon from 'images/icons/faq-claiming-icon.svg'
// import deliveryIcon from 'images/icons/faq-delivery-icon.svg'
// import orderingIcon from 'images/icons/faq-ordering-icon.svg'
// import paymentIcon from 'images/icons/faq-payment-icon.svg'
// import pointsIcon from 'images/icons/faq-points-icon.svg'
// import returnIcon from 'images/icons/faq-return-icon.svg'

import { getMarkDownAction } from './actions'
import { selectMarkdown, selectLoading } from './selectors'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

// const IconWrapper = styled.div`
//   margin-bottom: 20px;
//   img {
//     padding: 10px 23px;
//   }
//   p {
//     color: #5B5B5B;
//   }

//   @media (min-width: 768px) {
//     img {
//       width: 200px;
//       margin: 0 auto;
//     }
//     p {
//       font-family: 'helveticabold';
//       font-size: 28px;
//       letter-spacing: 3px;
//       margin-top: 20px;
//     }
//   }
// `

export class FaqPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    markdown: PropTypes.string,
    getMarkDown: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    loader: PropTypes.bool
  }

  componentDidMount () {
    this.props.getMarkDown()
    this.props.setPageTitle(this.props.intl.formatMessage(messages.header))
    this.props.setShowSearchIcon(false)
    this.props.setShowActivityIcon(false)
  }

  render () {
    const { markdown, loader } = this.props
    const converter = new showdown.Converter()
    const html = converter.makeHtml(markdown)
    // const filteredHtml = html.replace('{{< img src="../img/device_widget.png" alt="widget" >}}', `<img src='https://cliqq.imgix.net/000CE.png?w=175&h=175&fit=clamp'>`)
    return (
      <div>
        <div className='document-helper'>
          <Grid padded>
            <LoadingStateInfo loading={loader} count='4'>
              <div className='animation-fade' dangerouslySetInnerHTML={{__html: html}} />
            </LoadingStateInfo>
            {/*
              <Grid.Row textAlign='center' columns={3}>
                <Grid.Column>
                  <IconWrapper>
                    <Image src={pointsIcon} />
                    <p>CLIQQ POINTS</p>
                  </IconWrapper>
                </Grid.Column>
                <Grid.Column>
                  <IconWrapper>
                    <Image src={orderingIcon} />
                    <p>ORDERING</p>
                  </IconWrapper>
                </Grid.Column>
                <Grid.Column>
                  <IconWrapper>
                    <Image src={claimIcon} />
                    <p>CLAIMING</p>
                  </IconWrapper>
                </Grid.Column>
                <Grid.Column>
                  <IconWrapper>
                    <Image src={deliveryIcon} />
                    <p>DELIVERY</p>
                  </IconWrapper>
                </Grid.Column>
                <Grid.Column>
                  <IconWrapper>
                    <Image src={paymentIcon} />
                    <p>PAYMENT</p>
                  </IconWrapper>
                </Grid.Column>
                <Grid.Column>
                  <IconWrapper>
                    <Image src={returnIcon} />
                    <p>RETURNS</p>
                  </IconWrapper>
                </Grid.Column>
              </Grid.Row>
            */}
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
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getMarkDown: payload => dispatch(getMarkDownAction()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FaqPage))
