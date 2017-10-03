/**
*
* MultiAccordion
*
*/

import React, { PropTypes } from 'react'
import {
  Accordion
} from 'semantic-ui-react'
import Selected from 'images/icons/drawer/Selected.svg'

import {
  ListCollapseWrapper
} from './styles'

const ChildAccordion = ({ title, children }) => (
  <ListCollapseWrapper>
    <Accordion>
      <Accordion.Title>
        <img alt='selected' className='selected' src={Selected} />
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

//   render() {
//     return (
//       <ListCollapse title={'Categories'} >
//         { categories.map((cat, index) =>
//           <ChildAccordion key={index + 1} title={cat.name}>
//             {cat.name}
//           </ChildAccordion>
//         )}
//       </ListCollapse>
//     );
//   }
// }

// MultiAccordion.propTypes = {

// };

// export default MultiAccordion;
