'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weatherApi = undefined;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false; // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var weatherApi = exports.weatherApi = _axios2.default.create({
  baseURL: 'http://apis.skplanetx.com//weather/',
  timeout: 1000,
  headers: { 'appKey': '4a427632-c9ff-3afb-9c4c-f46787312c15' }
});

/* eslint-disable no-new */
_vue2.default.prototype.$appName = 'Hi-Cord';
_vue2.default.prototype.$http = _axios2.default;
new _vue2.default({
  el: '#app',
  router: _router2.default,
  store: _store2.default,
  template: '<App/>',
  components: { App: _App2.default }
});
//# sourceMappingURL=main.js.map