import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import VueSocketIOExt from 'vue-socket.io-extended'
// import { io } from 'socket.io-client'

Vue.config.productionTip = false

// if(store.state.logged) {
//   const socket = io('http://localhost:3000')

//   Vue.use(VueSocketIOExt, socket)
// }

new Vue({
  router,
  store,
  // VueSocketIOExt,
  // socket,
  render: h => h(App)
}).$mount('#app')
