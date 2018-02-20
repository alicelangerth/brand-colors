<template>
  <section>
    <h2>Usually posts about</h2>
    <div>
      <p v-for="topic, index in topicsArray">
        {{ topic }}<span v-if="index !== 3">,</span>
      </p>
    </div>
    </div>
  </section>
</template>
<script>
import topics from '../../json/topics.json'
export default {
  name: 'LabelDetec',
  data () {
    return {
      topicsArray: []
    }
  },
  computed: {
    labels () {
      return this.$store.state.imageAnalysis.labelDetec
    }
  },
  methods: {
    // Match labels with topics
    setTopics (topics, label) {
      Object.entries(topics).forEach((topic) => {
        topic[1].forEach((topicLabel) => {
          if (topicLabel === label) {
            this.topicsArray.push(label)
          }
        })
      })
    }
  },
  mounted () {
    // Get the 4 most common topics
    this.labels.forEach((label) => {
      if (this.topicsArray.length < 4) {
        this.setTopics(topics, label[0])
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/colors.scss';

section {
  padding: 8vh 0 5vh 0;
  h2 {
    color: $middle-grey;
    font-size: 2.2vh;
    font-weight: 400;
    line-height: 3.2vh;
    margin: 0 0 1vh 0;
    padding-left: 6vh;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    padding-left: 6vh;
    p {
      font-size: 3.7vh;
      font-weight: 600;
      line-height: 4.4vh;
      margin: 0 1vh 0 0;
    }
    p::first-letter {
      text-transform: capitalize;
    }
  }
}
@media screen and (min-width: 768px) {
  section {
    padding: 10vh 0 0 0;
    h2 {
      margin: 0 0 2vh 0;
    }
  }
}
@media screen and (min-width: 1200px) {
  section {
    padding: 12vh 0 0 0;
    h2 {
      padding-left: 0;
      text-align: center;
    }
    div {
      justify-content: center;
    }
  }
}
</style>
