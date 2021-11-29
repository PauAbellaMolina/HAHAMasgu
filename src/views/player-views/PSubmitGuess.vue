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
        <textarea v-model="txtPlayerAnswer" type="text" placeholder="" />
      </div>
      <div class="emojisAnswer">
        <span>Your emoji recreation:</span>
        <div class="emojiAnswersWraper">
          <div>
            <span class="cameraWrapper">
              <video v-show="!isPhotoTaken1" ref="camera1" autoplay playsinline @click="takePhoto1"></video>
              <canvas v-show="isPhotoTaken1" id="photoTaken1" ref="canvas1"></canvas>
            </span>
            <span class="cameraWrapper">
              <video v-show="isPhotoTaken1 && !isPhotoTaken2" ref="camera2" autoplay playsinline @click="takePhoto2"></video>
              <canvas v-show="isPhotoTaken2" id="photoTaken2" ref="canvas2"></canvas>
            </span>
          </div>
          <div>
            <span class="cameraWrapper">
              <video v-show="isPhotoTaken2 && !isPhotoTaken3" ref="camera3" autoplay playsinline @click="takePhoto3"></video>
              <canvas v-show="isPhotoTaken3" id="photoTaken3" ref="canvas3"></canvas>
            </span>
            <span class="cameraWrapper">
              <video v-show="isPhotoTaken3 && !isPhotoTaken4" ref="camera4" autoplay playsinline @click="takePhoto4"></video>
              <canvas v-show="isPhotoTaken4" id="photoTaken4" ref="canvas4"></canvas>
            </span>
          </div>
        </div>

        <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ 'flash' : isShotPhoto }">
          <div class="camera-shutter" :class="{'flash' : isShotPhoto}"></div>
        </div>
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
      pin: null,
      isCameraOpen: true,
      isPhotoTaken1: false,
      isPhotoTaken2: false,
      isPhotoTaken3: false,
      isPhotoTaken4: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#',

      emojiAnswer1: '',
      stream: null,
      ready: false,
      photo: null
    }
  },
  components: {
  },
  mounted: function() {
    this.createCameraElement(this.$refs.camera1);
  },
  methods: {
    async createCameraElement(refRecieved) {
      this.isLoading = true;
      
      const constraints = (window.constraints = {
				audio: false,
				video: {
          facingMode: 'user'
        }
			});

			await navigator.mediaDevices
				.getUserMedia(constraints)
				.then(stream => {
          this.isLoading = false;
					refRecieved.srcObject = stream;
				})
				.catch(e => {
          this.isLoading = false;
					alert("May the browser didn't support or there is some errors." + e);
				});
    },
    stopCameraStream(refRecieved) {
      let tracks = refRecieved.srcObject.getTracks();

			tracks.forEach(track => {
				track.stop();
			});
    },
    takePhoto1() {
      if(!this.isPhotoTaken1) {
        this.isShotPhoto1 = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto1 = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken1 = !this.isPhotoTaken1;
      
      const context1 = this.$refs.canvas1.getContext('2d');
      context1.drawImage(this.$refs.camera1, 0, 0, this.$refs.canvas1.width, this.$refs.canvas1.height);
      
      this.createCameraElement(this.$refs.camera2);
      this.stopCameraStream(this.$refs.camera1);
    },
    takePhoto2() {
      if(!this.isPhotoTaken2) {
        this.isShotPhoto2 = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto2 = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken2 = !this.isPhotoTaken2;
      
      const context2 = this.$refs.canvas2.getContext('2d');
      context2.drawImage(this.$refs.camera2, 0, 0, this.$refs.canvas2.width, this.$refs.canvas2.height);
      
      this.createCameraElement(this.$refs.camera3);
      this.stopCameraStream(this.$refs.camera2);
    },
    takePhoto3() {
      if(!this.isPhotoTaken3) {
        this.isShotPhoto3 = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto3 = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken3 = !this.isPhotoTaken3;
      
      const context3 = this.$refs.canvas3.getContext('2d');
      context3.drawImage(this.$refs.camera3, 0, 0, this.$refs.canvas3.width, this.$refs.canvas3.height);

      this.createCameraElement(this.$refs.camera4);
      this.stopCameraStream(this.$refs.camera3);
    },
    takePhoto4() {
      if(!this.isPhotoTaken4) {
        this.isShotPhoto4 = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto4 = false;
        }, FLASH_TIMEOUT);
      }
      
      this.isPhotoTaken4 = !this.isPhotoTaken4;
      
      const context4 = this.$refs.canvas4.getContext('2d');
      context4.drawImage(this.$refs.camera4, 0, 0, this.$refs.canvas4.width, this.$refs.canvas4.height);

      this.stopCameraStream(this.$refs.camera4);
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
      margin: 0 5vw;
      height: 50vh;
    }
      .playerAnswer .emojisAnswer span {
        font-size: 8vw;
        font-weight: 900;
        color: #D1D1D1;
        margin: 0 .3vw 0 2vw;
      }
      .playerAnswer .emojisAnswer .emojiAnswersWraper {
        display: flex;
        flex-flow: column;
      }
        .playerAnswer .emojisAnswer .emojiAnswersWraper div {
          display: flex;
          flex-flow: row;
        }
          .playerAnswer .emojisAnswer .emojiAnswersWraper div .cameraWrapper {
            border: 2px solid #001AFF;
            width: 40vw;
            height: 40vw;
            border-radius: 8vw;
          }
          .playerAnswer .emojisAnswer .emojiAnswersWraper div .cameraWrapper video, .playerAnswer .emojisAnswer .emojiAnswersWraper div .cameraWrapper canvas {
            width: 40vw;
            height: 40vw;
            border-radius: 8vw;
          }
        /* .playerAnswer .emojisAnswer .emojiAnswersWraper input {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        font-size: 7vw;
        background-color: #1E2139;
        border: 2px solid #001AFF;
        color: #9381FF;
        text-align: center;
        padding: 3vw 3vw;
        border-radius: 8vw;
        height: 22vw;
        width: 91%;
      } */

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
