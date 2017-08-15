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
import EmptyImage from 'images/broken-image.jpg'

import EmptyDataBlock from 'components/EmptyDataBlock'

import { Image } from 'semantic-ui-react'
import { BannerWrapper } from './styles'

function BannerStaticPromos ({
  loader
}) {
  if (!loader) {
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
  } else {
    return (
      <BannerWrapper background={EmptyImage}>
        <EmptyDataBlock>
          <div className='item loader-image' />
        </EmptyDataBlock>
        <EmptyDataBlock>
          <div className='item loader-image' />
        </EmptyDataBlock>
      </BannerWrapper>
    )
  }
}

BannerStaticPromos.propTypes = {

}

export default BannerStaticPromos
