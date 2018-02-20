<template>
  <section>
    <h2>Tone</h2>
    <p>What are the most commonly occuring colors in an influencers post</p>
    <div class="color-container">
      <div v-if="colors.length !== 0"
        v-for="color in backgroundColors"
        v-bind:style="color"
        class="color-box">
      </div>
    </div>
 </section>
</template>
<script>
export default {
  name: 'ImgProp',
  data () {
    return {
      colors: []
    }
  },
  computed: {
    imgProps () {
      return this.$store.state.imageAnalysis.imgProp
    },
    backgroundColors () {
      return this.colors.map((a) => {
        return `background: rgb(${a.red}, ${a.green}, ${a.blue})`
      })
    }
  },
  methods: {
    // Get det most dominant color, in each photo
    getColors () {
      this.imgProps.forEach((colors) => {
        this.colors.push(colors.imagePropertiesAnnotation.dominantColors.colors[0].color)
      })
    }
  },
  mounted () {
    this.getColors()
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/colors.scss';

.color-container {
  display: flex;
  flex-wrap: wrap;
  padding: 5vh 0;
}
.color-box {
  padding-top: 10%;
  width: 10%;
}
@media screen and (min-width: 768px) {
  .color-box {
    padding-top: 5%;
    width: 5%;
  }
}
</style>
