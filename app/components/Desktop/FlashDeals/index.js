/**
*
* FlashDeals
*
*/

import React from 'react'
import styled from 'styled-components'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import DesktopProductView from 'components/Desktop/ProductView'

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
  return (
    <Container>
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
