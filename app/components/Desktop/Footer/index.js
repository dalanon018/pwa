import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedMessage, injectIntl } from 'react-intl'
import { push } from 'react-router-redux'
import {
  Container,
  Grid,
  Image,
  List,
  Label
} from 'semantic-ui-react'

import A from 'components/Shared/A'

// import FacebookIcon from 'images/icons/facebook-icon.svg'
// import TwitterIcon from 'images/icons/twitter-icon.svg'
// import EmailIcon from 'images/icons/email-icon.svg'

import DeliveryIcon from 'images/icons/delivery-icon.svg'
import ReturnIcon from 'images/icons/return-icon.svg'
import FooterBackground from 'images/backgrounds/footer-background.svg'
import SocialIconsSprite from 'images/icons/social-icons.svg'

import {
  AppInfo,
  CopyRight,
  HelperLinks,
  SocialIcons,
  Wrapper,
  FooterColumnWrapper,
  // FooterColumnTitle,
  FooterColumnAdjusterFlex,
  FooterSocialMediaWrapper,
  IconItem,
  CustomItem
} from './Wrapper'
import messages from './messages'

export class Footer extends React.PureComponent {
  _handleFaqRoute = () => {
    this.props.changeRoute('/faq')
  }

  _handleTermsConditionsRoute = () => {
    this.props.changeRoute('/terms-conditions')
  }

  _handlePrivacyPolicy = () => {
    this.props.changeRoute('/privacy-policy')
  }

  _handleActivitiesRoute = () => {
    this.props.changeRoute('/purchases')
  }

  _handleWalletRoute = () => {
    this.props.changeRoute('/wallet')
  }

  _handleLoginRoute = () => {
    this.props.changeRoute('/login')
  }

  render () {
    const currentDate = new Date()
    return (
      <Wrapper
        backgroundImage={FooterBackground}
        className='border_top__one--light-grey background__fade-grey'
      >
        <Container>
          <Grid columns='4'>
            <FooterColumnAdjusterFlex width={6}>
              <FooterColumnWrapper>
                <AppInfo>
                  <Image alt='CLiQQ' className='delivery-icon' src={DeliveryIcon} />
                  <section>
                    <Label as='span' size='massive' className='text__weight--400'> <FormattedMessage {...messages.storeDelivery} /></Label>
                    <br />
                    <Label as='span' size='large' className='text__weight--400 color__grey'>
                      <FormattedMessage {...messages.freeShippingDelivery} /></Label>
                  </section>
                </AppInfo>
                <AppInfo>
                  <Image alt='CLiQQ' className='return-icon' src={ReturnIcon} />
                  <section>
                    <Label as='span' size='massive' className='text__weight--400'><FormattedMessage {...messages.returnPolicy} /></Label>
                    <br />
                    <Label as='span' size='large' className='text__weight--400 color__grey'>
                      <FormattedMessage {...messages.changeMind} /></Label>
                  </section>
                </AppInfo>
              </FooterColumnWrapper>
            </FooterColumnAdjusterFlex>
            <Grid.Column width={3}>
              <FooterColumnWrapper>
                <Label as='span' size='massive' className='text__weight--400'>
                  <div className='margin__bottom-positive--10'>
                    <FormattedMessage {...messages.columnCliqqShopHeader} />
                  </div>
                </Label>
                <HelperLinks>
                  <List>
                    <List.Item onClick={this._handleActivitiesRoute}>
                      <Label as='span' size='large' className='text__weight--400'>
                        <FormattedMessage {...messages.activities} />
                      </Label>

                    </List.Item>
                    <List.Item onClick={this._handleWalletRoute}>
                      <Label as='span' size='large' className='text__weight--400'>
                        <FormattedMessage {...messages.pointsWallet} />
                      </Label>
                    </List.Item>
                    <List.Item onClick={this._handleLoginRoute}>
                      <Label as='span' size='large' className='text__weight--400'>
                        <FormattedMessage {...messages.login} />
                      </Label>
                    </List.Item>
                  </List>
                </HelperLinks>
              </FooterColumnWrapper>
            </Grid.Column>
            <Grid.Column width={3}>
              <FooterColumnWrapper>
                <Label as='span' size='massive' className='text__weight--400'>
                  <div className='margin__bottom-positive--10'>
                    <FormattedMessage {...messages.columnHelpHeader} />
                  </div>
                </Label>
                <HelperLinks>
                  <List>
                    <List.Item onClick={this._handleFaqRoute}>
                      <Label as='span' size='large' className='text__weight--400'>
                        <FormattedMessage {...messages.faq} />
                      </Label>

                    </List.Item>
                    <List.Item onClick={this._handleTermsConditionsRoute}>
                      <Label as='span' size='large' className='text__weight--400'>
                        <FormattedMessage {...messages.termsConditions} />
                      </Label>
                    </List.Item>
                    <List.Item onClick={this._handlePrivacyPolicy}>
                      <Label as='span' size='large' className='text__weight--400'>
                        <FormattedMessage {...messages.privacyPolicy} />
                      </Label>
                    </List.Item>
                  </List>
                </HelperLinks>
              </FooterColumnWrapper>
            </Grid.Column>
            <Grid.Column width={4}>
              <FooterColumnWrapper>
                <FooterSocialMediaWrapper>
                  <Label as='span' size='massive' className='text__weight--400'>
                    <FormattedMessage {...messages.stayConnected} />
                  </Label>
                  <SocialIcons>
                    <List horizontal>
                      <CustomItem>
                        <A rel='noopener' href='https://www.facebook.com/cliqqshop/' target='_blank'>
                          <IconItem className='fb-icon' icon={SocialIconsSprite} />
                        </A>
                      </CustomItem>
                      <CustomItem>
                        <A rel='noopener' href='https://www.instagram.com/cliqqshop/' target='_blank'>
                          <IconItem className='ig-icon' icon={SocialIconsSprite} />
                        </A>
                      </CustomItem>
                      <CustomItem>
                        <A href='mailto:cliqqshop@7-eleven.com.ph'>
                          <IconItem className='mail-icon' icon={SocialIconsSprite} />
                        </A>
                      </CustomItem>
                    </List>

                    {/*
                      <List horizontal>
                      <List.Item>
                        <A rel='noopener' href='https://www.facebook.com/711philippines' target='_blank'>
                          <Image alt='CLiQQ' src={FacebookIcon} />
                        </A>
                      </List.Item>
                      <List.Item>
                        <A rel='noopener' href='https://twitter.com/711philippines?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor' target='_blank'>
                          <Image alt='CLiQQ' src={TwitterIcon} />
                        </A>
                      </List.Item>
                      <List.Item>
                        <A href='mailto:cliqqsupport@7-eleven.com.ph'>
                          <Image alt='CLiQQ' src={EmailIcon} />
                        </A>
                      </List.Item>
                    </List>
                    */}
                  </SocialIcons>
                </FooterSocialMediaWrapper>
              </FooterColumnWrapper>
            </Grid.Column>
            <Grid.Row centered>
              <CopyRight className='color__secondary'>&copy; <FormattedMessage {...messages.copyRight} values={{ year: currentDate.getFullYear() }} /></CopyRight>
            </Grid.Row>
          </Grid>

        </Container>
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
