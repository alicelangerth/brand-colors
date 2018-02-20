<template>
  <div class="flex-wrapper">
    <div class="start wrapper">
      <div class="blend" v-bind:class="{ ie: isIE, edge: isEdge }">
        <div class="container one">
          <div class="line">
            <div class="circle small"></div>
          </div>
        </div>
        <div class="container two">
          <div class="line">
            <div class="circle big"></div>
          </div>
        </div>
        <h1 v-if="isIE === false" v-bind:class="{ edge: isEdge }">Prove the quality of your influencers</h1>
        <h1 v-else class="ie">Open this site with a better browser</h1>
      </div>
      <div>
        <router-link to="image-analysis" class="btn" v-if="isIE === false">Try a free demo</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isIE: false,
      isEdge: false
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
        this.isEdge = true
      }
    }
  },
  mounted () {
    this.detectBrowser()
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/colors.scss';

$size1: 15vh;
$size2: 25vh;

.flex-wrapper {
  height: 100vh;
}
div.start {
  background-color: #fff;
  height: 60vh;
  justify-content: space-between;
  max-width: 400px;
  padding-top: 7vh;
  .blend {
    mix-blend-mode: difference;
    position: relative;
    .circle {
      background-color: #fff;
      border-radius: 100vh;
      position: absolute;
    }
    .small {
      animation: scale 3s linear infinite;
      bottom: -5vh;
      height: 20vh;
      left: -3vh;
      width: 20vh;
    }
    .big {
      animation: scale 5s linear infinite;
      height: 40vh;
      right: -8vh;
      top: -8vh;
      width: 40vh;
    }
    h1 {
      color: #fff;
      mix-blend-mode: difference;
    }
  }
  .blend.edge, .blend.ie {
    .circle {
      display: none;
    }
    h1.edge, h1.ie {
      color: $black;
    }
  }
  a {
    display: flex;
    justify-content: center;
  }
  .btn {
    margin: 13vh auto 0 auto;
  }
}

.container {
  margin: 0 auto;
  position: absolute;
}
.container.one {
  bottom: 2vh;
  left: 0vh;
  .line {
    animation: roundOrbit 10s linear infinite;
    .round {
      height: $size1;
      width: $size1;
    }
  }
}
.container.two {
  top: 0vh;
  right: -5vh;
  .line {
    animation: roundOrbittwo 12s linear infinite;
    .round {
      height: $size2;
      width: $size2;
    }
  }
}

.line {
  position: relative;
  .round {
    background-color: black;
    border-radius: 50%;
    display: inline-block;
  }
}
@keyframes roundOrbit {
    from { transform: rotate(0deg) translateX($size1/6) rotate(0deg); }
    to   { transform: rotate(360deg) translateX($size1/6) rotate(-360deg); }
}
@keyframes roundOrbittwo {
    from { transform: rotate(0deg) translateX($size2/6) rotate(0deg); }
    to   { transform: rotate(-360deg) translateX($size2/6) rotate(360deg); }
}
@keyframes scale {
  0% {
    transform: scale3d(1, 1, 1)
  }
  50% {
    transform: scale3d(.95, .95, .95)
  }
  0% {
    transform: scale3d(1, 1, 1)
  }

}
@media screen and (min-width: 768px) {
  div.start {
    height: auto;
    justify-content: center;
    max-width: 100%;
    padding-top: 0;
    p.start {
      font-size: 2.0rem;
    }
    .blend {
      .small {
        bottom: -7vh;
        left: -3vh;
      }
      .big {
        right: -5vh;
        top: -15vh;
      }
    }
    .btn {
      margin: 20vh auto 0 auto;
    }
  }
  .container.one {
    bottom: 0vh;
    left: -2vh;
    .line {
      .round {
        width: $size1;
        height: $size1;
      }
    }
  }
  .container.two {
    top: 0vh;
    right: -5vh;
    .line {
      .round {
        height: $size2;
        width: $size2;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  div.start {
    h1 {
      text-align: center;
    }
    p.start {
      font-size: 2.8rem;
      text-align: center;
    }
    .blend {
      .small {
        height: 27vh;
        width: 27vh;
      }
      .big {
        height: 49vh;
        width: 49vh;
      }
    }
    .btn {
      margin: 12vh auto 0 auto;
    }
  }
  .container.one {
    bottom: 5vh;
    left: 15vh;
    .line {
      .round {
        height: $size1;
        width: $size1;
      }
    }
  }
  .container.two {
    right: -5vh;
    top: -2vh;
    .line {
      .round {
        height: $size2;
        width: $size2;
      }
    }
  }
}
</style>
