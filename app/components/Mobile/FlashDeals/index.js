/**
*
* FlashDeals
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Image, Grid } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'

import messages from './messages'

import PlainCard from 'components/Mobile/PlainCard'
import ProductView from 'components/Mobile/ProductView'

import SectionTitle from 'components/Mobile/HomeSectionTitle'
import TimerWrapper from 'components/Mobile/TimerWrapper'

const BannerWrapper = styled.div`
  position: relative;
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
          link={`/flash-deals`} />
      </div>
      <Grid container>
        <Grid.Row className='padding__none--vertical'>
          <Grid.Column>
            <BannerWrapper onClick={() => changeRoute(`promos/${promo.get('promoCode')}`)}>
              { !promosLoading && <TimerWrapper promo={promo} /> }
              <PlainCard height='160'>
                {
                  !promosLoading && promo.get('background')
                  ? <Image className='height__inherit' src={promo.get('background')} />
                  : <Image className='height__inherit' src={imageStock('Slider-Default.jpg', imgixOptions)} />
                }
              </PlainCard>
            </BannerWrapper>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <ProductView
            virtualized={false}
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
