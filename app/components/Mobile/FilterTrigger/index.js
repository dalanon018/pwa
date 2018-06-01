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
import {
  anyPass,
  complement,
  compose,
  equals,
  prop,
  propOr,
  when
} from 'ramda'

import FilterIcon from 'images/icons/filter-icon.svg'
import FilteredIcon from 'images/icons/filtered-icon.svg'

import { getToggledOptions } from 'utils/multiSelect.js'

import FilterSlider from 'components/Mobile/FilterSlider'

import messages from './messages'

export const Wrapper = styled.div`
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

export const BackGroundLay = styled.div`
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
    queryCategory: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
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
    selectedCategory: {},
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

  _findCategory = ({ value, props = this.props }) => {
    const { filterCategories } = props
     // each request we have to reset our selected brand and toggle brand since we expect different data
    const foundCategory = filterCategories.find((category) => category.get('id') === value)
    return foundCategory ? foundCategory.toObject() : {}
  }

  _handleToggleCategory = (value) => {
    const { getFilterCategories, getFilterBrands } = this.props

    this.setState({
      selectedCategory: this._findCategory({ value }),
      toggleCategory: value,
      toggleBrands: [],
      selectedBrands: []
    })

    // we only call this fn if exist
    getFilterCategories && getFilterCategories({ category: value, allowEmpty: false })
    getFilterBrands && getFilterBrands({ category: value })
  }

  _handleToggleBrands = value => {
    const brands = getToggledOptions(this.state.toggleBrands, value)
    this.setState({
      toggleBrands: brands,
      selectedBrands: brands
    })
  }

  _handleToggleReset = () => {
    const { queryCategory, getFilterCategories, getFilterBrands } = this.props
    this.setState({
      selectedBrands: [],
      selectedCategory: {},
      toggleBrands: [],
      toggleCategory: queryCategory
    })
    getFilterCategories && getFilterCategories({ category: queryCategory })
    getFilterBrands && getFilterBrands({ category: queryCategory })
  }

  _handleSubmit = () => {
    const { requestFromFilter } = this.props
    const { selectedCategory, selectedBrands } = this.state

    document.getElementsByTagName('body')[0].classList.remove('custom__body')

    requestFromFilter({
      category: selectedCategory,
      brands: selectedBrands
    })

    this.setState({
      toggleDrawer: false
    })
  }

  componentDidMount () {
    const { queryBrands, queryCategory } = this.props
    const shouldUpdateSelectedBrands = when(
      compose(complement(equals(0)), propOr(0, 'length')),
      (brands) => this.setState(() => ({
        selectedBrands: brands,
        toggleBrands: brands
      }))
    )

    const shouldUpdateSelectedCategory = when(
      compose(complement(equals(0)), propOr(0, 'length')),
      (category) =>
        this.setState(() => ({
          toggleCategory: category || '',
          selectedCategory: this._findCategory({ value: category })
        }))
    )

    shouldUpdateSelectedCategory(queryCategory)
    shouldUpdateSelectedBrands(queryBrands)
  }

  componentWillReceiveProps (nextProps) {
    const { queryCategory, queryBrands } = this.props
    const shouldUpdateSelectionState = when(
      anyPass([
        compose(complement(equals(queryCategory)), prop('queryCategory')),
        compose(complement(equals(queryBrands)), prop('queryBrands'))
      ]),
      (props) =>
        this.setState(() => ({
          toggleCategory: props.queryCategory || '',
          selectedCategory: this._findCategory({ props, value: props.queryCategory }),
          toggleBrands: props.queryBrands || [],
          selectedBrands: props.queryBrands || []
        }))
    )
    shouldUpdateSelectionState(nextProps)
  }

  render () {
    const { queryCategory, filterCategories, filterBrands, filterCategoriesLoading, filterBrandsLoading, filtered } = this.props
    const { toggleDrawer, toggleBrands, toggleCategory, selectedBrands, selectedCategory } = this.state
    return (
      <div>
        { toggleDrawer && <BackGroundLay onClick={this._handleToggleDrawer} /> }
        <Wrapper className='background__fade-grey' onClick={this._handleToggleDrawer}>
          {
            filtered
            ? <Image src={FilteredIcon} alt='CLiQQ' />
            : <Image src={FilterIcon} alt='CLiQQ' />
          }
          <Label basic as='span' size='medium' className='color__primary text__weight--400'>
            <FormattedMessage {...messages.header} />
          </Label>
        </Wrapper>
        <FilterSlider
          queryCategory={queryCategory}
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
