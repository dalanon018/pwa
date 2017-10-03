/**
*
* ListFloated
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
const Title = styled.p`
  font-size: 18px;
  color: #AEAEAE;
`
const Content = styled.p`
  font-size: 14px;
`
const CustomItem = styled(List.Item)`
  padding: 10px 0 !important;

  &>.divided {
    border-top: 1px solid #F0F0F0 !important;
  }
`

function ListFloated () {
  return (
    <List divided verticalAlign='middle'>
      <CustomItem>
        <List.Content floated='right'>
          <CustomIcon name='chevron right' />
        </List.Content>
        <Title>Lorem ipsum</Title>
        <List.Content>
          <Content>
            <Label as='span' basic size='large'>Dolor sit amet</Label>
          </Content>
        </List.Content>
      </CustomItem>
      <CustomItem>
        <List.Content floated='right'>
          <CustomIcon name='chevron right' />
        </List.Content>
        <Title>Lorem ipsum</Title>
        <List.Content>
          <Content>
            <Label as='span' basic size='large'>Dolor sit amet</Label>
          </Content>
        </List.Content>
      </CustomItem>
    </List>
  )
}

ListFloated.propTypes = {

}

export default ListFloated
