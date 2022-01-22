<template>
  <div>
    <div v-if="yourself" class="wrapper yourself">
      <div class="userNameWrapper">
        <span class="purpleTxt userName">{{userName}}</span>
      </div>
      <span class="guessing">"{{guess.txtPlayerAnswer}}"</span>
      <div class="photosParentWrapper">
        <div class="photosPairWrapper">
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji1}}</span>
            <img v-bind:src="guess.photos.photo1" />
          </div>
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji2}}</span>
            <img v-bind:src="guess.photos.photo2" />
          </div>
        </div>
        <div class="photosPairWrapper">
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji3}}</span>
            <img v-bind:src="guess.photos.photo3" />
          </div>
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji4}}</span>
            <img v-bind:src="guess.photos.photo4" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!yourself && guess.idUser != state.idUser" class="wrapper">
      <div class="userNameWrapper">
        <span class="purpleTxt userName">@{{userName}}</span>
        <span v-if="state.gameData.idCreator == state.idUser" @click="pickWinner(guess.idUser)" class="purpleTxt pickWinner">🏆</span>
      </div>
      <span class="guessing">"{{guess.guessing}}"</span>
      <div class="photosParentWrapper">
        <div class="photosPairWrapper">
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji1}}</span>
            <img v-bind:src="guess.photo1" />
          </div>
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji2}}</span>
            <img v-bind:src="guess.photo2" />
          </div>
        </div>
        <div class="photosPairWrapper">
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji3}}</span>
            <img v-bind:src="guess.photo3" />
          </div>
          <div class="photosWrapper">
            <span class="emojiInsidePhoto">{{state.gameData.emoji4}}</span>
            <img v-bind:src="guess.photo4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from "../store"

export default {
  name: 'GuessComponent',
  props: {
    guess: Object,
    yourself: Boolean,
  },
  data() {
    return {
      userName: '',
      state: store.state,
      winnerPicked: false,
    }
  },
  created: function() {
    this.getGameCreatorName(this.guess.idUser)
    this.winnerPicked = false;
  },
  methods: {
    getGameCreatorName(idCreator) {
      if(this.yourself) {
        this.userName = 'you'
      } else {
        axios.get(process.env.VUE_APP_API_URL+"/api/users/"+idCreator, 
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if(response.status == 200) {
            this.userName = response.data.username
          }
        })
          .catch((error) => {
          console.log(error)
        });
      }
    },
    pickWinner(idWinner) {
      if(!this.winnerPicked) {
        store.commit("pickWinner", idWinner)
        this.winnerPicked = true;
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 80vw;
  /* height: 20vw; */
  margin: 0 0 2vw 0;
  background-color: #202A83;
  border-radius: 5vw;
  display: flex;
  align-items: center;
  flex-flow: column;
  padding: 2vw 4vw 2vw 4vw;
}
.yourself {
  background-color: #0F20B6 !important;
}
  .userNameWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
    .userName {
      font-size: 7.5vw;
      font-weight: 900;
    }
    .pickWinner {
      font-size: 10vw;
      font-weight: 900;
    }
  .guessing {
    color: #F6F6F6;
    font-size: 5.5vw;
    font-weight: 800;
    text-align: start;
    width: 95%;
  }
  .photosParentWrapper {
    display: flex;
    flex-flow: column;
    margin: 3vw 0 0 0;
  }
    .photosPairWrapper {
      display: flex;
      flex-flow: row;
    }
      .photosWrapper {
        border: 2px solid #001AFF;
        width: 38vw;
        height: 38vw;
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
</style>
