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
// import Help from 'images/icons/drawer/help.svg'
import Logout from 'images/icons/drawer/signout.svg'
import Close from 'images/icons/drawer/close.svg'

const SidebarContainer = styled.div`
  height: 100vh;
  left: 0;
  overflow: ${({toggle}) => toggle ? 'auto' : 'hidden'};
  position: fixed;
  top: 0;
  transition: width 0.3s;
  width: ${({toggle}) => toggle ? '100%' : '0'};
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

  & img {
    margin-right: 10px !important;
  }
`

const CloseButton = styled(Image)`
  position: absolute !important;
  right: 20px;
  top: 20px;
  height: 21px !important;
  width: 21px !important;
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

  _handletoHome = () => {
    const { changeRoute } = this.props

    changeRoute('/')
  }

  _handletoPurchase = () => {
    const { changeRoute } = this.props

    changeRoute('/purchases')
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
          <Image alt='help' size='mini' src={Logout} />
          <List.Content>
            <Label as='p' className='margin__none color__secondary' size='huge'>
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
      toggleSidebar, toggleAction
    } = this.props
    return (
      <SidebarContainer className='background__black-transparent' toggle={toggleSidebar}>
        <SidebarWrapper className='background__white'>
          <CloseButton onClick={toggleAction} alt='close' size='mini' src={Close} />
          <List divided verticalAlign='middle' selection>
            <ListWrapper onClick={this._handletoHome}>
              <Image alt='home' size='mini' src={Home} />
              <List.Content>
                <Label as='p' className='margin__none color__secondary' size='huge'>
                  <FormattedMessage {...messages.menuHome} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListWrapper onClick={this._handletoPurchase}>
              <Image alt='activities' size='mini' src={Barcode} />
              <List.Content>
                <Label as='p' className='margin__none color__secondary' size='huge'>
                  <FormattedMessage {...messages.menuActivity} />
                </Label>
              </List.Content>
            </ListWrapper>
            {/*
              <ListWrapper>
                <Image alt='help' size='mini' src={Help} />
                <List.Content>
                  <Label as='p' className='margin__none color__secondary' size='huge'>
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
