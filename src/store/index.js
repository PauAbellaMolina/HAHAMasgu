import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logged: false,
    idUser: null,
    userName: '',
    gameData: null,
    guessing: null,
    guesses: [],
    allGuesses: [],
    socket: null
  },
  mutations: {
    //Create a socket instance and save it in state. Called from router (Homepage (/))
    createSocketConnection(state) {
      const socket = io(process.env.SOCKET_IO_URL);
      Vue.use(VueSocketIOExt, socket)
      state.socket = socket;
      console.log("user connected to socket")
    },

    //Called from Login.vue (/login)
    tryLoging(state, data) {
      const body = JSON.stringify({ data });

      axios.post(process.env.API_URL+"/api/users/try-loging", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        // console.log(response);

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

      axios.post(process.env.API_URL+"/api/games/enter-game-room", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        // console.log(response);

        //RESPOSE.DATA.LENGTH > 1 IF GAME FOUND
        if(response.data.length > 0) {
          state.gameData = response.data[0];
          
          store.commit('getGuesses');

          //IF WINNER ID IS 0 MEANS THE GAME IS STILL GOING ON
          if(state.gameData.idWinner === 0) {
            //CONNECT USER TO ROOM ON SOCKET SERVER
            const room = state.gameData.id;
            state.socket.emit('room', room);
            //If joined correctly, show it
            state.socket.on('roomJoined', () => {
              console.log("room joined correctly");
            });

            //If user entering is the creator of the room
            if(state.gameData.idCreator == state.idUser) {
              // console.log(state.gameData.gameCode);
              router.push("/player-submited-guess");
            } else { //Is player
              //CHECK IF USER HAS ALREADY MADE A SUBMIT IN THAT ROOM BEFORE, IF NOT, REDIRECT AS FOLLOWING
              axios.get(process.env.API_URL+"/api/guesses/"+state.gameData.id+"/"+state.idUser, 
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((response) => {
                // console.log(response);

                //RESPOSE.DATA.LENGTH > 1 IF USER ALREADY SUMBITED A GUESS TO THAT ROOM
                if(response.data.length > 0) {
                  state.guessing = {
                                      txtPlayerAnswer: response.data[0].guessing,
                                      photos: {
                                        photo1: response.data[0].photo1,
                                        photo2: response.data[0].photo2,
                                        photo3: response.data[0].photo3,
                                        photo4: response.data[0].photo4,
                                      }
                                    }
                  
                  router.push("/player-submited-guess"); //Redirect to submited screen
                } else {
                  router.push("/player-submit-guess"); //Redirect to player submit guess
                }

              })
                .catch((error) => {
                console.log(error)
              });
            }
          } else { //HERE MEANS THERE IS A WINNER AND SO THE GAME IS FINISHED
            router.push("/winner-view");
          }
        }
      })
        .catch((error) => {
        console.log(error)
      });
    },

    //Called from Submit guess button on PSubmitGuess.vue /player-submit-guess
    submitGuessing(state, guessing) {
      state.guessing = guessing

      const stateAux = {
        logged: state.logged,
        idUser: state.isUser,
        userName: state.userName,
        gameData: state.gameData,
        guessing: state.guessing,
      }

      const body = JSON.stringify({ stateAux });

      axios.post(process.env.API_URL+"/api/guesses", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        state.socket.emit('newGuessingSubmitted');
        
        router.push("/player-submited-guess");
      })
        .catch((error) => {
        console.log(error)
      });
    },
  
    //Called from create game button on CreateGame.vue /create-game
    submitNewGame(state, game) {
      const gameAux = {
        idCreator: state.idUser,
        guess: game.txtGuessing,
        hint: game.txtHint,
        emoji1: game.txtEmoji1,
        emoji2: game.txtEmoji2,
        emoji3: game.txtEmoji3,
        emoji4: game.txtEmoji4,
        idWinner: 0,
      };

      const body = JSON.stringify({ gameAux });

      axios.post(process.env.API_URL+"/api/games", body, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        state.gameData = response.data;
        store.commit('enterGameRoom', response.data.gameCode);
      })
        .catch((error) => {
        console.log(error)
      });
    },

    getGuesses(state) {
      axios.get(process.env.API_URL+"/api/guesses/"+state.gameData.id, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        state.guesses = response.data
      })
        .catch((error) => {
        console.log(error)
      });
    },

    pickWinner(state, idWinner) {
      axios.post(process.env.API_URL+"/api/games/pickWinner/"+state.gameData.id+"/"+idWinner, 
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if(response.status == 200) {
            store.state.gameData.idWinner = response.data[0];
            state.socket.emit('winnerPicked');
          }
        })
          .catch((error) => {
          console.log(error)
        });
    },

    getGameData(state) {
      axios.get(process.env.API_URL+"/api/games/"+state.gameData.id, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        state.gameData = response.data[0];
        router.push("/winner-view");
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