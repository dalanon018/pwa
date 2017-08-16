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
      indexRoute: { onEnter: (nextState, replace) => replace('/') },
      childRoutes: [
        {
          path: '/',
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
          path: '/purchases/:trackingNumber',
          name: 'receiptPage',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/ReceiptPage/reducer'),
              import('containers/ReceiptPage/sagas'),
              import('containers/ReceiptPage')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('receiptPage', reducer.default)
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
          path: '/categories',
          name: 'browseCategories',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/BrowseCategories/reducer'),
              import('containers/BrowseCategories/sagas'),
              import('containers/BrowseCategories')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('browseCategories', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/products-category/:id',
          name: 'productsByCategory',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/ProductsByCategory/reducer'),
              import('containers/ProductsByCategory/sagas'),
              import('containers/ProductsByCategory')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('productsByCategory', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/faq',
          name: 'faqPage',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/FaqPage/reducer'),
              import('containers/FaqPage/sagas'),
              import('containers/FaqPage')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('faqPage', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/privacy-policy',
          name: 'privacyPolicy',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/PrivacyPolicy/reducer'),
              import('containers/PrivacyPolicy/sagas'),
              import('containers/PrivacyPolicy')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('privacyPolicy', reducer.default)
              injectSagas(sagas.default)
              renderRoute(component)
            })

            importModules.catch(errorLoading)
          }
        }, {
          path: '/terms-conditions',
          name: 'termsConditions',
          getComponent (nextState, cb) {
            const importModules = Promise.all([
              import('containers/TermsConditions/reducer'),
              import('containers/TermsConditions/sagas'),
              import('containers/TermsConditions')
            ])

            const renderRoute = loadModule(cb)

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('termsConditions', reducer.default)
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
