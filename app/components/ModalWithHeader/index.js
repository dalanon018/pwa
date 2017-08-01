/**
*
* ModalWithHeader
*
*/

import React from 'react'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import messages from './messages'

import { Modal, Image } from 'semantic-ui-react'

import Button from 'components/Button'
import TextButton from 'components/CloseButton'

import OrangeBackground from 'images/modal-bg-orange.png'
import RedBackground from 'images/modal-bg-red.png'

import StoreIcon from 'images/icons/ready-icon.svg'
import PaperBagIcon from 'images/icons/claimed-icon.svg'
// import CashierIcon from 'images/icons/paid-icon.svg'
import WarningIcon from 'images/icons/warning-icon.svg'
import NoteIcon from 'images/icons/confirmation-icon.svg'
// import StarIcon from 'images/icons/star-icon.svg'

import {
  STATUSES
} from 'containers/Buckets/constants'

import {
  BannerHeader,
  TextWrapper,
  TitleHead,
  ButtonWrapper
} from './styles'

const receipt = {
  'trackingNumber': '344760497230963792',
  'claimExpiry': '2017-08-13 00:17:08',
  'currency': 'CASH',
  'dateCreated': '2017-07-20 16:17:34',
  'amount': '450.00',
  'quantity': '1',
  'mobileNumber': '09052720567',
  'status': 'CLAIMED',
  'cliqqCode': '0001',
  'imageUrl': 'http://ic1.maxabout.us/mobiles//G/2014/8/gionee-ctrl-v4s-front-rear-view.jpg',
  'brandLogo': 'http://ic1.maxabout.us/mobiles//G/2014/8/gionee-ctrl-v4s-front-rear-view.jpg',
  'name': 'All Day Backpack | (wine)'
}

const ComponentDetail = components => component => key =>
 key in components ? components[key] : component

const ModalImages = ({ status }) => {
  return ComponentDetail({
    RESERVED: {
      banner: OrangeBackground,
      icon: NoteIcon
    },
    UNPAID: {
      banner: RedBackground,
      icon: WarningIcon,
      iconBg: '#EB1E25'
    },
    CONFIRMED: {
      banner: OrangeBackground,
      icon: StoreIcon
    },
    DELIVERED: {
      banner: OrangeBackground,
      icon: StoreIcon
    },
    CLAIMED: {
      banner: OrangeBackground,
      icon: PaperBagIcon
    },
    UNCLAIMED: {
      banner: RedBackground,
      icon: WarningIcon,
      iconBg: '#EB1E25'
    },
    INTRANSIT: {
      banner: RedBackground,
      icon: WarningIcon,
      iconBg: '#EB1E25'
    }
  })(null)(status)
}

const ModalTitle = ({ status, receipt }) => {
  return ComponentDetail({
    RESERVED: (
      <FormattedMessage {...messages.reservedTitle} />
    ),
    UNPAID: (
      <FormattedMessage {...messages.unpaidTitle} />
    ),
    CONFIRMED: (
      <FormattedMessage {...messages.confirmedTitle} />
    ),
    DELIVERED: (
      <FormattedMessage {...messages.deliveredTitle} />
    ),
    CLAIMED: (
      <FormattedMessage {...messages.claimedTitle} />
    ),
    UNCLAIMED: (
      <FormattedMessage {...messages.unclaimedTitle} />
    )
  })(null)(status)
}

const ModalDescription = ({ status, receipt }) => {
  return ComponentDetail({
    RESERVED: (
      <FormattedMessage
        id='confirmedDescription'
        defaultMessage={`Are you happy with these options? You will not be able to edit once you proceed. For Cash on Delivery, please pay upon delivery of item within 24 hours.`}
        values={{name: receipt.status}} />
    ),
    UNPAID: (
      <FormattedMessage
        id='unclaimedDescription'
        defaultMessage={`Oh no! You were not able to pay within the hour. Would you like to reorder {name}? You will have another hour to pay for you item.`}
        values={{name: <b>{receipt.name}</b>}} />
    ),
    CONFIRMED: (
      <FormattedMessage
        id='confirmedDescription'
        defaultMessage={`Are you happy with these options? You will not be able to edit once you proceed. For Cash on Delivery, please pay upon delivery of item within 24 hours.`}
        values={{name: receipt.status}} />
    ),
    DELIVERED: (
      <FormattedMessage
        id='deliveredDescription'
        defaultMessage={`Claim your {name} within 24 hours and earn 50 Cliqq points! Use points to redeem items instead of cash. `}
        values={{name: <b>{receipt.name}</b>}} />
    ),
    CLAIMED: (
      <FormattedMessage
        id='claimedDescription'
        defaultMessage={`Thank you for shopping with us! Here's 50 points for claiming your item early. You can use points to redeem items instead of cash.`}
        values={{name: receipt.status}} />
    ),
    UNCLAIMED: (
      <FormattedMessage
        id='unclaimedDescription'
        defaultMessage={`Oh no! You were not able to pay within the hour. Would you like to reorder {name}? You will have another hour to pay for you item.`}
        values={{name: <b>{receipt.name}</b>}} />
    )
  })(null)(status)
}

const ModalButtons = ({ status }) => {
  return ComponentDetail({
    RESERVED: {
      primary: 'THANKS! I\'M ON MY WAY!',
      secondary: 'HOW MUCH POINTS CAN I EARN?'
    },
    UNPAID: {
      primary: 'ORDER AGAIN',
      secondary: 'NO THANKS, CONTINUE SHOPPING'
    },
    CONFIRMED: {
      primary: 'I\'M HAPPY, LET\'S PROCEED!',
      secondary: 'BACK TO CHECKOUT PAGE'
    },
    DELIVERED: {
      primary: 'AWESOME! THANKS',
      secondary: 'TELL ME MORE ABOUT CLIQQ POINTS'
    },
    CLAIMED: {
      primary: 'AWESOME! THANKS',
      secondary: 'TELL ME MORE ABOUT CLIQQ POINTS'
    },
    UNCLAIMED: {
      primary: 'ORDER AGAIN',
      secondary: 'NO THANKS, CONTINUE SHOPPING'
    },
    INTRANSIT: {
      primary: 'COOL! I\'M EXCITED!',
      secondary: 'TELL ME MORE ABOUT CLIQQ POINTS'
    }
  })(null)(status)
}

function ModalWithHeader () {
  return (
    <Modal
      open
      size='small'
    >
      <BannerHeader
        background={ModalImages({ status: STATUSES[receipt.status] }).banner}
        iconBg={ModalImages({ status: STATUSES[receipt.status] }).iconBg} >
        <span>
          <Image src={ModalImages({ status: STATUSES[receipt.status] }).icon} />
        </span>
      </BannerHeader>
      <Modal.Content>
        <TextWrapper>
          <TitleHead>
            <ModalTitle {...{ status: STATUSES[receipt.status], receipt }} />
          </TitleHead>
          <p><ModalDescription {...{ status: STATUSES[receipt.status], receipt }} /></p>
        </TextWrapper>
        <ButtonWrapper>
          <Button primary fluid onClick={() => {}}>
            { ModalButtons({ status: STATUSES[receipt.status] }).primary }
          </Button>
          <TextButton text={ModalButtons({ status: STATUSES[receipt.status] }).secondary} close={() => {}} />
        </ButtonWrapper>
      </Modal.Content>
    </Modal>
  )
}

ModalWithHeader.propTypes = {

}

export default ModalWithHeader
