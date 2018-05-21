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
import messages from './messages'

const Header = styled.div`
  padding-bottom: 10px;
`

const CategoriesContainer = styled.div`
  padding-bottom: 10px;

  .item {
    .label.large {
      &:hover {
        color: #FF4813 !important;
      }
    }
  }
`

const BrandsContainer = styled.div`
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

const requestBrandFilter = ({ fn, ...props }) => () => fn(props)

const ListCategory = ({ category, onClick }) => (
  <List.Item onClick={onClick}>
    <Label basic size='large' className='text__weight--400 padding__vertical--none cursor__pointer padding__horizontal--none'>
      {category.get('name')}
    </Label>
  </List.Item>
)

const ListBrand = ({ brand, onClick }) => {
//   let label = <Label basic size='large' className='text__weight--400 padding__vertical--none cursor__pointer padding__horizontal--none'>
//   {brand.get('name')}
// </Label>
  return (
    <List.Item onClick={onClick}>
      <Checkbox label={brand.get('name')} />
    </List.Item>
  )
}

ListCategory.propTypes = {
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

function FilterSection ({
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
          {
            !filterCategoriesLoading &&
            filterCategories.map(category => {
              return (
                <ListCategory
                  key={category.get('id')}
                  onClick={requestBrandFilter({
                    category: { id: category.get('id'), name: category.get('name') },
                    fn: requestFromFilter
                  })}
                  category={category}
                />
              )
            })
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
            {
              !filterBrandsLoading &&
              filterBrands.map(brand => {
                return (
                  <ListBrand
                    key={brand.get('id')}
                    onClick={requestBrandFilter({
                      brand: { id: brand.get('id'), name: brand.get('name') },
                      fn: requestFromFilter
                    })}
                    brand={brand}
                  />
                )
              })
            }
          </List>
        </BrandsContainer>
      }
    </div>
  )
}

FilterSection.propTypes = {
  filterCategories: PropTypes.object.isRequired,
  filterCategoriesLoading: PropTypes.bool.isRequired,
  requestFromFilter: PropTypes.func.isRequired
}

export default FilterSection
