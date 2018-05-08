/**
*
* HomeSectionTitle
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

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
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

export class HomeSectionTitle extends React.PureComponent {
  _handleGoTo = () => () => {
    const { link } = this.props
    this.props.changeRoute(link)
  }

  render () {
    const { title, linkLabel } = this.props

    return (
      <Container className='padding__none--vertical'>
        <Wrapper>
          <Label basic size='large' className='color__grey text__weight--500 padding__none'>{title}</Label>
          <Label basic size='small' className='color__primary text__weight--400 padding__none' onClick={this._handleGoTo()}>
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

HomeSectionTitle.propTypes = {
  changeRoute: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  linkLabel: PropTypes.string
}

export default connect(null, mapDispatchToProps)(HomeSectionTitle)
