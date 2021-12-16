import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false,
    idUser: null,
    userName: '',
    gameData: null,
    guessing: null,
  },
  mutations: {
    //Called from Login.vue (/login)
    tryLoging(state, data) {
      const body = JSON.stringify({ data });

      axios.post("http://127.0.0.1:8081/api/users/try-loging", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);

        //RESPOSE.DATA.LENGTH > 1 IF LOGGED SUCCESFULLY
        if(response.data.length > 0) {
          state.logged = true; //State logged controll to true
          state.idUser = response.data[0].id;
          state.userName = data.name;
          
          router.push("/"); //Redirect to homepage
        }
      })
        .catch((error) => {
        console.log(error)
      });
    },

    //Called from Join button click on Homepage.vue (/)
    enterGameRoom(state, gameCodeRequest) {
      const body = JSON.stringify({ gameCodeRequest });

      axios.post("http://127.0.0.1:8081/api/games/enter-game-room", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);

        //RESPOSE.DATA.LENGTH > 1 IF GAME FOUND
        if(response.data.length > 0) {
          state.gameData = response.data[0];
          console.log(state);
          
          //CHECK IF USER HAS ALREADY MADE A SUBMIT IN THAT ROOM BEFORE, IF NOT, REDIRECT AS FOLLOWING
          router.push("/player-submit-guess"); //Redirect to player submit guess
        }
      })
        .catch((error) => {
        console.log(error)
      });
    },

    //Called from Submit guess button on PSubmitGuess.vue /player-submit-guess
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