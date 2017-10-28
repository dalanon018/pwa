import React from 'react'
import styled from 'styled-components'
import LoadingIndicator from 'components/LoadingIndicator'

const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Loading () {
  return (
    <LoaderWrapper>
      <LoadingIndicator />
        Authenticating...
    </LoaderWrapper>
  )
}
