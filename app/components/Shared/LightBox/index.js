/**
*
* LightBox
*
*/

import React from 'react'
import styled from 'styled-components'

import { Image } from 'semantic-ui-react'
import CloseButton from 'images/icons/close-orange.svg'
import MobileSlider from 'components/Mobile/BannerSlider'
import DesktopSlider from 'components/Desktop/BannerSlider'
import AccessView from 'components/Shared/AccessMobileDesktopView'

const LightBoxWrapper = styled.div`
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  overflow: auto;

  ul.slick-dots {
    position: absolute;
  }
`

const BackgroundLay = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`

const ImageWrapper = styled.div`
  background-color: #FFFFFF;
  border-radius: 3px;
  border: 2px solid #EBEBEB;
  left: 50%;
  // padding: 30px;
  position: absolute;
  // top: 50%;
  // transform: translate(-50%, -50%);
  top: 30px;
  transform: translate(-50%);
  width: 95%;

  img {
    width: 100% !important;
    height: 100%;
  }

  @media (min-width: 1024px) {
    // height: 650px;
    padding: 30px;
    width: 650px;
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
    <div className='position__relative'>
      <LightBoxWrapper>
        <BackgroundLay onClick={() => close(null)} />
        <ImageWrapper>
          <AccessView
            mobileView={
              <MobileSlider
                images={images}
                active={active}
                loader={loader} />
            }
            desktopView={
              <DesktopSlider
                images={images}
                active={active}
                loader={loader} />
            }
          />

          <IconWrapper>
            <Image src={CloseButton} onClick={() => close(null)} />
          </IconWrapper>
        </ImageWrapper>
      </LightBoxWrapper>
    </div>
  )
}

LightBox.propTypes = {

}

export default LightBox
