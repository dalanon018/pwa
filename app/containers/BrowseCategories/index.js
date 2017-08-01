/*
 *
 * BrowseCategories
 *
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { push } from 'react-router-redux'
import { createStructuredSelector } from 'reselect'
import messages from './messages'

import { Grid } from 'semantic-ui-react'
import Category from 'components/Category'
import Footer from 'components/Footer'
import H1 from 'components/H1'

import {
  getCategoriesAction
} from './actions'

import {
  selectCategories,
  selectLoading
} from './selectors'

export class BrowseCategories extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loader: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.getCategories()
  }

  render () {
    const { categories, loader, changeRoute } = this.props
    const grids = {
      mobile: 8,
      tablet: 8,
      computer: 4,
      widescreen: 4
    }
    return (
      <div>
        <div className='padding__horizontal--10'>
          <Grid padded>
            <H1 center className='padding__top--25'><FormattedMessage {...messages.header} /></H1>
            <Category
              margin='5'
              loader={loader}
              categories={categories}
              height='160'
              iconWidth='45'
              changeRoute={changeRoute}
              route='/products-category'
              fontSize='14'
              grids={grids} />
          </Grid>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  loader: selectLoading(),
  categories: selectCategories()
})

function mapDispatchToProps (dispatch) {
  return {
    getCategories: (payload) => dispatch(getCategoriesAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCategories)
