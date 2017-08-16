/**
*
* DesktopFooter
*
*/

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

import FacebookIcon from 'images/icons/facebook-icon.svg'
import TwitterIcon from 'images/icons/twitter-icon.svg'
import EmailIcon from 'images/icons/email-icon.svg'

import H1 from 'components/H1'
import A from 'components/A'

import { Grid, Image, List } from 'semantic-ui-react'

const DesktopWrapper = styled.div`
  margin: 0 auto;
  max-width: calc(1200px + 16px * 2);
`

const Wrapper = styled.footer`
  border-top: 8px solid #aeaeae;
  margin-top: 30px;
  padding: 25px 15px 15px;

  .custom-header {
    font-size: 18px;
    margin: 0 0 10px 0 !important;
    text-align: left;
  }
`

const HelperLinks = styled.div`
  margin-bottom: 10px;
  text-align: right;
  span {
    color: #5B5B5B;
    cursor: pointer;
    font-family: 'helveticalight';
    font-size: 16px;
    letter-spacing: 3px;
  }

  .item {
    position: relative;
    &:first-child {
      &:before {
        content: '';
      }
    }
    &:before {
      bottom: 3px;
      color: #5B5B5B;
      content: '|';
      left: -8px;
      position: absolute;
    }
  }

  @media (min-width: 375px) {
    a {
      letter-spacing: 1px;
    }
  }
`

const CopyRight = styled.p`
  color: #5B5B5B;
  cursor: pointer;
  font-family: 'helveticalight';
  font-size: 16px;
  letter-spacing: 3px;
  margin-left: 15px;
`

const SocialIcons = styled.div`
  img {
    height: inherit !important;
    width: 40px !important;
  }
`

export class DesktopFooter extends React.PureComponent {
  static propTypes = {
    changeRoute: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this._handleFaqRoute = this._handleFaqRoute.bind(this)
    this._handleTermsConditionsRoute = this._handleTermsConditionsRoute.bind(this)
    this._handlePrivacyPolicy = this._handlePrivacyPolicy.bind(this)
  }

  _handleFaqRoute () {
    this.props.changeRoute('/faq')
  }

  _handleTermsConditionsRoute () {
    this.props.changeRoute('/terms-conditions')
  }

  _handlePrivacyPolicy () {
    this.props.changeRoute('/privacy-policy')
  }

  render () {
    return (
      <Wrapper className='desktop-visibility'>
        <DesktopWrapper>
          <Grid padded>
            <Grid.Row columns='2' stretched>
              <Grid.Column width={9}>
                <H1 className='custom-header'><FormattedMessage {...messages.stayConnected} /></H1>
                <SocialIcons>
                  <List horizontal>
                    <List.Item>
                      <A href='https://www.facebook.com/711philippines' target='_blank'>
                        <Image avatar src={FacebookIcon} />
                      </A>
                    </List.Item>
                    <List.Item>
                      <A href='https://twitter.com/711philippines?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                        <Image avatar src={TwitterIcon} />
                      </A>
                    </List.Item>
                    <List.Item>
                      <A href='mailto:psc-corp@7-eleven.com.ph'>
                        <Image avatar src={EmailIcon} />
                      </A>
                    </List.Item>
                  </List>
                </SocialIcons>
              </Grid.Column>
              <Grid.Column width={7}>
                <HelperLinks>
                  <List horizontal>
                    <List.Item onClick={this._handleFaqRoute}>
                      <FormattedMessage {...messages.faq} />
                    </List.Item>
                    <List.Item onClick={this._handleTermsConditionsRoute}>
                      <FormattedMessage {...messages.termsConditions} />
                    </List.Item>
                    <List.Item onClick={this._handlePrivacyPolicy}>
                      <FormattedMessage {...messages.privacyPolicy} />
                    </List.Item>
                  </List>
                </HelperLinks>
                <CopyRight><FormattedMessage {...messages.copyRight} /></CopyRight>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </DesktopWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({

})

function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopFooter)
