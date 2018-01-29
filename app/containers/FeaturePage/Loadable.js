/**
 * Asynchronously loads the component for FeaturePage
 */
import Loadable from 'react-loadable'

import PageLoading from 'components/Shared/PageLoading'

export default Loadable({
  loader: () => import('./index'),
  loading: PageLoading
})
