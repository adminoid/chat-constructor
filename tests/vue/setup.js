/**
 * https://github.com/vuejs/vue-cli/issues/2128#issuecomment-453109575
 *
 */
require('jsdom-global')(undefined, { pretendToBeVisual: true, url: 'http://localhost' })
window.Date = Date
