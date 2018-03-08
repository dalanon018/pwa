/**
*
* FlashDeals
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Image, Grid } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import PlainCard from 'components/Mobile/PlainCard'
import ProductView from 'components/Mobile/ProductView'

import SectionTitle from 'components/Mobile/HomeSectionTitle'
import Timer from 'components/Shared/CountDownTimer'

const BannerWrapper = styled.div`
  position: relative;
`

const TimerWrapper = styled.div`
  background: #FF4813;
  border-radius: 3px 0 0 3px;
  bottom: 12px;
  min-width: 180px;
  padding: 5px;
  position: absolute;
  right: 0;
  z-index: 1;
`

const ContentWrapper = styled.div`
  align-items: center;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
`

const LabelWrapper = styled.div`
  font-size: 10px;
  line-height: 10px;
  width: 60px;
`

const CountWrapper = styled.div`
  font-size: 20px;
`

function FlashDeals ({
  promo,
  promosLoading,
  promosCount,
  windowWidth,
  changeRoute,
  intl
}) {
  const imgixOptions = {
    w: 800,
    h: 400,
    fit: 'clamp',
    auto: 'compress',
    q: 35,
    lossless: 0
  }

  return (
    <Container>
      <div className='margin__bottom-positive--20'>
        <SectionTitle
          title={intl.formatMessage(messages.header)}
          link={`/promos/${promo.get('promoCode')}`} />
      </div>
      <Grid container>
        <Grid.Row className='padding__none--vertical'>
          <Grid.Column>
            <BannerWrapper>
              {
                !promosLoading &&
                <TimerWrapper>
                  <ContentWrapper>
                    <LabelWrapper>
                      <FormattedMessage {...messages.endsIn} />
                    </LabelWrapper>
                    <CountWrapper>
                      <Timer endDate={promo.get('thruDate')} />
                    </CountWrapper>
                  </ContentWrapper>
                </TimerWrapper>
              }
              <PlainCard>
                {
                  !promosLoading && promo.get('background')
                  ? <Image src={promo.get('background')} />
                  : <Image src={imageStock('Slider-Default.jpg', imgixOptions)} />
                }

              </PlainCard>
            </BannerWrapper>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <ProductView
            changeRoute={changeRoute}
            loader={promosLoading}
            products={promo.get('productList')}
            windowWidth={windowWidth} />
        </Grid.Row>
      </Grid>
    </Container>
  )
}

FlashDeals.propTypes = {

}

export default FlashDeals
