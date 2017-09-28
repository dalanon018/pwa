/**
*
* HeaderMenu
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ifElse, identity } from 'ramda'
import {
  Image,
  Grid
} from 'semantic-ui-react'

import Back from 'images/icons/back.svg'
import Search from 'images/icons/search-header.svg'
import Hamburger from 'images/icons/hamburger-header.svg'
import Barcode from 'images/icons/barcode-header.svg'
import Logo from 'images/cliqq-logo.svg'

const InlineImage = styled(Image)`
  display: inline-block !important;
  margin-left: 20px;
`
const MainLogo = styled.img`
width: 80px;
height: 35px;
`

const toggleComponent = (componentA, componentB) => (condition) => {
  return ifElse(
    identity,
    () => componentA,
    () => componentB
  )(condition)
}
function HeaderMenu ({ showBack, hideSearch, hideBarcode }) {
  const MenuToggle = toggleComponent(
    <Link to='/'>
      <Image alt='hamburger' src={Hamburger} size='mini' />
    </Link>,
    <Image alt='back-button' src={Back} size='mini' />
  )

  const SearchToggle = toggleComponent(
    null,
    <InlineImage alt='activities' src={Search} size='mini' />
  )

  const ActivitiesToggle = toggleComponent(
    null,
    <InlineImage alt='activities' src={Barcode} size='mini' />
  )

  return (
    <Grid padded>
      <Grid.Row columns={3} verticalAlign='middle' color='white'>
        <Grid.Column >
          { MenuToggle(true) }
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <MainLogo alt='logo' src={Logo} />
        </Grid.Column>
        <Grid.Column textAlign='right'>
          { SearchToggle(hideSearch) }
          { ActivitiesToggle(hideBarcode) }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

HeaderMenu.propTypes = {
  showBack: PropTypes.bool.isRequired,
  hideSearch: PropTypes.bool.isRequired,
  hideBarcode: PropTypes.bool.isRequired
}

export default HeaderMenu
