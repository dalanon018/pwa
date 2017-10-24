import React, { PropTypes } from 'react'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

import Purchase from 'components/Purchase'
import { imageStock } from 'utils/image-stock'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

const CustomGrid = styled(Grid)`
  @media (min-width: 1024px) {
    padding: 0 250px !important;
  }
`

const EntityPurchases = ({ entity, changeRoute, windowWidth }) => (
  <CustomGrid padded>
    {
      entity.map((receipt, index) =>
        <Purchase
          className='padding__bottom--15'
          defaultImage={imageStock('default-slider.jpg')}
          key={receipt.get('trackingNumber')}
          receipt={receipt}
          windowWidth={windowWidth}
          statuses={STATUSES}
          purchaseUsecases={PURCHASE_USECASE}
          purchaseOrders={PURCHASE_ORDER}
          changeRoute={changeRoute}
        />)
    }
  </CustomGrid>
)

EntityPurchases.propTypes = {
  entity: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
}

export default EntityPurchases
