/**
*
* InfiniteLoader
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'

import {
  identity,
  ifElse
} from 'ramda'

import LoadingIndicator from 'components/LoadingIndicator'

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

class InfiniteLoaderProxy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /**
   * We need to identify if we need to show the lazy load if
   * items are more than equal to the limit and lazyload === true
   */
  _displayLazyLoadIndicator = () => {
    const { lazyload } = this.props
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
    return showLoadingIndicator(lazyload)
  }

  /**
   * we need to make sure that before we reload the page we scroll top the page due to issues that scroll is always triggered if it was refereshed on the bottom of the page
   */
  _srollTopBeforeUnload = () => {
    window.scrollTo(0, 0)
  }

  render () {
    const { isLoading, hasMoreData, loadMoreData, rowCount, results } = this.props
    // Every row is loaded except for our loading indicator row.
    const isRowLoaded = ({ index }) => !hasMoreData || index < results.size
    const loadMoreRows = isLoading
        ? () => {}
        : loadMoreData

    return (
      <ScrollContent>
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={rowCount}
        >
          {({ onRowsRendered, registerChild }) => this.props.children({
            onRowsRendered,
            registerChild
          })}
        </InfiniteLoader>
      </ScrollContent>
    )
  }
}

InfiniteLoaderProxy.propTypes = {
  // to check if we are currently loading
  isLoading: PropTypes.bool.isRequired,
  // to check if we still need to scroll
  // we need there are still data to be fetched
  hasMoreData: PropTypes.bool.isRequired,
  // callback on scroll
  loadMoreData: PropTypes.func.isRequired,
  // children to load
  children: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,
  // total row count
  rowCount: PropTypes.number.isRequired
}

export default InfiniteLoaderProxy
