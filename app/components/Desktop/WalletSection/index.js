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

// import { calculateConversionPointsToCash } from 'utils/calculation'

import PlainCard from 'components/Shared/PlainCard'
import SectionTitle from 'components/Shared/SectionTitle'
import PointsHistory from 'components/Desktop/PointsHistory'

import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'

import CliqqIcon from 'images/icons/cliqq.png'
import Banner from 'images/wallet-banner.jpg'

import messages from './messages'

export const ContentWrapper = styled(Container)`
  padding-top: 0 !important;
  padding-bottom: 20px !important;
`

export const PointsPreviewWrapper = styled.div`
  align-items: center;
  background: url(${props => props.background})no-repeat center center / cover;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  padding: 40px 14px;
  position: relative;
  width: 100%;
  // z-index: 2;
`

export const UserPointsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 15px;

  img {
    width: 28px;
  }

  .my-points {
    font-size: 45px !important;
    line-height: inherit;
    margin-left: 10px;
  }
`

class WalletSection extends React.PureComponent {
  _displayTransactionsItems = () => {
    const {
      intl,
      lazyload,
      transactions,
      transactionsLoading,
      wallet
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
                    <PointsPreviewWrapper background={Banner} className='text__align--center'>
                      <Label as='p' className='text__weight--500' basic size='huge' >
                        <FormattedMessage {...messages.currentPoints} />
                      </Label>
                      <Label as='p' className='color__grey text__weight--400' basic size='big' >
                        <FormattedMessage
                          {...messages.asOf}
                          values={{date: moment().format('LL')}} />
                      </Label>
                      <UserPointsWrapper>
                        <Image src={CliqqIcon} alt='CLiQQ' />
                        <Label as='span' className='my-points color__teal text__weight--700' size='massive' >
                          { currentPoints.toLocaleString() }
                        </Label>
                      </UserPointsWrapper>
                      {
                        // currentPoints ? (
                        //   <div>
                        //     <Label as='div' className='text__weight--500 margin__top-positive--20 padding__none' size='large' >
                        //       <FormattedMessage
                        //         {...messages.worthPointsCash}
                        //         values={{
                        //           amount: calculateConversionPointsToCash({points: currentPoints})
                        //         }}
                        //       />
                        //     </Label>
                        //     <Label as='div' className='text__weight--500 padding__none' size='large' >
                        //       <FormattedMessage {...messages.worthPointsCashSub} />
                        //     </Label>
                        //   </div>
                        // ) : null
                      }
                    </PointsPreviewWrapper>
                  </PlainCard>
                }
              </Grid.Row>
              <Grid.Row>
                <div className='margin__top-positive--20'>
                  <SectionTitle colorGrey title={intl.formatMessage(messages.walletTransactionsTitle)} />
                </div>
                <Label as='p' className='text__weight--400 margin__top-negative--10 margin__bottom--none' basic size='large' >
                  <FormattedMessage {...messages.pointsInfo} />
                </Label>
              </Grid.Row>
            </Grid>
          </Container>
          <PointsHistory loader={transactionsLoading} transactions={transactions} />
        </div>
      )
    }

    return null
  }

  render () {
    const {
      lazyload,
      transactionsLoading,
      _displayEmptyLoadingIndicator
    } = this.props

    return (
      <div>
        <ContentWrapper>
          <div className='padding__medium'>
            <InfiniteWrapper
              hasMoreData={lazyload}
              isLoading={transactionsLoading}
            >
              { _displayEmptyLoadingIndicator() }
              { this._displayTransactionsItems() }
            </InfiniteWrapper>
          </div>
        </ContentWrapper>
      </div>
    )
  }
}

WalletSection.propTypes = {
  lazyload: PropTypes.bool.isRequired,
  transactions: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  transactionsLoading: PropTypes.bool.isRequired,
  _displayEmptyLoadingIndicator: PropTypes.func.isRequired,
  _displayTransactionsItems: PropTypes.func
}

export default WalletSection
