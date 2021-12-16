import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false,
    idGame: 1,
    idUser: 1,
    guessing: null,
  },
  mutations: {
    tryLoging(state, data) {
      const body = JSON.stringify({ data });

      axios.post("http://127.0.0.1:8081/api/users/try-loging", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log("logged succesfully? " + response.data);

        //RESPOSE.DATA == TRUE IF LOGGED SUCCESFULLY
        if(response.data) {
          state.logged = true; //State logged controll to true
          router.push("/"); //Redirect to homepage
        }
      })
        .catch((error) => {
        console.log(error)
      });
    },

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
        // router.push("/player-submited-guess");
      })
        .catch((error) => {
        console.log(error)
      });
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store;