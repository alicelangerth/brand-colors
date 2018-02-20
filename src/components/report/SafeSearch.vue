<template>
  <section>
    <div class="container"><img src="../../assets/svg/safety-icon.svg" /><h1>Safety</h1></div>
    <p class="intro">Assess whether an influencer may pose a risk by looking at different brand safety parameters</p>
    <div class="result">
      <h2>Sexual content</h2>
      <p>Freqency of posts containing nudity, vulgar or in ways sexual content</p>
      <div class="chart-box">
        <div class="axis"></div>
        <div class="vertical one"></div>
        <div class="vertical two"></div>
        <div class="vertical three"></div>
        <div class="marker" v-bind:style="{left: adultResult + '%'}"></div>
      </div>
      <div class="box">
        <p>Never</p><p>Sometimes</p><p>Often</p>
      </div>
      <h2>Alcohol</h2>
        <p>Freqency of posts containing alcohol</p>
      <div class="chart-box">
        <div class="axis"></div>
        <div class="vertical one"></div>
        <div class="vertical two"></div>
        <div class="vertical three"></div>
        <div class="marker" v-bind:style="{left: alcoholResult + '%'}"></div>
      </div>
      <div class="box">
        <p>Never</p><p>Sometimes</p><p>Often</p>
      </div>
      <h2>Violence</h2>
      <p>Freqency of posts containing violent such as fighting, blood and gore</p>
      <div class="chart-box">
        <div class="axis"></div>
        <div class="vertical one"></div>
        <div class="vertical two"></div>
        <div class="vertical three"></div>
        <div class="marker" v-bind:style="{left: violenceResult + '%'}"></div>
      </div>
      <div class="box">
        <p>Never</p><p>Sometimes</p><p>Often</p>
      </div>
      <h2>Non-original content</h2>
      <p>Frequency of posts containing content that is not the users own. Spoofs, reposts or copied content</p>
      <div class="chart-box">
        <div class="axis"></div>
        <div class="vertical one"></div>
        <div class="vertical two"></div>
        <div class="vertical three"></div>
        <div class="marker" v-bind:style="{left: spoofResult + '%'}"></div>
      </div>
      <div class="box">
        <p>Never</p><p>Sometimes</p><p>Often</p>
      </div>
    </div>
    <div class="btn" v-on:click="clear"><span>&#x25B8;</span> Try another</div>
    <div class="btn">Sign up for full version</div>
  </section>
</template>
<script>
import alcoholLabels from '../../json/alcohol.json'

export default {
  name: 'BrandSafety',
  data () {
    return {
      adultResult: 0,
      alcoholResult: 0,
      spoofResult: 0,
      violenceResult: 0
    }
  },
  computed: {
    safeSearchArray () {
      return this.$store.state.imageAnalysis.safeSearch
    },
    labels () {
      return this.$store.state.labelResponse
    }
  },
  methods: {
    // Set safe search summ, based on likeliness and result
    countSafeSearch (index) {
      let result = 0
      if (this.safeSearchArray[index].POSSIBLE) {
        result += (this.safeSearchArray[index].POSSIBLE * 5)
      }
      if (this.safeSearchArray[index].LIKELY) {
        result += (this.safeSearchArray[index].LIKELY * 20)
      }
      if (this.safeSearchArray[index].VERY_LIKELY) {
        result += (this.safeSearchArray[index].VERY_LIKELY * 50)
      }
      if (result > 100) {
        result = 100
      }
      if (index === 0) {
        this.adultResult = result
      } else if (index === 2) {
        this.spoofResult = result
      } else if (index === 3) {
        this.violenceResult = result
      }
    },
    // Count alcohol matches photo by photo
    countAlcoholMatches (json, photo) {
      let labs = photo.labelAnnotations
      let results = 0
      if (labs) {
        labs.forEach((label) => {
          Object.entries(json).forEach((alcohol) => {
            alcohol[1].forEach((alcoholLabel) => {
              if (label['description'] === alcoholLabel) {
                results += 1
              }
            })
          })
        })
      }
      if (results > 0) {
        this.alcoholResult += 10
        if (this.alcoholResult > 100) {
          this.alcoholResult = 100
        }
      }
    },
    loopPhotos (photos) {
      photos.forEach((photo) => {
        this.countAlcoholMatches(alcoholLabels, photo)
      })
    },
    clear () {
      this.$store.commit('resetState')
    }
  },
  mounted () {
    this.countSafeSearch(0)
    this.countSafeSearch(2)
    this.countSafeSearch(3)
    this.loopPhotos(this.labels)
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/colors.scss';

.container {
  align-items: center;
  display: flex;
  h1 {
    margin: 0 0 0 3vh;
  }
  img {
    height: 15vh;
  }
}
.intro {
  margin: 4vh 0 10vh 0;
}
.chart-box {
  position: relative;
  height: 10vh;
  .axis {
    background: #000;
    height: 0.5vh;
    position: absolute;
    top: calc(50% - 0.5vh);
    width: 100%;
  }
  .marker {
    background: $yellow;
    height: 10vh;
    margin-left: 0.2vh;
    position: absolute;
    width: 2vh;
  }
  .vertical {
    background: $black;
    height: 4vh;
    position: absolute;
    top: calc(50% - 2vh);
    width: 0.5vh;
  }
  .one {
    left: -0.25vh;
  }
  .two {
    left: calc(50% - 0.25vh)
  }
  .three {
    left: calc(100% - 0.25vh)
  }
}
.box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10vh;
}
.btn {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 2vh auto;
  position: relative;
  span {
    font-size: 4vh;
    padding-left: 2vh;
    transform: rotate(180deg);
  }
}
@media screen and (min-width: 1200px) {
.btn {
    width: 50%;
    span {
      transition: 0.4s transform;
    }
    &:hover {
      span {
        transform: translateX(-8px) rotate(180deg);
      }
    }
  }
}
</style>
