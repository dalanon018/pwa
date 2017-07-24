/**
*
* Promo
*
*/

import React from 'react'
// import styled from 'styled-components';
import moment from 'moment'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Image, List } from 'semantic-ui-react'

import H1 from 'components/H1'
import Countdown from 'components/Countdown'
import EmptyDataBlock from 'components/EmptyDataBlock'
import EmptyImage from 'images/broken-image.jpg'
import SamplePromo from 'images/test-images/promo-test.jpg'

import {
  DefaultPromoImage,
  PromoWrapper
} from './styles'

import backgroundImage from 'images/PICK-UP-BG.png'

function Promo ({
  loader
}) {
  return (
    <PromoWrapper background={backgroundImage}>
      <H1><FormattedMessage {...messages.limitedOffer} /></H1>
      <Countdown endDate={(moment().add(1, 'hours').valueOf() / 1000)} />
      {
        loader ? <DefaultState loader={loader} />
        : <List>
          <List.Item>
            <Image src={SamplePromo} />
          </List.Item>
          <List.Item>
            <Image src={SamplePromo} />
          </List.Item>
        </List>
      }
    </PromoWrapper>
  )
}

const DefaultState = () => {
  return (
    <EmptyDataBlock>
      <List.Item>
        <DefaultPromoImage background={EmptyImage} />
      </List.Item>
    </EmptyDataBlock>
  )
}

Promo.propTypes = {

}

export default Promo