/**
*
* ModalWithHeader
*
*/

import React, { PropTypes } from 'react'
// import styled from 'styled-components';

import { toUpper } from 'ramda'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

import { Modal, Image } from 'semantic-ui-react'

import Button from 'components/Button'
import TextButton from 'components/CloseButton'

import OrangeBackground from 'images/modal-bg-orange.png'
import RedBackground from 'images/modal-bg-red.png'

import StoreIcon from 'images/icons/ready-icon.svg'
import PaperBagIcon from 'images/icons/claimed-icon.svg'
import CashierIcon from 'images/icons/paid-icon.svg'
import WarningIcon from 'images/icons/warning-icon.svg'
// import NoteIcon from 'images/icons/confirmation-icon.svg'
import StarIcon from 'images/icons/star-icon.svg'

import {
  STATUSES
} from 'containers/Buckets/constants'

import {
  BannerHeader,
  TextWrapper,
  TitleHead,
  ButtonWrapper
} from './styles'

const ComponentDetail = components => component => key =>
 key in components ? components[key] : component

const ModalImages = ({ status }) => {
  return ComponentDetail({
    RESERVED: null,
    UNPAID: {
      banner: RedBackground,
      icon: WarningIcon,
      iconBg: '#EB1E25'
    },
    CONFIRMED: {
      banner: OrangeBackground,
      icon: CashierIcon
    },
    INTRANSIT: {
      banner: OrangeBackground,
      icon: StarIcon
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
    }
  })(null)(status)
}

const ModalTitle = ({ status, receipt }) => {
  return ComponentDetail({
    RESERVED: null,
    UNPAID: (
      <FormattedMessage {...messages.unpaidTitle} />
    ),
    CONFIRMED: (
      <FormattedMessage {...messages.confirmedTitle} />
    ),
    INTRANSIT: (
      <FormattedMessage {...messages.intransitTitle} />
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
    RESERVED: null,
    UNPAID: (
      <FormattedMessage
        id='unclaimedDescription'
        defaultMessage={`Oh no! You were not able to pay within the hour. Would you like to reorder {name}? You will have another hour to pay for you item.`}
        values={{name: <b>{receipt.get('name')}</b>}} />
    ),
    CONFIRMED: (
      <FormattedMessage
        id='confirmedDescription'
        defaultMessage={`Your payment for {name}, is already processed!`}
        values={{name: <b>{receipt.get('name')}</b>}} />
    ),
    INTRANSIT: (
      <FormattedMessage
        id='intransitDescription'
        defaultMessage={`Your item {name}, is on it's way to Store!`}
        values={{name: <b>{receipt.get('name')}</b>}} />
    ),
    DELIVERED: (
      <FormattedMessage
        id='deliveredDescription'
        defaultMessage={`Claim your {name} within 24 hours and earn 50 Cliqq points! Use points to redeem items instead of cash. `}
        values={{name: <b>{receipt.get('name')}</b>}} />
    ),
    CLAIMED: (
      <FormattedMessage
        id='claimedDescription'
        defaultMessage={`Thank you for shopping with us! Here's 50 points for claiming your item early. You can use points to redeem items instead of cash.`}
        values={{name: receipt.get('status')}} />
    ),
    UNCLAIMED: (
      <FormattedMessage
        id='unclaimedDescription'
        defaultMessage={`Oh no! You were not able to pay within the hour. Would you like to reorder {name}? You will have another hour to pay for you item.`}
        values={{name: <b>{receipt.get('name')}</b>}} />
    )
  })(null)(status)
}

const ModalButtons = ({ status, goToHome, goToReceipts }) => {
  return ComponentDetail({
    RESERVED: {
      primary: 'THANKS! I\'M ON MY WAY!',
      secondary: 'HOW MUCH POINTS CAN I EARN?',
      onClick: goToHome
    },
    UNPAID: {
      primary: 'GOT IT!',
      secondary: 'BACK TO HOME',
      onClick: goToHome
    },
    CONFIRMED: {
      primary: 'AWESOME! THANKS',
      secondary: 'TRACK YOUR ORDER',
      onClick: goToReceipts
    },
    INTRANSIT: {
      primary: 'COOL! I\'M EXCITED!',
      secondary: 'TRACK YOUR ORDER',
      onClick: goToReceipts
    },
    DELIVERED: {
      primary: 'AWESOME! THANKS',
      secondary: 'TELL ME MORE ABOUT CLIQQ POINTS',
      onClick: goToHome
    },
    CLAIMED: {
      primary: 'AWESOME! THANKS',
      secondary: 'TELL ME MORE ABOUT CLIQQ POINTS',
      onClick: goToHome
    },
    UNCLAIMED: {
      primary: 'GOT IT!',
      secondary: 'BACK TO HOME',
      onClick: goToHome
    }
  })(null)(status)
}

class ModalWithHeader extends React.PureComponent {
  static propTypes = {
    receipt: PropTypes.object.isRequired,
    receipts: PropTypes.object.isRequired,
    setUpdatedReceipts: PropTypes.func.isRequired,
    goToHome: PropTypes.func.isRequired,
    goToReceipts: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._closeModal = this._closeModal.bind(this)
    this._fnFactory = this._fnFactory.bind(this)
  }

  _closeModal () {
    const { receipt, receipts, setUpdatedReceipts } = this.props
    // we have to update our recieptUpdated state to remove what we already showed.
    const receiptsUpdated = receipts.filter((rec) => rec !== receipt)

    setUpdatedReceipts(receiptsUpdated)
  }

  _fnFactory (cbFn) {
    this._closeModal()
    cbFn()
  }

  render () {
    const { receipt, goToHome, goToReceipts } = this.props
    const currentStatus = STATUSES[toUpper(receipt.get('status'))] || ''
    const { primary, secondary, onClick } = ModalButtons({ status: currentStatus, goToHome, goToReceipts }) || {}

    return (
      <Modal
        defaultOpen
        size='small'
        closeOnDimmerClick={false}
      >
        <BannerHeader
          background={ModalImages({ status: currentStatus }).banner}
          iconBg={ModalImages({ status: currentStatus }).iconBg} >
          <span>
            <Image src={ModalImages({ status: currentStatus }).icon} />
          </span>
        </BannerHeader>
        <Modal.Content>
          <TextWrapper>
            <TitleHead>
              <ModalTitle {...{ status: currentStatus, receipt }} />
            </TitleHead>
            <p><ModalDescription {...{ status: currentStatus, receipt }} /></p>
          </TextWrapper>
          <ButtonWrapper>
            <Button primary fluid onClick={this._closeModal}>
              { primary }
            </Button>
            <TextButton text={secondary} close={() => this._fnFactory(onClick)} />
          </ButtonWrapper>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ModalWithHeader
