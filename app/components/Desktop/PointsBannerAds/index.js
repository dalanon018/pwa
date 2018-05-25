/**
*
* PointsBannerAds
*
*/

import React from 'react'
import { Container, Image } from 'semantic-ui-react'
// import styled from 'styled-components';

import PlainCard from 'components/Shared/PlainCard'
import Banner from 'images/points-banner.jpg'

function PointsBannerAds ({ changeRoute }) {
  return (
    <Container>
      <div className='padding__horizontal--10 cursor__pointer' onClick={() => changeRoute('/wallet')}>
        <PlainCard borderRadius>
          <Image src={Banner} alt='CLiQQ' />
        </PlainCard>
      </div>
    </Container>
  )
}

PointsBannerAds.propTypes = {

}

export default PointsBannerAds
