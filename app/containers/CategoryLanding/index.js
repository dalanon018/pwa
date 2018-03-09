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

import { selectProductCategories } from 'containers/Buckets/selectors'
import { setPageTitleAction, setRouteNameAction } from 'containers/Buckets/actions'
import { CATEGORIES_NAME } from 'containers/Buckets/constants'

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
    const { setPageTitle, setRouteName, intl } = this.props
    setPageTitle(intl.formatMessage(messages.header))
    setRouteName(CATEGORIES_NAME)
  }

  render () {
    const { categories } = this.props

    return (
      <div>
        <Helmet
          title='Category Page'
          meta={[
          { name: 'description', content: '7-eleven CliQQ category page' }
          ]}
        />
        <Container>
          <Grid padded>
            <Grid.Row columns={2} stretched>
              {
                categories.map(category => {
                  return (
                    <Grid.Column className='padding__bottom--10' key={category.get('id')} onClick={this._handleGoTo(category.get('id'), category.get('name'))}>
                      <CategoryItem borderRadius height={90}>
                        <div className='text__align--center padding__10'>
                          <Image src={category.get('background')} alt={category.get('name')} />
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
)(injectIntl(CategoryLanding))
