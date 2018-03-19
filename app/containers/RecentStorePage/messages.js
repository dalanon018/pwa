/*
 * RecentStorePage Messages
 *
 * This contains all the text for the RecentStorePage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.containers.RecentStorePage.header',
    defaultMessage: 'Select a Store'
  },
  storeLocator: {
    id: `app.containers.RecentStorePage.storeLocator`,
    defaultMessage: 'Store Locator'
  },
  findStore: {
    id: `app.containers.RecentStorePage.findStore`,
    defaultMessage: `Can't find the store? Check our {storeLocator}`
  }
})
