<template>
  <div class="pageWrapper">
    <div class="titleQuestion">
      <span>What is <span class="purpleTxt">@{{this.gameCreator}}</span> trying to say?</span>
    </div>
    <div class="emojisToGuess">
      <span>{{state.gameData.emoji1}}{{state.gameData.emoji2}}{{state.gameData.emoji3}}{{state.gameData.emoji4}}</span>
    </div>
    <div class="hintGuess">
      <span class="hintTitle">Hint:</span>
      <span class="hint purpleTxt">"{{state.gameData.hint}}"</span>
    </div>
    <span id="separatorLine"><span></span></span>
    <div class="playerAnswer">
      <div class="txtAnswer">
        <span>Your answer:</span>
        <textarea v-model="guessing.txtPlayerAnswer" type="text" placeholder="" />
      </div>
      <div class="emojisAnswer">
        <span>Your emoji recreation:</span>
        <div class="emojiAnswersWraper">
          <div>
            <span class="cameraWrapper" ref="test">
              <span class="emojiInsideCamera">{{state.gameData.emoji1}}</span>
              <video v-show="!isPhotoTaken1" ref="camera1" autoplay playsinline @click="takePhoto1"></video>
              <canvas v-show="isPhotoTaken1" id="photoTaken1" ref="canvas1"></canvas>
            </span>
            <span class="cameraWrapper">
              <span class="emojiInsideCamera">{{state.gameData.emoji2}}</span>
              <video v-show="isPhotoTaken1 && !isPhotoTaken2" ref="camera2" autoplay playsinline @click="takePhoto2"></video>
              <canvas v-show="isPhotoTaken2" id="photoTaken2" ref="canvas2"></canvas>
            </span>
          </div>
          <div>
            <span class="cameraWrapper">
              <span class="emojiInsideCamera">{{state.gameData.emoji3}}</span>
              <video v-show="isPhotoTaken2 && !isPhotoTaken3" ref="camera3" autoplay playsinline @click="takePhoto3"></video>
              <canvas v-show="isPhotoTaken3" id="photoTaken3" ref="canvas3"></canvas>
            </span>
            <span class="cameraWrapper">
              <span class="emojiInsideCamera">{{state.gameData.emoji4}}</span>
              <video v-show="isPhotoTaken3 && !isPhotoTaken4" ref="camera4" autoplay playsinline @click="takePhoto4"></video>
              <canvas v-show="isPhotoTaken4" id="photoTaken4" ref="canvas4"></canvas>
            </span>
          </div>
        </div>
      </div>
      <button class="submitBtn" @click="submitGuessing()" :disabled="submited || guessing.txtPlayerAnswer===null || guessing.txtPlayerAnswer==='' || !isPhotoTaken1 || !isPhotoTaken2 || !isPhotoTaken3 || !isPhotoTaken4">SUBMIT</button>
    </div>
  </div>
</template>

<script>
import store from "../../store"
import axios from 'axios'

export default {
  name: 'PSubmitGuess',
  data() {
    return {
      isPhotoTaken1: false,
      isPhotoTaken2: false,
      isPhotoTaken3: false,
      isPhotoTaken4: false,
      isShotPhoto: false,
      isLoading: false,

      guessing: {
        idUser: store.state.idUser,
        txtPlayerAnswer: '',
        photos: {
          photo1: '',
          photo2: '',
          photo3: '',
          photo4: '',
        }
      },

      state: store.state,

      gameCreator: '',

      submited: false
    }
  },
  components: {
  },
  mounted: function() {
    this.createCameraElement(this.$refs.camera1);
    this.getGameCreatorName(this.state.gameData.idCreator);
    this.submited = false;
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
    submitGuessing() {
      store.commit('submitGuessing', this.guessing);
      this.submited = true;
    },
    async createCameraElement(refRecieved) {
      this.isLoading = true;
      
      const constraints = (window.constraints = {
				audio: false,
				video: {
          facingMode: 'user',
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
      this.isPhotoTaken1 = !this.isPhotoTaken1;
      
      const camera = this.$refs.camera1;
      const canvas = this.$refs.canvas1;
      const context = canvas.getContext('2d');
      let scale = 300 / camera.videoWidth;
      let w = camera.videoWidth * scale;
      let h = camera.videoHeight * scale;

      canvas.width = w;
      canvas.height = h;

      context.drawImage(camera, 0, 0, w, h);
      this.guessing.photos.photo1 = canvas.toDataURL();
      
      this.createCameraElement(this.$refs.camera2);
      this.stopCameraStream(camera);
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
      
      const camera = this.$refs.camera2;
      const canvas = this.$refs.canvas2;
      const context = canvas.getContext('2d');
      let scale = 300 / camera.videoWidth;
      let w = camera.videoWidth * scale;
      let h = camera.videoHeight * scale;

      canvas.width = w;
      canvas.height = h;

      context.drawImage(camera, 0, 0, w, h);
      this.guessing.photos.photo2 = canvas.toDataURL();
      
      this.createCameraElement(this.$refs.camera3);
      this.stopCameraStream(camera);
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
      
      const camera = this.$refs.camera3;
      const canvas = this.$refs.canvas3;
      const context = canvas.getContext('2d');
      let scale = 300 / camera.videoWidth;
      let w = camera.videoWidth * scale;
      let h = camera.videoHeight * scale;

      canvas.width = w;
      canvas.height = h;

      context.drawImage(camera, 0, 0, w, h);
      this.guessing.photos.photo3 = canvas.toDataURL();

      this.createCameraElement(this.$refs.camera4);
      this.stopCameraStream(camera);
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
      
      const camera = this.$refs.camera4;
      const canvas = this.$refs.canvas4;
      const context = canvas.getContext('2d');
      let scale = 300 / camera.videoWidth;
      let w = camera.videoWidth * scale;
      let h = camera.videoHeight * scale;

      canvas.width = w;
      canvas.height = h;

      context.drawImage(camera, 0, 0, w, h);
      this.guessing.photos.photo4 = canvas.toDataURL();

      this.stopCameraStream(camera);
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
  align-items: center;
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
</style>
