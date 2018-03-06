/**
*
* OrderTip
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Grid, Image, Label } from 'semantic-ui-react'
import DeliveryIcon from 'images/icons/delivery-icon.svg'
import ReturnIcon from 'images/icons/return-icon.svg'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

export const Wrapper = styled.div`
  background-color: #E8E8E8;
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

  @media (max-width: 375px) {
    .custom-label {
      font-size: 4vw !important;
    }
  }
`

function OrderTip () {
  return (
    <Wrapper>
      <Container>
        <Grid container>
          <Grid.Row columns={2}>
            <Grid.Column>
              <FlexContainer>
                <Image alt='CLiQQ' src={DeliveryIcon} />
                <Label as='span' size='large' className='color__secondary custom-label'>
                  <FormattedMessage {...messages.storeDelivery} />
                </Label>
              </FlexContainer>
              <Label as='span' size='medium' className='color__grey text__weight--300'>
                <FormattedMessage {...messages.freeDelivery} />
              </Label>
            </Grid.Column>
            <Grid.Column>
              <FlexContainer>
                <Image alt='CLiQQ' className='return-icon' src={ReturnIcon} />
                <Label as='span' size='large' className='color__secondary custom-label'>
                  <FormattedMessage {...messages.returnPolicy} />
                </Label>
              </FlexContainer>
              <Label as='span' size='medium' className='color__grey text__weight--300'>
                <FormattedMessage {...messages.noQuestions} />
              </Label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Wrapper>
  )
}

OrderTip.propTypes = {

}

export default OrderTip
