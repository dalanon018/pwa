/**
*
* DesktopFooter
*
*/

import React, { PropTypes } from 'react'
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

import {
  DesktopWrapper,
  Wrapper,
  HelperLinks,
  CopyRight,
  SocialIcons } from './styles'

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
        <div className='padding__horizontal--10'>
          <DesktopWrapper>
            <Grid padded>
              <Grid.Row columns='2' stretched>
                <Grid.Column width={5}>
                  <H1 className='custom-header'><FormattedMessage {...messages.stayConnected} /></H1>
                  <SocialIcons>
                    <List horizontal>
                      <List.Item>
                        <A rel='noopener' href='https://www.facebook.com/711philippines' target='_blank'>
                          <Image alt='Cliqq' avatar src={FacebookIcon} />
                        </A>
                      </List.Item>
                      <List.Item>
                        <A rel='noopener' href='https://twitter.com/711philippines?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                          <Image alt='Cliqq' avatar src={TwitterIcon} />
                        </A>
                      </List.Item>
                      <List.Item>
                        <A rel='noopener' href='mailto:psc-corp@7-eleven.com.ph'>
                          <Image alt='Cliqq' avatar src={EmailIcon} />
                        </A>
                      </List.Item>
                    </List>
                  </SocialIcons>
                </Grid.Column>
                <Grid.Column width={11}>
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
        </div>
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
