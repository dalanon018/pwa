/**
*
* PointAds
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Grid, Image, Label, Button } from 'semantic-ui-react'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import Badge from 'images/7-11-badge.png'

export const Wrapper = styled.div`
  padding: 0 10px;
`

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 10px 0;

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
    line-height: 18px;
  }

  @media (max-width: 375px) {
    .custom-label {
      font-size: 4vw !important;
    }
  }
`

export const ImageWrapper = styled.div`
  margin-right: 40px;
  display: inline-block;

  img {
    width: 100%;
  }
`

function PointAds ({ changeRoute }) {
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
                <Label basic as='span' size='massive' className='padding__none pay-point'>
                  <FormattedMessage {...messages.payPoints} />
                </Label>
                <Label basic as='p' size='small' className='padding__none'>
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

PointAds.propTypes = {

}

export default PointAds
