import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  Grid,
  Header,
  Image,
  List
} from 'semantic-ui-react'

import A from 'components/A'

import FacebookIcon from 'images/icons/facebook-icon.svg'
import TwitterIcon from 'images/icons/twitter-icon.svg'
import EmailIcon from 'images/icons/email-icon.svg'

import {
  Wrapper,
  SocialIcons,
  CopyRight
} from './Wrapper'
import messages from './messages'

const getCurrentYear = () => {
  const date = new Date()
  return date.getFullYear()
}

function Footer () {
  return (
    <Wrapper>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header as='h3' textAlign='center'>
              <FormattedMessage {...messages.stayConnected} />
            </Header>
            <SocialIcons>
              <List horizontal>
                <List.Item>
                  <A rel='noopener' href='https://www.facebook.com/711philippines' target='_blank'>
                    <Image alt='facebook' avatar src={FacebookIcon} />
                  </A>
                </List.Item>
                <List.Item>
                  <A rel='noopener' href='https://twitter.com/711philippines?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                    <Image alt='twitter' avatar src={TwitterIcon} />
                  </A>
                </List.Item>
                <List.Item>
                  <A href='mailto:psc-corp@7-eleven.com.ph'>
                    <Image alt='email' avatar src={EmailIcon} />
                  </A>
                </List.Item>
              </List>
            </SocialIcons>
            <List horizontal divided size='small'>
              <List.Item>
                <FormattedMessage {...messages.faq} />
              </List.Item>
              <List.Item>
                <FormattedMessage {...messages.termsConditions} />
              </List.Item>
              <List.Item>
                <FormattedMessage {...messages.privacyPolicy} />
              </List.Item>
            </List>

            <CopyRight basic size='small'>
              <FormattedMessage
                {...messages.copyRight}
                values={{ year: getCurrentYear() }}
              />
            </CopyRight>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  )
}

export default Footer
