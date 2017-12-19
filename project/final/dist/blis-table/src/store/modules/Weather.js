'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _main = require('../../main');

var state = {
  weather: ''
};

var getters = {
  getCurrentWeather: function getCurrentWeather(state) {
    return state.weather;
  }
};

// Can't Async
var mutations = {
  'GET_WEATHER': function GET_WEATHER(state) {
    // Optionally the request above could also be done as
    _main.weatherApi.get('current/hourly?lon=&village=동춘1동&county=연수구&lat=&city=인천&version=1').then(function (response) {
      state.weather = response.data.weather.hourly[0].sky.name;
    }).catch(function (error) {
      console.log(error);
    });
  }
};

// Can Async
var actions = {
  getWeather: function getWeather(_ref) {
    var commit = _ref.commit;

    commit('GET_WEATHER');
  }
};

exports.default = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
//# sourceMappingURL=weather.js.map