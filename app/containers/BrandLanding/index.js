/**
 *
 * BrandLanding
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux'
import { compose } from 'redux'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import OrderTip from 'components/Mobile/OrderTip'
import MobileFooter from 'components/Mobile/Footer'
import AccessView from 'components/Shared/AccessMobileDesktopView'
import BrandsGroup from 'components/Mobile/BrandsGroup'
import WindowWidth from 'components/Shared/WindowWidth'

import { selectBrands } from 'containers/Buckets/selectors'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import { BRANDS_LANDING_PAGE } from 'containers/Buckets/constants'

const Wrapper = styled.div`
  padding-right: 15px;
  position: relative;
`

export class BrandLanding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setPageTitle: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    brands: PropTypes.object.isRequired
  }

  state = {
    isBottomScrolled: false
  }

  _handleGrouping = () => {
    const { brands, changeRoute, windowWidth } = this.props
    const { isBottomScrolled } = this.state
    const goToBrand = (id) => () => changeRoute(`/brands/${id}`)

    return (
      <Wrapper className='brands-landing-wrapper'>
        <AccessView
          mobileView={
            <BrandsGroup
              brands={brands}
              windowWidth={windowWidth}
              bottomScroll={isBottomScrolled}
              goToBrand={goToBrand} />
          }
          desktopView={null}
        />
      </Wrapper>
    )
  }

  // function to detect when scroollbar reaches the bottom of page
  _whenScrlBottom = () => {
    // http://coursesweb.net/javascript/
    let windowHeight = (this.innerHeight) ? this.innerHeight : document.body.clientHeight    // gets window height

    // gets current vertical scrollbar position
    let scrollPosition = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop

    // if scrollbar reaces to bottom
    if (document.body.scrollHeight <= (scrollPosition + windowHeight)) {
      this.setState({isBottomScrolled: true})
    } else {
      this.setState({isBottomScrolled: false})
    }
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._whenScrlBottom, false)
  }

  componentDidMount () {
    const { setPageTitle, setRouteName, intl, setShowActivityIcon, setShowSearchIcon, setShowPointsIcon } = this.props
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(BRANDS_LANDING_PAGE)

    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)

    window.addEventListener('scroll', this._whenScrlBottom, false)
  }

  render () {
    return (
      <div>
        <Helmet
          title='Brands Page'
          meta={[
          { name: 'description', content: '7-eleven CliQQ brands page' }
          ]}
        />
        {this._handleGrouping()}
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
  brands: selectBrands()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: payload => dispatch(setPageTitleAction(payload)),
    setRouteName: payload => dispatch(setRouteNameAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowPointsIcon: (payload) => dispatch(setShowPointsIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    changeRoute: url => dispatch(push(url)),
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'brandLanding', reducer })
const withSaga = injectSaga({ key: 'brandLanding', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(BrandLanding)))
