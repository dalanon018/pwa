/**
*
* BannerSlider
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Image } from 'semantic-ui-react'

import ReactImageMagnify from 'react-image-magnify'

// import { ifElse, gt } from 'ramda'
// import { noop } from 'lodash'

class SlideShow extends React.PureComponent {
  static propTypes = {
    isLowerdots: PropTypes.bool,
    isInfinite: PropTypes.bool,
    images: PropTypes.array.isRequired,
    slidesToShow: PropTypes.number,
    settings: PropTypes.object.isRequired
  }

  _handleLightBox = imageIndex => () => this.props.toggleLightBox(imageIndex.toString())

  _handleSlides = (images) => {
    const { toggleLightBox, handleMouseEnter, handleMouseLeave } = this.props
    let block

    if (toggleLightBox) {
      block = images.map((item, index) => (
        typeof item === 'string'
          ? <div
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={this._handleLightBox(index)}>
            <ReactImageMagnify {...{
              smallImage: {
                alt: 'CLiQQ',
                width: 350,
                height: 350,
                src: `${item}350`,
                srcSet: [
                  `${item}687 687w`,
                  `${item}770 770w`,
                  `${item}861 861w`,
                  `${item}955 955w`
                ].join(', '),
                sizes: '(min-width: 1024px) 30vw, 80vw'
              },
              largeImage: {
                alt: 'CLiQQ',
                src: `${item}350`,
                width: 1200,
                height: 1200
              }
            }} />
          </div>
          : ''
      ))
    } else {
      block = images.map((item, index) => (
        typeof item === 'string'
          ? <div key={index}>
            <Image alt='CLiQQ' src={item} />
          </div>
          : ''
      ))
    }

    return block
  }

  render () {
    const { settings, images } = this.props

    return (
      <Slider
        {...settings}
        >
        { images && this._handleSlides(images) }
      </Slider>
    )
  }
}

export default SlideShow
