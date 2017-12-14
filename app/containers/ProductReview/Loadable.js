/**
 *
 * Asynchronously loads the component for ProductReviewPage
 *
 */
import Loadable from 'react-loadable'
import PageLoading from 'components/PageLoading'

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading: PageLoading
})

export default LoadableComponent
