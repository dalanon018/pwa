/**
*
* WalletSection
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { FormattedMessage } from 'react-intl'
import {
  always,
  compose,
  equals,
  ifElse,
  multiply,
  propOr
} from 'ramda'
import { Container, Label, Image, Grid } from 'semantic-ui-react'

import { calculateConversionPointsToCash } from 'utils/calculation'

import PlainCard from 'components/Shared/PlainCard'
import PointsHistory from 'components/Mobile/PointsHistory'
import MobileFooter from 'components/Mobile/Footer'
import OrderTip from 'components/Mobile/OrderTip'

import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'

import CliqqIcon from 'images/icons/cliqq.png'

import messages from './messages'

export const ContentWrapper = styled(Container)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;
`

export const PointsPreviewWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  padding: 30px 14px;
  position: relative;
  width: 100%;
  z-index: 2;

  &:before {
    border-color: transparent transparent transparent #F9F9F9;
    border-style: solid;
    border-width: 170px 0 0 335px;
    bottom: 0;
    content: '';
    height: 0;
    height: 100%;
    left: 0;
    opacity: 0.7;
    position: absolute;
    width: 0;
    z-index: -1;
  }
`

export const UserPointsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 35px;
  }

  .my-points {
    font-size: 36px !important;
    line-height: inherit;
    margin-left: 8px;
  }
`

class WalletSection extends React.PureComponent {
  _displayTransactionsItems = () => {
    const {
      lazyload,
      transactions,
      transactionsLoading,
      wallet,
      changeRoute
    } = this.props

    const currentPoints = ifElse(
      compose(equals(0), propOr(0, 'size')),
      always(0),
      (wallet) => multiply(1, wallet.get('currentPoints')) // multiply to convert automatically to parseFloat
    )(wallet)

    if (lazyload === false) {
      // const getLatestTransaction = transactions.first() && transactions.first().get('datetime')
      return (
        <div>
          <Container className='padding__none--vertical'>
            <Grid padded>
              <Grid.Row className='padding__none--vertical'>
                {
                  <PlainCard>
                    <PointsPreviewWrapper className='text__align--center'>
                      <Label as='p' className='text__weight--500' size='large' >
                        <FormattedMessage {...messages.currentPoints} />
                      </Label>
                      <UserPointsWrapper>
                        <Image src={CliqqIcon} alt='CLiQQ' />
                        <Label as='span' className='my-points color__teal text__weight--700' size='massive' >
                          { currentPoints.toLocaleString() }
                        </Label>
                      </UserPointsWrapper>
                      <Label as='p' className='color__grey text__weight--400' size='medium' >
                        <FormattedMessage
                          {...messages.asOf}
                          values={{date: moment().format('LL')}} />
                      </Label>
                      {
                        currentPoints ? (
                          <div>
                            <Label as='div' className='text__weight--500 margin__top-positive--20 padding__none' size='large' >
                              <FormattedMessage
                                {...messages.worthPointsCash}
                                values={{
                                  amount: calculateConversionPointsToCash({points: currentPoints})
                                }}
                              />
                            </Label>
                            <Label as='div' className='text__weight--500 padding__none' size='large' >
                              <FormattedMessage {...messages.worthPointsCashSub} />
                            </Label>
                          </div>
                        ) : null
                      }
                    </PointsPreviewWrapper>
                  </PlainCard>
                }
              </Grid.Row>
            </Grid>
          </Container>
          <PointsHistory loader={transactionsLoading} transactions={transactions} changeRoute={changeRoute} />
        </div>
      )
    }

    return null
  }

  render () {
    const {
      lazyload,
      transactionsLoading,

      _displayHeaderTransactions,
      _displayEmptyLoadingIndicator
    } = this.props

    return (
      <div>
        <ContentWrapper>
          <div>
            <InfiniteWrapper
              hasMoreData={lazyload}
              isLoading={transactionsLoading}
            >

              { _displayHeaderTransactions() }
              { this._displayTransactionsItems() }
              { _displayEmptyLoadingIndicator() }
            </InfiniteWrapper>
          </div>
        </ContentWrapper>

        <OrderTip />

        <MobileFooter />
      </div>
    )
  }
}

WalletSection.propTypes = {
  lazyload: PropTypes.bool.isRequired,
  transactions: PropTypes.object.isRequired,
  transactionsLoading: PropTypes.bool.isRequired,
  wallet: PropTypes.object.isRequired,

  _displayHeaderTransactions: PropTypes.func.isRequired,
  _displayEmptyLoadingIndicator: PropTypes.func.isRequired,
  _displayTransactionsItems: PropTypes.func
}

export default WalletSection
