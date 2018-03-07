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
// import messages from './messages'

import PlainCard from 'components/Mobile/PlainCard'
import ProductView from 'components/Mobile/ProductView'

function FlashDeals ({
  promos,
  promosLoading,
  promosCount,
  windowWidth,
  changeRoute
}) {
  const imgixOptions = {
    w: 800,
    h: 400,
    fit: 'clamp',
    auto: 'compress',
    q: 35,
    lossless: 0
  }

  let promoData = []
  promos.map(i => { promoData = i.get('productList') })

  console.log('promoData', promoData.toJS())

  return (
    <Container>
      <Grid container>
        <Grid.Row>
          <Grid.Column>
            <PlainCard>
              <Image src={imageStock('Slider-Default.jpg', imgixOptions)} />
            </PlainCard>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <ProductView changeRoute={changeRoute} loader={promosLoading} products={promoData} windowWidth={windowWidth} />
        </Grid.Row>
      </Grid>
    </Container>
  )
}

FlashDeals.propTypes = {

}

export default FlashDeals
