<template>
  <div class="pageWrapper">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="title">
      <span class="login">LOG IN</span>
      <span class="titleEmojis">👺😹🙏🗿</span>
    </div>
    <div class="loginInputs">
      <input v-model="data.name" type="text" placeholder="@name">
      <span class="separator" />
      <input v-model="data.pin" type="number" placeholder="pin">
      <span class="separator" />
      <button class="goinBtn" @click="login()" :disabled="data.name === '' || data.name === null || data.pin === '' || data.pin === null">GO IN</button>
    </div>
  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'Login',
  data() {
    return {
      data: {
        name: null,
        pin: null
      }
    }
  },
  components: {
    
  },
  methods: {
    login() {
      store.commit('tryLoging', this.data);
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
  justify-content: center;
  align-items: center;
  height: 100vh;
}
  .title {
    display: flex;
    flex-flow: column;
    margin: 0 0 15vw 0;
  }
    .title span {
      font-weight: 900;
      color: #D1D1D1;
    }
      .title .login {
        font-size: 18vw;
      }
      .title .titleEmojis {
        font-size: 8vw;
      }

  .loginInputs {
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 80vw;
  }
    .loginInputs input {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      font-size: 15vw;
      background-color: #1E2139;
      border: 2px solid #001AFF;
      color: #3C3D4C;
      text-align: center;
      border-radius: 8vw;
      height: 22vw;
    }
    .loginInputs button {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      border: none;
      text-align: center;
    }
      .loginInputs .goinBtn {
        font-size: 11vw;
        background-color: #1328E9;
        color: #DBDBDB;
        border-radius: 9vw;
        height: 35vw;
        margin: 2.5vw 0 0 0;
      }
      .loginInputs .goinBtn:disabled {
        background-color: #19269b;
        color: #a8a8a8;
      }
</style>
