/**
*
* BannerSlider
*
*/

import React, { PropTypes } from 'react'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

import { ifElse, gt } from 'ramda'
import { noop } from 'lodash'

class SlideShow extends React.PureComponent {
  static propTypes = {
    isLowerdots: PropTypes.bool,
    isInfinite: PropTypes.bool,
    images: PropTypes.array.isRequired,
    slidesToShow: PropTypes.number,
    settings: PropTypes.object.isRequired
  }

  assignTimeOut

  _innerSliderRef = (c) => {
    this.slider = c
  }

  _initNextSlide = () => {
    const { innerSlider } = this.slider

    this.assignTimeOut = setTimeout(() => {
      innerSlider.__isMounted && innerSlider.slickNext()
    }, 3500)
  }

  _clearTimeOut = () => {
    clearTimeout(this.assignTimeOut)
  }

  componentDidMount () {
    const { props } = this.slider
    const shouldSlideNext = ifElse(gt(props.children.length), this._initNextSlide, noop)

    shouldSlideNext(1)
  }

  render () {
    const { settings, images } = this.props

    return (
      <Slider
        ref={this._innerSliderRef}
        {...settings}
        afterChange={this._clearTimeOut}>
        {
          images &&
          images.map((item, index) => {
            return (
              <div key={index}>
                {
                  (typeof item === 'string' ? <Image alt='CLiQQ' src={item} /> : '')
                }
              </div>
            )
          })
        }
      </Slider>
    )
  }
}

export default SlideShow
