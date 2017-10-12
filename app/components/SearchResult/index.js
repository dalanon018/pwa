/**
*
* SearchResult
*
*/

import React from 'react'
import { List, Icon, Label } from 'semantic-ui-react'
import styled from 'styled-components'

const CustomIcon = styled(Icon)`
  font-size: 16px !important;
`
const Title = styled(Label)`
  font-size: 18px;
`
const Content = styled.p`
  font-size: 14px;
`
const CustomItem = styled(List.Item)`
  padding: 10px !important;
  position: relative;

  &>.divided {
    border-top: 1px solid #F0F0F0 !important;
  }

  .arrow-icon {
    line-height: 15px;
    padding: 10px 0;
  }
`

const ItemWrapper = styled.div`
  left: 0;
  margin-left: 14px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`

const _productTitle = (title, windowWidth) => {
  let maxChar = 40

  switch (true) {
    case (windowWidth >= 375 && windowWidth <= 500):
      maxChar = 40
      break
    case (windowWidth >= 767):
      maxChar = 80
      break
  }

  if (title.length > maxChar) {
    return `${title.slice(0, maxChar)}. . .`
  }
  return title
}

function SearchResult ({ product, changeRoute, windowWidth }) {
  return (
    <List divided verticalAlign='middle'>
      {
        product.map((result, index) => {
          return (
            <CustomItem
              key={index}
              onClick={changeRoute.bind(this, `/product/${result.get('cliqqCode').first()}`)}>
              <List.Content className='arrow-icon' floated='right'>
                <CustomIcon className='color__orange' name='chevron right' />
              </List.Content>
              <ItemWrapper>
                {
                  result.get('temporaryBrand')
                  ? <Title as='span' basic size='large' className='color__secondary'>{result.get('temporaryBrand')}</Title>
                  : null
                }
                <List.Content>
                  <Content>
                    <Label as='span' basic size='medium' className='color__secondary'>{ _productTitle(result.get('title'), windowWidth) }</Label>
                  </Content>
                </List.Content>
              </ItemWrapper>
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
