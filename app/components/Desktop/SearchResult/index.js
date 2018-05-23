/**
*
* SearchResult
*
*/

import React from 'react'
import { Container } from 'semantic-ui-react'

import ProductView from 'components/Desktop/ProductView'

function SearchResult ({ product, changeRoute, windowWidth }) {
  return (
    <Container className='padding__top--none'>
      <ProductView changeRoute={changeRoute} products={product} windowWidth={windowWidth} />
    </Container>
  )
}

SearchResult.propTypes = {

}

export default SearchResult
