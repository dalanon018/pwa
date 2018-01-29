import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'

import {
  Dropdown,
  Image,
  Grid,
  Header,
  Input,
  Container,
  List
} from 'semantic-ui-react'

import { ifElse, identity, equals } from 'ramda'
import BarcodeImage from 'images/icons/barcode-header.svg'
import messages from './messages'
import MainLogo from 'images/cliqq-logo.svg'

const Wrapper = styled.div`
  display: block;
  position: relative;

  .no-padding {
    @media screen and (max-width: 767px) {
      padding-left: 0 !important;
    }
  }

  .no-padding-left {
    padding-left: 0 !important;
  }

  .header-menu-grid {
    height: 100%;
  }

  .custom-column {
    padding: 0 8px !important;
  }
`

const ImageLogo = styled.img`
  width: 80px;
  height: 35px;
`

const ActiviesIcon = styled.div`
  margin-left: ${props => props.marginLeft ? 0 : 20}px;

  img {
    display: inline-block !important;
  }

  @media screen and (max-width: 767px) {
    margin-left: 9px !important;
  }
  @media screen and (max-width: 320px) {
    margin-left: 4px !important;
  }
`

const SearchInput = styled(Input)`
  border: 0;
  font-size: 18px;
  letter-spacing: 1px;
  margin: 0 5px;
  width: 100%;
`

const PageTitle = styled.div`
  h1 {
    &.long-title {
      font-size: 18px;
      line-height: 18px;
    }
  }
`

const SearchWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`

const LogoWrapper = styled.div`
  img {
    width: 100px;
  }
`

const MenuWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;

  .list {
    &>.item {
      margin-left: 20px !important;
      cursor: pointer;
      transition: all .3s ease;
  
      &:hover {
        color: #f58322;
        text-decoration: underline;
      }
    }
  }

  
`

const toggleComponent = (componentA, componentB) => (condition) => {
  return ifElse(
    identity,
    () => componentA,
    () => componentB
  )(condition)
}

class HeaderNav extends PureComponent {
  static propTypes= {
    pageTitle: PropTypes.string,
    showActivityIcon: PropTypes.bool.isRequired,
    changeRoute: PropTypes.func.isRequired
  }

  state = {
    activeItem: null,
    windowHeightOffset: 0
  }

  _handleColumnSize = (currentRoute, place) => {
    const pageSetWidth = {
      home: {side: 2, middle: 12},
      termsConditions: {side: 2, middle: 12},
      productPage: {side: 3, middle: 10}
    }

    return pageSetWidth[currentRoute] ? pageSetWidth[currentRoute][place] : (place === 'side' ? 4 : 8)
  }

  _handleGotoSearch = () => this.props.changeRoute('/search')

  _updateScrollPosition = (e) => {
    this.setState({
      windowHeightOffset: window.pageYOffset
    })
  }

  _handleUniqueHeader = () => {
    const { pageTitle, changeRoute, intl, currentRoute } = this.props
    const { windowHeightOffset } = this.state

    const pageTitleParsed = () => {
      if (pageTitle && pageTitle.length > 17) {
        return <Header className='color__secondary long-title' as='h1'> { pageTitle } </Header>
      }

      return <Header className='color__secondary' as='h1'> { pageTitle } </Header>
    }

    const TitleToggle = toggleComponent(
      <ImageLogo alt='logo' src={MainLogo} onClick={changeRoute.bind(this, '/')} />,
      <PageTitle>
        {pageTitleParsed()}
      </PageTitle>
    )

    const ShowSearchInputLogo = toggleComponent(
      <SearchInput
        className='color__secondary'
        icon='search'
        placeholder={intl.formatMessage(messages.searchPlaceHolder)}
        onClick={this._handleGotoSearch}
      />,
      TitleToggle(!pageTitle)
    )

    return ShowSearchInputLogo((currentRoute === 'home' && windowHeightOffset >= 53))
  }

  _filteredCategoryMenu = () => {
    const { categories, changeRoute } = this.props
    const gotToProduct = (id) => () => changeRoute(`/products-category/${id}`)

    return (
      <MenuWrapper>
        <List horizontal>
          {
            categories && categories.splice(8).map((item, index) => {
              return (
                <List.Item key={index} onClick={gotToProduct(item.get('id'))}>
                  { item.get('name') }
                </List.Item>
              )
            })
          }

          <List.Item>
            <Dropdown text='More'>
              <Dropdown.Menu>
                {
                  categories && categories.slice(8, -1).map((item, index) => {
                    return (
                      <Dropdown.Item key={index} text={item.get('name')} onClick={gotToProduct(item.get('id'))} />
                    )
                  })
                }
              </Dropdown.Menu>
            </Dropdown>
          </List.Item>
        </List>
      </MenuWrapper>
    )
  }

  componentWillReceiveProps (nextProps) {
    const { currentRoute } = nextProps
    const willAddOrRemoveEvent = ifElse(
      equals('home'),
      () => window.addEventListener('scroll', this._updateScrollPosition),
      () => window.removeEventListener('scroll', this._updateScrollPosition)
    )

    willAddOrRemoveEvent(currentRoute)
  }

  componentDidMount () {
    window.addEventListener('scroll', this._updateScrollPosition)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this._updateScrollPosition)
  }

  render () {
    const { changeRoute, showActivityIcon, currentRoute } = this.props

    const homeRoute = currentRoute === 'home'

    const ActivitiesToggle = toggleComponent(
      <ActiviesIcon marginLeft={homeRoute}>
        <Image alt='Activities' src={BarcodeImage} size='mini' onClick={changeRoute.bind(this, '/purchases')} />
      </ActiviesIcon>,
      null
    )

    return (
      <Wrapper>
        <Container>
          <Grid>
            <Grid.Row columns={3} verticalAlign='middle'>
              <Grid.Column width={3}>
                <LogoWrapper>
                  <Image alt='CLiQQ' src={MainLogo} />
                </LogoWrapper>
              </Grid.Column>
              <Grid.Column width={10}>
                <SearchWrapper>
                  <Input
                    aria-label='search'
                    name='search'
                    fluid
                    onClick={changeRoute.bind(this, '/search')}
                    placeholder={this.props.intl.formatMessage(messages.searchPlaceHolder)}
                    icon='search'
                  />
                </SearchWrapper>
              </Grid.Column>
              <Grid.Column width={3} textAlign='right'>
                { ActivitiesToggle(showActivityIcon) }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <div className='background__light-grey'>
          <Container>
            { this._filteredCategoryMenu() }
          </Container>
        </div>
      </Wrapper>
    )
  }
}

export default injectIntl(HeaderNav)
