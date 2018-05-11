/**
*
* FlashDeals
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Image, Grid } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'
import PropTypes from 'prop-types'

// import messages from './messages'

import PlainCard from 'components/Shared/PlainCard'
import ProductView from 'components/Shared/ProductView'

// import SectionTitle from 'components/Mobile/HomeSectionTitle'
import TimerWrapper from 'components/Mobile/TimerWrapper'

export const BannerWrapper = styled.div`
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
      <Grid container>
        {
          windowWidth < 1024 &&
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
        }
        <Grid.Row>
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
  promo: PropTypes.object.isRequired,
  promosLoading: PropTypes.bool.isRequired,
  promosCount: PropTypes.number
}

export default FlashDeals
