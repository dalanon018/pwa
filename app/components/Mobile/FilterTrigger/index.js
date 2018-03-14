/**
*
* FilterTrigger
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Image, Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

import FilterIcon from 'images/icons/filter-icon.svg'

import { getToggledOptions } from 'utils/multiSelect.js'

import FilterSlider from 'components/Mobile/FilterSlider'

import messages from './messages'

const Wrapper = styled.div`
  align-items: center;
  box-shadow: 0 0 5px rgba(120,120,120, 0.1);
  display: flex;
  justify-content: center;
  left: 0;
  padding: 10px 0;
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 9;

  img {
    width: 12px;
    margin-right: 10px;
  }
`

const BackGroundLay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
`

class FilterTrigger extends React.PureComponent {
  static childContextTypes = {
    toggleDrawer: PropTypes.bool.isRequired,
    toggleRadio: PropTypes.string,
    handleToggleRadio: PropTypes.func.isRequired,
    toggleCheckbox: PropTypes.array,
    handleToggleCheckbox: PropTypes.func.isRequired,
    toggleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    toggleDrawer: false,
    toggleCheckbox: [],
    toggleRadio: ''
  }

  getChildContext () {
    return {
      toggleDrawer: this.state.toggleDrawer,
      toggleRadio: this.state.toggleRadio,
      handleToggleRadio: this._handleToggleRadio,
      toggleCheckbox: this.state.toggleCheckbox,
      handleToggleCheckbox: this._handleToggleCheckbox,
      toggleReset: this._handleToggleReset,
      handleSubmit: this._handleSubmit
    }
  }

  _handleToggleDrawer = () => {
    this.setState(prevState => ({toggleDrawer: !prevState.toggleDrawer}))
    document.getElementsByTagName('body')[0].classList.toggle('custom__body')
  }

  _handleToggleRadio = value => this.setState({toggleRadio: value})

  _handleToggleCheckbox = value => this.setState({toggleCheckbox: getToggledOptions(this.state.toggleCheckbox, value)})

  _handleToggleReset = () => {
    this.setState({
      toggleCheckbox: [],
      toggleRadio: ''
    })
  }

  _handleSubmit = () => {
    this.setState({toggleDrawer: false})
  }

  render () {
    const { filterCategories, filterBrands } = this.props
    const { toggleDrawer } = this.state

    return (
      <div>
        { toggleDrawer && <BackGroundLay onClick={this._handleToggleDrawer} /> }
        <Wrapper className='background__fade-grey' onClick={this._handleToggleDrawer}>
          <Image src={FilterIcon} alt='CLiQQ' />
          <Label basic as='span' size='medium' className='color__primary text__weight--400'>
            <FormattedMessage {...messages.header} />
          </Label>
        </Wrapper>
        <FilterSlider
          categories={filterCategories}
          brands={filterBrands}
        />
      </div>
    )
  }
}

export default FilterTrigger
