import FireDb from '@/api/FireDb.js'

export const saveReportData = ({ commit }, data) => {
  let reportRef = FireDb.database().ref('reports/' + data.id)
  reportRef.set({
    userId: data.id,
    userData: {
      userName: data.userData.userName,
      userMedia: data.userData.userMedia,
      followers: data.userData.followers,
      profilePic: data.userData.profilePic
    },
    visionData: {
      faceDetec: data.visionData.faceDetec,
      imgProp: data.visionData.imgProp,
      labelDetec: data.visionData.labelDetec,
      safeSearch: data.visionData.safeSearch
    }
  })
}
