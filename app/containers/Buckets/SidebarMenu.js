import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import {
  Image,
  Label,
  List
} from 'semantic-ui-react'

import ChildAccordion from 'components/ChildAccordion'
import ListCollapse from 'components/ListCollapse'

import messages from './messages'

import Home from 'images/icons/drawer/home.svg'
import Barcode from 'images/icons/drawer/activity.svg'
import Categories from 'images/icons/drawer/categories.svg'
import Brands from 'images/icons/drawer/brands.svg'
import Help from 'images/icons/drawer/help.svg'

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
  min-height: 100%;
  padding: 49px 0;
`

const ListWrapper = styled(List.Item)`
  padding: 15px 20px!important;
`

const ListAccordionWrapper = styled(List.Item)`
  display: flex !important;
  padding: 0 20px !important;

  & img {
    margin-top: 25px !important;
  }

  & .content {
    width: 100%;
  }
`

const sampleCategories = [
  {
    id: 1,
    name: 'test1',
    children: [
      { id: 10, name: 'test10' },
      { id: 11, name: 'test11' },
      { id: 12, name: 'test12' }
    ]
  },
  {
    id: 2,
    name: 'test2',
    children: [
      { id: 20, name: 'test20' },
      { id: 21, name: 'test21' },
      { id: 22, name: 'test22' }
    ]
  },
  {
    id: 3,
    name: 'test3'
  }
]

class SidebarMenu extends React.PureComponent {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func.isRequired,
    toggleAction: PropTypes.func.isRequired
  }

  render () {
    const {
      // categories,
      // changeRoute,
      toggleSidebar
    //  toggleAction
    } = this.props

    return (
      <SidebarContainer toggle={toggleSidebar}>
        <SidebarWrapper>
          <List divided verticalAlign='middle' selection>
            <ListWrapper>
              <Image alt='home' size='mini' src={Home} />
              <List.Content>
                <Label as='p' size='huge'>
                  <FormattedMessage {...messages.menuHome} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListWrapper>
              <Image alt='activities' size='mini' src={Barcode} />
              <List.Content>
                <Label as='p' size='huge'>
                  <FormattedMessage {...messages.menuActivity} />
                </Label>
              </List.Content>
            </ListWrapper>
            <ListAccordionWrapper>
              <Image alt='categories' size='mini' src={Categories} />
              <List.Content>
                <ListCollapse title={
                  <Label as='p' size='huge'>
                    <FormattedMessage {...messages.menuCategories} />
                  </Label>
                }>
                  {
                    sampleCategories.map((cat) =>
                      <ChildAccordion key={cat.id} title={
                        <Label as='p' size='big'>
                          {cat.name}
                        </Label>
                      }>
                        test
                      </ChildAccordion>
                    )
                  }
                </ListCollapse>
              </List.Content>
            </ListAccordionWrapper>
            <ListAccordionWrapper>
              <Image alt='brands' size='mini' src={Brands} />
              <List.Content>
                <ListCollapse title={
                  <Label as='p' size='huge'>
                    <FormattedMessage {...messages.menuBrands} />
                  </Label>
                } >
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos repudiandae inventore debitis iusto ea esse eligendi voluptatum distinctio assumenda quam aliquid, unde ullam odit tenetur cum, explicabo quisquam a!</p>
                </ListCollapse>
              </List.Content>
            </ListAccordionWrapper>
            <ListWrapper>
              <Image alt='help' size='mini' src={Help} />
              <List.Content>
                <Label as='p' size='huge'>
                  <FormattedMessage {...messages.menuHelp} />
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
