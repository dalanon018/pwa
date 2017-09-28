import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Image } from 'semantic-ui-react'

const BrandsLists = ({ lists }) => {
  return (
    <Grid container padded columns='2'>
      {
        lists.map((list, idx) => (
          <Grid.Column key={idx}>
            <Image alt={list} src={list} />
          </Grid.Column>
        ))
      }
    </Grid>
  )
}

BrandsLists.propTypes = {
  lists: PropTypes.array.isRequired
}

export default BrandsLists
