/**
*
* PopupSlide
*
*/

import React from 'react'
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl'
// import messages from './messages'

import {
  PopupWrapper,
  PopupContainer } from './styles'

function PopupSlide ({
  toggle
}) {
  return (
    <PopupWrapper toggle={toggle}>
      <PopupContainer>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus culpa distinctio itaque, repellendus reprehenderit eius accusamus! Laudantium ipsum, debitis ea suscipit blanditiis, modi impedit quibusdam voluptas vitae nesciunt, molestiae cumque.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus culpa distinctio itaque, repellendus reprehenderit eius accusamus! Laudantium ipsum, debitis ea suscipit blanditiis, modi impedit quibusdam voluptas vitae nesciunt, molestiae cumque.
      </PopupContainer>
    </PopupWrapper>
  )
}

PopupSlide.propTypes = {

}

export default PopupSlide
