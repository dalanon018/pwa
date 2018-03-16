/**
*
* FilterTrigger
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import { Image, Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import {
  complement,
  compose,
  equals,
  isEmpty,
  propOr,
  when
} from 'ramda'

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
  static propTypes = {
    getFilterCategories: PropTypes.func.isRequired,
    requestFromFilter: PropTypes.func.isRequired,
    filterCategories: PropTypes.object.isRequired,
    filterCategoriesLoading: PropTypes.bool.isRequired,
    parentId: PropTypes.string,
    getFilterBrands: PropTypes.func,
    filterBrands: PropTypes.object,
    filterBrandsLoading: PropTypes.bool
  }

  static childContextTypes = {
    handleToggleCategory: PropTypes.func.isRequired,
    handleToggleBrands: PropTypes.func.isRequired,
    toggleReset: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    selectedBrands: [],
    selectedCategory: '',
    toggleDrawer: false,
    toggleBrands: [],
    toggleCategory: ''
  }

  getChildContext () {
    return {
      handleToggleCategory: this._handleToggleCategory,
      handleToggleBrands: this._handleToggleBrands,
      toggleReset: this._handleToggleReset,
      handleSubmit: this._handleSubmit
    }
  }

  _handleToggleDrawer = () => {
    this.setState(prevState => ({toggleDrawer: !prevState.toggleDrawer}))
    document.getElementsByTagName('body')[0].classList.toggle('custom__body')
  }

  _handleToggleCategory = value => {
    const { getFilterCategories, getFilterBrands } = this.props
    // each request we have to reset our selected brand and toggle brand since we expect different data
    this.setState({
      toggleCategory: value,
      selectedCategory: value,
      toggleBrands: [],
      selectedBrands: []
    })


    // we only call this fn if exist
    getFilterCategories && getFilterCategories({ id: value })
    getFilterBrands && getFilterBrands({ id: value })
  }

  _handleToggleBrands = value => {
    const brands = getToggledOptions(this.state.toggleBrands, value)
    this.setState({
      toggleBrands: brands,
      selectedBrands: brands
    })
  }

  _handleToggleReset = () => {
    const { parentId, getFilterCategories, getFilterBrands } = this.props
    this.setState({
      selectedBrands: [],
      selectedCategory: '',
      toggleBrands: [],
      toggleCategory: ''
    })

    getFilterCategories && getFilterCategories({ id: parentId })
    getFilterBrands && getFilterBrands({ id: parentId })
  }

  _handleSubmit = () => {
    const { parentId, requestFromFilter, filterCategories } = this.props
    const { selectedCategory, selectedBrands } = this.state

    const foundCategory = filterCategories.find((category) => category.get('id') === selectedCategory)
    const category = foundCategory ? foundCategory.toObject() : {}

    requestFromFilter({
      category,
      brands: selectedBrands
    })

    this.setState({
      toggleDrawer: false
    })
  }

  componentDidMount () {
    const { brands } = queryString.parse(window.location.search)
    const shouldUpdateSelectedBrands = when(
      compose(complement(equals(0)), propOr(0, 'length')),
      (param) => this.setState(() => ({
        selectedBrands: param.split(','),
        toggleBrands: param.split(',')
      }))
    )

    shouldUpdateSelectedBrands(brands)
  }

  render () {
    const { filterCategories, filterBrands, filterCategoriesLoading, filterBrandsLoading } = this.props
    const { toggleDrawer, toggleBrands, toggleCategory, selectedBrands, selectedCategory } = this.state

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
          selectedBrands={selectedBrands}
          selectedCategory={selectedCategory}
          toggleDrawer={toggleDrawer}
          toggleCategory={toggleCategory}
          toggleBrands={toggleBrands}
          categories={filterCategories}
          brands={filterBrands}
          categoriesLoading={filterCategoriesLoading}
          brandsLoading={filterBrandsLoading}
        />
      </div>
    )
  }
}

export default FilterTrigger
