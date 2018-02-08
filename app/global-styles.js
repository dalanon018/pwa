import { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    
    @media (min-width: 1024px) {
      min-height: 100%;
      position: relative;
    }
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    @media (min-width: 1024px) {
      margin: 0 0 246px;
    }
  }

  body.robotoLoaded {
    font-family: 'Roboto', sans-serif;
  }

  body.cabinLoaded {
    font-family: 'Cabin', sans-serif;
  }
`
