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
  padding: 10px;
`

export const FlexContainer = styled.div`
  align-items: flex-start;
  display: flex;

  img {
    width: 40px;
    margin-right: 10px;

    &.return-icon {
      width: 30px;
    }
  }

  .medium {
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
    <Wrapper className='background__lightGrey'>
      <Container>
        <Grid container>
          <Grid.Row columns={2}>
            <Grid.Column>
              <FlexContainer>
                <Image alt='CLiQQ' src={DeliveryIcon} />
                <Label as='span' size='medium' className='color__secondary text__weight--500 custom-label'>
                  {/* <FormattedMessage {...messages.storeDelivery} /> */}
                  1 Day In-Store<br />Delivery
                </Label>
              </FlexContainer>
              <Label as='span' size='small' className='color__grey text__weight--400'>
                <FormattedMessage {...messages.freeDelivery} />
              </Label>
            </Grid.Column>
            <Grid.Column>
              <FlexContainer>
                <Image alt='CLiQQ' className='return-icon' src={ReturnIcon} />
                <Label as='span' size='medium' className='color__secondary text__weight--500 custom-label'>
                  {/* <FormattedMessage {...messages.returnPolicy} /> */}
                  CLiQQ Return<br />Policy
                </Label>
              </FlexContainer>
              <Label as='span' size='small' className='color__grey text__weight--400'>
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
