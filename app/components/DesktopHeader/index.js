/**
*
* DesktopHeader
*
*/

import React from 'react'
import styled from 'styled-components'

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import {
  Image,
  Grid
} from 'semantic-ui-react'

import FacebookIcon from 'images/icons/facebook-icon.svg'
import TwitterIcon from 'images/icons/twitter-icon.svg'
import EnvelopeIcon from 'images/icons/envelope-icon.svg'
import PhoneIcon from 'images/icons/phone-icon.svg'

import A from 'components/A'

const HeaderContainer = styled.div`
  background-color: #8DC640;
`

const DesktopWrapper = styled.div`
  margin: 0 auto;
  max-width: calc(1200px + 16px * 2);
`

const InfoWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;

  .info-item {
    &:first-child {
      margin-right: 20px;
    }

    a {
      color: #FFFFFF;
      letter-spacing: 2px;
    }

    img {
      display: inline-block;
      margin-right: 5px;
      width: 15px;
    }
  }
`

const SocialIconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  .social-item {
    &:first-child {
      margin-right: 20px;
    }

    img {
      width: 25px;
    }
  }
`

function DesktopHeader () {
  return (
    <HeaderContainer>
      <DesktopWrapper className='desktop-visibility'>
        <Grid padded>
          <Grid.Row columns='2'>
            <Grid.Column width={12}>
              <InfoWrapper>
                <div className='info-item'>
                  <A href='tel:4857889'>
                    <Image alt='Cliqq' src={PhoneIcon} />
                    <span>(02) 485-788-9</span>
                  </A>
                </div>
                <div className='info-item'>
                  <A href='mailto:customercare@7-elevem.com.ph'>
                    <Image alt='Cliqq' src={EnvelopeIcon} />
                    <span>customercare@7-eleven.com.ph</span>
                  </A>
                </div>
              </InfoWrapper>
            </Grid.Column>
            <Grid.Column width={4}>
              <SocialIconsWrapper>
                <div className='social-item'>
                  <A href='https://www.facebook.com/711philippines' target='_blank'>
                    <Image alt='Cliqq' avatar src={FacebookIcon} />
                  </A>
                </div>
                <div className='social-item'>
                  <A href='https://twitter.com/711philippines?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                    <Image alt='Cliqq' avatar src={TwitterIcon} />
                  </A>
                </div>
              </SocialIconsWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DesktopWrapper>
    </HeaderContainer>
  )
}

DesktopHeader.propTypes = {

}

export default DesktopHeader
