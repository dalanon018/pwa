import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import MobilePurchase from 'components/Mobile/Purchase'
import DesktopPurchase from 'components/Desktop/Purchase'
import AccessView from 'components/Shared/AccessMobileDesktopView'

import { imageStock } from 'utils/image-stock'

import {
  STATUSES,
  PURCHASE_ORDER,
  PURCHASE_USECASE
} from 'containers/Buckets/constants'

const EntityPurchases = ({ entity, changeRoute, windowWidth }) => (
  <Grid padded columns={1}>
    {
      entity.map((receipt, index) =>
        <Grid.Column
          key={receipt.get('trackingNumber')}
        >
          <AccessView
            mobileView={
              <MobilePurchase
                className='padding__bottom--15'
                defaultImage={imageStock('Brands-Default.jpg')}
                receipt={receipt}
                windowWidth={windowWidth}
                statuses={STATUSES}
                purchaseUsecases={PURCHASE_USECASE}
                purchaseOrders={PURCHASE_ORDER}
                changeRoute={changeRoute}
              />
            }
            desktopView={
              <DesktopPurchase
                className='padding__bottom--15'
                defaultImage={imageStock('Brands-Default.jpg')}
                receipt={receipt}
                windowWidth={windowWidth}
                statuses={STATUSES}
                purchaseUsecases={PURCHASE_USECASE}
                purchaseOrders={PURCHASE_ORDER}
                changeRoute={changeRoute}
              />
            }
          />
        </Grid.Column>
      )}
  </Grid>
)

EntityPurchases.propTypes = {
  entity: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired
}

export default EntityPurchases
