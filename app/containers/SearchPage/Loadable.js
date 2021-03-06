/**
 *
 * Asynchronously loads the component for SearchPage
 *
 */
import Loadable from 'react-loadable'
import PageLoading from 'components/Shared/PageLoading'

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading: PageLoading
})

export default LoadableComponent
