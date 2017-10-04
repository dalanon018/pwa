import React, { PropTypes } from 'react'
import { ifElse, map, lte } from 'ramda'
import { Label } from 'semantic-ui-react'

import ChildAccordion from 'components/ChildAccordion'
import Selected from 'images/icons/drawer/Selected.svg'

const SideBarChildMenu = ({ categories, changeRoute }) => {
  const isChildrenEmpty = (category) => {
    const size = category.getIn(['children'])
    return lte(0, size || 0)
  }

  const Title = (category) => (
    <div key={category.get('id')} className='title-holder'>
      <img alt='selected' className='selected' src={Selected} />
      <Label as='span' className='margin__none' size='big' onClick={changeRoute.bind(this, `/products-category/${category.get('id')}`)}>
        {category.get('name')}
      </Label>
    </div>
  )

  const RenderChildren = (children) => (
    <Label
      key={children.get('id')} as='p' size='big'
      className='color-grey'
      onClick={changeRoute.bind(this, `/products-category/${children.get('id')}`)}
    >
      {children.get('name')}
    </Label>
  )

  const RenderWrapper = (category) => (
    <ChildAccordion key={category.get('id')} title={Title(category)}>
      <div>
        { map(RenderChildren, category.get('children')) }
      </div>
    </ChildAccordion>
  )

  const shouldRenderAccordion = (category) => ifElse(
    isChildrenEmpty,
    Title,
    RenderWrapper
  )(category)

  return (
    <div>
      { categories.map(shouldRenderAccordion) }
    </div>
  )
}

SideBarChildMenu.propTypes = {
  categories: PropTypes.object.isRequired,
  changeRoute: PropTypes.func.isRequired
}

export default SideBarChildMenu
