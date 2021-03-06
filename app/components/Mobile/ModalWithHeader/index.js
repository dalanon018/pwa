/**
*
* ModalWithHeader
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components';

import { toUpper } from 'ramda'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

import { Button, Modal, Image, Label } from 'semantic-ui-react'
import TextButton from 'components/Shared/CloseButton'

import ModalHeaderBg from 'images/modal-header-bg.png'
// import RedBackground from 'images/modal-bg-red.png'

import StoreIcon from 'images/icons/ready-icon.svg'
import PaperBagIcon from 'images/icons/claimed-icon.svg'
import CashierIcon from 'images/icons/paid-icon.svg'
import WarningIcon from 'images/icons/warning-icon.svg'
// import NoteIcon from 'images/icons/confirmation-icon.svg'
// import StarIcon from 'images/icons/star-icon.svg'
import IntransitIcon from 'images/icons/intransit-icon.svg'
import UnclaimedIcon from 'images/icons/unclaimed-icon.svg'

import { switchFn } from 'utils/logicHelper'

import {
  STATUSES
} from 'containers/Buckets/constants'

import {
  BannerHeader,
  ModalContainer,
  DetailsWrapper,
  ButtonWrapper
} from './styles'

const ModalImages = ({ status }) => {
  return switchFn({
    RESERVED: null,
    UNPAID: {
      banner: ModalHeaderBg,
      icon: WarningIcon,
      iconBg: '#229D90'
    },
    CONFIRMED: {
      banner: ModalHeaderBg,
      icon: CashierIcon
    },
    INTRANSIT: {
      banner: ModalHeaderBg,
      icon: IntransitIcon
    },
    LOSTINTRANSIT: {
      banner: ModalHeaderBg,
      icon: IntransitIcon,
      iconBg: '#229D90'
    },
    DELIVERED: {
      banner: ModalHeaderBg,
      icon: StoreIcon
    },
    CLAIMED: {
      banner: ModalHeaderBg,
      icon: PaperBagIcon,
      iconBg: '#229D90'
    },
    UNCLAIMED: {
      banner: ModalHeaderBg,
      icon: UnclaimedIcon,
      iconBg: '#229D90'
    }
  })(null)(status)
}

const ModalTitle = ({ status, receipt }) => {
  return switchFn({
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
    LOSTINTRANSIT: (
      <FormattedMessage {...messages.lostintransitTitle} />
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
  return switchFn({
    RESERVED: null,
    UNPAID: (
      <FormattedMessage
        {...messages.unpaidDescription}
        values={{name: <b>{receipt.get('name')}</b>}} />
    ),
    CONFIRMED: (
      <FormattedMessage
        {...messages.confirmedDescription}
        values={{name: <b>{receipt.get('name')}</b>}} />
    ),
    INTRANSIT: (
      <FormattedMessage {...messages.intransitDescription} />
    ),
    LOSTINTRANSIT: (
      <FormattedMessage {...messages.lostintransitDescription} />
    ),
    DELIVERED: (
      <FormattedMessage {...messages.deliveredDescription} />
    ),
    CLAIMED: (
      <FormattedMessage {...messages.claimedDescription} />
    ),
    UNCLAIMED: (
      <FormattedMessage {...messages.unclaimedDescription} />
    )
  })(null)(status)
}

const ModalButtons = ({ status, goToHome, goToReceipts, goToProducts, onClose }) => {
  return switchFn({
    RESERVED: {
      primary: <FormattedMessage {...messages.buttonReserved} />,
      secondary: <FormattedMessage {...messages.secondaryButton} />,
      onClick: goToReceipts,
      onClose
    },
    UNPAID: {
      primary: <FormattedMessage {...messages.secondaryRepurchaseButton} />,
      secondary: <FormattedMessage {...messages.buttonUnpaid} />,
      onClick: onClose,
      onClose: goToProducts
    },
    CONFIRMED: {
      primary: <FormattedMessage {...messages.buttonConfirmed} />,
      secondary: <FormattedMessage {...messages.secondaryButton} />,
      onClick: goToReceipts,
      onClose
    },
    INTRANSIT: {
      primary: <FormattedMessage {...messages.buttonIntransit} />,
      secondary: <FormattedMessage {...messages.secondaryButton} />,
      onClick: goToReceipts,
      onClose
    },
    LOSTINTRANSIT: {
      primary: <FormattedMessage {...messages.secondaryBrowseCatalog} />,
      secondary: <FormattedMessage {...messages.buttonLostIntransit} />,
      onClick: onClose,
      onClose: goToHome
    },
    DELIVERED: {
      primary: <FormattedMessage {...messages.buttonDelivered} />,
      secondary: <FormattedMessage {...messages.secondaryButton} />,
      onClick: goToReceipts,
      onClose
    },
    CLAIMED: {
      primary: <FormattedMessage {...messages.buttonClaimed} />,
      secondary: <FormattedMessage {...messages.secondaryButton} />,
      onClick: goToReceipts,
      onClose
    },
    UNCLAIMED: {
      primary: <FormattedMessage {...messages.buttonUnclaimed} />,
      secondary: <FormattedMessage {...messages.secondaryButton} />,
      onClick: goToReceipts,
      onClose
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
    cbFn && cbFn()
  }

  render () {
    const { receipt, goToReceipts, goToProducts, goToHome } = this.props
    const currentStatus = STATUSES[toUpper(receipt.get('status'))] || ''
    const { primary, secondary, onClick, onClose } = ModalButtons({
      status: currentStatus,
      goToProducts: () => this._fnFactory(goToProducts(receipt.get('parentCliqqCode'))),
      onClose: this._closeModal,
      goToReceipts,
      goToHome: () => this._fnFactory(goToHome)
    }) || {}
    // const modalSize = windowWidth >= 768 ? 'small' : 'mini'

    return (
      <Modal
        defaultOpen
        closeOnDimmerClick={false}
        /* size={modalSize} */
      >
        <ModalContainer>
          <BannerHeader
            background={ModalImages({ status: currentStatus }).banner}
            iconBg={ModalImages({ status: currentStatus }).iconBg} >
            <span>
              <Image alt='CLiQQ' src={ModalImages({ status: currentStatus }).icon} />
            </span>
          </BannerHeader>
          <Modal.Content>
            <Label className='text__weight--500 center' as='p' size='big'>
              <ModalTitle {...{ status: currentStatus, receipt }} />
            </Label>
            <DetailsWrapper>
              <Label className='text__weight--400 center' as='p' size='medium'>
                <ModalDescription {...{ status: currentStatus, receipt }} />
              </Label>
            </DetailsWrapper>
            <ButtonWrapper>
              <Button
                onClick={onClose}
                primary
                className='text__weight--700'
              >
                { primary }
              </Button>
              <TextButton text={secondary} close={() => this._fnFactory(onClick)} />
            </ButtonWrapper>
          </Modal.Content>
        </ModalContainer>
      </Modal>
    )
  }
}

export default ModalWithHeader
