/*
 * ModalWithHeader Messages
 *
 * This contains all the text for the ModalWithHeader component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.components.ModalWithHeader.header',
    defaultMessage: 'This is the ModalWithHeader component !'
  },

  reservedTitle: {
    id: 'app.components.ModalWithHeader.reservedTitle',
    defaultMessage: 'ITEM IS READY FOR PICKUP!'
  },
  unpaidTitle: {
    id: 'app.components.ModalWithHeader.unpaidTitle',
    defaultMessage: 'ITEM HAS EXPIRED'
  },
  confirmedTitle: {
    id: 'app.components.ModalWithHeader.confirmedTitle',
    defaultMessage: 'CONFIRM OPTION'
  },
  intransitTitle: {
    id: 'app.components.ModalWithHeader.intransitTitle',
    defaultMessage: 'ITEM IS ON ITS WAY TO STORE'
  },
  deliveredTitle: {
    id: 'app.components.ModalWithHeader.deliveredTitle',
    defaultMessage: 'ITEM IS READY FOR PICKUP!'
  },
  claimedTitle: {
    id: 'app.components.ModalWithHeader.claimedTitle',
    defaultMessage: 'ITEM HAS BEEN CLAIMED!'
  },
  unclaimedTitle: {
    id: 'app.components.ModalWithHeader.unclaimedTitle',
    defaultMessage: 'ITEM HAS EXPIRED'
  },

  reservedDescription: {
    id: 'app.components.ModalWithHeader.reservedDescription',
    defaultMessage: 'reservedDescription TEXT'
  },
  unpaidDescription: {
    id: 'app.components.ModalWithHeader.unpaidDescription',
    defaultMessage: '`Oh no! You were not able to pay within the hour. Would you like to reorder {name}? You will have another hour to pay for youR item.`'
  },
  confirmedDescription: {
    id: 'app.components.ModalWithHeader.confirmedDescription',
    defaultMessage: 'Thank you for your payment for {name}! We\'ll process your order and tell you when your item is at the store!'
  },
  intransitDescription: {
    id: 'app.components.ModalWithHeader.intransitDescription',
    defaultMessage: 'Your item is in-transit to the store! We will notify you when it is ready for pick-up. For now you can keep on Shopping!'
  },
  deliveredDescription: {
    id: 'app.components.ModalWithHeader.deliveredDescription',
    defaultMessage: 'Hooray! Your item is already at the store and is waiting for you! You have seven days to claim your item!'
  },
  claimedDescription: {
    id: 'app.components.ModalWithHeader.claimedDescription',
    defaultMessage: 'Thank you for shopping with us! Follow us on social media for all the latest updates and promos only here on Cliqq!'
  },
  unclaimedDescription: {
    id: 'app.components.ModalWithHeader.unclaimedDescription',
    defaultMessage: 'You have not claimed your item within the seven day period. Kindly contact our customer service line for assistance. Thank you!'
  }
})
