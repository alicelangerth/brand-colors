<template>
  <div class="flex-wrapper">
    <div class="wrapper">
    </div>
  </div>
</template>
<script>
import * as apiClient from '@/api/VisionApiClient'

export default {
  name: 'DataAnalysis',
  data () {
    return {
      msg: '',
      responses: [],
      type: ['LABEL_DETECTION', 'SAFE_SEARCH_DETECTION', 'FACE_DETECTION', 'IMAGE_PROPERTIES'],
      labels: null,
      safeResponse: null,
      safeSearchArray: [],
      faceResponse: [],
      faceDetecArray: [],
      colorResponse: []
    }
  },
  mounted () {
    this.analyzeData()
  },
  computed: {
    userData () {
      return this.$store.state.userData
    },
    imageArray () {
      return this.userData.map((a) => {
        return a.images.standard_resolution.url
      })
    },
    requestArrayLabelDetec () {
      return this.imageArray.map((a) => {
        return apiClient.bulidRequestObject(a, this.type[0])
      })
    },
    requestArraySafeSearch () {
      return this.imageArray.map((a) => {
        return apiClient.bulidRequestObject(a, this.type[1])
      })
    },
    requestArrayFaceDetec () {
      return this.imageArray.map((a) => {
        return apiClient.bulidRequestObject(a, this.type[2])
      })
    },
    requestArrayImageProp () {
      return this.imageArray.map((a) => {
        return apiClient.bulidRequestObject(a, this.type[3])
      })
    }
  },
  methods: {
    requestPages (requestArr, pageSize, pageNumber) {
      --pageNumber
      return requestArr.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
    },
    analyzeData () {
      // Divied into pages, with 16 requests each
      let labelPages = []
      let pages = 8
      for (let i = 1; i < pages; i++) {
        labelPages.push(this.requestPages(this.requestArrayLabelDetec, 16, i))
      }
      let safePages = []
      for (let i = 1; i < pages; i++) {
        safePages.push(this.requestPages(this.requestArraySafeSearch, 16, i))
      }
      let facePages = []
      for (let i = 1; i < pages; i++) {
        facePages.push(this.requestPages(this.requestArrayFaceDetec, 16, i))
      }
      let imagePropPages = []
      for (let i = 1; i < pages; i++) {
        imagePropPages.push(this.requestPages(this.requestArrayImageProp, 16, i))
      }
      // Arrays with promises
      let labelPromises = labelPages.map((promise) => {
        return apiClient.makeBatchRequests(promise)
      })
      let safePromises = safePages.map((promise) => {
        return apiClient.makeBatchRequests(promise)
      })
      let facePromises = facePages.map((promise) => {
        return apiClient.makeBatchRequests(promise)
      })
      let imagePropPromises = imagePropPages.map((promise) => {
        return apiClient.makeBatchRequests(promise)
      })
      // Analyze images with google vison
      Promise.all(labelPromises)
        .then(response => {
          this.responses = response[0].data.responses.concat(response[1].data.responses)
          for (let i = 2; i < 7; i++) {
            this.responses = this.responses.concat(response[i].data.responses)
          }
          this.makeTopLabels(this.responses)
          this.$store.commit('setLabelResponse', this.responses)
        })
      Promise.all(safePromises)
        .then(response => {
          this.safeResponse = response[0].data.responses.concat(response[1].data.responses)
          for (let i = 2; i < 7; i++) {
            this.safeResponse = this.safeResponse.concat(response[i].data.responses)
          }
          this.countSafeSearchResponse(this.safeResponse)
        })
      Promise.all(facePromises)
        .then(response => {
          this.faceResponse = response[0].data.responses.concat(response[1].data.responses)
          for (let i = 2; i < 7; i++) {
            this.faceResponse = this.faceResponse.concat(response[i].data.responses)
          }
          this.countFaceDetec(this.faceResponse)
        })
      Promise.all(imagePropPromises)
        .then(response => {
          this.colorResponse = response[0].data.responses.concat(response[1].data.responses)
          for (let i = 2; i < 7; i++) {
            this.colorResponse = this.colorResponse.concat(response[i].data.responses)
          }
          this.$store.commit('setImgProp', this.colorResponse)
        })
    },
    // Count labels, sort by DESC order
    makeTopLabels (photos) {
      let labels = {}
      photos.forEach((photo) => {
        let labs = photo.labelAnnotations
        if (labs) {
          labs.forEach((label) => {
            let desc = label['description']
            let score = label['score']
            if (score > 0.30) {
              if (desc in labels) {
                labels[desc] += 1
              } else {
                labels[desc] = 1
              }
            }
          })
        }
      })
      let entries = Object.entries(labels)
      let sortedLabels = entries.sort((a, b) => b[1] - a[1])
      this.labels = sortedLabels
      this.$store.commit('setLabelDetec', sortedLabels)
    },
    // Count safedetec-response, sort by safe category
    countSafeSearchResponse (photos) {
      let adult = {}
      let medical = {}
      let spoof = {}
      let violence = {}
      photos.forEach((photo) => {
        let safeSearch = photo.safeSearchAnnotation
        if (safeSearch.adult in adult) {
          adult[safeSearch.adult] += 1
        } else {
          adult[safeSearch.adult] = 1
        }
        if (safeSearch.medical in medical) {
          medical[safeSearch.medical] += 1
        } else {
          medical[safeSearch.medical] = 1
        }
        if (safeSearch.spoof in spoof) {
          spoof[safeSearch.spoof] += 1
        } else {
          spoof[safeSearch.spoof] = 1
        }
        if (safeSearch.violence in violence) {
          violence[safeSearch.violence] += 1
        } else {
          violence[safeSearch.violence] = 1
        }
      })
      this.safeSearchArray.push(adult, medical, spoof, violence)
      this.$store.commit('setSafeSearch', this.safeSearchArray)
    },
    // Count facedetec-response, sort by mood
    countFaceDetec (photos) {
      let anger = {}
      let joy = {}
      let sorrow = {}
      let suprise = {}
      photos.forEach((photo) => {
        let faceDetec = photo.faceAnnotations
        if (faceDetec) {
          faceDetec.forEach((face) => {
            if (face.joyLikelihood in joy) {
              joy[face.joyLikelihood] += 1
            } else {
              joy[face.joyLikelihood] = 1
            }
            if (face.angerLikelihood in anger) {
              anger[face.angerLikelihood] += 1
            } else {
              anger[face.angerLikelihood] = 1
            }
            if (face.sorrowLikelihood in sorrow) {
              sorrow[face.sorrowLikelihood] += 1
            } else {
              sorrow[face.sorrowLikelihood] = 1
            }
            if (face.surpriseLikelihood in suprise) {
              suprise[face.surpriseLikelihood] += 1
            } else {
              suprise[face.surpriseLikelihood] = 1
            }
          })
        }
      })
      this.faceDetecArray.push(anger, joy, sorrow, suprise)
      this.$store.commit('setFaceDetec', this.faceDetecArray)
    }
  }
}
</script>
