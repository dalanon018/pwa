/**
*
* LazyLoading
*
*/

import React, {PropTypes } from 'react'
import styled from 'styled-components'
import { debounce, noop } from 'lodash'
import {
  allPass,
  both,
  equals,
  identity,
  ifElse,
  gte,
  lt
} from 'ramda'

import LoadingIndicator from 'components/LoadingIndicator'

const WrapperLoadingIndicator = styled.div`
  position: relative;
`

class LazyLoading extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()

    this._debounceScrolling = this._debounceScrolling.bind(this)

    /**
     * we need to define this since our debounce will have issue once we
     * unmount our component and debounce function was'nt invoke yet.
     */
    this._cancellableDebounce = false
  }

  _debounceScrolling = debounce(this._onScrollElement, 200)

  _onScrollElement () {
    const { lazyload, onScroll } = this.props
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    const offset = 200

    const onBottom = () => lt(window.innerHeight, (scrollY + offset))
    const notCancellable = () => equals(false, this._cancellableDebounce)

    const displayMore = ifElse(
      allPass([onBottom, identity, notCancellable]),
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
    const { lazyload, results, limit } = this.props
    const itemsGreaterEqLimit = () => gte(results.size, limit)
    const showLoadingIndicator = ifElse(
      both(identity, itemsGreaterEqLimit),
      () => (
        <WrapperLoadingIndicator>
          <LoadingIndicator />
        </WrapperLoadingIndicator>
      ),
      () => null
    )
    return showLoadingIndicator(lazyload)
  }

  componentDidMount () {
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
      <div>
        { this.props.children }
        { this._displayLazyLoadIndicator() }
      </div>
    )
  }
}

LazyLoading.propTypes = {
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
