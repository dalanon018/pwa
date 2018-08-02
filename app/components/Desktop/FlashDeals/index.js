/**
*
* FlashDeals
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container, Image } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'
import PropTypes from 'prop-types'

import PlainCard from 'components/Shared/PlainCard'
import DesktopProductView from 'components/Desktop/ProductView'
import TimerWrapper from 'components/Desktop/TimerWrapper'

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
      <BannerWrapper onClick={() => changeRoute(`promos/${promo.get('promoCode')}`)} className='margin__horizontal--10 margin__bottom-positive--20'>
        { !promosLoading && <TimerWrapper promo={promo} /> }
        <PlainCard height='160'>
          {
            !promosLoading && promo.get('background')
              ? <Image className='height__inherit' src={promo.get('background')} />
              : <Image className='height__inherit' src={imageStock('Slider-Default.jpg', imgixOptions)} />
          }
        </PlainCard>
      </BannerWrapper>
      <DesktopProductView
        // virtualized={false}
        changeRoute={changeRoute}
        loader={promosLoading}
        products={promo.get('productList')}
        windowWidth={windowWidth} />
    </Container>
  )
}

FlashDeals.propTypes = {
  promo: PropTypes.object.isRequired,
  promosLoading: PropTypes.bool.isRequired,
  promosCount: PropTypes.number
}

export default FlashDeals
