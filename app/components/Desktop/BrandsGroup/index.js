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
import messages from './messages'

import { Grid, Container, Image, Label } from 'semantic-ui-react'
import { categoriesGroup } from 'utils/categories-group'

import BrandItem from 'components/Shared/PlainCard'
import SectionTitle from 'components/Shared/SectionTitle'

// export const Wrapper = styled.div`
//   padding: 0 120px;
// `

export const NavWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 12px;
  transition: 0.3 ease;

  a {
    &:hover {
      background: transparent !important;
      color: #FF4813 !important;
    }
  }
`

const scroll = (id) => () => {
  let el = document.getElementById(id)
  let headerHeight = 100

  // scroll to your element
  el.scrollIntoView(true)

  // now account for fixed header
  let scrolledY = window.scrollY

  if (scrolledY) {
    window.scroll({
      top: scrolledY - headerHeight,
      left: 0,
      behavior: 'auto'
    })
  }
}

function BrandsGroup ({
  brands,
  bottomScroll,
  goToBrand,
  windowWidth,
  intl
}) {
  const imgixOptions = {
    w: 120,
    h: 120,
    fit: 'clamp',
    auto: 'compress',
    q: 100,
    lossless: 0
  }

  const groupBrands = categoriesGroup(brands)

  const _handleNavAnchor = () => {
    const groupBrands = categoriesGroup(brands)

    return (
      <NavWrapper className='border_bottom__one--light-grey'>
        {
          toPairs(groupBrands).map(([title, item], key) => {
            return (
              <div key={key}>
                <Label as='a' onClick={scroll(`${title + key}`)} basic size='big' className='padding__none text__weight--400'>
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
    return (
      <div>
        <Grid>
          <Grid.Row columns={6} stretched verticalAlign='top'>
            {
              range(6).map((_, index) => {
                return (
                  <Grid.Column key={index} className='padding__bottom--15'>
                    <div>
                      <BrandItem borderRadius height={120}>
                        <Image className='height__inherit' alt='CLiQQ' src={imageStock('Brands-Default.jpg', imgixOptions)} />
                      </BrandItem>
                    </div>
                  </Grid.Column>
                )
              })
            }
          </Grid.Row>
        </Grid>
      </div>
    )
  }

  return (
    <Container>
      <div className='padding__medium'>
        <SectionTitle colorGrey title={intl && intl.formatMessage(messages.header)} />
        {_handleNavAnchor()}
        {
          brands.size === 0
            ? _handleDefaultState()
            : toPairs(groupBrands).map(([title, item], key) => {
              const chunkItem = chunk(item, 5)
              return (
                <div key={key}>
                  <div>
                    <Grid padded>
                      <Grid.Row columns={2}>
                        <Grid.Column className='padding__left--none' width={1}>
                          <Label id={`${title + key}`} as='span' basic size='big' className='text__weight--400'>
                            { title }
                          </Label>
                        </Grid.Column>
                        <Grid.Column width={15}>
                          <Grid>
                            <Grid.Row columns={6} stretched verticalAlign='top'>
                              {
                                chunkItem.map((entity, key) => (
                                  entity.map((data, index) => (
                                    <Grid.Column key={index} className='padding__bottom--15'>
                                      <div className='cursor__pointer' onClick={goToBrand(data.get('id'))}>
                                        <BrandItem borderRadius height={120}>
                                          <Image className='height__inherit' src={data.get('logo') ? data.get('logo') : imageStock('Brands-Default.jpg', imgixOptions)} alt={data.get('name')} />
                                        </BrandItem>
                                        <Label as='p' basic size='large' className='margin__top-positive--10 text__weight--400 text__align--center'>{data.get('name')}</Label>
                                      </div>
                                    </Grid.Column>
                                  ))
                                ))
                              }
                            </Grid.Row>
                          </Grid>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                </div>
              )
            })
        }
      </div>
    </Container>
  )
}

BrandsGroup.propTypes = {
  brands: PropTypes.object.isRequired,
  bottomScroll: PropTypes.bool.isRequired,
  goToBrand: PropTypes.func.isRequired
}

export default BrandsGroup
