import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { push } from 'react-router-redux'

import A from 'components/A'
import H1 from 'components/H1'
import {
  CopyRight,
  HelperLinks,
  SocialIcons,
  Wrapper } from './Wrapper'
import messages from './messages'

import FacebookIcon from 'images/icons/facebook-icon.svg'
import TwitterIcon from 'images/icons/twitter-icon.svg'
import EmailIcon from 'images/icons/email-icon.svg'

import { Grid, Image, List } from 'semantic-ui-react'

export class Footer extends React.PureComponent {
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
      <Wrapper>
        <Grid>
          <Grid.Row>
            <Grid.Column>
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
      </Wrapper>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapDispatchToProps, mapDispatchToProps)(Footer)
