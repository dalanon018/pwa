/*
 * ProductsByCategory Messages
 *
 * This contains all the text for the ProductsByCategory component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  viewed: {
    id: 'app.containers.ProductsByCategory.viewed',
    defaultMessage: 'Recently Viewed'
  },
  items: {
    id: 'app.containers.ProductsByCategory.items',
    defaultMessage: ' Items'
  },
  feature: {
    id: 'app.containers.ProductsByCategory.feature',
    defaultMessage: 'Featured Items'
  },
  noSeparator: {
    id: 'app.containers.ProductsByCategory.noSeparator',
    defaultMessage: ' OF '
  },
  loadMore: {
    id: 'app.containers.ProductsByCategory.loadMore',
    defaultMessage: 'LOAD MORE'
  },
  emptyMessage: {
    id: 'app.containers.ProductsByCategory.emptyMessage',
    defaultMessage: 'This category doesn\'t have any products yet.'
  }
})
