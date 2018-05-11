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
import TimerWrapper from 'components/Desktop/TimerWrapper'

import WindowWidth from 'components/Shared/WindowWidth'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
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
      return 'big'
    }

    return 'large'
  }

  _handleCustomText = () => {
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
      linkLabel,
      dataCy,
      promosLoading,
      promo
    } = this.props
    const { isDesktop } = this.state

    return (
      <Container className='padding__none--vertical' data-cy={dataCy} >
        <Wrapper>
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

          <Label data-cy='on-click' basic size={this._handleCustomText()} className='color__primary text__weight--400 padding__none' onClick={this._handleGoTo}>
            <LinkWrapper>
              <span>{linkLabel || 'See All'}</span>
              <Image src={ArrowIcon} alt='CLiQQ' />
            </LinkWrapper>
          </Label>
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
