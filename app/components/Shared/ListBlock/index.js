/**
*
* ListBlock
*
*/

import React from 'react'
// import styled from 'styled-components';
import { Grid } from 'semantic-ui-react'

import { ListBlockWrapper } from './styles'

function ListBlock () {
  return (
    <Grid.Row>
      <ListBlockWrapper>
        <p className='title'>
          Lorem ipsum dolor amet
        </p>
        <div className='description'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore architecto consectetur aliquam reprehenderit, adipisci labore, numquam temporibus fuga, quidem soluta odit vero placeat optio atque aperiam. Odio fugiat cum labore.</p>
        </div>
      </ListBlockWrapper>
      <ListBlockWrapper>
        <p className='title'>
          Lorem ipsum dolor amet
        </p>
        <div className='description'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore architecto consectetur aliquam reprehenderit, adipisci labore, numquam temporibus fuga, quidem soluta odit vero placeat optio atque aperiam. Odio fugiat cum labore.</p>
        </div>
      </ListBlockWrapper>
    </Grid.Row>
  )
}

ListBlock.propTypes = {

}

export default ListBlock
