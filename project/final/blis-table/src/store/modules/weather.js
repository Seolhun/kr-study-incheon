import {weatherApi} from '../../main'

const state = {
  weather: ''
}

const getters = {
  getCurrentWeather (state) {
    return state.weather
  }
}

// Can't Async
const mutations = {
  'GET_WEATHER' (state) {
    // Optionally the request above could also be done as
    weatherApi.get('current/hourly?lon=&village=동춘1동&county=연수구&lat=&city=인천&version=1')
      .then(function (response) {
        state.weather = response.data.weather.hourly[0].sky.name
      }).catch(function (error) {
      console.log(error);
    });
  }
}

// Can Async
const actions = {
  getWeather: ({commit}) => {
    commit('GET_WEATHER')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
