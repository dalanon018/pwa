/**
*
* ModalWithHeader
*
*/

import React from 'react'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import { Modal, Image } from 'semantic-ui-react'

import Button from 'components/Button'
import TextButton from 'components/CloseButton'

import BannerBg from 'images/modal-bg-orange.png'
import MobileIcon from 'images/icons/mobile-icon.svg'

import {
  BannerHeader,
  TextWrapper,
  TitleHead,
  ButtonWrapper
} from './styles'

function ModalWithHeader () {
  return (
    <Modal
      trigger={<Button onClick={() => {}}>Show Modal</Button>}
      open
      size='small'
    >
      <BannerHeader background={BannerBg}>
        <span>
          <Image src={MobileIcon} />
        </span>
      </BannerHeader>
      <Modal.Content>
        <TextWrapper>
          <TitleHead>
            <span>Lorem ipsum dolor</span>
          </TitleHead>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt voluptatem, ducimus molestiae mollitia aliquam quidem repellat blanditiis ipsam dignissimos hic quae sint quibusdam magnam in aperiam nisi fugiat expedita inventore.</p>
        </TextWrapper>
        <ButtonWrapper>
          <Button primary fluid onClick={() => {}}>Submit</Button>
          <TextButton text='Go to somewhere' onClick={() => {}} />
        </ButtonWrapper>
      </Modal.Content>
    </Modal>
  )
}

ModalWithHeader.propTypes = {

}

export default ModalWithHeader
