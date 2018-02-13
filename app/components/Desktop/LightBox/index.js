/**
*
* LightBox
*
*/

import React from 'react'
import styled from 'styled-components'

import { Image, Icon } from 'semantic-ui-react'

const LightBoxWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  transition: linear 3s;
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
  top: -40px;
  right: -60px;
  cursor: pointer;
`

function LightBox ({ image, close }) {
  return (
    <LightBoxWrapper>
      <ImageWrapper>
        <Image src={image} alt='CLiQQ' />
        <IconWrapper>
          <Icon onClick={() => close(null)} name='close' size='huge' color='orange' />
        </IconWrapper>
      </ImageWrapper>
    </LightBoxWrapper>
  )
}

LightBox.propTypes = {

}

export default LightBox
