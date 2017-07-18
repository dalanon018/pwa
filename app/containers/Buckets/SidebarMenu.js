import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import {
  Image,
  Label,
  Menu
} from 'semantic-ui-react'

import messages from './messages'
import HomeImage from 'images/icons/home-icon.svg'
import BarcodeImage from 'images/icons/barcode-icon.svg'
import CategoriesImage from 'images/icons/category-icon.svg'

const ItemWrapper = styled.div`
  display: flex;
`

const ItemImage = styled.span`

`

const ItemText = styled.span`
  margin-left: 20px;
  font-size: 18px;
  align-self: center;
`

const UlWrapper = styled.ul`
  margin-left: 9px;
  font-size: 16px;
  list-style:none
`
const Li = styled.li`
  padding: 20px 0;
  border-bottom: 1px solid #CCC;

  &:last-child {
    border: none;
  }
`

const SidebarItem = ({ children, image }) => {
  return (
    <ItemWrapper>
      <ItemImage>
        <Image
          src={image}
          size='mini'
          centered
        />
      </ItemImage>
      <ItemText>
        { children }
      </ItemText>
    </ItemWrapper>

  )
}

const SideBarChildrenItem = ({ category }) => (
  <Li>
    { category.get('name').toUpperCase() }
  </Li>
)

const SideBarChildrenContainer = ({ categories }) => (
  <UlWrapper>
    {categories.map((category) => (
      <SideBarChildrenItem
        key={category.get('name')}
        category={category}
      />
    ))}
  </UlWrapper>
)

const SidebarMenu = ({ categories }) => (
  <Menu vertical borderless>
    <Menu.Item as={Label} name='home' >
      <SidebarItem image={HomeImage}>
        <FormattedMessage {...messages.menuHome} />
      </SidebarItem>
    </Menu.Item>
    <Menu.Item name='barcode'>
      <SidebarItem image={BarcodeImage}>
        <FormattedMessage {...messages.menuBarcode} />
      </SidebarItem>
    </Menu.Item>
    <Menu.Item name='categories'>
      <SidebarItem image={CategoriesImage}>
        <FormattedMessage {...messages.menuCategories} />
      </SidebarItem>
      {
        <SideBarChildrenContainer categories={categories} />
      }
    </Menu.Item>
  </Menu>
)

export default SidebarMenu