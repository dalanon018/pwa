/**
*
* OrderTip
*
*/

import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { Container, Grid, Image, Label } from 'semantic-ui-react'
import DeliveryIcon from 'images/icons/delivery-icon.svg'
import ReturnIcon from 'images/icons/return-icon.svg'

import Modal from 'components/Mobile/OrderTipModal'
import WindowWidth from 'components/Shared/WindowWidth'

import { FormattedMessage, injectIntl } from 'react-intl'
import messages from './messages'

export const Wrapper = styled.div`
  padding: 10px;
`

export const FlexContainer = styled.div`
  align-items: flex-start;
  display: flex;

  img {
    width: 40px;
    margin-right: 10px;

    &.return-icon {
      width: 30px;
    }
  }

  .medium {
    line-height: 18px;
  }

  @media (max-width: 375px) {
    .custom-label {
      font-size: 4vw !important;
    }
  }

  @media (min-width: 767px) {
    align-items: center;
  }
`

export class OrderTip extends React.PureComponent {
  state = {
    toggle: false,
    bannerMap: false
  }

  _handleOpenMap = () => this.setState({ toggle: true, bannerMap: true })

  _handleOpen = () => this.setState({ toggle: true })

  _handleClose = () => this.setState({ toggle: false, bannerMap: false })

  _handleMobile = () => {
    return (
      <Wrapper className='background__light-grey'>
        <Container>
          <Grid container>
            <Grid.Row columns={2}>
              <Grid.Column>
                <FlexContainer onClick={this._handleOpen}>
                  <Image alt='CLiQQ' src={DeliveryIcon} />
                  <Label as='span' size='medium' className='color__secondary text__weight--500 custom-label'>
                    1 Day In-Store<br />Delivery
                  </Label>
                </FlexContainer>
                <Label as='span' size='small' className='color__grey text__weight--400'>
                  <FormattedMessage {...messages.freeDelivery} />
                </Label>
              </Grid.Column>
              <Grid.Column>
                <FlexContainer onClick={this._handleOpenMap}>
                  <Image alt='CLiQQ' className='return-icon' src={ReturnIcon} />
                  <Label as='span' size='medium' className='color__secondary text__weight--500 custom-label'>
                    CLiQQ Return<br />Policy
                  </Label>
                </FlexContainer>
                <Label as='span' size='small' className='color__grey text__weight--400'>
                  <FormattedMessage {...messages.noQuestions} />
                </Label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Wrapper>
    )
  }

  _handleTablet = () => {
    return (
      <Wrapper className='background__light-grey'>
        <Container>
          <Grid container>
            <Grid.Row columns={2}>
              <Grid.Column>
                <FlexContainer onClick={this._handleOpen}>
                  <div>
                    <Image alt='CLiQQ' src={DeliveryIcon} />
                  </div>
                  <div>
                    <Label as='span' size='medium' className='color__secondary text__weight--500 custom-label'>
                      <FormattedMessage {...messages.storeDelivery} />
                    </Label>
                    <Label as='p' size='small' className='color__grey text__weight--400 margin__none'>
                      <FormattedMessage {...messages.freeDelivery} />
                    </Label>
                  </div>
                </FlexContainer>
              </Grid.Column>
              <Grid.Column>
                <FlexContainer>
                  <div>
                    <Image alt='CLiQQ' className='return-icon' src={ReturnIcon} />
                  </div>
                  <div>
                    <Label as='span' size='medium' className='color__secondary text__weight--500 custom-label'>
                      <FormattedMessage {...messages.returnPolicy} />
                    </Label>
                    <Label as='p' size='small' className='color__grey text__weight--400 margin__none'>
                      <FormattedMessage {...messages.noQuestions} />
                    </Label>
                  </div>
                </FlexContainer>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Wrapper>
    )
  }

  render () {
    const { windowWidth, intl, changeRoute } = this.props
    const { toggle, bannerMap } = this.state

    return (
      <div>
        {windowWidth < 767 ? this._handleMobile() : this._handleTablet()}
        <Modal
          toggle={toggle}
          close={this._handleClose}
          bannerMap={bannerMap}
          changeRoute={changeRoute}
          intl={intl} />
      </div>
    )
  }
}

OrderTip.propTypes = {
  toggle: PropTypes.bool,
  bannerMap: PropTypes.bool,
  _handleOpenMap: PropTypes.func,
  _handleOpen: PropTypes.func,
  _handleClose: PropTypes.func,
  changeRoute: PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return {
    changeRoute: url => dispatch(push(url)),
    dispatch
  }
}
const withConnect = connect(null, mapDispatchToProps)

export default compose(withConnect)(WindowWidth(injectIntl(OrderTip)))
