<template>
  <div class="pageWrapper">
    <div class="titleQuestion">
      <span>What is <span class="purpleTxt">@pau</span> trying to say?</span>
    </div>
    <div class="emojisToGuess">
      <span>👺😹🙏🗿</span>
    </div>
    <div class="hintGuess">
      <span class="hintTitle">Hint:</span>
      <span class="hint purpleTxt">"Lorem ipsum lorem ipsum"</span>
    </div>
    <span id="separatorLine"><span></span></span>
    <div class="playerAnswer">
      <div class="txtAnswer">
        <span>Your answer:</span>
        <input v-model="txtPlayerAnswer" type="text" placeholder="">
      </div>
      <div class="emojisAnswer">
      </div>
    </div>
    <!-- <div class="loginInputs">
      <input v-model="name" type="text" placeholder="@name">
      <span class="separator" />
      <input v-model="pin" type="number" placeholder="pin">
      <span class="separator" />
      <button class="goinBtn" @click="test()">GO IN</button>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Login',
  data() {
    return {
      txtPlayerAnswer: null,
      pin: null
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    
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
  height: 100%;
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
      font-size: 17vw;
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
      .playerAnswer .txtAnswer input {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        font-size: 7vw;
        background-color: #1E2139;
        border: 2px solid #001AFF;
        color: #9381FF;
        text-align: center;
        border-radius: 8vw;
        height: 22vw;
        width: 97%;
      }

  /* .loginInputs {
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
      } */
</style>
