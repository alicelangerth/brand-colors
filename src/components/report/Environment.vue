<template>
  <section>
    <div class="container">
      <img src="../../assets/svg/tone-icon.svg" />
      <h1>Tonality</h1>
    </div>
    <p class="intro">The tonality assesment helps decide wether an influencer is a good match for a brand.</p>
    <h2>Environment</h2>
    <p>Put influencers in to context by looking at the most common types of environments they post from.</p>
    <div class="top-list">
      <div v-if="sortedEnvironments.length > 0" class="list-item">
        <p><span>1.</span>{{sortedEnvironments[0][0]}}</p><p class="purple">{{sortedEnvironments[0][1]}} %</p>
      </div>
      <div v-else class="list-item">
        <p>No environments found</p>
      </div>
      <div v-if="sortedEnvironments.length > 1" class="list-item">
        <p><span>2.</span>{{sortedEnvironments[1][0]}}</p><p class="purple">{{sortedEnvironments[1][1]}} %</p>
      </div>
      <div v-if="sortedEnvironments.length > 2" class="list-item">
        <p><span>3.</span>{{sortedEnvironments[2][0]}}</p><p class="purple">{{sortedEnvironments[2][1]}} %</p>
      </div>
      <div v-if="sortedEnvironments.length > 3" class="list-item">
        <p><span>4.</span>{{sortedEnvironments[3][0]}}</p><p class="purple">{{sortedEnvironments[3][1]}} %</p>
      </div>
    </div>
  </section>
</template>
<script>
import environments from '../../json/environments.json'
export default {
  name: 'Environment',
  data () {
    return {
      environments: {},
      sortedEnvironments: []
    }
  },
  computed: {
    labels () {
      return this.$store.state.labelResponse
    }
  },
  methods: {
    // Count environments matches
    countMatches (envArray) {
      envArray.forEach((env) => {
        if (env[0]) {
          if (env[0] in this.environments) {
            this.environments[env[0]] += 1
          } else {
            this.environments[env[0]] = 1
          }
        }
      })
      this.sortedEnvironments = Object.entries(this.environments).sort((a, b) => b[1] - a[1])
    },
    // Sort environments matches, photo by photo
    sortPhotoEnvironment (json, photo) {
      let photoEnv = {}
      let sorted
      let labs = photo.labelAnnotations
      if (labs) {
        labs.forEach((label) => {
          Object.entries(json).forEach((environment) => {
            environment[1].forEach((environmentLabel) => {
              if (label['description'] === environmentLabel) {
                let env = environment[0]
                if (env in photoEnv) {
                  photoEnv[env] += 1
                } else {
                  photoEnv[env] = 1
                }
              }
            })
          })
        })
        sorted = Object.entries(photoEnv).sort((a, b) => b[1] - a[1])
        if (sorted.length > 0) {
          return sorted[0]
        } else {
          return null
        }
      }
    },
    loopPhotos (photos) {
      let envArray = []
      photos.forEach((photo) => {
        let environment = this.sortPhotoEnvironment(environments, photo)
        if (environment) {
          envArray.push(environment)
        }
      })
      this.countMatches(envArray)
    }
  },
  mounted () {
    this.loopPhotos(this.labels)
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/colors.scss';

section {
  background: $lighter-grey;
}
.container {
  align-items: center;
  display: flex;
  padding: 10vh 0 2vh 0;
  h1 {
    margin: 0 0 0 3vh;
    text-align: bottom;
  }
  img {
    height: 15vh;
  }
}
.intro {
  margin-bottom: 10vh;
}
.top-list {
  padding: 4vh 0;
  .list-item {
    background: #fff;
    display: flex;
    font-weight: 600;
    justify-content: space-between;
    margin: 3vh 0;
    padding: 0 3vh;
    span {
      padding: 0 2vh 0 0;
    }
    .purple {
      color: $purple;
      font-weight: 400;
    }
  }
}
@media screen and (min-width: 1200px) {
  .top-list {
    .list-item {
      padding: 0 5vh;
    }
  }
}
</style>