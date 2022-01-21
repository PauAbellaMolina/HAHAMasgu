<template>
  <div class="pageWrapper">
    <div class="titleQuestion">
      <span>Write a phrase others have to guess:</span>
    </div>
    <div class="guessing">
        <span>The Guessing:</span>
        <textarea v-model="game.txtGuessing" type="text" placeholder="" />
    </div>
    <div class="emojis">
        <span>The Emojis:</span>
        <div class="emojisWrapper">
            <textarea v-model="game.txtEmoji1" type="text" placeholder="" />
            <textarea v-model="game.txtEmoji2" type="text" placeholder="" />
            <textarea v-model="game.txtEmoji3" type="text" placeholder="" />
            <textarea v-model="game.txtEmoji4" type="text" placeholder="" />
        </div>
    </div>
    <div class="hint">
        <span>Short hint:</span>
        <textarea v-model="game.txtHint" type="text" placeholder="" />
    </div>
    <button class="submitBtn" @click="submitNewGame()" :disabled="game.txtGuessing===null || game.txtGuessing==='' || game.txtHint===null || game.txtHint==='' || game.txtEmoji1===null || txtEmoji1==='' || game.txtEmoji2===null || game.txtEmoji2==='' || game.txtEmoji3===null || game.txtEmoji3==='' || game.txtEmoji4===null || game.txtEmoji4===''">
        CREATE
    </button>
  </div>
</template>

<script>
import store from "../../store"

export default {
  name: 'CreateGame',
  data() {
    return {
        game: {
            txtGuessing: '',
            txtHint: '',
            txtEmoji1:'',
            txtEmoji2:'',
            txtEmoji3:'',
            txtEmoji4:'',
        },
    }
  },
  components: {
  },
  mounted: function() {

  },
  methods: {
    submitNewGame() {
      store.commit('submitNewGame', this.game);
    },
  }
}
</script>

<style scoped>
.separator {
  margin: 1.7vw 0;
}
.pageWrapper {
  display: flex;
  flex-flow: column;
  /* justify-content: center; */
  align-items: center;
}
  .titleQuestion {
    font-size: 10vw;
    font-weight: 900;
    color: #D1D1D1;
    text-align: start;
    padding: 12vw 6vw 10vw 6vw;
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
  
    .guessing, .hint, .emojis {
        display: flex;
        flex-flow: column;
        align-items: start;
        margin: 0 10vw;
    }
        .guessing span, .hint span, .emojis span {
            font-size: 8vw;
            font-weight: 900;
            color: #D1D1D1;
            margin: 0 .3vw 0 2vw;
        }
        .guessing textarea, .hint textarea, .emojis textarea {
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

        .hint span {
            font-size: 5.5vw;
        }
        .hint textarea {
            font-size: 5vw;
            height: 14vw;
            border-radius: 6vw;
        }

        .emojis {
            margin: 5vw 1vw;
        }
        .emojis span {
            margin: 0 10vw;
        }
        .emojis textarea {
            width: 15%;
            height: 15vw;
            border-radius: 7vw;
            font-size: 10vw;
            text-align: center;
        }

    button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        border: none;
        text-align: center;
        width: 80%;
    }
    .submitBtn {
        font-size: 9vw;
        background-color: #1328E9;
        color: #DBDBDB;
        border-radius: 7vw;
        height: 19vw;
        margin: 10vw 14vw 5vw 15vw;
    }
    .submitBtn:disabled {
        background-color: #19269b;
        color: #a8a8a8;
    }
</style>
