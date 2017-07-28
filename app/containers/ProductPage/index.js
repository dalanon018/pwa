/*
 *
 * ProductPage
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Product from 'components/Product'
import PopupSlide from 'components/PopupSlide'

import {
  selectLoader,
  selectProduct,
  selectProductSuccess,
  selectProductError
} from './selectors'

import {
  getProductAction,
  setCurrentProductAction
} from './actions'

import {
  setToggleAction
} from 'containers/Buckets/actions'

import {
  selectToggle
} from 'containers/Buckets/selectors'

export class ProductPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super()
    this.state = {
      modalToggle: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  static propTypes = {
    getProduct: PropTypes.func.isRequired,
    setCurrentProduct: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    toggle: PropTypes.bool.isRequired
  }

  componentDidMount () {
    const { params: { id } } = this.props
    this.props.getProduct({ id })
    // this.handleSubmit()
  }

  handleToggle = () => {
    this.props.setToggle()
  }

  componentWillReceiveProps (nextProps) {
    const { productSuccess, productError } = nextProps
    if (productSuccess) {
      this.props.changeRoute('/review')
    }

    if (productError) {
      this.setState({
        modalToggle: productError
      })
    }
  }

  handleSubmit () {
    this.props.setCurrentProduct(this.props.product)
  }

  handleClose () {
    this.setState({
      modalToggle: false
    })
  }

  render () {
    const { loading, product, toggle, changeRoute } = this.props

    return (
      <div>
        <Helmet
          title='ProductPage'
          meta={[
            { name: 'description', content: 'Description of ProductPage' }
          ]}
        />
        <Product loading={loading} product={product} popup={this.handleToggle} />
        <PopupSlide
          submit={this.handleSubmit}
          product={product}
          modalClose={this.handleClose}
          changeRoute={changeRoute}
          modalToggle={this.state.modalToggle}
          toggle={toggle}
          onClose={this.handleToggle} />
      </div>
    )
  }
}

ProductPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoader(),
  product: selectProduct(),
  toggle: selectToggle(),
  productSuccess: selectProductSuccess(),
  productError: selectProductError()
})

function mapDispatchToProps (dispatch) {
  return {
    getProduct: (payload) => dispatch(getProductAction(payload)),
    setCurrentProduct: (payload) => dispatch(setCurrentProductAction(payload)),
    setToggle: payload => dispatch(setToggleAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)
