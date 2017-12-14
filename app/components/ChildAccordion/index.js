/**
*
* MultiAccordion
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import {
  Accordion
} from 'semantic-ui-react'

import {
  ListCollapseWrapper
} from './styles'

class ChildAccordion extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      activeIndex: null
    }
  }

  _handleClick = (e, data) => {
    const { index } = data
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    const element = e.target.closest('.ui.accordion')
    const block = element.getElementsByClassName('content')

    this.setState({
      activeIndex: newIndex,
      height: block[0].firstChild.offsetHeight
    })
  }

  render () {
    const { title, children } = this.props
    const { activeIndex } = this.state

    return (
      <ListCollapseWrapper>
        <Accordion>
          <Accordion.Title className='child-accordion' onClick={this._handleClick} active={activeIndex === 0} index={0}>
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
    )
  }
}

ChildAccordion.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node
  ])
}

export default ChildAccordion
