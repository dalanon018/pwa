/**
 *
 * Asynchronously loads the component for FlashDealsLanding
 *
 */

import Loadable from 'react-loadable'

export default Loadable({
  loader: () => import('./index'),
  loading: () => null
})
