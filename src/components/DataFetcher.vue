<template>
  <div class="flex-wrapper">
    <div class="wrapper">
      <p class="error" v-if="error === true">No user found with username <span class="error">"{{inputSearch}}"</span></p>
      <p class="error" v-if="lockedAccount === true">User with username <span class="error">"{{inputSearch}}"</span> seems to have a locked account</p>
      <p class="btn" v-on:click="clickHandler">Try again</p>
    </div>
  </div>
</template>
<script>
import * as apiClient from '@/api/IGApiClient'

export default {
  name: 'DataFetcher',
  data () {
    return {
      user: '',
      error: false,
      imgArray: [],
      nextMaxId: null,
      lockedAccount: false
    }
  },
  computed: {
    inputSearch () {
      return this.$store.state.user
    }
  },
  mounted () {
    this.getIgData()
  },
  methods: {
    getIgData () {
      apiClient.setUser(this.$store.state.user)
      apiClient.getUserData()
        .then(response => {
          // Get user
          if (response.data.data.length !== 0) {
            this.$store.commit('setUserId', response.data.data[0].id)
            this.$store.commit('setUserSearch', response.data.data[0].username)
            this.$store.commit('setUserProfilePic', response.data.data[0].profile_picture)
            apiClient.getUserInfo(response.data.data[0].id)
            // Info-message when user account is locked
            .catch(error => {
              Object.assign({}, error)
              if (error.response.status === 400) {
                this.lockedAccount = true
                this.$store.commit('setIsLoading', false)
              }
            })
            // User-info
            .then(response => {
              this.$store.commit('setUserFollowers', response.data.data.counts.followed_by)
              this.$store.commit('setUserMedia', response.data.data.counts.media)
            })
            apiClient.getUserMedia(response.data.data[0].id)
            // User-media (20 imgages)
            .then(response => {
              this.nextMaxId = response.data.pagination.next_max_id
              this.imgArray = response.data.data
              this.getAllUserMedia()
            })
          // Info message when no user found
          } else {
            this.error = true
            this.$store.commit('setIsLoading', false)
          }
        })
    },
    // Get users 100 latest imgages
    getAllUserMedia () {
      apiClient.getAllUserMedia(this.$store.state.userId, this.nextMaxId)
      .then(response => {
        this.nextMaxId = response.data.pagination.next_max_id
        this.imgArray = this.imgArray.concat(response.data.data)
        if (this.imgArray.length > 100) {
          this.imgArray = this.imgArray.slice(0, 100)
        }
        this.imgArray.length < 100 ? this.getAllUserMedia() : this.$store.commit('setUserData', this.imgArray)
        if (this.imgArray.length === 100) {
          this.$store.commit('setReport', true)
        }
      })
    },
    clickHandler () {
      this.$store.commit('setUserSearch', null)
    }
  }
}
</script>
