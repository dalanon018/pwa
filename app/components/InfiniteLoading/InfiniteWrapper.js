/**
*
* InfiniteLoader
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  identity,
  ifElse
} from 'ramda'

import LoadingIndicator from 'components/Shared/LoadingIndicator'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

const WrapperLoadingIndicator = styled.div`
  position: relative;
`

const LoadMoreText = styled.p`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ScrollContent = styled.div`
  -webkit-overflow-scrolling: touch;
`

class InfiniteWrapperProxy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /*
  * We need to identify if we need to show the lazy load if
  * items are more than equal to the limit and lazyload === true
  */
  _displayLazyLoadIndicator = () => {
    const { hasMoreData, isLoading } = this.props
    const showLoadingIndicator = ifElse(
      // both(identity, itemsGreaterEqLimit),
      identity,
      () => (
        <WrapperLoadingIndicator>
          <LoadingIndicator />
          <LoadMoreText>
            <FormattedMessage {...messages.loadingText} />
          </LoadMoreText>
        </WrapperLoadingIndicator>
      ),
      () => null
    )
    return showLoadingIndicator(hasMoreData && isLoading)
  }

  render () {
    const { children } = this.props
    return (
      <ScrollContent>
        { children }
        {this._displayLazyLoadIndicator()}
      </ScrollContent>
    )
  }
}

InfiniteWrapperProxy.propTypes = {
  // to check if we are currently loading
  isLoading: PropTypes.bool.isRequired,
  // to check if we still need to scroll
  // we need there are still data to be fetched
  hasMoreData: PropTypes.bool.isRequired,
  // children to load
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export default InfiniteWrapperProxy
