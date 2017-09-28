import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Image } from 'semantic-ui-react'

const CategoriesLists = ({ lists }) => {
  return (
    <Grid padded>
      {
        lists.map((list, idx) => (
          <Grid.Row key={idx} columns={1} verticalAlign='middle'>
            <Grid.Column>
              <Image alt={list} src={list} />
            </Grid.Column>
          </Grid.Row>
        ))
      }
    </Grid>
  )
}

CategoriesLists.propTypes = {
  lists: PropTypes.array.isRequired
}

export default CategoriesLists
