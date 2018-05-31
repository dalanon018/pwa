/**
*
* SearchResult
*
*/

import React from 'react'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import ProductView from 'components/Desktop/ProductView'

function SearchResult ({ product, changeRoute, windowWidth }) {
  return (
    <Container className='padding__top--none'>
      <ProductView changeRoute={changeRoute} products={product} windowWidth={windowWidth} />
    </Container>
  )
}

SearchResult.propTypes = {
  product: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default SearchResult
