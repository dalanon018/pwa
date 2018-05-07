/**
*
* OrderTipModal
*
*/

import React from 'react'
import styled from 'styled-components'
import { Button, Modal, Image, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import TextButton from 'components/Shared/CloseButton'

import PopupIconOne from 'images/icons/truck-icon.png'
import ModalHeaderBg from 'images/modal-bg-lightgrey.png'
import BannerMap from 'images/map-banner.jpg'

const DetailsWrapper = styled.div`
  margin: 10px;
`

const ButtonWrapper = styled.div`
  text-align: center;
`

const BannerHeader = styled.div`
  background: url(${props => props.background}) no-repeat top right / cover;
  height: ${props => props.bannerMap ? '150px' : '75px'};
  margin-bottom: 40px;
  position: relative;
  width: 100%;

  @media (min-width: 320px) {
    border-radius: 4px 4px 0 0;
  }

  @media (min-width: 768px) {
    border-radius: 30px 30px 0 0;
  }

  .image {
    // height: 35px;
    width: 40px;
  }

  span {
    align-items: center;
    background-color: ${props => props.iconBg ? props.iconBg : '#229D90'};
    border-radius: 50px;
    display: flex;
    height: 80px;
    justify-content: center;
    left: 50%;
    margin-right: -50%;
    margin: 0 auto;
    position: absolute;
    width: 80px;
    z-index: 1;

    ${props => props.bannerMap ? 'top: 50%;transform: translate(-50%, -50%);' : 'bottom: -35px;transform: translate(-50%);'};

    ${props => props.bannerMap &&
      `
      &:after {
        border-color: #229d90 transparent transparent transparent;
        border-style: solid;
        border-width: 15px 12.5px 0 12.5px;
        bottom: -12px;
        content: '';
        height: 0;
        left: 50%;
        position: absolute;
        transform: translate(-50%);
        width: 0;
        width: 0;
      }
      `
    }
  }
`

const ModalContainer = styled.div`
  border-radius: 30px;

  button {
    text-transform: uppercase !important;
  }

  @media (min-width: 768px) {
    .content {
      padding: 30px 50px !important;
    }
  }

  @media (min-width: 320px) {
    .content {
      padding: 15px 25px 0;
    }
  }
`

function OrderTipModal ({intl, toggle, close, bannerMap, changeRoute}) { // eslint-disable-line react/prefer-stateless-function
  return (
    <Modal
      onClose={close}
      open={toggle}
      /* size={modalSize} */
    >
      <ModalContainer>
        <BannerHeader background={bannerMap ? BannerMap : ModalHeaderBg} bannerMap={bannerMap}>
          <span>
            <Image alt='CLiQQ' src={PopupIconOne} />
          </span>
        </BannerHeader>
        <Modal.Content>
          <Label className='text__weight--500 center' as='p' size='big'>
            <FormattedMessage {...messages.header} />
          </Label>
          <DetailsWrapper>
            <Label className='text__weight--400 center' as='p' size='medium'>
              {
                bannerMap
                ? <FormattedMessage {...messages.descriptionTwo} />
                : <FormattedMessage {...messages.descriptionOne} />
              }
            </Label>
          </DetailsWrapper>
          <ButtonWrapper>
            <Button
              onClick={close}
              primary
              className='text__weight--700'
            >
              <FormattedMessage {...messages.confirmButton} />
            </Button>
            <div onClick={() => changeRoute('/faq')}>
              <TextButton text={intl.formatMessage(messages.learnMore)} close={close} />
            </div>
          </ButtonWrapper>
        </Modal.Content>
      </ModalContainer>
    </Modal>
  )
}

OrderTipModal.propTypes = {
  bannerMap: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default OrderTipModal
