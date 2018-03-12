/**
*
* BrandsGroup
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { toPairs } from 'ramda'
import { chunk, range } from 'lodash'
import { imageStock } from 'utils/image-stock'

import { Grid, Container, Image, Label } from 'semantic-ui-react'
import { categoriesGroup } from 'utils/categories-group'

import BrandItem from 'components/Mobile/PlainCard'

const NavWrapper = styled.div`
  border-left: 1px solid #E8E8E8;
  height: ${props => props.bottomScroll ? window.innerHeight - 362 + 'px' : '100%'};
  overflow-y: auto;
  padding: 15px 0;
  position: fixed;
  right: 0;
  text-align: center;
  top: 50px;
  transition: height 0.3s ease-in;
  width: 15px;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
    visibility: hidden;
  }
`

const GroupWrapper = styled.div`
  box-shadow: 0 0 5px rgba(120,120,120, 0.1);
`

function BrandsGroup ({
  brands,
  bottomScroll,
  goToBrand
}) {
  const groupBrands = categoriesGroup(brands)

  const _handleNavAnchor = () => {
    const groupBrands = categoriesGroup(brands)

    return (
      <NavWrapper className='background__white' bottomScroll={bottomScroll}>
        {
         toPairs(groupBrands).map(([title, item], key) => {
           const scroll = (id) => () => {
             let el = document.getElementById(id)
             let headerHeight = 60

            // scroll to your element
             el.scrollIntoView(true)

            // now account for fixed header
             let scrolledY = window.scrollY

             if (scrolledY) {
               window.scroll({top: scrolledY - headerHeight, left: 0, behavior: 'smooth'})
             }
           }

           return (
             <div key={key}>
               <Label as='a' onClick={scroll(`${title + key}`)} basic size='mini' className='padding__none text__weight--500'>
                 { title }
               </Label>
             </div>
           )
         })
       }
      </NavWrapper>
    )
  }

  const _handleDefaultState = () => {
    const imgixOptions = {
      w: 80,
      h: 80,
      fit: 'clamp',
      auto: 'compress',
      q: 35,
      lossless: 0
    }

    return (
      <div>
        <div className='padding__vertical--20' />
        <GroupWrapper className='background__white'>
          <Grid padded>
            <Grid.Row columns={3} stretched verticalAlign='top'>
              {
                range(6).map((_, index) => {
                  return (
                    <Grid.Column key={index} className='padding__bottom--15'>
                      <div>
                        <BrandItem borderRadius height={90}>
                          <Image alt='CLiQQ' src={imageStock('Brands-Default.jpg', imgixOptions)} />
                        </BrandItem>
                      </div>
                    </Grid.Column>
                  )
                })
              }
            </Grid.Row>
          </Grid>
        </GroupWrapper>
      </div>
    )
  }

  return (
    <div>
      {_handleNavAnchor()}
      {
        brands.size === 0
        ? _handleDefaultState()
        : toPairs(groupBrands).map(([title, item], key) => {
          const chunkItem = chunk(item, 5)
          return (
            <div key={key}>
              <Container className='padding__none--vertical'>
                <Grid padded>
                  <Grid.Row>
                    <Grid.Column>
                      <Label id={`${title + key}`} as='span' basic size='large' className='text__weight--500'>
                        { title }
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
              <GroupWrapper className='background__white'>
                <Grid padded>
                  <Grid.Row columns={3} stretched verticalAlign='top'>
                    {
                      chunkItem.map((entity, key) => (
                        entity.map((data, index) => (
                          <Grid.Column key={index} className='padding__bottom--15'>
                            <div onClick={goToBrand(data.get('id'))}>
                              <BrandItem borderRadius height={90}>
                                <Image src={data.get('background')} alt={data.get('name')} />
                              </BrandItem>
                              <Label as='p' basic size='medium' className='margin__top-positive--10 text__weight--400'>{data.get('name')}</Label>
                            </div>
                          </Grid.Column>
                        ))
                      ))
                    }
                  </Grid.Row>
                </Grid>
              </GroupWrapper>
            </div>
          )
        })
      }
    </div>
  )
}

BrandsGroup.propTypes = {
  brands: PropTypes.object.isRequired,
  bottomScroll: PropTypes.bool.isRequired,
  goToBrand: PropTypes.func.isRequired
}

export default BrandsGroup
