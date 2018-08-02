/**
*
* FilterSection
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Label, List, Checkbox } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import {
  __,
  assoc,
  compose,
  identity,
  ifElse,
  partial,
  without
} from 'ramda'

import LoadingIndicator from 'components/Shared/LoadingIndicator'

import messages from './messages'

export const Header = styled.div`
  padding-bottom: 10px;
`

export const CategoriesContainer = styled.div`
  padding-bottom: 10px;

  .item {
    .label.large {
      &:hover {
        color: #FF4813 !important;
      }
    }
  }
`

export const LabelSelected = styled(({ isSelected, ...props }) => <Label {...props} />)`
  color: ${({ isSelected }) => isSelected ? '#FF4813' : 'inherit'}!important;
`

export const BrandsContainer = styled.div`
  .ui.checkbox {
    &.box:before, label:before {
      border-radius: 0;
      height: 12px;
      top: 2px;
      width: 12px;
    }

    &.box:after, label:after {
      font-size: 11px;
      height: 12px;
      width: 12px;
    }

    input:checked~.box:after, input:checked~label:after {
      color: rgb(255, 72, 19);
    }
  }
`

const requestRealtimeFilter = ({ fn, ...props }) => () => fn(props)

const ListCategory = ({ category, onClick, queryCategory, itemsLoading }) => {
  const isSelected = (queryCategory === category.get('id'))
  const redirectPage = (isSelected || itemsLoading) ? () => {} : onClick
  return (
    <List.Item onClick={redirectPage}>
      <LabelSelected isSelected={isSelected} basic size='large' className='text__weight--400 padding__vertical--none cursor__pointer padding__horizontal--none'>
        {category.get('name')}
      </LabelSelected>
    </List.Item>
  )
}

ListCategory.propTypes = {
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  itemsLoading: PropTypes.bool.isRequired
}

const brandCheckboxChange = ({
  id,
  queryBrands,
  requestFromFilter,
  itemsLoading
}) => (evt, { checked }) => {
  const concatBrands = (id) => [...queryBrands, id]
  const removeBrands = (id) => without([id], queryBrands)

  // it item is loading we should not allow them to check brands since its still loading and will mess up the data that should be updated.
  if (itemsLoading) {
    evt.preventDefault()
    return
  }

  const updateRemoveQueryBrands = ifElse(
    identity,
    partial(concatBrands, [id]),
    partial(removeBrands, [id])
  )
  const prepRequestFilter = compose(
    requestRealtimeFilter,
    assoc('brands', __, { fn: requestFromFilter, category: {} }),
    updateRemoveQueryBrands
  )(checked)

  prepRequestFilter()
}

const ListBrand = ({
  brand,
  queryBrands,
  requestFromFilter,
  itemsLoading
}) => {
  return (
    <List.Item>
      <Checkbox checked={(queryBrands.indexOf(brand.get('id')) > -1)} label={brand.get('name')} onChange={brandCheckboxChange({
        id: brand.get('id'),
        queryBrands,
        requestFromFilter,
        itemsLoading
      })} />
    </List.Item>
  )
}

ListBrand.propTypes = {
  brand: PropTypes.object.isRequired,
  queryBrands: PropTypes.array,
  requestFromFilter: PropTypes.func.isRequired,
  itemsLoading: PropTypes.bool.isRequired
}

function FilterSection ({
  itemsLoading,

  queryCategory,
  queryBrands,

  filterCategories,
  filterCategoriesLoading,
  requestFromFilter,

  filterBrandsLoading,
  filterBrands
}) {
  return (
    <div>
      <Header>
        <Label basic size='big' className='text__weight--500 padding__horizontal--none padding__top--none'>
          <FormattedMessage {...messages.filterBy} />
        </Label>
      </Header>
      <CategoriesContainer className='border_bottom__one--light-grey border_top__one--light-grey'>
        <Label basic size='large' className='color__grey text__weight--500 padding__none--bottom padding__horizontal--none'>
          <FormattedMessage {...messages.categoriesLabel} />
        </Label>
        <List>
          { filterCategoriesLoading && <LoadingIndicator /> }
          {
            filterCategories.size ? filterCategories.map(category => {
              return (
                <ListCategory
                  key={category.get('id')}
                  onClick={requestRealtimeFilter({
                    category: { id: category.get('id'), name: category.get('name') },
                    brands: [],
                    fn: requestFromFilter
                  })}
                  queryCategory={queryCategory}
                  category={category}
                  itemsLoading={itemsLoading}
                />
              )
            }) : ''
          }
        </List>
      </CategoriesContainer>
      {
        filterBrands &&
        <BrandsContainer>
          <Label basic size='large' className='color__grey text__weight--500 padding__none--bottom padding__horizontal--none'>
            <FormattedMessage {...messages.brandsLabel} />
          </Label>
          <List>
            { filterBrandsLoading && <LoadingIndicator /> }
            {
              filterBrands.size ? filterBrands.map(brand => {
                return (
                  <ListBrand
                    key={brand.get('id')}
                    queryBrands={queryBrands}
                    requestFromFilter={requestFromFilter}
                    brand={brand}
                    itemsLoading={itemsLoading}
                  />
                )
              }) : ''
            }
          </List>
        </BrandsContainer>
      }
    </div>
  )
}

FilterSection.propTypes = {
  itemsLoading: PropTypes.bool.isRequired,
  queryCategory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  queryBrands: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  filterCategories: PropTypes.object.isRequired,
  filterCategoriesLoading: PropTypes.bool.isRequired,
  filterBrands: PropTypes.object,
  filterBrandsLoading: PropTypes.bool,
  requestFromFilter: PropTypes.func.isRequired
}

export default FilterSection
