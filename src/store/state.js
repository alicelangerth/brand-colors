import Vue from 'vue'

export const initialState = {
  mail: null,
  user: null,
  imagesUploaded: null,
  report: null,
  userId: null,
  userData: null,
  isLoading: false,
  userFollowers: null,
  userProfilePic: null,
  userMedia: null,
  labelResponse: null,
  imageAnalysis: {
    labelDetec: null,
    safeSearch: null,
    faceDetec: null,
    imgProp: null
  }
}

export const state = JSON.parse(JSON.stringify(initialState))

export const mutations = {
  setMail (state, mail) {
    state.mail = mail
  },
  setUserSearch (state, user) {
    state.user = user
  },
  setUserId (state, id) {
    state.userId = id
  },
  setReport (state, bol) {
    state.report = bol
  },
  setUserData (state, data) {
    state.userData = data
  },
  setIsLoading (state, bol) {
    state.isLoading = bol
  },
  setUserFollowers (state, count) {
    state.userFollowers = count
  },
  setUserMedia (state, count) {
    state.userMedia = count
  },
  setUserProfilePic (state, pic) {
    state.userProfilePic = pic
  },
  setLabelResponse (state, response) {
    state.labelResponse = response
  },
  setLabelDetec (state, response) {
    state.imageAnalysis.labelDetec = response
  },
  setSafeSearch (state, response) {
    state.imageAnalysis.safeSearch = response
  },
  setFaceDetec (state, response) {
    state.imageAnalysis.faceDetec = response
  },
  setImgProp (state, response) {
    state.imageAnalysis.imgProp = response
  },
  resetState (state, payload) {
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  }
}
