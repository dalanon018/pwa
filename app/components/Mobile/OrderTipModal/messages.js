/*
 * OrderTipModal Messages
 *
 * This contains all the text for the OrderTipModal component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.components.OrderTipModal.header',
    defaultMessage: '1-Day In-Store Delivery'
  },
  descriptionOne: {
    id: 'app.components.OrderTipModal.descriptionOne',
    defaultMessage: 'Lorem ipsum dolor amet'
  },
  descriptionTwo: {
    id: 'app.components.OrderTipModal.descriptionTwo',
    defaultMessage: `
      Delivery to Store may vary per location. \n
      For Mega Manila: 1-3 Days
      For Major Luzon Provinces: 3-5 Days
      For Visayas-Mindanao Provinces: 7-14 Days
      (Not available yet!)
    `
  },
  confirmButton: {
    id: 'app.components.OrderTipModal.confirmButton',
    defaultMessage: 'BACK TO SHOPPING'
  },
  learnMore: {
    id: 'app.components.OrderTipModal.learnMore',
    defaultMessage: 'Learn More'
  }
})
