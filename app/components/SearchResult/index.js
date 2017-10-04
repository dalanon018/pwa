/**
*
* SearchResult
*
*/

import React from 'react'
import { List, Icon, Label } from 'semantic-ui-react'
import styled from 'styled-components'

const CustomIcon = styled(Icon)`
  color: #F58322;
  font-size: 16px !important;
  padding: 14px;
`
const Title = styled(Label)`
  font-size: 18px;
`
const Content = styled.p`
  font-size: 14px;
`
const CustomItem = styled(List.Item)`
  padding: 10px !important;

  &>.divided {
    border-top: 1px solid #F0F0F0 !important;
  }
`

const _productTitle = (title) => {
  const maxChar = 40

  if (title.length > maxChar) {
    return `${title.slice(0, maxChar)}. . .`
  }
  return title
}

function SearchResult ({ product, changeRoute }) {
  return (
    <List divided verticalAlign='middle'>
      {
        product.map((result, index) => {
          return (
            <CustomItem
              key={index}
              onClick={changeRoute.bind(this, `/product/${result.get('cliqqCode').first()}`)}>
              <List.Content floated='right'>
                <CustomIcon name='chevron right' />
              </List.Content>
              <Title as='span' basic size='large'>Brand Name</Title>
              <List.Content>
                <Content>
                  <Label as='span' basic size='medium'>{ _productTitle(result.get('title')) }</Label>
                </Content>
              </List.Content>
            </CustomItem>
          )
        })
      }
    </List>
  )
}

SearchResult.propTypes = {

}

export default SearchResult
