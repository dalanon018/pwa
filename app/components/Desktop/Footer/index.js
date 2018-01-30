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

import DeliveryIcon from 'images/icons/delivery-icon.svg'
import ReturnIcon from 'images/icons/return-icon.svg'

import {
  AppInfo,
  // CopyRight,
  HelperLinks,
  // SocialIcons,
  Wrapper,
  FooterColumnWrapper,
  // FooterColumnTitle,
  FooterColumnAdjusterFlex
} from './Wrapper'
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
      <Wrapper className='border_top__one--light-grey background__light-grey'>
        <Container>
          <Grid padded columns='4'>
            <FooterColumnAdjusterFlex>
              <FooterColumnWrapper>
                <AppInfo>
                  <Image alt='CLiQQ' src={DeliveryIcon} />
                  <section>
                    <Label as='span' size='tiny' className='color__secondary'> <FormattedMessage {...messages.storeDelivery} /></Label>
                    <br />
                    <Label as='span' size='tiny' className='color__grey'>
                      <FormattedMessage {...messages.freeShippingDelivery} /></Label>
                  </section>
                </AppInfo>
                <AppInfo>
                  <Image alt='CLiQQ' src={ReturnIcon} />
                  <section>
                    <Label as='span' size='tiny' className='color__secondary'><FormattedMessage {...messages.returnPolicy} /></Label>
                    <br />
                    <Label as='span' size='tiny' className='color__grey'>
                      <FormattedMessage {...messages.changeMind} /></Label>
                  </section>
                </AppInfo>
              </FooterColumnWrapper>
            </FooterColumnAdjusterFlex>
            <Grid.Column>
              <FooterColumnWrapper>
                <HelperLinks>
                  <List>
                    <List.Item className='color__grey' onClick={this._handleFaqRoute}>
                      <Label as='span' size='medium' className='color__secondary'>
                        <FormattedMessage {...messages.columnCliqqShopHeader} />
                      </Label>

                    </List.Item>
                    <List.Item className='color__grey' onClick={this._handleFaqRoute}>
                      <Label as='span' size='tiny' className='color__secondary'>
                        <FormattedMessage {...messages.returnPolicy} />
                      </Label>

                    </List.Item>
                    <List.Item className='color__grey' onClick={this._handleTermsConditionsRoute}>
                      <Label as='span' size='tiny' className='color__secondary'>
                        <FormattedMessage {...messages.termsConditions} />
                      </Label>
                    </List.Item>
                    <List.Item className='color__grey' onClick={this._handlePrivacyPolicy}>
                      <Label as='span' size='tiny' className='color__secondary'>
                        <FormattedMessage {...messages.privacyPolicy} />
                      </Label>
                    </List.Item>
                  </List>
                </HelperLinks>
              </FooterColumnWrapper>
            </Grid.Column>
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
