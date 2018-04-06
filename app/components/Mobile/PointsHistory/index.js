/**
*
* PointsHistory
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Label, Image, Grid } from 'semantic-ui-react'
import moment from 'moment'

import PlainCard from 'components/Mobile/PlainCard'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import TealIcon from 'images/icons/plain-cliqq-teal-icon.svg'
import PlainIcon from 'images/icons/plain-cliqq-icon.svg'

const PointsHistoryWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 14px;
  width: 100%;
`

const AdjustedPoints = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-right: 5px;

  img {
    width: 15px;
    margin: 0 5px;
  }
`

function PointsHistory ({
  changeRoute,
  loader,
  transactions
}) {
  return (
    <div>
      {
        transactions && transactions.size >= 1 && !loader &&
        <Container>
          <Grid padded>
            <Grid.Row>
              <Label as='p' className='color__grey text__weight--500 text__align--left' size='large' >
                <FormattedMessage {...messages.walletTransactionsTitle} />
              </Label>
              <PlainCard>
                {
                  transactions && transactions.map((transaction, index) => {
                    return (
                      <PointsHistoryWrapper key={index} className='border_bottom__one--light-grey'>
                        <div className='text__align--left'>
                          <Label as='p' basic className='margin__none text__weight--400' size='small' >
                            <FormattedMessage
                              {...messages.youBought}
                              values={{item: transaction.getIn(['product', 'name'])}} />
                          </Label>
                          <Label as='p' basic className='color__grey text__weight--400 margin__top-positive--10' size='mini' >
                            {`${moment(transaction.get('datetime')).format('L')} ${moment(transaction.get('datetime')).format('LT')}`}
                          </Label>
                        </div>
                        {
                          transaction.get('type') === 'plus'
                          ? <AdjustedPoints className='text__align--right'>
                            <Label as='p' basic className='color__teal margin__none text__weight--700' size='huge' >
                              +
                            </Label>
                            <Image src={TealIcon} alt='CLiQQ' />
                            <Label as='p' basic className='color__teal margin__none text__weight--700' size='huge' >
                              {transaction.get('points') && parseFloat(transaction.get('points')).toLocaleString()}
                            </Label>
                          </AdjustedPoints>
                          : <AdjustedPoints className='text__align--right'>
                            <Label as='p' basic className='color__primary margin__none text__weight--700' size='huge' >
                              -
                            </Label>
                            <Image src={PlainIcon} alt='CLiQQ' />
                            <Label as='p' basic className='color__primary margin__none text__weight--700' size='huge' >
                              {transaction.get('points') && parseFloat(transaction.get('points')).toLocaleString()}
                            </Label>
                          </AdjustedPoints>
                        }
                      </PointsHistoryWrapper>
                    )
                  })
                }
              </PlainCard>
            </Grid.Row>
          </Grid>
        </Container>
      }
    </div>
  )
}

PointsHistory.propTypes = {

}

export default PointsHistory
