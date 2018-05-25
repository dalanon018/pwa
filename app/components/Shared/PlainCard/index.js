/**
*
* PlainCard
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import WindowWidth from 'components/Shared/WindowWidth'

export const Wrapper = styled.div`
  align-items: center;
  background-color: #FFFFFF;
  border-radius: ${props => props.isDesktop ? '10px' : '4px'};
  box-shadow: 0 0 5px rgba(120,120,120, 0.1);
  display: flex;
  flex-wrap: wrap;
  height: ${props => props.height}px;
  justify-content: ${props => props.alignLeft ? 'flex-start' : 'center'};
  width: ${props => props.width ? props.width + 'px' : '100%'};

  img {
    ${
      props => !props.noImageRadius
      ? `border-radius: ${props.borderRadius && props.isDesktop ? '10px' : '4px'};` : null
    }
    height: inherit;
  }
`

class PlainCard extends React.PureComponent {
  render () {
    const {
      children,
      borderRadius,
      width,
      height,
      windowWidth,
      noImageRadius,
      alignLeft } = this.props
    const isDesktop = windowWidth >= 1024

    return (
      <Wrapper
        borderRadius={borderRadius}
        width={width}
        height={height}
        isDesktop={isDesktop}
        noImageRadius={noImageRadius}
        alignLeft={alignLeft}>
        {children}
      </Wrapper>
    )
  }
}

PlainCard.propTypes = {
  children: PropTypes.object.isRequired,
  borderRadius: PropTypes.bool
}

export default WindowWidth(PlainCard)
