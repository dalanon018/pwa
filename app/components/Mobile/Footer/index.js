import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage, injectIntl } from 'react-intl'
import { push } from 'react-router-redux'
import { Grid, List } from 'semantic-ui-react'

import A from 'components/Shared/A'
import H2 from 'components/Shared/H2'

import SocialIconsSprite from 'images/icons/social-icons.svg'

import {
  CopyRight,
  HelperLinks,
  SocialIcons,
  IconItem,
  CustomItem,
  Wrapper } from './Wrapper'
import messages from './messages'

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
      <Wrapper className='border_top__three--grey'>
        <Grid>
          <Grid.Row centered>
            <H2 className='custom-header color__dark-grey' >
              <FormattedMessage {...messages.stayConnected} />
            </H2>
            <SocialIcons>
              <List horizontal>
                <CustomItem>
                  <A rel='noopener' href='https://www.facebook.com/711philippines' target='_blank'>
                    <IconItem className='fb-icon' icon={SocialIconsSprite} />
                  </A>
                </CustomItem>
                <CustomItem>
                  <A rel='noopener' href='https://twitter.com/711philippines?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                    <IconItem className='twitter-icon' icon={SocialIconsSprite} />
                  </A>
                </CustomItem>
                <CustomItem>
                  <A href='mailto:cliqqsupport@7-eleven.com.ph'>
                    <IconItem className='mail-icon' icon={SocialIconsSprite} />
                  </A>
                </CustomItem>
              </List>
            </SocialIcons>
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
            <CopyRight className='color__dark-grey'><FormattedMessage {...messages.copyRight} /></CopyRight>
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
