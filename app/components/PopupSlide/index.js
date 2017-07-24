/**
*
* PopupSlide
*
*/

import React from 'react'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import Button from 'components/Button'
import CloseButton from 'components/CloseButton'
import Input from 'components/InputField'
import Checkbox from 'components/CheckboxField'

import BannerBg from 'images/modal-bg-orange.png'
import MobileIcon from 'images/icons/mobile-icon.svg'

import { Image } from 'semantic-ui-react'

import {
  PopupWrapper,
  PopupContainer,
  InputWrapper,
  BannerHeader,
  TitleHead,
  TextWrapper,
  PopupContent } from './styles'

function PopupSlide ({
  toggle,
  onClose
}) {
  const label = `I have read and accepted the `
  return (
    <PopupWrapper toggle={toggle}>
      <BannerHeader background={BannerBg}>
        <span>
          <Image src={MobileIcon} />
        </span>
      </BannerHeader>
      <PopupContainer>
        <PopupContent>
          <TextWrapper>
            <TitleHead>Register your number</TitleHead>
            <p>We need your mobile number to continue.</p>
          </TextWrapper>
          <InputWrapper>
            <span>+63</span>
            <Input fluid />
          </InputWrapper>
          <Checkbox className='margin__bottom-positive--20' label={label} />
          <Button primary fluid onClick={() => {}}>SUBMIT</Button>
          <CloseButton close={onClose} />
        </PopupContent>
      </PopupContainer>
    </PopupWrapper>
  )
}

PopupSlide.propTypes = {

}

export default PopupSlide
