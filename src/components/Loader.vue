<template>
  <div class="flex-wrapper">
    <div class="wrapper">
      <div id="animation" v-bind:class="{ ie: isIE }">
        <div class="ring one">
          <div class="small electron"></div>
          <div class="small electron"></div>
        </div>
        <div class="ring two">
            <div class="big electron"></div>
            <div class="small electron"></div>
        </div>
        <div class="ring three">
            <div class="middle electron color"></div>
            <div class="big electron"></div>
            <div class="middle electron"></div>
            <div class="small electron"></div>
        </div>
      </div>
      <p>Analysing photos...</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'DataAnalysis',
  data () {
    return {
      isIE: false
    }
  },
  methods: {
    detectBrowser () {
      // Ie 10
      if (/MSIE 10/i.test(navigator.userAgent)) {
        this.isIE = true
      }
      // Ie 9 & 11
      if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
        this.isIE = true
      }
      // Edge
      if (/Edge/.test(navigator.userAgent)) {
        this.isIE = true
      }
    }
  },
  mounted () {
    this.detectBrowser()
  }
}
</script>
<style lang="scss" scoped>

.flex-wrapper {
  background: #fff;
  justify-content: flex-start;
  position: fixed;
  width: 100%;
  z-index: 10;
}
.wrapper {
  align-items: center;
  position: relative;
  height: 80vh;
}
img {
  animation: loader 3s linear infinite;
  width: 30vw;
}
.electron {
  background: #fff;
  border-radius: 100vh;
  position: absolute;
}
.big {
  height: 20vh;
  width: 20vh;
}
.small {
  height: 4vh;
  width: 4vh;
}
.middle {
  height: 8vh;
  width: 8vh;
}
.ie {
  .electron {
    background: #000;
  }
}
@media screen and (min-width: 768px) {
  .big {
    height: 17vh;
    width: 17vh;
  }
  .small {
    height: 4vh;
    left: 10vh;
    width: 4vh;
  }
}
@media screen and (min-width: 1200px) {
  .big {
    height: 15vh;
    left: 10vh;
    width: 15vh;
  }
  .small {
    height: 4vh;
    left: 12vh;
    width: 4vh;
  }
}
.yellow.one {
  left: 80vh;
  top: 40vh;
}
p {
  bottom: -5vh;
  font-weight: 600;
  position: absolute;
  text-align: center;
  width: 100%;
}
.ring {
  border-radius: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
}
.ring.one {
  animation: ringoneAni 2.9s linear 0s infinite normal none;
  height: 10vh;
  margin-left: -50px;
  margin-top: -50px;
  mix-blend-mode: difference;
  width: 10vh;
}
.ring.two {
  animation: ringtwoAni 3.5s linear 0s infinite reverse none;
  height: 25vh;
  margin-left: -12.5vh;
  margin-top: -12.5vh;
  mix-blend-mode: difference;
  width: 25vh;
}
.ring.three {
  animation: ringthreeAni 4.0s linear 0s infinite normal none;
  height: 40vh;
  margin-left: -20vh;
  margin-top: -20vh;
  mix-blend-mode: difference;
  width: 40vh;
}
.electron {
  animation: electronscale 2s ease-in-out 0s infinite alternate none;
  margin-left: -10px;
  margin-top: -10px;
  position: absolute;
  top: 50%;
}
.ring.one .electron:nth-of-type(2){
  animation: electronscale 1s ease-in-out 0s infinite alternate none;
  margin-left: 170px;
}
.ring.two .electron:nth-of-type(2){
  animation: electronscale 0.5s ease-in-out 0s infinite alternate none;
  margin-left: 170px;
}
.ring.three .electron:nth-of-type(2){
  animation: electronscale 0.9s ease-in-out 0s infinite alternate none;
  margin-left: 15vh;
  margin-top: -155px;
}

.ring.three .electron:nth-of-type(3){
  animation: electronscale 0.9s ease-in-out 0s infinite alternate none, color-fade 4s infinite;
  margin-left: 5vh;
  margin-top: 135px;
}
.ring.three .electron:nth-of-type(4){
  animation: electronscale 0.9s ease-in-out 0s infinite alternate none;
  margin-left: 23vh;
  margin-top: 135px;
}
@keyframes ringoneAni {
  100% {
    transform: rotate(360deg) translate( 12px , 0px );
  }
  0% {
    transform: rotate(0deg) translate( 12px , 0px );
  }
}

@keyframes ringtwoAni {
  100% {
    transform: rotate(360deg) translate( 12px , 0px );
  }
  0% {
    transform: rotate(0deg) translate( 12px , 0px );
  }
}

@keyframes ringthreeAni {
  100% {
    transform: rotate(360deg) translate( 12px , 0px );
  }
  0% {
    transform: rotate(0deg) translate( 12px , 0px );
  }
}

@keyframes electronscale {
  100% {
    transform: scale( random (0.5,2) 1 , 2 );}
  0% {
    transform: scale( 0.75 , 0.75 );
  }
}
</style>
