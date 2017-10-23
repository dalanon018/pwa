import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import {
  Image,
  Label,
  List
} from 'semantic-ui-react'

import ListCollapse from 'components/ListCollapse'

import messages from './messages'
import SideBarChildMenu from './SideBarChildMenu'

import Home from 'images/icons/drawer/home.svg'
import Barcode from 'images/icons/drawer/activity.svg'
import Categories from 'images/icons/drawer/categories.svg'
import Brands from 'images/icons/drawer/brands.svg'
import Help from 'images/icons/drawer/help.svg'
import Logout from 'images/icons/drawer/signout.svg'

const SidebarContainer = styled.div`
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

const ListAccordionWrapper = styled(List.Item)`
  display: flex !important;
  padding: 0 30px !important;

  & img {
    margin-top: 27px !important;
    margin-right: 10px !important;
  }

  & .content {
    width: 100%;
  }

  & .ui.accordion {
    border: none!important;

    & .content.active .title-holder {
      padding: 10px;

      img.selected {
        margin-top: 0 !important;
        margin-right: 5px !important;
        width: 16px;
        height: 16px;
        display: inline-block;
        visibility: hidden;
      }
    }

    & .title {
      border: none!important;
      padding: 25px 0;
    }

    & .title.active {
      padding-bottom: 10px;

      img.selected {
        visibility: visible !important;
      }
    }

    & .content.active > .collapse-content{
      padding: 0;
    }
  }
`

class SidebarMenu extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired
  }

  _handletoHome = () => {
    const { changeRoute } = this.props

    changeRoute('/')
  }

  _handletoPurchase = () => {
    const { changeRoute } = this.props

    changeRoute('/purchases')
  }

  render () {
    const {
      categories, brands, changeRoute, toggleSidebar
    //  toggleAction
    } = this.props

    return (
      <SidebarContainer className='background__black-transparent' toggle={toggleSidebar}>
        <SidebarWrapper className='background__white'>
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
            <ListAccordionWrapper>
              <Image alt='categories' size='mini' src={Categories} />
              <List.Content>
                <ListCollapse
                  heightTransition
                  title={
                    <Label as='p' className='margin__none color__secondary' size='huge' >
                      <FormattedMessage {...messages.menuCategories} />
                    </Label>
                }>
                  <SideBarChildMenu
                    entities={categories}
                    changeRoute={changeRoute}
                    location='products-category'
                  />
                </ListCollapse>
              </List.Content>
            </ListAccordionWrapper>
            <ListAccordionWrapper>
              <Image alt='brands' size='mini' src={Brands} />
              <List.Content>
                <ListCollapse
                  heightTransition
                  title={
                    <Label as='p' className='margin__none color__secondary' size='huge'>
                      <FormattedMessage {...messages.menuBrands} />
                    </Label>
                } >
                  <SideBarChildMenu
                    entities={brands}
                    changeRoute={changeRoute}
                    location='brands'
                  />
                </ListCollapse>
              </List.Content>
            </ListAccordionWrapper>
            <ListWrapper>
              <Image alt='help' size='mini' src={Help} />
              <List.Content>
                <Label as='p' className='margin__none color__secondary' size='huge'>
                  <FormattedMessage {...messages.menuHelp} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListWrapper>
              <Image alt='help' size='mini' src={Logout} />
              <List.Content>
                <Label as='p' className='margin__none color__secondary' size='huge'>
                  <FormattedMessage {...messages.menuLogout} />
                </Label>
              </List.Content>
            </ListWrapper>
          </List>
        </SidebarWrapper>
      </SidebarContainer>
    )
  }
}

export default SidebarMenu
