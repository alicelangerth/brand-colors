<template>
  <div>
    <div class="flex-wrapper report">
      <div class="wrapper base">
        <base-data />
        <label-detec />
      </div>
    </div>
    <div class="flex-wrapper report grey">
      <div class="wrapper">
        <environment />
        <face-detec />
        <img-prop />
      </div>
    </div>
    <div class="flex-wrapper report">
      <div class="wrapper">
        <safe-search />
      </div>
    </div>
  </div>
</template>
<script>
import SafeSearch from '@/components/report/SafeSearch'
import FaceDetec from '@/components/report/FaceDetec'
import LabelDetec from '@/components/report/LabelDetec'
import ImgProp from '@/components/report/ImgProp'
import BaseData from '@/components/report/BaseData'
import Environment from '@/components/report/Environment'

export default {
  name: 'Report',
  data () {
    return {
    }
  },
  methods: {
    // Save data in firebase database
    saveReportData () {
      this.$store.dispatch('saveReportData', {
        id: this.$store.state.userId,
        userData: {
          userName: this.$store.state.user,
          userMedia: this.$store.state.userMedia,
          followers: this.$store.state.userFollowers,
          profilePic: this.$store.state.userProfilePic
        },
        visionData: {
          faceDetec: this.$store.state.imageAnalysis.faceDetec,
          imgProp: this.$store.state.imageAnalysis.imgProp,
          labelDetec: this.$store.state.imageAnalysis.labelDetec,
          safeSearch: this.$store.state.imageAnalysis.safeSearch
        }
      })
    }
  },
  mounted () {
    this.$store.commit('setIsLoading', false)
    this.saveReportData()
  },
  components: {SafeSearch, FaceDetec, LabelDetec, ImgProp, BaseData, Environment}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/colors.scss';

.flex-wrapper.grey {
  background-color: $lighter-grey;
  padding-top: 0;
  padding-bottom: 5vh;
}
section {
  width: 100%;
}
.report {
  padding: 5vh;
  .wrapper {
    align-items: start;
  }
}
@media screen and (min-width: 768px) {
  .report {
    padding: 12vh;
  }
}
@media screen and (min-width: 1200px) {
  .wrapper.base {
    align-items: center;
  }
}

</style>