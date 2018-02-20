<template>
  <div>
    <loader v-if="isLoading === true" />
    <search-form v-if="at === 'SearchForm'" />
    <data-fetcher v-if="at === 'DataFetcher'" />
    <data-analysis v-if="at === 'DataAnalysis'" />
    <report v-if="at === 'Report'" />
  </div>
</template>
<script>
import SearchForm from '@/components/SearchForm'
import DataFetcher from '@/components/DataFetcher'
import DataAnalysis from '@/components/DataAnalysis'
import Report from '@/components/report/Report'
import Loader from '@/components/Loader'

export default {
  name: 'ImageAnalysis',
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    at () {
      let appState = this.$store.state
      if (appState.user === null) {
        return 'SearchForm'
      }
      if (appState.report === null) {
        return 'DataFetcher'
      }
      if (appState.imageAnalysis.labelDetec === null || appState.imageAnalysis.faceDetec === null || appState.imageAnalysis.imgProp === null || appState.imageAnalysis.safeSearch === null) {
        return 'DataAnalysis'
      } else {
        return 'Report'
      }
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  components: { SearchForm, DataFetcher, DataAnalysis, Report, Loader }
}
</script>
