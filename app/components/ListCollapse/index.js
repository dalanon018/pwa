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

import scrollPolyfill from 'utils/scrollPolyfill'

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
      height: 0,
      activeIndex: null
    }
    this._handleClick = this._handleClick.bind(this)

    scrollPolyfill.polyfill()
  }

  _handleClick (e, data) {
    const { index } = data
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    const element = e.target.closest('.ui.accordion')
    const block = element.getElementsByClassName('content')

    setTimeout(() => {
      // parentScrollTo.scrollTo(0, ChildTop)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }, 250)

    this.setState({
      activeIndex: newIndex,
      height: block[0].firstChild.offsetHeight
    })
  }

  render () {
    const { title, children, heightTransition } = this.props
    const { activeIndex, height } = this.state

    return (
      <Grid.Row>
        <ListCollapseWrapper heightTransition={!heightTransition} height={height}>
          <Accordion>
            <Accordion.Title onClick={this._handleClick} active={activeIndex === 0} index={0}>
              { title }
              <i className='icon' />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
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
