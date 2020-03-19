import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import router from '@/router'
import { VueSpinners } from '@saeris/vue-spinners'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import VModal from 'vue-js-modal'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueSpinners)
Vue.use(VModal)
Vue.use(VueLocalStorage)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
