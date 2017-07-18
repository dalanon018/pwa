import React from 'react'
import { FormattedMessage } from 'react-intl'

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

function Footer () {
  return (
    <Wrapper>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <H1 className='custom-header'><FormattedMessage {...messages.stayConnected} /></H1>
            <SocialIcons>
              <List horizontal>
                <List.Item>
                  <A href='https://facebook.com'>
                    <Image avatar src={FacebookIcon} />
                  </A>
                </List.Item>
                <List.Item>
                  <A href='https://twitter.com'>
                    <Image avatar src={TwitterIcon} />
                  </A>
                </List.Item>
                <List.Item>
                  <A href='mailto:seveneleven@info.com'>
                    <Image avatar src={EmailIcon} />
                  </A>
                </List.Item>
              </List>
            </SocialIcons>

            <HelperLinks>
              <List horizontal>
                <List.Item>
                  <A href='https://facebook.com'>
                    <FormattedMessage {...messages.faq} />
                  </A>
                </List.Item>
                <List.Item>
                  <A href='https://twitter.com'>
                    <FormattedMessage {...messages.termsConditions} />
                  </A>
                </List.Item>
                <List.Item>
                  <A href='https://twitter.com'>
                    <FormattedMessage {...messages.privacyPolicy} />
                  </A>
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

export default Footer

// {...messages.authorMessage}
//           values={{
//             author: <A href='https://twitter.com/mxstbr'>Max Stoiber</A>
//           }}
