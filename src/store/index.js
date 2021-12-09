import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    idGame: 1,
    idUser: 1,
    guessing: null,
  },
  mutations: {
    submitGuessing(state, guessing) {
      state.guessing = guessing

      const body = JSON.stringify({ state });

      axios.post("http://127.0.0.1:8081/api/guesses", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
      })
        .catch((error) => {
        console.log(error.statusText)
      });
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;