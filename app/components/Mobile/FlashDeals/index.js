/**
*
* FlashDeals
*
*/

import React from 'react'
// import styled from 'styled-components';
import { Container, Image, Grid } from 'semantic-ui-react'
import { imageStock } from 'utils/image-stock'

// import { FormattedMessage } from 'react-intl'
import messages from './messages'

import PlainCard from 'components/Mobile/PlainCard'
import ProductView from 'components/Mobile/ProductView'

import SectionTitle from 'components/Mobile/HomeSectionTitle'

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
        <Grid.Row>
          <Grid.Column>
            <div>
              <SectionTitle
                title={intl.formatMessage(messages.header)}
                link={`/promos/${promo.get('promoCode')}`} />
              <PlainCard>
                <Image src={imageStock('Slider-Default.jpg', imgixOptions)} />
              </PlainCard>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <ProductView changeRoute={changeRoute} loader={promosLoading} products={promo.get('productList')} windowWidth={windowWidth} />
        </Grid.Row>
      </Grid>
    </Container>
  )
}

FlashDeals.propTypes = {

}

export default FlashDeals
