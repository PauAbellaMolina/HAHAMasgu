<template>
  <div class="pageWrapper">
    <div class="guessReveal">
      <span class="winnerName">The winner is <span class="purpleTxt creatorName">@{{this.gameWinner}}</span></span>
      <span class="guessing">"{{this.guessWinner.guessing}}"</span>
    </div>
    
    <div class="photosParentWrapper">
      <div class="photosPairWrapper">
        <div class="photosWrapper">
          <span class="emojiInsidePhoto">{{state.gameData.emoji1}}</span>
          <img v-bind:src="this.guessWinner.photo1" />
        </div>
        <div class="photosWrapper">
          <span class="emojiInsidePhoto">{{state.gameData.emoji2}}</span>
          <img v-bind:src="this.guessWinner.photo2" />
        </div>
      </div>
      <div class="photosPairWrapper">
        <div class="photosWrapper">
          <span class="emojiInsidePhoto">{{state.gameData.emoji3}}</span>
          <img v-bind:src="this.guessWinner.photo3" />
        </div>
        <div class="photosWrapper">
          <span class="emojiInsidePhoto">{{state.gameData.emoji4}}</span>
          <img v-bind:src="this.guessWinner.photo4" />
        </div>
      </div>
    </div>

    <div class="guessRevealOriginal">
      <span class="winnerNameOriginal"><span class="purpleTxt creatorNameOriginal">@{{this.gameCreator}}</span> said:</span>
      <br>
      <span>"{{state.gameData.guess}}"</span>
    </div>

    <!-- <div class="guesses">
      <guess-component :guess="state.guessing" :yourself="true" />
      <guess-component v-for="guess in state.guesses" :key="guess.id" :guess="guess" :yourself="false" />
    </div>
    <div class="waitingText">
      <span>Waiting for <span class="purpleTxt">@{{this.gameCreator}}</span> to choose a winner...</span>
    </div> -->
  </div>
</template>

<script>
import store from "../../store"
import axios from 'axios'
// import GuessComponent from '../../components/GuessComponent'

export default {
  name: 'WinnerView',
  data() {
    return {
      state: store.state,

      gameCreator: '',
      gameWinner: '',

      guessWinner: null
    }
  },
  components: {
    // GuessComponent
  },
  // sockets: {
  //   newGuess() {
  //     console.log(this.state.guesses)
  //   },
  // },
  mounted: function() {
    this.getGameWinnerGuess(this.state);
    this.getGameCreatorName(this.state.gameData.idCreator);
    this.getGameWinnerName(this.state.gameData.idWinner);
  },
  methods: {
    getGameCreatorName(idCreator) {
      axios.get(process.env.VUE_APP_API_URL+"/api/users/"+idCreator, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if(response.status == 200) {
          this.gameCreator = response.data.username
        }
      })
        .catch((error) => {
        console.log(error)
      });
    },
    getGameWinnerName(idWinner) {
      axios.get(process.env.VUE_APP_API_URL+"/api/users/"+idWinner, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if(response.status == 200) {
          this.gameWinner = response.data.username
        }
      })
        .catch((error) => {
        console.log(error)
      });
    },

    getGameWinnerGuess(state) {
      axios.get(process.env.VUE_APP_API_URL+"/api/guesses/"+state.gameData.id+"/"+state.gameData.idWinner, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if(response.status == 200) {
          this.guessWinner = response.data[0]
          // console.log(this.guessWinner)
        }
      })
        .catch((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style scoped>
* {
  /* border: 1px solid red; */
}
.separator {
  margin: 1.7vw 0;
}
.pageWrapper {
  display: flex;
  flex-flow: column;
  /* justify-content: center; */
  align-items: start;
}
.guessReveal {
  font-size: 8vw;
  font-weight: 900;
  color: #D1D1D1;
  text-align: start;
  padding: 12vw 0 4vw 4vw;
  display: flex;
  flex-flow: column;
}
  .guessReveal .winnerName {
    font-size: 5vw;
  }
    .guessReveal .creatorName {
      font-size: 7.5vw;
    }
  .guessReveal .guessing {
    margin: 4vw 0 0 0;
  }
.guessRevealOriginal {
  font-size: 6vw;
  font-weight: 900;
  color: #D1D1D1;
  text-align: start;
  padding: 12vw 6vw 4vw 6vw;
}
  .guessRevealOriginal .winnerNameOriginal {
    font-size: 5vw;
  }
    .guessRevealOriginal .creatorNameOriginal {
      font-size: 6vw;
    }

.photosParentWrapper {
    display: flex;
    flex-flow: column;
    margin: 3vw 0 0 0;
    width: 100%;
    align-items: center;
  }
    .photosPairWrapper {
      display: flex;
      flex-flow: row;
    }
      .photosWrapper {
        border: 2px solid #001AFF;
        width: 45vw;
        height: 45vw;
        border-radius: 8vw;
        position: relative;
        margin: 1vw;
      }
        .photosWrapper img {
          border-radius: 8vw;
          object-fit: cover;
          height: 100% !important;
          width: 100% !important;
          -webkit-transform: scaleX(-1);
          transform: scaleX(-1);
        }
        .photosWrapper .emojiInsidePhoto {
          position: absolute;
          font-size: 10vw;
          /* margin: 1.5vw 0 0 1.5vw; */
          top: .5vw;
          left: .3vw;
          z-index: 1;
        }


  .titleQuestion {
    font-size: 10vw;
    font-weight: 900;
    color: #D1D1D1;
    text-align: start;
    padding: 12vw 6vw 4vw 6vw;
  }

  .emojisToGuess {
    padding: 4vw 1vw;
    border: 2px solid #001AFF;
    border-radius: 8vw;
    margin: 0 4vw;
  }
    .emojisToGuess span {
      font-size: 15vw;
    }

  .hintGuess {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    margin: 4vw 6vw;
  }
    .hintGuess .hintTitle {
      font-size: 7vw;
      font-weight: 900;
      color: #D1D1D1;
    }
    .hintGuess .hint {
      font-size: 5vw;
      font-weight: 900;
      margin: .7vw 0 .8vw 2vw;
    }
  
  .playerAnswer {
    display: flex;
    flex-flow: column;
    width: 100%;
  }
    .playerAnswer .txtAnswer {
      display: flex;
      flex-flow: column;
      align-items: start;
      margin: 5vw 10vw;
    }
      .playerAnswer .txtAnswer span {
        font-size: 8vw;
        font-weight: 900;
        color: #D1D1D1;
        margin: 0 .3vw 0 2vw;
      }
      .playerAnswer .txtAnswer textarea {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        font-size: 7vw;
        background-color: #1E2139;
        border: 2px solid #001AFF;
        color: #9381FF;
        text-align: start;
        padding: 3vw 3vw;
        border-radius: 8vw;
        height: 22vw;
        width: 91%;
      }

    .playerAnswer .emojisAnswer {
      display: flex;
      flex-flow: column;
      align-items: start;
      margin: 0 5vw 6vw 5vw;
      /* height: 50vh; */
    }
      .playerAnswer .emojisAnswer span {
        font-size: 8vw;
        font-weight: 900;
        color: #D1D1D1;
        margin: 0 .3vw .7vw 2vw;
      }
      .playerAnswer .emojisAnswer .emojiAnswersWraper {
        display: flex;
        flex-flow: column;
      }
        .playerAnswer .emojisAnswer .emojiAnswersWraper div {
          display: flex;
          flex-flow: row;
          margin-bottom: 3vw;
        }
          .playerAnswer .emojisAnswer .emojiAnswersWraper div .cameraWrapper {
            border: 2px solid #001AFF;
            width: 40vw;
            height: 40vw;
            border-radius: 8vw;
            position: relative;
          }
            .playerAnswer .emojisAnswer .emojiAnswersWraper div .cameraWrapper .emojiInsideCamera {
              position: absolute;
              font-size: 10vw;
              /* margin: 1.5vw 0 0 1.5vw; */
              top: .5vw;
              left: .3vw;
              z-index: 1;
            }
          .playerAnswer .emojisAnswer .emojiAnswersWraper div .cameraWrapper video, .playerAnswer .emojisAnswer .emojiAnswersWraper div .cameraWrapper canvas {
            border-radius: 8vw;
            object-fit: cover;
            height: 100% !important;
            width: 100% !important;
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
          }

      .playerAnswer button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        border: none;
        text-align: center;
      }
        .playerAnswer .submitBtn {
          font-size: 9vw;
          background-color: #1328E9;
          color: #DBDBDB;
          border-radius: 7vw;
          height: 19vw;
          margin: 0 14vw 5vw 15vw;
        }
        .playerAnswer .submitBtn:disabled {
          background-color: #19269b;
          color: #a8a8a8;
        }
  
  .waitingText {
    font-size: 5vw;
    font-weight: 900;
    color: #D1D1D1;
    width: 70%;
    margin: 3vw 0 5vw 0 ;
  }
</style>
