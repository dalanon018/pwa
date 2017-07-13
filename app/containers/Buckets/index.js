import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectBuckets from './selectors'
import Menu from './Menu'

const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
`

export class Buckets extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <Wrapper>
        <Menu
          toggleSidebarAction={() => {}}
        />
      </Wrapper>
    )
  }
}

Buckets.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  Buckets: makeSelectBuckets()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buckets)
