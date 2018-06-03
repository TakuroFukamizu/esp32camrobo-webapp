import Vue from 'vue'
import * as Vuex from 'vuex'
import ESP32Controller from '../device/ESP32Controller'

Vue.use(Vuex)

const state: State.Root = {
  con: new ESP32Controller(),
  isConnected: false
}
const mutations = {}
const actions = {}
const getters = {}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
