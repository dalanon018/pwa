/**
*
* Countdown
* A HOC component to hander our timer.
*
*/

import React, { PropTypes } from 'react'
import moment from 'moment'

import { CountdownParser } from 'utils/date' // DateFormater

export default function (WrapperComponent) {
  class Timer extends React.Component {
    static propTypes = {
      statuses: PropTypes.object.isRequired,
      receipt: PropTypes.object.isRequired
    }

    /**
     * holder for countdown interval
     */
    countdownInterval

    state = {
      timer: ''
    }

    _startCountDownTimer = (props) => {
      const { receipt, statuses } = props
      if (statuses[receipt.get('status')] === 'RESERVED') {
        const endDate = CountdownParser(receipt.get('claimExpiry'))

        clearInterval(this.countdownInterval)

        this._countdownTimer(endDate)
      }
    }

    _countdownTimer = (endDate) => {
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
    _disableTimer = () => {
      const { timer } = this.state
      const pT = parseInt

      const [ hh, mm, ss ] = timer ? timer.split(':') : ''

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

    componentDidUpdate (prevProps, prevState) {
      this._disableTimer()
    }

    componentWillReceiveProps (nextProps) {
      this._startCountDownTimer(nextProps)
    }

    render () {
      return (
        <WrapperComponent
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  return Timer
}
