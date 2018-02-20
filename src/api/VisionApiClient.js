import axios from 'axios'
import * as keys from './keys.js'

let visionApiKey = keys.keys.vision
let requestObject = null

export const bulidRequestObject = (url, type) => {
  requestObject = {
    'image': {
      'source': {
        'imageUri':
          url
      }
    },
    'features': [
      {
        'type': type,
        'maxResults': 10
      }
    ]
  }
  return requestObject
}
export const makeBatchRequests = (objArray) => {
  return axios({
    method: 'POST',
    url: `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,
    data: {'requests': objArray}
  })
}
export const makeRequest = (obj) => {
  return axios({
    method: 'POST',
    url: `https://vision.googleapis.com/v1/images:annotate?key=${visionApiKey}`,
    data: {'requests': [obj]}
  })
}
