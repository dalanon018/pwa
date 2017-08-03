/**
*
* ListCollapse
*
*/

import React from 'react'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import messages from './messages'

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
        <FormattedMessage {...messages.header} />
        <ListCollapseWrapper height={this.state.height} open={this.state.open}>
          <Accordion>
            <Accordion.Title onClick={this._handleClick}>
              <i className='icon' />
              What is a dog?
            </Accordion.Title>
            <Accordion.Content>
              <div className='collapse-content'>
                <p>
                  A dog is a type of domesticated animal. Known for its loyalty and faithfulness,
                  {' '}it can be found as a welcome guest in many households across the world.
                </p>
              </div>
            </Accordion.Content>
            <Accordion.Title onClick={this._handleClick}>
              <i className='icon' />
              What kinds of dogs are there?
            </Accordion.Title>
            <Accordion.Content>
              <div className='collapse-content'>
                <p>
                  There are many breeds of dogs. Each breed varies in size and temperament.
                  {' '}Owners often select a breed of dog that they find to be compatible
                  with their own lifestyle and desires from a companion.
                </p>
              </div>
            </Accordion.Content>
            <Accordion.Title onClick={this._handleClick}>
              <i className='icon' />
              How do you acquire a dog?
            </Accordion.Title>
            <Accordion.Content>
              <div className='collapse-content'>
                <p>
                  Three common ways for a prospective owner to acquire a dog is from pet shops,
                  {' '}private owners, or shelters.
                </p>
                <p> A pet shop may be the most convenient way to buy a dog.
                  {' '}Buying a dog from a private owner allows you to assess the pedigree and
                  {' '}upbringing of your dog before choosing to take it home. Lastly, finding your dog
                  {' '}from a shelter, helps give a good home to a dog who may not find one so readily.
                </p>
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
