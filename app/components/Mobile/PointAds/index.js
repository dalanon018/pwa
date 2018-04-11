/**
*
* PointAds
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Grid, Image, Label, Button } from 'semantic-ui-react'
import WindowWidth from 'components/Shared/WindowWidth'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import Badge from 'images/7-11-badge.png'

export const Wrapper = styled.div`
  padding: 0 10px;

  .description-content {
    display: inherit;
  }

  @media (min-width: 767px) {
    padding: 0;
  }


  @media (max-width: 359px) {
   .massive.label {
     font-size: 22px !important;
   }
  }
`

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 10px 0;
  justify-content: center;

  img {
    width: 40px;
    margin-right: 10px;

    &.return-icon {
      width: 30px;
    }
  }

  .large {
    line-height: 18px;
  }

  .pay-point {
    line-height: 28px;
  }

  @media (max-width: 375px) {
    .custom-label {
      font-size: 4vw !important;
    }
  }

  @media (min-width: 767px) {
    justify-content: center;
  }
`

export const ImageWrapper = styled.div`
  display: inline-block;
  margin-right: 25px;
  width: 100%;

  img {
    // width: 100%;
    width: 120px;
  }

  @media (min-width: 767px) {
    // width: inherit;
  }

  @media (max-width: 359px) {
    margin-right: 20px;
  }
`

class PointAds extends React.PureComponent {
  _handleMobile = () => {
    const { changeRoute } = this.props

    return (
      <Wrapper className='background__light-grey'>
        <Container>
          <Grid container>
            <Grid.Row>
              <FlexContainer>
                <ImageWrapper>
                  <Image src={Badge} alt='CLiQQ' />
                </ImageWrapper>
                <div>
                  <Label basic as='span' size='massive' className='padding__none pay-point text__weight--400'>
                    <FormattedMessage {...messages.payPoints} />
                  </Label>
                  <Label basic as='p' size='small' className='padding__none text__weight--400'>
                    <FormattedMessage {...messages.usePoints} />
                  </Label>
                  <Button primary onClick={() => changeRoute('/wallet')}>
                    <FormattedMessage {...messages.checkBalance} />
                  </Button>
                </div>
              </FlexContainer>
            </Grid.Row>
          </Grid>
        </Container>
      </Wrapper>
    )
  }

  _handleTablet = () => {
    const { changeRoute } = this.props

    return (
      <Wrapper>
        <FlexContainer className='background__light-grey'>
          <div>
            <ImageWrapper>
              <Image src={Badge} alt='CLiQQ' />
            </ImageWrapper>
          </div>
          <div>
            <Label basic as='span' size='massive' className='padding__none pay-point text__weight--400'>
              <FormattedMessage {...messages.payPoints} />
            </Label>
            <Label basic as='p' size='small' className='padding__none description-content text__weight--400'>
              <FormattedMessage {...messages.usePoints} />
            </Label>
            <Button primary onClick={() => changeRoute('/wallet')}>
              <FormattedMessage {...messages.checkBalance} />
            </Button>
          </div>
        </FlexContainer>
      </Wrapper>
    )
  }

  render () {
    const { windowWidth } = this.props

    return (
      windowWidth < 767 ? this._handleMobile() : this._handleTablet()
    )
  }
}

PointAds.propTypes = {

}

export default WindowWidth(PointAds)
