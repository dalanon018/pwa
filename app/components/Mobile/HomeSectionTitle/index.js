/**
*
* HomeSectionTitle
*
*/

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import H3 from 'components/Shared/H3'
import { Label, Image, Container } from 'semantic-ui-react'
import ArrowIcon from 'images/icons/goto-icon.svg'
import { push } from 'react-router-redux'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  .title {
    color: #7D868C !important;
  }
  .link {
    color: #FF4814 !important;
  }
`

const LinkWrapper = styled.div`
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
    return (
      <Container className='padding__none--vertical'>
        <Wrapper>
          <Label basic size='large' className='title padding__none'>
            Featured Brands
          </Label>
          <Label basic size='small' className='link padding__none' onClick={this._handleGoTo()}>
            <LinkWrapper>
              <span>More Brands</span>
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

}

export default connect(null, mapDispatchToProps)(HomeSectionTitle)
