import React, { PureComponent, PropTypes } from 'react'
import styled from 'styled-components'

import {
  Icon,
  Menu
} from 'semantic-ui-react'

const Wrapper = styled.div`
  background: #FFF;
  height: 56px;
  margin-bottom: 10px;
`

const MenuWrapper = styled(Menu)`
  justify-content: space-between;
`

export default class MainMenu extends PureComponent {
  static propTypes= {
    toggleSidebarAction: PropTypes.func.isRequired
  }

  state = {
    activeItem: null
  }

  constructor () {
    super()
    this._handleItemClick = this._handleItemClick.bind(this)
  }

  _handleItemClick (e, { name }) {
    this.setState({ activeItem: name })
  }

  render () {
    const { activeItem } = this.state

    return (
      <Wrapper>
        <MenuWrapper
          borderless
        >
          <Menu.Item
            name='editorials'
            active={activeItem === 'editorials'}
            onClick={this.handleItemClick}
          >
            <Icon
              size='large'
              name='sidebar'
            />
          </Menu.Item>

          <Menu.Item
            name='reviews'
            active={activeItem === 'reviews'}
            onClick={this.handleItemClick}
          >
            CliQQ
          </Menu.Item>

          <Menu.Item
            name='upcomingEvents'
            active={activeItem === 'upcomingEvents'}
            onClick={this.handleItemClick}
          >
            <Icon
              size='large'
              name='barcode'
            />
          </Menu.Item>
        </MenuWrapper>
      </Wrapper>
    )
  }
}
