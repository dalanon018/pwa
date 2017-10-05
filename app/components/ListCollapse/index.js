/**
*
* ListCollapse
*
*/

import React, { PropTypes } from 'react'
import { Grid, Accordion } from 'semantic-ui-react'

import {
  ListCollapseWrapper
} from './styles'

class ListCollapse extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]).isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]).isRequired
  }

  constructor () {
    super()
    this.state = {
      height: 0
    }
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick (e, data) {
    const block = document.getElementsByClassName('content')
    const elem = Array.prototype.slice.call(block, 0)
    this.setState({
      height: elem[data].lastChild.offsetHeight
    })
  }

  render () {
    const { title, children, heightTransition } = this.props
    return (
      <Grid.Row>
        <ListCollapseWrapper heightTransition={!heightTransition} height={this.state.height} open={this.state.open}>
          <Accordion>
            <Accordion.Title onClick={this._handleClick}>
              { title }
              <i className='icon' />
            </Accordion.Title>
            <Accordion.Content>
              <div className='collapse-content'>
                { children }
              </div>
            </Accordion.Content>
          </Accordion>
        </ListCollapseWrapper>
      </Grid.Row>
    )
  }
}

ListCollapse.propTypes = {

}

export default ListCollapse
