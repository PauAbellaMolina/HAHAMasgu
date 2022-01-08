import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'
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
          //Call createSocketConnection in store to create socket instance
          store.commit('createSocketConnection');
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
  },
  {
    path: '/player-submited-guess',
    name: 'PlayerSubmitedGuess',
    component: () => import('../views/common-views/PSubmitedGuess.vue'),
    beforeEnter (to, from, next) {
      if(store.state.logged) {
        next()
      } else {
        router.push("/login")
      }
   }
  },
  {
    path: '/winner-view',
    name: 'WinnerView',
    component: () => import('../views/common-views/WinnerView.vue'),
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
