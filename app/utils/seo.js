
/**
 * Facebook Pixel event tracking
 * @param {*} eventName
 * @param {*} eventData
 */
const FbEventTracking = (eventName, eventData = {}) => fbq('track', eventName, eventData)

export {
  FbEventTracking
}
