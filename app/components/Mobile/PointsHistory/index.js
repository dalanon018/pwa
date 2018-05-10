/**
*
* PointsHistory
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Label, Image, Grid } from 'semantic-ui-react'
import moment from 'moment'
import PropTypes from 'prop-types'

import PlainCard from 'components/Shared/PlainCard'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import CliqqIcon from 'images/icons/cliqq.png'

export const PointsHistoryWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 14px;
  width: 100%;
`

export const AdjustedPoints = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-right: 5px;

  img {
    margin: 0 5px;
    min-width: 15px;
    width: 15px;
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
                            {
                              transaction.get('type') === 'plus'
                              ? <FormattedMessage
                                {...messages.youClaimed}
                                values={{item: transaction.getIn(['product', 'name'])}} />
                              : <FormattedMessage
                                {...messages.youBought}
                                values={{item: transaction.getIn(['product', 'name'])}} />
                            }
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
                            <Image src={CliqqIcon} alt='CLiQQ' />
                            <Label as='p' basic className='color__teal margin__none text__weight--700' size='huge' >
                              {transaction.get('points') && parseFloat(transaction.get('points')).toLocaleString()}
                            </Label>
                          </AdjustedPoints>
                          : <AdjustedPoints className='text__align--right'>
                            <Label as='p' basic className='color__primary margin__none text__weight--700' size='huge' >
                              -
                            </Label>
                            <Image src={CliqqIcon} alt='CLiQQ' />
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
  changeRoute: PropTypes.func,
  loader: PropTypes.bool,
  transactions: PropTypes.object
}

export default PointsHistory
