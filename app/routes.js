// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors'

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err) // eslint-disable-line no-console
}

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default)
}

export default function createRoutes (store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store)

  return [
    {
      path: '/',
      name: 'bucket',
      getComponent (nextState, cb) {
        const importModules = Promise.all([
          import('containers/Buckets/reducer'),
          import('containers/Buckets/sagas'),
          import('containers/Buckets')
        ])

        const renderRoute = loadModule(cb)

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('buckets', reducer.default)
          injectSagas(sagas.default)
          renderRoute(component)
        })

        importModules.catch(errorLoading)
      },
      indexRoute: { onEnter: (nextState, replace) => replace('/home') },
      childRoutes: [
        {
          path: '/home',
          name: 'home',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/HomePage/reducer'),
              import('containers/HomePage/sagas'),
              import('containers/HomePage')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('home', reducer.default)
              injectSagas(sagas.default)

              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/purchases',
          name: 'purchases',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/Purchases/reducer'),
              import('containers/Purchases/sagas'),
              import('containers/Purchases')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('purchases', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/product/:id',
          name: 'productPage',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/ProductPage/reducer'),
              import('containers/ProductPage/sagas'),
              import('containers/ProductPage')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('productPage', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/review',
          name: 'productReview',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/ProductReview/reducer'),
              import('containers/ProductReview/sagas'),
              import('containers/ProductReview')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('productReview', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/search',
          name: 'searchPage',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/SearchPage/reducer'),
              import('containers/SearchPage/sagas'),
              import('containers/SearchPage')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('searchPage', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }
      ]
    }, {
      path: '/features',
      name: 'features',
      getComponent (nextState, cb) {
        import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }, {
      path: '*',
      name: 'notfound',
      getComponent (nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading)
      }
    }
  ]
}
