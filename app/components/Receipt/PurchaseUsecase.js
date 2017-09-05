import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'

import CLAIMED from 'images/status/claimed.svg'
import UNCLAIMED from 'images/status/unclaimed.svg'
import UNPAID from 'images/status/unpaid.svg'

import messages from './messages'

const PurchaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const HeaderBase = styled.div`
  font-family: 'helveticabold';
  text-align: center;
`

const HeaderOrder = styled(HeaderBase)`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 21px;
  justify-content: center;
  line-height: 1.2;
  text-transform: uppercase;
  width: 100%;

  span {
    width: 100%;
  }
`

const ImageWrapper = styled.img`
  margin-bottom: 20px;
  max-width: 100px;
`

/**
 * Currying for instead of using *ugly SWITCH statement
 * @param {*} cases
 */
const identifyBannerImage = images => image => key =>
 key in images ? images[key] : image

const ImageBanner = (status) => {
  return identifyBannerImage({
    UNPAID,
    CLAIMED,
    UNCLAIMED
  })(null)(status)
}

const PurchaseUsecase = ({ status }) => {
  const currentStatus = status || 'unknownStatus'

  return (
    <PurchaseWrapper>
      <HeaderOrder >
        <ImageWrapper src={ImageBanner(currentStatus)} />
        <FormattedMessage {...messages[currentStatus]} />
      </HeaderOrder>
    </PurchaseWrapper>
  )
}

PurchaseUsecase.propTypes = {
  status: PropTypes.string.isRequired
}

export default PurchaseUsecase
