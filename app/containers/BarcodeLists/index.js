/*
 *
 * BarcodeLists
 *
 */

import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import Slider from 'react-slick'

import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'

import H2 from 'components/H2'
import Barcode from 'components/Barcode'
import ConfirmImage from 'images/CONFIRM-BG.png'
import IntransitImage from 'images/IN-TRANSIT-BG.png'
import PickupImage from 'images/PICK-UP-BG.png'

import messages from './messages'

import {
  selectLoader,
  selectBarcodes
} from './selectors'

import {
  getBarcodesAction
} from './actions'

const BarcodeWrapper = styled.div`
  background: url(${({background}) => background}) no-repeat top right / cover;
  height: 100vh;
  padding: 25px;

  .slick-dots {
    top: -40px;

    li {
      height: 25px;
      margin: 0;
      width: 15px;
      button {
        height: 17px;
        padding: 3px;
        width: 17px;
      }
      &.slick-active {
        button:before {
          color: #FFFFFF;
          opacity: .90;
        }
      }
      button:before {
        color: #FFFFFF;
        font-size: 10px;
        opacity: .50;
      }
    }
  }
`

const SliderContainer = styled.div`
  margin-top: 50px;
`

const SliderWrapper = styled.div`
  padding: 0 5px;
`

export class BarcodeLists extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    getBarcodes: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    current: null
  }

  constructor () {
    super()

    this._afterChange = this._afterChange.bind(this)
    this._identifyBackground = this._identifyBackground.bind(this)
  }

  _afterChange (index) {
    console.log(index)
  }

  _identifyBackground () {
    const { current } = this.state
    // means its still loading
    if (current === null) {
      return PickupImage
    }

    switch (current.get('status')) {
      case 'INTRANSIT': return IntransitImage
      case 'CONFIRMED': return ConfirmImage
      default: return PickupImage
    }
  }

  componentDidMount () {
    this.props.getBarcodes()
  }

  componentWillReceiveProps (nextProps) {
    const { barcodes } = nextProps
    const { current } = this.state
    if (barcodes.size > 0 && current === null) {
      this.setState({
        current: barcodes.first()
      })
    }
  }

  render () {
    // const { barcodes, loader } = this.props
    // const { current } = this.state
    const slickSettings = {
      adaptiveHeight: true,
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: this._afterChange
    }

    return (
      <BarcodeWrapper background={this._identifyBackground}>
        <Helmet
          title='Barcodes'
          meta={[
            { name: 'description', content: 'List of barcodes' }
          ]}
          link={[
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' }
          ]}
        />
        <H2 color='#FFF' center>
          <FormattedMessage {...messages.barcodeHeader} />
        </H2>
        <SliderContainer>
          <Slider {...slickSettings}>
            <SliderWrapper>
              <Barcode />
            </SliderWrapper>
            <SliderWrapper>
              <Barcode />
            </SliderWrapper>
          </Slider>
        </SliderContainer>
      </BarcodeWrapper>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  barcodes: selectBarcodes(),
  loader: selectLoader()
})

function mapDispatchToProps (dispatch) {
  return {
    getBarcodes: () => dispatch(getBarcodesAction()),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeLists)
