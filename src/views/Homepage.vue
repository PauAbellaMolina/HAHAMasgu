<template>
  <div class="pageWrapper">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="title">
      <span class="haha">HAHA</span>
      <span class="masgu">MASGU</span>
      <span class="titleEmojis">👺😹🙏🗿</span>
    </div>
    <div class="joinInputs">
      <input v-model="gameCodeRequestJoin" type="number" placeholder="CODE">
      <button class="joinBtn" @click="join()" :disabled="gameCodeRequestJoin === '' || gameCodeRequestJoin === null">JOIN</button>
      <span class="separator" />
      <button class="createBtn" @click="$router.push('/create-game')">CREATE</button>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'Homepage',
  data() {
    return {
      gameCodeRequestJoin: null,
    }
  },
  components: {
    
  },
  methods: {
    join() {
      store.commit('enterGameRoom', this.gameCodeRequestJoin);
    }
  },
}
</script>

<style scoped>
.separator {
  margin: 3.5vw 0;
}
.pageWrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
  .title {
    display: flex;
    flex-flow: column;
  }
    .title span {
      font-weight: 900;
      color: #D1D1D1;
    }
      .title .haha {
        font-size: 22.5vw;
      }
      .title .masgu {
        font-size: 18vw;
      }
      .title .titleEmojis {
        font-size: 10vw;
      }

  .joinInputs {
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 80vw;
  }
    .joinInputs input {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      font-size: 15vw;
      background-color: #1E2139;
      border: 2px solid #001AFF;
      color: #3C3D4C;
      text-align: center;
      border-radius: 9vw;
      height: 30vw;
      margin: 15vw 0 3vw 0;
    }
    .joinInputs button {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      border: none;
      text-align: center;
    }
      .joinInputs .joinBtn {
        font-size: 11vw;
        background-color: #1328E9;
        color: #DBDBDB;
        border-radius: 8vw;
        height: 23vw;
      }
      .joinInputs .joinBtn:disabled {
        background-color: #19269b;
        color: #a8a8a8;
      }
      .joinInputs .createBtn {
        font-size: 11vw;
        background-color: #5F68B4;
        color: #D9DCF6;
        border-radius: 7vw;
        height: 18vw;
      }
</style>
