import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    search: ''
  },
  getters: {
    // Add the `getField` getter to the
    // `getters` of your Vuex store instance.
    getField
  },
  mutations: {
    // Add the `updateField` mutation to the
    // `mutations` of your Vuex store instance.
    updateField
  }
})

export default store
