<template>
  <section>
      <div class="result">
        <h2>Mood</h2>
        <p class="desc">What type of mood is commonly expressed in posts where people are present</p>
        <p class="bold desc" v-if="totalFaces === 0">No faces found</p>
        <div v-if="totalFaces">
          <div class="box">
            <div>
              <div v-bind:class="setSymbol(sortedArray[0][0])" class="symbol"></div>
              <p class="bold">{{sortedArray[0][0]}}</p>
            </div>
            <p class="purple">{{resultProcentage[0]}}%</p>
          </div>
          <div class="chart first"></div>
          <div class="box">
            <div>
              <div v-bind:class="setSymbol(sortedArray[1][0])" class="symbol"></div>
              <p class="bold">{{sortedArray[1][0]}}</p>
            </div>
            <p class="purple">{{resultProcentage[1]}}%</p>
          </div>
          <div class="chart" v-bind:style="{width: widthArray[0] + '%'}"></div>
          <div class="box">
            <div>
              <div v-bind:class="setSymbol(sortedArray[2][0])" class="symbol"></div>
              <p class="bold">{{sortedArray[2][0]}}</p>
            </div>
            <p class="purple">{{resultProcentage[2]}}%</p>
          </div>
          <div class="chart" v-bind:style="{width: widthArray[1] + '%'}"></div>
          <div class="box">
            <div>
              <div v-bind:class="setSymbol(sortedArray[3][0])" class="symbol"></div>
              <p class="bold">{{sortedArray[3][0]}}</p>
            </div>
            <p class="purple">{{resultProcentage[3]}}%</p>
          </div>
          <div class="chart" v-bind:style="{width: widthArray[2] + '%'}"></div>
          <div class="box">
            <div>
              <div v-bind:class="setSymbol(sortedArray[4][0])" class="symbol"></div>
              <p class="bold">{{sortedArray[4][0]}}</p>
            </div>
            <p class="purple">{{resultProcentage[4]}}%</p>
          </div>
          <div class="chart" v-bind:style="{width: widthArray[3] + '%'}"></div>
        </div>
      </div>
  </section>
</template>
<script>
export default {
  name: 'FaceDetec',
  data () {
    return {
      results: {
        anger: 0,
        happy: 0,
        sad: 0,
        surprise: 0,
        inexpressive: 0
      },
      totalFaces: 0,
      totalResults: 0,
      widthArray: [],
      sortedArray: null
    }
  },
  computed: {
    faceDetecArray () {
      return this.$store.state.imageAnalysis.faceDetec
    },
    resultProcentage () {
      let resultProcentage = []
      this.sortedArray.forEach((emotion, index) => {
        let procentage = emotion[1] / this.totalFaces
        resultProcentage[index] = Math.round(procentage * 100)
      })
      return resultProcentage
    }
  },
  methods: {
    // Count face-detec, by mood and like likeliness
    countFaceDetec (index) {
      let result = 0
      let unlikely = 0
      if (this.faceDetecArray[index].UNLIKELY) {
        result += this.faceDetecArray[index].UNLIKELY
      }
      if (this.faceDetecArray[index].POSSIBLE) {
        result += this.faceDetecArray[index].POSSIBLE
      }
      if (this.faceDetecArray[index].LIKELY) {
        result += this.faceDetecArray[index].LIKELY
      }
      if (this.faceDetecArray[index].VERY_LIKELY) {
        result += this.faceDetecArray[index].VERY_LIKELY
      }
      if (this.faceDetecArray[index].VERY_UNLIKELY) {
        unlikely += this.faceDetecArray[index].VERY_UNLIKELY
      }
      this.totalFaces = unlikely + result
      this.totalResults += result
      this.results.inexpressive = this.totalFaces - this.totalResults
      if (index === 0) {
        this.results.anger = result
      } else if (index === 1) {
        this.results.happy = result
      } else if (index === 2) {
        this.results.sad = result
      } else if (index === 3) {
        this.results.surprise = result
      }
    },
    // Sort result by DESC order
    sortResults () {
      let entries = Object.entries(this.results)
      let sortedArray = entries.sort((a, b) => b[1] - a[1])
      this.sortedArray = sortedArray
      this.setWidth(sortedArray)
    },
    // Set bar-chart width
    setWidth (array) {
      let width1 = array[1][1] / array[0][1] * 100
      let width2 = array[2][1] / array[0][1] * 100
      let width3 = array[3][1] / array[0][1] * 100
      let width4 = array[4][1] / array[0][1] * 100
      this.widthArray.push(width1, width2, width3, width4)
    },
    // Set mood-symbol class
    setSymbol (emotion) {
      let symbolClass
      switch (emotion) {
        case 'happy':
          symbolClass = 'happy'
          break
        case 'anger':
          symbolClass = 'angry'
          break
        case 'sad':
          symbolClass = 'sad'
          break
        case 'inexpressive':
          symbolClass = 'inexpressive'
          break
        case 'surprise':
          symbolClass = 'surprise'
          break
      }
      return symbolClass
    }
  },
  mounted () {
    this.countFaceDetec(0)
    this.countFaceDetec(1)
    this.countFaceDetec(2)
    this.countFaceDetec(3)
    this.sortResults()
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/colors.scss';

.result {
  text-transform: capitalize;
  .desc {
    text-transform: none;
  }
  .box {
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
    .symbol {
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      height: 4.5vh;
      margin: 0 1.5vh 0 0.2vh;
      width: 4.5vh;
    }
    .happy {
      background-image: url('../../assets/svg/happy.svg');
    }
    .sad {
      background-image: url('../../assets/svg/sad.svg');
    }
    .inexpressive {
      background-image: url('../../assets/svg/inexpressive.svg');
    }
    .angry {
      background-image: url('../../assets/svg/angry.svg');
    }
    .surprise {
      background-image: url('../../assets/svg/surprise.svg');
    }
  }
  .purple {
    color: $purple;
  }
  .chart {
    background: $purple;
    height: 2vh;
    margin-bottom: 5vh;
  }
  .first {
    width: 100%;
  }
}
.bold {
  font-weight: 600;
}
@media screen and (min-width: 768px) {
  .result {
    .box {
      .symbol {
        height: 4vh;
        width: 4vh;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .result {
    .box {
      .symbol {
        height: 3.8vh;
        width: 3.8vh;
      }
    }
  }
}
</style>
