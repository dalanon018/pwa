import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import {
  Image,
  Label,
  List
} from 'semantic-ui-react'
import { identity, ifElse } from 'ramda'

import messages from './messages'

import Home from 'images/icons/drawer/home.svg'
import Barcode from 'images/icons/drawer/activity.svg'
import Brands from 'images/icons/drawer/brands.svg'
import Categories from 'images/icons/drawer/categories.svg'
import Points from 'images/icons/drawer/points.svg'
import Logout from 'images/icons/drawer/signout.svg'
import Close from 'images/icons/drawer/close.svg'

const SidebarContainer = styled.div`
  height: 100vh;
  left: ${({toggle}) => toggle ? 0 : '-100%'};
  overflow: ${({toggle}) => toggle ? 'auto' : 'hidden'};
  position: fixed;
  top: 0;
  transition: ease 0.3s;
  width: 100%;
  z-index: 99;
  -webkit-overflow-scrolling: touch;
`
const SidebarWrapper = styled.div`
  position: relative;
  overflow: auto;
  width: 100%;
  min-height: 100%;
  padding: 49px 0;
`

const ListWrapper = styled(List.Item)`
  padding: 25px 30px!important;

  img {
    margin-right: 10px !important;
  }
`

const CloseButton = styled(Image)`
  position: absolute !important;
  right: 20px;
  top: 20px;
  height: 13px !important;
  width: 13px !important;
`

class SidebarMenu extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired,
    isSignIn: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
  }

  _handleSignOut = () => {
    const { signOut, toggleAction } = this.props
    signOut()
    toggleAction()
  }

  _handleShowLogoutButton = () => {
    const { isSignIn } = this.props

    const toggleComponent = ifElse(
      identity,
      () => (
        <ListWrapper onClick={this._handleSignOut}>
          <Image alt='CLiQQ' size='mini' src={Logout} />
          <List.Content>
            <Label as='p' className='margin__none text__weight--500' size='huge'>
              <FormattedMessage {...messages.menuLogout} />
            </Label>
          </List.Content>
        </ListWrapper>
      ),
      () => null
    )

    return toggleComponent(isSignIn)
  }

  render () {
    const {
      toggleSidebar, toggleAction, changeRoute
    } = this.props
    return (
      <SidebarContainer className='background__black-transparent' toggle={toggleSidebar}>
        <SidebarWrapper className='background__white'>
          <CloseButton onClick={toggleAction} alt='close' size='mini' src={Close} />
          <List divided verticalAlign='middle' selection className='margin__none'>
            <ListWrapper onClick={() => changeRoute('/')}>
              <Image alt='CLiQQ' size='mini' src={Home} />
              <List.Content>
                <Label as='p' className='margin__none text__weight--500' size='huge'>
                  <FormattedMessage {...messages.menuHome} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListWrapper onClick={() => changeRoute('/purchases')}>
              <Image alt='CLiQQ' size='mini' src={Barcode} />
              <List.Content>
                <Label as='p' className='margin__none text__weight--500' size='huge'>
                  <FormattedMessage {...messages.menuActivity} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListWrapper onClick={() => changeRoute('/wallet')}>
              <Image alt='CLiQQ' size='mini' src={Points} />
              <List.Content>
                <Label as='p' className='margin__none text__weight--500' size='huge'>
                  <FormattedMessage {...messages.menuPoints} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListWrapper onClick={() => changeRoute('/categories')}>
              <Image alt='CLiQQ' size='mini' src={Categories} />
              <List.Content>
                <Label as='p' className='margin__none text__weight--500' size='huge'>
                  <FormattedMessage {...messages.menuCategories} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListWrapper onClick={() => changeRoute('/brands')}>
              <Image alt='CLiQQ' size='mini' src={Brands} />
              <List.Content>
                <Label as='p' className='margin__none text__weight--500' size='huge'>
                  <FormattedMessage {...messages.menuBrands} />
                </Label>
              </List.Content>
            </ListWrapper>
            {/*
              <ListWrapper>
                <Image alt='help' size='mini' src={Help} />
                <List.Content>
                  <Label as='p' className='margin__none text__weight--500' size='huge'>
                    <FormattedMessage {...messages.menuHelp} />
                  </Label>
                </List.Content>
              </ListWrapper>
            */}
            { this._handleShowLogoutButton() }
          </List>
        </SidebarWrapper>
      </SidebarContainer>
    )
  }
}

export default SidebarMenu
