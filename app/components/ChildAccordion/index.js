/**
*
* MultiAccordion
*
*/

import React, { PropTypes } from 'react'
import {
  Accordion
} from 'semantic-ui-react'

import {
  ListCollapseWrapper
} from './styles'

const ChildAccordion = ({ title, children }) => (
  <ListCollapseWrapper>
    <Accordion>
      <Accordion.Title className='child-accordion'>
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
)

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
