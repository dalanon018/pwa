/*
 *
 * SearchPage
 *
 */

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { Grid } from 'semantic-ui-react'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import ProductResults from 'components/ProductResults'
import WindowWidth from 'components/WindowWidth'

import EmptyProducts from './EmptyProducts'

import {
  selectSearchProductLoading,
  selectSearchProduct,
  selectProductSuccess,
  selectProductError
} from './selectors'

import {
  setCurrentProductAction,
  setMobileNumbersAction,
  setProductHandlersDefaultAction
} from './actions'

import {
  setToggleAction
} from 'containers/Buckets/actions'

import {
  selectToggle
} from 'containers/Buckets/selectors'

const SearchListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
`

export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * Handler where we will able to identify if the user click search
   * since search input component is not here.
   */
  _userSearch = false

  static propTypes = {
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    setHandlersDefault: PropTypes.func.isRequired,
    toggle: PropTypes.bool.isRequired,
    productSuccess: PropTypes.bool.isRequired,
    productError: PropTypes.bool.isRequired
  }

  constructor () {
    super()

    this.state = {
      modalToggle: false
    }

    this._handleSubmit = this._handleSubmit.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleToggle = this._handleToggle.bind(this)
    this._displayProduct = this._displayProduct.bind(this)
    this._displayEmpty = this._displayEmpty.bind(this)
  }

  _handleSubmit ({ value }) {
    const { product, setCurrentProduct, setMobileNumbers } = this.props

    this.successSubmission = true

    setCurrentProduct(product)
    setMobileNumbers(value)
  }

  _handleClose () {
    this.setState({
      modalToggle: false
    })
  }

  _handleToggle = () => {
    this.props.setToggle()
  }

  _displayProduct () {
    const { product, changeRoute, windowWidth } = this.props
    const responsiveColumns = () => {
      if (windowWidth >= 768 && windowWidth < 1299) {
        return 2
      } else if (windowWidth >= 1200) {
        return 3
      }

      return 1
    }

    if (product.size > 0) {
      return (
        <Grid>
          <Grid.Row columns={responsiveColumns()}>
            {
              product.map((result) =>
                <ProductResults
                  key={result.get('cliqqCode').first()}
                  product={result}
                  changeRoute={changeRoute}
                />
              )
            }
          </Grid.Row>
        </Grid>
      )
    }

    return null
  }

  _displayEmpty () {
    const { product, loading } = this.props

    if (loading === false && product.size === 0 && this._userSearch === true) {
      return (
        <EmptyProducts />
      )
    }

    return null
  }

  componentWillUnmount () {
    this.props.setHandlersDefault()
  }

  componentWillReceiveProps (nextProps) {
    this._userSearch = true
  }

  render () {
    return (
      <SearchListWrapper>
        <Helmet
          title='Search'
          meta={[
            { name: 'description', content: 'Description of SearchPage' }
          ]}
        />
        { this._displayEmpty() }
        { this._displayProduct() }
      </SearchListWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  product: selectSearchProduct(),
  loading: selectSearchProductLoading(),
  toggle: selectToggle(),
  productSuccess: selectProductSuccess(),
  productError: selectProductError()
})

function mapDispatchToProps (dispatch) {
  return {
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    setMobileNumbers: (payload) => dispatch(setMobileNumbersAction(payload)),
    setToggle: (payload) => dispatch(setToggleAction(payload)),
    setHandlersDefault: () => dispatch(setProductHandlersDefaultAction()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(SearchPage))
