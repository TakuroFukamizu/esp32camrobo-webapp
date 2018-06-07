import Vue from 'vue'
import * as Vuex from 'vuex'
import ESP32Controller from '../device/ESP32Controller'

Vue.use(Vuex)

const state: State.Root = {
  con: new ESP32Controller(),
  isConnected: false,

  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  }
}
const mutations = {

  TOGGLE_CONNECTION(state, isConnected) {
    state.isConnected = isConnected;
  },

  TOGGLE_DEVICE(state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  TOGGLE_SIDEBAR(state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  }
}
const actions = {
  toggleConnection({ commit }, isConnected:boolean) {
    commit('TOGGLE_CONNECTION', isConnected)
  },

  toggleDevice({ commit }, device:any) {
    commit('TOGGLE_DEVICE', device)
  },
  toggleSidebar({ commit }, config:any) {
    if (config instanceof Object) {
      commit('TOGGLE_SIDEBAR', config)
    }
  }
}
const getters = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
