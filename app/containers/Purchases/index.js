/*
 *
 * BarcodeLists
 *
 */

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Tab } from 'semantic-ui-react'

import PopupSlide from 'components/PopupSlide'
import WindowWidth from 'components/WindowWidth'

import {
  setPageTitleAction,
  setShowSearchIconAction,
  setShowActivityIconAction
} from 'containers/Buckets/actions'

import EmptyPurchase from './EmptyPurchases'
import EntityPurchases from './EntityPurchases'

import {
  selectLoader,
  selectModalToggle,
  selectActivePurchases,
  selectCompletedPurchases,
  selectExpiredPurchases,
  selectMarkdown,
  selectLoadingMarkdown
} from './selectors'

import {
  getApiPurchasesAction,
  getStoragePurchasesAction,

  getModalToggleAction,
  setModalToggleAction,

  setMobileNumberAction,
  getMarkDownAction
} from './actions'

export class Purchases extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    modalToggle: PropTypes.bool.isRequired,
    activePurchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    completedPurchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    expiredPurchases: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired
    ]),
    setPageTitle: PropTypes.func.isRequired,
    setShowSearchIcon: PropTypes.func.isRequired,
    setShowActivityIcon: PropTypes.func.isRequired,
    getApiPurchases: PropTypes.func.isRequired,
    changeRoute: PropTypes.func.isRequired,
    getModalToggle: PropTypes.func.isRequired,
    setModalToggle: PropTypes.func.isRequired,
    setMobileNumber: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    current: null
  }

  _goToHome = () => {
    this.props.changeRoute('/')
  }

  _handleShow = (entity) => {
    const { loading, changeRoute, windowWidth } = this.props

    if (loading === false && entity.size === 0) {
      return <EmptyPurchase />
    }

    return (
      <EntityPurchases
        entity={entity}
        changeRoute={changeRoute}
        windowWidth={windowWidth}
      />
    )
  }

  componentWillMount () {
    this.props.setPageTitle('My Activity')
    this.props.setShowSearchIcon(true)
    this.props.setShowActivityIcon(false)
  }

  componentDidMount () {
    const { getApiPurchases, getLocalPurchases, getModalToggle, getMarkDown } = this.props
    // fetch
    getModalToggle()
    // first we have to fetch what we already have on our local storage
    getLocalPurchases()
    // then we will call from our API
    getApiPurchases()

    getMarkDown()
  }

  render () {
    const { modalToggle, setMobileNumber, activePurchases, completedPurchases, expiredPurchases, markdown, loader } = this.props

    const panes = [
      { menuItem: 'Active', render: () => <Tab.Pane>{this._handleShow(activePurchases)}</Tab.Pane> },
      { menuItem: 'Compeleted', render: () => <Tab.Pane>{this._handleShow(completedPurchases)}</Tab.Pane> },
      { menuItem: 'Expired', render: () => <Tab.Pane>{this._handleShow(expiredPurchases)}</Tab.Pane> }
    ]

    return (
      <div>
        <Helmet
          title='Receipts'
          meta={[
            { name: 'description', content: 'List of barcodes' }
          ]}
        />

        <Tab panes={panes} />

        <PopupSlide
          submit={setMobileNumber}
          toggle={modalToggle}
          onClose={this._goToHome}
          loader={loader}
          markdown={markdown}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  activePurchases: selectActivePurchases(),
  completedPurchases: selectCompletedPurchases(),
  expiredPurchases: selectExpiredPurchases(),
  loading: selectLoader(),
  modalToggle: selectModalToggle(),
  markdown: selectMarkdown(),
  loader: selectLoadingMarkdown()
})

function mapDispatchToProps (dispatch) {
  return {
    setPageTitle: (payload) => dispatch(setPageTitleAction(payload)),
    setShowSearchIcon: (payload) => dispatch(setShowSearchIconAction(payload)),
    setShowActivityIcon: (payload) => dispatch(setShowActivityIconAction(payload)),
    getApiPurchases: (payload) => dispatch(getApiPurchasesAction(payload)),
    getLocalPurchases: () => dispatch(getStoragePurchasesAction()),
    getModalToggle: () => dispatch(getModalToggleAction()),
    setModalToggle: (payload) => dispatch(setModalToggleAction(payload)),
    setMobileNumber: (payload) => dispatch(setMobileNumberAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
    getMarkDown: payload => dispatch(getMarkDownAction()),
    dispatch
  }
}

export default WindowWidth(connect(mapStateToProps, mapDispatchToProps)(Purchases))
