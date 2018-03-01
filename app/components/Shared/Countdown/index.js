/**
*
* Countdown
* A HOC component to hander our timer.
*
*/

import React from 'react'
import PropTypes from 'prop-types'
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
        const endDate = CountdownParser(receipt.get('expiryDate'))

        clearInterval(this.countdownInterval)

        this._countdownTimer(endDate)
      }
    }

    _countdownTimer = (endTime) => {
      const currentTime = moment().unix()
      const distance = endTime - currentTime
      let duration = moment.duration(distance * 1000, 'milliseconds')
      const interval = 1000

      this.countdownInterval = setInterval(() => {
        duration = moment.duration(duration - interval, 'milliseconds')
        const countDays = () =>
          duration.days().toString().length > 1 ? duration.days() : `0${duration.days()}`

        const countHours = () =>
          duration.hours().toString().length > 1 ? duration.hours() : `0${duration.hours()}`

        const countMinutes = () =>
          duration.minutes().toString().length > 1 ? duration.minutes() : `0${duration.minutes()}`

        const countSeconds = () =>
          duration.seconds().toString().length > 1 ? duration.seconds() : `0${duration.seconds()}`

        const shouldIncludeDays = duration.days() ? `${countDays()}:` : ''

        this.setState({
          timer: `${shouldIncludeDays}${countHours()}:${countMinutes()}:${countSeconds()}`
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

    componentDidMount () {
      this._startCountDownTimer(this.props)
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
