/**
*
* BannerStaticPromos
*
*/

import React from 'react'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import sampleBanner from 'images/test-images/sample-banner-promo.png'

import { Image } from 'semantic-ui-react'
import { BannerWrapper } from './styles'

function BannerStaticPromos () {
  return (
    <BannerWrapper>
      <div className='item'>
        <Image src={sampleBanner} />
      </div>
      <div className='item'>
        <Image src={sampleBanner} />
      </div>
    </BannerWrapper>
  )
}

BannerStaticPromos.propTypes = {

}

export default BannerStaticPromos
