/**
*
* FilterSection
*
*/

import React from 'react'
import styled from 'styled-components'
import { Label, List } from 'semantic-ui-react'

import { FormattedMessage } from 'react-intl'
import messages from './messages'

const Wrapper = styled.div`
  
`

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

function FilterSection ({
  filterCategories,
  filterCategoriesLoading
}) {
  return (
    <Wrapper>
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
                <List.Item key={category.get('id')}>
                  <Label basic size='large' className='text__weight--400 padding__vertical--none cursor__pointer padding__horizontal--none'>
                    {category.get('name')}
                  </Label>
                </List.Item>
              )
            })
          }
        </List>
      </CategoriesContainer>
    </Wrapper>
  )
}

FilterSection.propTypes = {

}

export default FilterSection
