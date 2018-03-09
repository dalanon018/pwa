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
import { toPairs } from 'ramda'
import { chunk } from 'lodash'

import { categoriesGroup } from 'utils/categories-group'

import { Grid, Container, Image, Label } from 'semantic-ui-react'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import BrandItem from 'components/Mobile/PlainCard'
import OrderTip from 'components/Mobile/OrderTip'
import MobileFooter from 'components/Mobile/Footer'
import AccessView from 'components/Shared/AccessMobileDesktopView'

import { selectBrands } from 'containers/Buckets/selectors'
import { setPageTitleAction, setRouteNameAction } from 'containers/Buckets/actions'
import { BRANDS_LANDING_PAGE } from 'containers/Buckets/constants'

const Wrapper = styled.div`
  padding-right: 15px;
  position: relative;
`

const NavWrapper = styled.div`
  border-left: 1px solid #E8E8E8;
  height: 54vh;
  overflow-y: auto;
  padding: 15px 0;
  position: fixed;
  right: 0;
  text-align: center;
  top: 50px;
  width: 15px;
  z-index: 1;
`

const GroupWrapper = styled.div`
  box-shadow: 0 0 5px rgba(120,120,120, 0.1);
`

export class BrandLanding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setPageTitle: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    brands: PropTypes.object.isRequired
  }

  _handleNavAnchor = () => {
    const { brands } = this.props
    const groupBrands = categoriesGroup(brands)

    return (
      <NavWrapper className='background__white'>
        {
         toPairs(groupBrands).map(([title, item], key) => {
           return (
             <div key={key}>
               <Label as='a' href={`#${title + key}`} basic size='mini' className='padding__none text__weight--500'>
                 { title }
               </Label>
             </div>
           )
         })
       }
      </NavWrapper>
    )
  }

  _handleGrouping = () => {
    const { brands } = this.props
    const groupBrands = categoriesGroup(brands)

    return (
      <Wrapper className='brands-landing-wrapper'>
        {this._handleNavAnchor()}
        {
          toPairs(groupBrands).map(([title, item], key) => {
            const chunkItem = chunk(item, 5)
            return (
              <div key={key}>
                <Container className='padding__none--vertical'>
                  <Grid padded>
                    <Grid.Row>
                      <Grid.Column>
                        <Label id={`${title + key}`} as='span' basic size='large' className='text__weight--500'>
                          { title }
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
                <GroupWrapper className='background__white'>
                  <Grid padded>
                    <Grid.Row columns={3} stretched verticalAlign='top'>
                      {
                        chunkItem.map((entity, key) => (
                          entity.map((data, index) => (
                            <Grid.Column key={index} className='padding__bottom--15'>
                              <div>
                                <BrandItem borderRadius height={90}>
                                  <Image src={data.get('background')} alt={data.get('name')} />
                                </BrandItem>
                                <Label as='p' basic size='medium' className='margin__top-positive--10 text__weight--400'>{data.get('name')}</Label>
                              </div>
                            </Grid.Column>
                          ))
                        ))
                      }
                    </Grid.Row>
                  </Grid>
                </GroupWrapper>
              </div>
            )
          })
        }
      </Wrapper>
    )
  }

  componentDidMount () {
    const { setPageTitle, setRouteName, intl } = this.props
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(BRANDS_LANDING_PAGE)
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
)(injectIntl(BrandLanding))
