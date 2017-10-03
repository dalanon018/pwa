import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import {
  Image,
  Label,
  Menu
} from 'semantic-ui-react'
import {
  partial
} from 'ramda'
import messages from './messages'
import HomeImage from 'images/icons/home-icon.svg'
import BarcodeImage from 'images/icons/barcode-icon.svg'
import CategoriesImage from 'images/icons/category-icon.svg'

const SidebarContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  left: 0;
  overflow: ${({toggle}) => toggle ? 'auto' : 'hidden'};
  position: fixed;
  top: 0;
  transition: width 0.3s;
  width: ${({toggle}) => toggle ? '100%' : '0'};
  z-index: 99;
`
const SidebarWrapper = styled.div`
  background-color: #FFFFFF;
  overflow: auto;
  width: 100%;
`

const MenuNavWrapper = styled(Menu)`
  height: 100%;
`

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
          alt='Cliqq'
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

const SideBarChildrenContainer = ({ changeRoute, categories }) => {
  const handleRedirect = (id) => changeRoute(`/products-category/${id}`)

  return (
    <UlWrapper>
      <Li onClick={partial(handleRedirect, ['sale'])}>
        <FormattedMessage {...messages.sale} />
      </Li>
      {categories.map((category) => (
        <Li key={category.get('name')} onClick={partial(handleRedirect, [category.get('id')])}>
          { category.get('name').toUpperCase() }
        </Li>
      ))}
    </UlWrapper>
  )
}

class SidebarMenu extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this._goHome = this._goHome.bind(this)
    this._goReceipts = this._goReceipts.bind(this)
  }

  _goHome () {
    this.props.changeRoute('/')
  }

  _goReceipts () {
    this.props.changeRoute('purchases')
  }

  render () {
    const { categories, changeRoute, toggleSidebar, toggleAction } = this.props

    return (
      <SidebarContainer toggle={toggleSidebar} onClick={toggleAction}>
        <SidebarWrapper>
          <MenuNavWrapper vertical borderless>
            <Menu.Item as={Label} name='home' onClick={this._goHome}>
              <SidebarItem image={HomeImage}>
                <FormattedMessage {...messages.menuHome} />
              </SidebarItem>
            </Menu.Item>
            <Menu.Item name='barcode' onClick={this._goReceipts}>
              <SidebarItem image={BarcodeImage}>
                <FormattedMessage {...messages.menuBarcode} />
              </SidebarItem>
            </Menu.Item>
            <Menu.Item name='categories'>
              <SidebarItem image={CategoriesImage}>
                <FormattedMessage {...messages.menuCategories} />
              </SidebarItem>
              {
                <SideBarChildrenContainer categories={categories} changeRoute={changeRoute} />
              }
            </Menu.Item>
          </MenuNavWrapper>
        </SidebarWrapper>
      </SidebarContainer>
    )
  }
}

export default SidebarMenu
