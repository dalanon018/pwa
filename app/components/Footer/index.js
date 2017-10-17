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
import DeliveryIcon from 'images/icons/delivery-icon.svg'
import ReturnIcon from 'images/icons/return-icon.svg'

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
      <Wrapper className='border_top__one--light-grey'>
        <Grid>
          <Grid.Row centered>
            <H2 className='custom-header color__secondary' >
              <FormattedMessage {...messages.stayConnected} />
            </H2>
            <SocialIcons>
              <List horizontal>
                <List.Item>
                  <A rel='noopener' href='https://www.facebook.com/711philippines' target='_blank'>
                    <Image alt='Cliqq' src={FacebookIcon} />
                  </A>
                </List.Item>
                <List.Item>
                  <A rel='noopener' href='https://twitter.com/711philippines?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                    <Image alt='Cliqq' src={TwitterIcon} />
                  </A>
                </List.Item>
                <List.Item>
                  <A href='mailto:psc-corp@7-eleven.com.ph'>
                    <Image alt='Cliqq' src={EmailIcon} />
                  </A>
                </List.Item>
              </List>
            </SocialIcons>
          </Grid.Row>

          <Grid.Row columns='equal' verticalAlign='middle' centered divided>
            <Grid.Column>
              <AppInfo className='float__right'>
                <Image src={DeliveryIcon} />
                <section>
                  <Label as='span' size='tiny' className='color__secondary'>1 Dat In-Store Delivery</Label>
                  <br />
                  <Label as='span' size='tiny' basic color='grey'>Free Shipping to Store</Label>
                </section>
              </AppInfo>
            </Grid.Column>
            <Grid.Column>
              <AppInfo>
                <Image src={ReturnIcon} />
                <section>
                  <Label as='span' size='tiny' className='color__secondary'>Cliqq Return Policy</Label>
                  <br />
                  <Label as='span' size='tiny' basic color='grey'>Change of Mind is Applicable</Label>
                </section>
              </AppInfo>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row centered>
            <HelperLinks>
              <List horizontal divided>
                <List.Item className='color__grey' onClick={this._handleFaqRoute}>
                  <FormattedMessage {...messages.faq} />
                </List.Item>
                <List.Item className='color__grey' onClick={this._handleTermsConditionsRoute}>
                  <FormattedMessage {...messages.termsConditions} />
                </List.Item>
                <List.Item className='color__grey' onClick={this._handlePrivacyPolicy}>
                  <FormattedMessage {...messages.privacyPolicy} />
                </List.Item>
              </List>
            </HelperLinks>
          </Grid.Row>

          <Grid.Row centered>
            <CopyRight className='color__secondary'><FormattedMessage {...messages.copyRight} /></CopyRight>
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
