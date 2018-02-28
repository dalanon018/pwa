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
  F,
  T,
  allPass,
  equals,
  identity,
  ifElse,
  lt
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

  _shouldTriggerRequest = () => {
    const { isLoading, hasMoreData } = this.props
    const body = document.body
    const html = document.documentElement

    const scrollY = window.pageYOffset
    const offset = 1900
    const height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight)

    const onBottom = () => lt(height, (scrollY + offset))
    const isNotLoading = () => equals(false, isLoading)

    const shouldTriggerRequest = ifElse(
      allPass([onBottom, identity, isNotLoading]),
      F,
      T
    )

    return shouldTriggerRequest(hasMoreData)
  }

  render () {
    const { isLoading, loadMoreData, rowCount } = this.props

    const loadMoreRows = isLoading
        ? () => {}
        : loadMoreData
    return (
      <ScrollContent>
        <InfiniteLoader
          isRowLoaded={this._shouldTriggerRequest}
          loadMoreRows={loadMoreRows}
          rowCount={rowCount}
        >
          {({ onRowsRendered, registerChild }) =>
            this.props.children({ onRowsRendered, registerChild })
          }
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
