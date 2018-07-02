/**
*
* HeaderMenu
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  Image,
  Grid
} from 'semantic-ui-react'

import Back from 'images/icons/back.svg'
import Search from 'images/icons/search-header.svg'
import Hamburger from 'images/icons/hamburger-header.svg'
import Barcode from 'images/icons/barcode-header.svg'
import Logo from 'images/cliqq-logo.svg'

import { ToggleComponent } from 'utils/logicHelper'

const InlineImage = styled(Image)`
  display: inline-block !important;
  margin-left: 20px;
`
const MainLogo = styled.img`
  width: 80px;
  height: 35px;
`

const Wrapper = styled(Grid)`
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 99;

  & .row {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
`

function HeaderMenu ({ showBack, hideSearch, hideBarcode }) {
  const MenuToggle = ToggleComponent(
    <Link to='/'>
      <Image alt='hamburger' src={Hamburger} size='mini' />
    </Link>,
    <Image alt='back-button' src={Back} size='mini' />
  )

  const SearchToggle = ToggleComponent(
    null,
    <InlineImage alt='activities' src={Search} size='mini' />
  )

  const ActivitiesToggle = ToggleComponent(
    null,
    <InlineImage alt='activities' src={Barcode} size='mini' />
  )

  return (
    <Wrapper padded>
      <Grid.Row columns={3} verticalAlign='middle'>
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
    </Wrapper>
  )
}

HeaderMenu.propTypes = {
  showBack: PropTypes.bool.isRequired,
  hideSearch: PropTypes.bool.isRequired,
  hideBarcode: PropTypes.bool.isRequired
}

export default HeaderMenu
