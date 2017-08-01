/**
*
* Countdown
*
*/

import React, { PropTypes } from 'react'
import moment from 'moment'

class Countdown extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    endDate: PropTypes.number.isRequired
  }

  /**
   * holder for countdown interval
   */
  countdownInterval

  state = {
    timer: '00:00:00'
  }

  constructor () {
    super()

    this._countdownTimer = this._countdownTimer.bind(this)
    this._disableTimer = this._disableTimer.bind(this)
  }

  _countdownTimer () {
    const { endDate } = this.props

    let currentTime = moment().unix()
    let diffTime = endDate - currentTime
    let duration = moment.duration(diffTime * 1000, 'milliseconds')
    let interval = 1000

    this.countdownInterval = setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds')
      const countHours = () => {
        if (duration.hours().toString().length > 1) {
          return duration.hours()
        } else {
          return '0' + duration.hours()
        }
      }
      const countMinutes = () => {
        if (duration.minutes().toString().length > 1) {
          return duration.minutes()
        } else {
          return '0' + duration.minutes()
        }
      }
      const countSeconds = () => {
        if (duration.seconds().toString().length > 1) {
          return duration.seconds()
        } else {
          return '0' + duration.seconds()
        }
      }

      this.setState({
        timer: `${countHours()}:${countMinutes()}:${countSeconds()}`
      })
    }, 1000)
  }

  /**
   * we need to make sure that once the timer goes to negative then
   * we need to clear our interval means its done
   */
  _disableTimer () {
    const { timer } = this.state
    const pT = parseInt

    const [ hh, mm, ss ] = timer.split(':')

    if ((pT(hh) + pT(mm) + pT(ss)) < 0) {
      clearInterval(this.countdownInterval)
      this.setState({
        timer: '00:00:00'
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.countdownInterval)
  }

  componentDidMount () {
    this._countdownTimer()
  }

  componentDidUpdate (prevProps, prevState) {
    this._disableTimer()
  }

  render () {
    const { timer } = this.state
    return (
      <p>{timer}</p>
    )
  }
}

export default Countdown
