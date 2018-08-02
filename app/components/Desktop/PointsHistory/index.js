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
  padding: 28px;
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

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ArrowUp = styled.div`
  border-color: transparent transparent #229D90 transparent;
  border-style: solid;
  border-width: 0 8px 10px 8px;
  height: 0;
  margin-right: 30px;
  width: 0;
`

export const ArrowDown = styled.div`
  border-color: #FF4813 transparent transparent transparent;
  border-style: solid;
  border-width: 10px 8px 0 8px;
  height: 0;
  margin-right: 30px;
  width: 0;
`

function PointsHistory ({
  loader,
  transactions
}) {
  return (
    <div>
      {
        transactions && transactions.size >= 1 && !loader &&
        <Container className='padding__top--none'>
          <Grid padded className='padding__top--none'>
            <Grid.Row>
              <PlainCard>
                {
                  transactions && transactions.map((transaction, index) => {
                    return (
                      <PointsHistoryWrapper key={index} className='border_bottom__one--light-grey'>
                        <LeftWrapper className='text__align--left'>
                          <div>
                            {
                              transaction.get('type') === 'plus'
                                ? <ArrowUp /> : <ArrowDown />
                            }
                          </div>
                          <div>
                            <Label as='p' basic className='margin__none text__weight--500' size='large' >
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
                            <Label as='p' basic className='color__grey text__weight--400 margin__top-positive--10 margin__bottom--none' size='large' >
                              {`${moment(transaction.get('datetime')).format('L')} ${moment(transaction.get('datetime')).format('LT')}`}
                            </Label>
                          </div>
                        </LeftWrapper>
                        <AdjustedPoints className='text__align--right'>
                          <Image src={CliqqIcon} alt='CLiQQ' />
                          <Label as='p' basic className={`${transaction.get('type') === 'plus' ? 'color__teal' : 'color__primary'} margin__none text__weight--700`} size='massive' >
                            {transaction.get('points') && parseFloat(transaction.get('points')).toLocaleString()}
                          </Label>
                        </AdjustedPoints>
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
  loader: PropTypes.bool,
  transactions: PropTypes.object
}

export default PointsHistory
