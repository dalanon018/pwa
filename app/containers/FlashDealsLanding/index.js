/**
 *
 * FlashDealsLanding
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import { Grid, Container, Image } from 'semantic-ui-react'

import FlashDealItem from 'components/Mobile/PlainCard'
import OrderTip from 'components/Mobile/OrderTip'
import MobileFooter from 'components/Mobile/Footer'
import AccessView from 'components/Shared/AccessMobileDesktopView'

import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import { FLASH_DEALS_LANDING_PAGE } from 'containers/Buckets/constants'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import { imageStock } from 'utils/image-stock'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import { getPromosAction } from './actions'
import {
  selectPromos,
  selectPromosLoading
} from './selectors'

export class FlashDealsLanding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setPageTitle: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getPromos: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    promos: PropTypes.object.isRequired,
    promosLoading: PropTypes.bool.isRequired
  }

  _handleImgixOptions = () => {
    return {
      w: 335,
      h: 120,
      fit: 'clamp', // we need to make sure that this is clamp so it will base on the container.
      auto: 'compress',
      q: 35,
      lossless: 0
    }
  }

  _handleDefaultState = () => {
    return (
      <Grid.Row>
        <Grid.Column>
          <FlashDealItem borderRadius height={120}>
            <Image className='height__inherit' src={imageStock('Slider-Default.jpg', this._handleImgixOptions())} alt='CLiQQ' />
          </FlashDealItem>
        </Grid.Column>
      </Grid.Row>
    )
  }

  componentDidMount () {
    const { setPageTitle, setRouteName, intl, setShowSearchIcon, setShowPointsIcon, setShowActivityIcon, getPromos } = this.props
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(FLASH_DEALS_LANDING_PAGE)
    getPromos()

    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)
  }

  render () {
    const { promos, promosLoading, changeRoute } = this.props

    return (
      <div>
        <Helmet
          title='Flash Deals Page'
          meta={[
          { name: 'description', content: '7-eleven CliQQ flash deals page' }
          ]}
        />
        <Container>
          <Grid padded>
            {
              promosLoading
              ? this._handleDefaultState()
              : promos.map(promo => {
                return (
                  <Grid.Row key={promo.get('id')}>
                    <Grid.Column onClick={() => changeRoute(`/promos/${promo.get('promoCode')}`)}>
                      <FlashDealItem borderRadius height={120}>
                        {
                          promo.get('background')
                          ? <Image className='height__inherit' src={promo.get('background')} alt='CLiQQ' />
                          : <Image className='height__inherit' src={imageStock('Slider-Default.jpg', this._handleImgixOptions())} alt='CLiQQ' />
                        }

                      </FlashDealItem>
                    </Grid.Column>
                  </Grid.Row>
                )
              })
            }
          </Grid>
        </Container>
        <div className='margin__bottom-positive--20'>
          <OrderTip />
        </div>
        <AccessView
          mobileView={<MobileFooter />}
          desktopView={null}
        />

      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  promos: selectPromos(),
  promosLoading: selectPromosLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: payload => dispatch(setPageTitleAction(payload)),
    setRouteName: payload => dispatch(setRouteNameAction(payload)),
    getPromos: payload => dispatch(getPromosAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    changeRoute: url => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'flashDealsLanding', reducer })
const withSaga = injectSaga({ key: 'flashDealsLanding', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(FlashDealsLanding))
