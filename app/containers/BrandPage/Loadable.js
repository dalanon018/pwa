/**
 *
 * Asynchronously loads the component for ProductBrandsPage
 *
 */
import Loadable from 'react-loadable'
import LoadingIndicator from 'components/LoadingIndicator'

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator
})

export default LoadableComponent
