/**
*
* SectionTitle
*
*/

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import H3 from 'components/Shared/H3'
import { Label, Image, Container } from 'semantic-ui-react'
import ArrowIcon from 'images/icons/goto-icon.svg'
import { push } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'

import TimerWrapper from 'components/Desktop/TimerWrapper'
import WindowWidth from 'components/Shared/WindowWidth'

import messages from './messages'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  @media (min-width: 1024px) {
    ${props => !props.noMarginBottom && 'margin-bottom: 20px;'}
  }
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  .title {
    margin-right: 20px;
  }
`

export const LinkWrapper = styled.div`
  text-transform: uppercase;

  img {
    display: inline-block;
    float: right;
    margin-left: 5px;
    margin-top: 3px;
    vertical-align: middle;
    width: 6px;
  }
`

export class SectionTitle extends React.PureComponent {
  static propTypes = {
    changeRoute: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    linkLabel: PropTypes.string
  }

  state = {
    isDesktop: false
  }

  _handleGoTo = () => {
    const { link } = this.props
    this.props.changeRoute(link)
  }

  _handleTitleSize = () => {
    const { isDesktop } = this.state

    if (isDesktop) {
      return 'huge'
    }

    return 'large'
  }

  _handleCustomText = () => {
    const { linkLabel, itemCount } = this.props
    let block

    if (linkLabel) {
      block = <Label data-cy='on-click' basic size={this._handleCustomTextSize()} className='color__primary text__weight--400 padding__none' onClick={this._handleGoTo}>
        <LinkWrapper className='cursor__pointer'>
          <span>{linkLabel}</span>
          <Image src={ArrowIcon} alt='CLiQQ' />
        </LinkWrapper>
      </Label>
    } else if (itemCount) {
      block = <Label basic size='medium' className='color__grey text__weight--500 padding__none'>
        <FormattedMessage values={{itemCount: itemCount}} {...messages.itemsFound} />
      </Label>
    }

    return block
  }

  _handleCustomTextSize = () => {
    const { isDesktop } = this.state

    if (isDesktop) {
      return 'large'
    }

    return 'medium'
  }

  componentDidMount () {
    const { windowWidth } = this.props

    this.setState({
      isDesktop: windowWidth >= 1024
    })
  }

  render () {
    const {
      title,
      dataCy,
      promosLoading,
      promo,
      noMarginBottom
    } = this.props
    const { isDesktop } = this.state

    return (
      <Container className={`${isDesktop ? 'padding__none' : 'padding__none--vertical'} height__inherit`} data-cy={dataCy} >
        <Wrapper noMarginBottom={noMarginBottom}>
          <TitleContainer>
            <div className='title'>
              <Label basic size={this._handleTitleSize()} className='color__grey text__weight--500 padding__none'>{title}</Label>
            </div>
            <div>
              {
                isDesktop && !promosLoading && promo && <TimerWrapper promo={promo} />
              }
            </div>
          </TitleContainer>
          {this._handleCustomText()}
        </Wrapper>
      </Container>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    dispatch
  }
}

export default connect(null, mapDispatchToProps)(WindowWidth(SectionTitle))
