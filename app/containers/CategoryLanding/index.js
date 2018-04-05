/**
 *
 * CategoryLanding
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import { imageStock } from 'utils/image-stock'
import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import { Grid, Container, Image, Label } from 'semantic-ui-react'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import CategoryItem from 'components/Mobile/PlainCard'
import OrderTip from 'components/Mobile/OrderTip'
import MobileFooter from 'components/Mobile/Footer'
import AccessView from 'components/Shared/AccessMobileDesktopView'
import WindowWidth from 'components/Shared/WindowWidth'

import { selectProductCategories } from 'containers/Buckets/selectors'
import {
  setPageTitleAction,
  setRouteNameAction,
  setShowSearchIconAction,
  setShowPointsIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'
import { CATEGORIES_LANDING_PAGE } from 'containers/Buckets/constants'

const ImageWrapper = styled.div`
  img {
    margin: 0 auto;
    width: 40px;
  }
`

export class CategoryLanding extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setPageTitle: PropTypes.func.isRequired,
    setRouteName: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired
  }

  _handleGoTo = (id, name) => () => {
    const { changeRoute } = this.props

    changeRoute(`/products-category/${id}?name=${name}`)
  }

  componentDidMount () {
    const { setPageTitle, setRouteName, intl, setShowActivityIcon, setShowSearchIcon, setShowPointsIcon } = this.props
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(CATEGORIES_LANDING_PAGE)
    setShowSearchIcon(true)
    setShowPointsIcon(false)
    setShowActivityIcon(true)
  }

  render () {
    const { categories, windowWidth } = this.props

    const imgixOptions = {
      w: 40,
      h: 40,
      fit: 'clamp', // we need to make sure that this is clamp so it will base on the container.
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return (
      <div>
        <Helmet
          title='Category Page'
          meta={[
          { name: 'description', content: '7-eleven CLiQQ Category Page' }
          ]}
        />
        <Container>
          <Grid padded>
            <Grid.Row columns={2} stretched>
              {
                categories.map(category => {
                  return (
                    <Grid.Column className='padding__bottom--10' key={category.get('id')} onClick={this._handleGoTo(category.get('id'), category.get('name'))}>
                      <CategoryItem borderRadius height={windowWidth >= 767 ? 150 : 95}>
                        <div className='text__align--center padding__10'>
                          <ImageWrapper>
                            {
                              category.get('background')
                              ? <Image src={category.get('background')} alt='CLiQQ' />
                              : <Image src={imageStock('Brands-Default.jpg', imgixOptions)} />
                            }
                          </ImageWrapper>
                          <Label basic as='span' size='medium' className='text__weight--400 margin__top-positive--10'>
                            {category.get('name')}
                          </Label>
                        </div>
                      </CategoryItem>
                    </Grid.Column>
                  )
                })
              }
            </Grid.Row>
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
  categories: selectProductCategories()
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

const withReducer = injectReducer({ key: 'categoryLanding', reducer })
const withSaga = injectSaga({ key: 'categoryLanding', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(WindowWidth(injectIntl(CategoryLanding)))
