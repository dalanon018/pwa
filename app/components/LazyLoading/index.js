/**
*
* LazyLoading
*
*/

import React, {PropTypes } from 'react'
import styled from 'styled-components'
import { throttle, noop } from 'lodash'
import {
  allPass,
  // both,
  equals,
  identity,
  ifElse,
  // gte,
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

class LazyLoading extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()

    this._debounceScrolling = this._debounceScrolling.bind(this)
    this._onScrollElement = this._onScrollElement.bind(this)

    /**
     * we need to define this since our debounce will have issue once we
     * unmount our component and debounce function was'nt invoke yet.
     */
    this._cancellableDebounce = false
  }

  _debounceScrolling = throttle(this._onScrollElement, 100)

  _onScrollElement () {
    const { isLoading, lazyload, onScroll } = this.props
    const body = document.body
    const html = document.documentElement

    const scrollY = window.pageYOffset
    const offset = 1600
    const height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight)

    const onBottom = () => lt(height, (scrollY + offset))
    const notCancellable = () => equals(false, this._cancellableDebounce)
    const isNotLoading = () => equals(false, isLoading)

    const displayMore = ifElse(
      allPass([onBottom, identity, notCancellable, isNotLoading]),
      onScroll,
      noop
    )
    return displayMore(lazyload)
  }

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

  componentDidMount () {
    // make sure to put it last on call stack
    setTimeout(this._srollTopBeforeUnload, 0)
    window.addEventListener('scroll', this._debounceScrolling)
  }

  componentWillUnmount () {
    /**
     * once we unmount we will tell our debounce
     * that they shoud'nt run anymore
     */
    this._cancellableDebounce = true
    window.removeEventListener('scroll', this._debounceScrolling)
  }

  render () {
    return (
      <ScrollContent>
        { this.props.children }
        { this._displayLazyLoadIndicator() }
      </ScrollContent>
    )
  }
}

LazyLoading.propTypes = {
  // to check if we are currently loading
  isLoading: PropTypes.bool.isRequired,
  // to check if we still need to scroll
  lazyload: PropTypes.bool.isRequired,
  // callback on scroll
  onScroll: PropTypes.func.isRequired,
  // children to load
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.children
  ]).isRequired,
  // data
  results: PropTypes.object.isRequired,
  // limit  of data fetching
  limit: PropTypes.number.isRequired
}

export default LazyLoading
