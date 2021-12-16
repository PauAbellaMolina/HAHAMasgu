import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'

import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    beforeEnter (to, from, next) {
      if(store.state.logged) {
        if (!Vue.prototype.$socket) { 
          const socket = io('http://localhost:3000')
          Vue.use(VueSocketIOExt, socket)

          console.log("user connected to socket")
        }
        next()
      } else {
        router.push("/login")
      }
   }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/player-submit-guess',
    name: 'PlayerSubmitGuess',
    component: () => import('../views/player-views/PSubmitGuess.vue'),
    beforeEnter (to, from, next) {
      if(store.state.logged) {
        next()
      } else {
        router.push("/login")
      }
   }
  }
]

const router = new VueRouter({
  routes
})

export default router
