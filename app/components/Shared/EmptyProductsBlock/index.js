import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Grid, Label } from 'semantic-ui-react'

export const EmptyWrapperText = styled(Label)`
  text-align: center;
`

const EmptyProducts = ({ children }) => (
  <Grid padded>
    <Grid.Row columns={1}>
      <Grid.Column>
        <EmptyWrapperText className='color__light-grey' as='p' size='massive' basic>
          { children }
        </EmptyWrapperText>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

EmptyProducts.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object
  ]).isRequired
}
export default EmptyProducts
