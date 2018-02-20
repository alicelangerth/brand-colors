<template>
  <div>
    <div class="center"><img class="profile-pic" :src="profilePic"></img></div>
    <div class="center" v-bind:class="{ small: userName.length > 14 }"><h1>@{{userName}}</h1></div>
    <div class="container">
      <div class="box border mobile">
        <div><p>Followers</p><p class="bold">{{followers}}</p></div>
        <div><p>Likes / post</p><p class="bold">{{averageLikes}}</p></div>
      </div>
      <div class="box mobile">
        <div><p>Posts</p><p class="bold">{{media}}</p></div>
        <div><p> Comments / post</p><p class="bold">{{averageComments}}</p></div>
      </div>
      <div class="box desktop">
        <div><p>Followers</p><p class="bold">{{followers}}</p></div>
        <div><p>Posts</p><p class="bold">{{media}}</p></div>
        <div><p>Likes / post</p><p class="bold">{{averageLikes}}</p></div>
        <div><p> Comments / post</p><p class="bold">{{averageComments}}</p></div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Report',
  data () {
    return {
      averageLikes: null,
      averageComments: null
    }
  },
  computed: {
    userName () {
      return this.$store.state.user
    },
    userData () {
      return this.$store.state.userData
    },
    followers () {
      return this.abbreviateNumber(this.$store.state.userFollowers)
    },
    profilePic () {
      return this.$store.state.userProfilePic
    },
    media () {
      return this.$store.state.userMedia
    }
  },
  methods: {
    countComments () {
      let comments = 0
      this.userData.forEach((comment) => {
        comments += comment.comments.count
      })
      let averageComments = Math.round(comments / this.userData.length)
      this.averageComments = this.abbreviateNumber(averageComments)
    },
    countLikes () {
      let likes = 0
      this.userData.forEach((like) => {
        likes += like.likes.count
      })
      let averageLikes = Math.round(likes / this.userData.length)
      this.averageLikes = this.abbreviateNumber(averageLikes)
    },
    abbreviateNumber (number) {
      let SI_POSTFIXES = ['', 'k', 'm', 'G', 'T', 'P', 'E']
      let tier = Math.log10(Math.abs(number)) / 3 | 0

      if (tier === 0) return number

      let postfix = SI_POSTFIXES[tier]
      let scale = Math.pow(10, tier * 3)

      let scaled = number / scale
      let formatted = scaled.toFixed(1) + ''

      if (/\.0$/.test(formatted)) {
        formatted = formatted.substr(0, formatted.length - 2)
      }
      return formatted + postfix
    }
  },
  mounted () {
    this.countComments()
    this.countLikes()
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/colors.scss';

.center {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 90vw;
  img {
    margin: 10vh 0 0 0;
  }
}
.center.small {
  h1 {
    font-size: 4vh;
  }
}
.profile-pic {
  border-radius: 100vh;
  height: 18vh;
  max-height: 150px;
}
.container {
  display: flex;
  margin-top: 5vh;
  .box {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 6vh;
    width: 50%;
    div {
      padding: 2vh 0;
    }
    p {
      color: $middle-grey;
      font-size: 2.2vh;
      margin: 0;
    }
    p.bold {
      color: $dark-grey;
      font-size: 4vh;
      font-weight: 600;
    }
  }
  .box.border {
    border-right: 5px solid $light-grey;
  }
  .box.desktop {
    display: none;
  }
}
h1 {
  border-bottom: 7px solid $turquoise;
  width: max-content;
}

@media screen and (min-width: 768px) {
  .center {
    width: 70vw;
    img {
      margin: 0;
    }
  }
  .center.small {
    h1 {
      font-size: 4.8vh;
    }
  }
  .container {
  }
}

@media screen and (min-width: 1200px) {
  .center.small {
    h1 {
      font-size: 5.8vh;
    }
  }
  .container {
    justify-content: center;
    .box.desktop {
      display: flex;
      flex-direction: row;
      div {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 0 4vh;
        width: 19vh;
      }
      div:not(:last-child) {
        border-right: 5px solid $light-grey;
      }
    }
    .box.mobile {
      display: none;
    }
    .box {
      padding: 0 5vh;
      width: max-content;
    }

  }
}

</style>
