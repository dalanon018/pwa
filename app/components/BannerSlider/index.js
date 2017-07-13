/**
*
* BannerSlider
*
*/

import React from 'react'
// import styled from 'styled-components'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import {
  BannerSliderWrapper
} from './styles'

function BannerSlider () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <BannerSliderWrapper className='container'>
      <Slider {...settings}>
        <div><Image src='http://placekitten.com/g/450/200' /></div>
        <div><Image src='http://placekitten.com/g/450/200' /></div>
      </Slider>
    </BannerSliderWrapper>
  )
  // return (
  //   <div>
  //     <FormattedMessage {...messages.header} />
  //   </div>
  // );
}

BannerSlider.propTypes = {

}

export default BannerSlider
