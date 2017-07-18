/**
*
* BannerSlider
*
*/

import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

import EmptyDataBlock from 'components/EmptyDataBlock'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import {
  BannerSliderWrapper
} from './styles'

import EmptyImage from 'images/broken-image.jpg'
import SampleBanner from 'images/test-images/sample_banner.jpg'

const ImageWrapper = styled.div`
  background: url(${props => EmptyImage}) no-repeat center center / cover;
  height: 200px;
  width: 100%;
`

function BannerSlider ({loader}) {
  return <HandleBlock loader={loader} />
}

const DefaultState = () => {
  return (
    <EmptyDataBlock>
      <ImageWrapper />
    </EmptyDataBlock>
  )
}

const HandleBlock = ({loader}) => {
  let block
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  if (!loader) {
    block = <DefaultState loader={loader} />
  } else {
    block = <BannerSliderWrapper>
      <Slider {...settings}>
        <div><Image src={SampleBanner} /></div>
        <div><Image src={SampleBanner} /></div>
      </Slider>
    </BannerSliderWrapper>
  }
  return block
}

BannerSlider.propTypes = {

}

export default BannerSlider