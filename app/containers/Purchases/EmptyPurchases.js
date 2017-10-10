import React from 'react'
import styled from 'styled-components'

import { Grid, Label, Image } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

import EmptyPurchase from 'images/icons/sad-icon.svg'
import messages from './messages'

const EmptyPurchaseWrapper = styled.div`
  align-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  height: 72vh;
  padding: 0 30px;

  .image {
    margin: 20px auto;
    width: 80px;
  }
`

const EmptyPurchases = () => (
  <Grid padded>
    <Grid.Row centered>
      <Grid.Column textAlign='center'>
        <EmptyPurchaseWrapper>
          <Image src={EmptyPurchase} />
          <Label className='text__roboto--light' as='p' basic size='large'>
            <FormattedMessage {...messages.emptyPurchases} />
          </Label>
        </EmptyPurchaseWrapper>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default EmptyPurchases