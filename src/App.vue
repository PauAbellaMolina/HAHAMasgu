<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;900&display=swap');

/* IF NOT IN PORTRAIN AKA VERTICAL MOBILE, NOT SHOW ANYTHING (later ill show a use ur phone message) */
@media screen and (orientation:landscape) {
  body {
    display: none;
  }
}

body {
  margin: 0;
  background-color: #13233B;
}

#app {
  font-family: 'Montserrat', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* height: 100%; */
  background-color: #13233B;
}

#separatorLine {
  width: 100%;
  display: flex;
  justify-content: center;
}
  #separatorLine span {
    border: 1vw solid #272F75;
    border-radius: 100vw;
    display: block;
    width: 85%;
  }

.purpleTxt {
  color: #9381FF !important;
}
</style>
