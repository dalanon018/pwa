import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage, injectIntl } from 'react-intl'
import { push } from 'react-router-redux'

import A from 'components/A'
import H2 from 'components/H2'
import {
  AppInfo,
  CopyRight,
  HelperLinks,
  SocialIcons,
  Wrapper } from './Wrapper'
import messages from './messages'

import FacebookIcon from 'images/icons/facebook-icon.svg'
import TwitterIcon from 'images/icons/twitter-icon.svg'
import EmailIcon from 'images/icons/email-icon.svg'
import DeliveryIcon from 'images/test-images/v2/delivery-icon.svg'
import ReturnIcon from 'images/test-images/v2/return-icon.svg'

import { Grid, Image, List, Label } from 'semantic-ui-react'

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
      <Wrapper className='mobile-visibility'>
        <Grid>
          <Grid.Row centered>
            <H2 className='custom-header' >
              <FormattedMessage {...messages.stayConnected} />
            </H2>
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
                  <A href='mailto:psc-corp@7-eleven.com.ph'>
                    <Image alt='Cliqq' avatar src={EmailIcon} />
                  </A>
                </List.Item>
              </List>
            </SocialIcons>
          </Grid.Row>

          <Grid.Row columns='2' verticalAlign='middle' centered divided>
            <Grid.Column width={6}>
              <AppInfo>
                <Image src={DeliveryIcon} />
                <section>
                  <Label as='span' size='tiny'>1 Dat In-Store Delivery</Label>
                  <Label as='span' size='tiny'>Free Shipping to Store</Label>
                </section>
              </AppInfo>
            </Grid.Column>
            <Grid.Column width={6}>
              <AppInfo>
                <Image src={ReturnIcon} />
                <section>
                  <Label as='span' size='tiny'>Cliqq Return Policy</Label>
                  <Label as='span' size='tiny'>Change of Mind is Applicable</Label>
                </section>
              </AppInfo>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <HelperLinks>
              <List horizontal divided>
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
          </Grid.Row>

          <Grid.Row centered>
            <CopyRight><FormattedMessage {...messages.copyRight} /></CopyRight>
          </Grid.Row>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Footer))
