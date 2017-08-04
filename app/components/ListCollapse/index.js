/**
*
* ListCollapse
*
*/

import React from 'react'
import { Grid, Accordion } from 'semantic-ui-react'

import {
  ListCollapseWrapper
} from './styles'

class ListCollapse extends React.PureComponent {
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
    return (
      <Grid.Row>
        <ListCollapseWrapper height={this.state.height} open={this.state.open}>
          <Accordion>
            <Accordion.Title onClick={this._handleClick}>
              <i className='icon' />
              Lorem ipsum dolor sit amet?
            </Accordion.Title>
            <Accordion.Content>
              <div className='collapse-content'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos repudiandae inventore debitis iusto ea esse eligendi voluptatum distinctio assumenda quam aliquid, unde ullam odit tenetur cum, explicabo quisquam a!</p>
              </div>
            </Accordion.Content>
            <Accordion.Title onClick={this._handleClick}>
              <i className='icon' />
              Lorem ipsum dolor sit amet?
            </Accordion.Title>
            <Accordion.Content>
              <div className='collapse-content'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos repudiandae inventore debitis iusto ea esse eligendi voluptatum distinctio assumenda quam aliquid, unde ullam odit tenetur cum, explicabo quisquam a!</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, est. Veniam velit repellat, natus repellendus impedit rerum quas distinctio id voluptatem commodi. Ea, modi! Voluptas id enim, sint amet aperiam! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla necessitatibus a repudiandae ipsa pariatur, veritatis mollitia. Hic accusantium, nobis ab. Hic sunt ipsa odio aut consequatur praesentium, architecto nesciunt sit.</p>
              </div>
            </Accordion.Content>
            <Accordion.Title onClick={this._handleClick}>
              <i className='icon' />
              Lorem ipsum dolor sit amet?
            </Accordion.Title>
            <Accordion.Content>
              <div className='collapse-content'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime eum voluptate, rerum iste. Sapiente reprehenderit, odit ratione explicabo molestiae harum fugit reiciendis iste iusto, enim sequi temporibus delectus. Est, iste. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate ex error alias tenetur saepe, architecto, obcaecati modi similique corrupti dolorem accusantium maiores consequatur necessitatibus aliquid numquam iusto eveniet placeat ullam.</p>
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
