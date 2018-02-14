/**
*
* LightBox
*
*/

import React from 'react'
import styled from 'styled-components'

import { Image } from 'semantic-ui-react'
import CloseButton from 'images/icons/close.svg'
import ProductSlider from 'components/Desktop/BannerSlider'

const LightBoxWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
`

const ImageWrapper = styled.div`
  background-color: #FFFFFF;
  border-radius: 3px;
  border: 2px solid #EBEBEB;
  height: 600px;
  left: 50%;
  padding: 30px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;

  img {
    width: 100% !important;
    height: 100%;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  img {
    width: 15px !important;
  }
`

function LightBox ({
  images,
  close,
  active,
  loader
}) {
  return (
    <LightBoxWrapper>
      <ImageWrapper>
        <ProductSlider
          images={images}
          active={active}
          loader={loader} />
        <IconWrapper>
          <Image src={CloseButton} onClick={() => close(null)} />
        </IconWrapper>
      </ImageWrapper>
    </LightBoxWrapper>
  )
}

LightBox.propTypes = {

}

export default LightBox
