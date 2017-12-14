import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'

import Purchase from 'components/Purchase'
import { imageStock } from 'utils/image-stock'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

const CustomGrid = styled.div`
  padding: 10px !important;

  @media (max-width: 375px) {
    padding: 0 !important;
  }

  @media (min-width: 1441px) {
    padding: 10px 250px !important;
  }
`

const EntityPurchases = ({ entity, changeRoute, windowWidth }) => (
  <CustomGrid>
    <Grid padded columns={windowWidth > 1023 ? 2 : 1}>
      {
        entity.map((receipt, index) =>
          <Grid.Column
            key={receipt.get('trackingNumber')}
          >
            <Purchase
              className='padding__bottom--15'
              defaultImage={imageStock('Slider-Default.jpg')}
              receipt={receipt}
              windowWidth={windowWidth}
              statuses={STATUSES}
              purchaseUsecases={PURCHASE_USECASE}
              purchaseOrders={PURCHASE_ORDER}
              changeRoute={changeRoute}
            />
          </Grid.Column>
        )}
    </Grid>
  </CustomGrid>
)

EntityPurchases.propTypes = {
  entity: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
}

export default EntityPurchases
