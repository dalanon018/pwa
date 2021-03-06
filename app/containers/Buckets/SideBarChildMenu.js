import React from 'react'
import PropTypes from 'prop-types'
import { ifElse, map, gte } from 'ramda'
import { Label } from 'semantic-ui-react'

import ChildAccordion from 'components/Shared/ChildAccordion'
import Selected from 'images/icons/drawer/selected.svg'

const SideBarChildMenu = ({ entities, changeRoute, location }) => {
  const isChildrenEmpty = (entity) => {
    const children = entity.getIn(['children'])
    const size = children ? children.size : 0
    return gte(0, size)
  }

  const Title = (entity) => (
    <div key={`${entity.get('id')}-${entity.get('name')}`} className='title-holder'>
      <img alt='selected' className='selected' src={Selected} />
      <Label as='span' className='margin__none color__secondary' size='big' onClick={changeRoute.bind(this, `/${location}/${entity.get('id')}`)}>
        {entity.get('name')}
      </Label>
    </div>
  )

  const RenderChildren = (children) => (
    <Label
      key={`${children.get('id')}-${children.get('name')}`} as='p' size='big'
      className='color__grey'
      onClick={changeRoute.bind(this, `/${location}/${children.get('id')}`)}
    >
      {children.get('name')}
    </Label>
  )

  const RenderWrapper = (entity) => (
    <ChildAccordion key={`${entity.get('id')}-${entity.get('name')}`} title={Title(entity)}>
      <div>
        { map(RenderChildren, entity.get('children')) }
      </div>
    </ChildAccordion>
  )

  const shouldRenderAccordion = (entity) => ifElse(
    isChildrenEmpty,
    Title,
    RenderWrapper
  )(entity)

  return (
    <div>
      { entities.map(shouldRenderAccordion) }
    </div>
  )
}

SideBarChildMenu.propTypes = {
  entities: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default SideBarChildMenu
