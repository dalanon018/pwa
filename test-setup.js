/**
 * https://github.com/akiran/react-slick/issues/742
 * slick issue with JEST:
 * https://github.com/akiran/react-slick#test-setup
 */
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {}
  }
}
