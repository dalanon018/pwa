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

import { selectProductCategories } from 'containers/Buckets/selectors'
import { setPageTitleAction, setRouteNameAction } from 'containers/Buckets/actions'
import { FLASH_DEALS_LANDING_PAGE } from 'containers/Buckets/constants'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

export class FlashDealsLanding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setPageTitle: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    brands: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { setPageTitle, setRouteName, intl } = this.props
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(FLASH_DEALS_LANDING_PAGE)
  }

  render () {
    const { categories } = this.props
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
              categories.map(category => {
                return (
                  <Grid.Row key={category.get('id')}>
                    <Grid.Column>
                      <FlashDealItem borderRadius height={120}>
                        <Image src={category.get('background')} alt='CLiQQ' />
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

FlashDealsLanding.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  categories: selectProductCategories()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: payload => dispatch(setPageTitleAction(payload)),
    setRouteName: payload => dispatch(setRouteNameAction(payload)),
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
