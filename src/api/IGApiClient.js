import axios from 'axios'
import * as keys from './keys.js'

let userName = null
let IgApiKey = keys.keys.instagram
let ApiUrl = 'https://api.instagram.com/v1/'

export const setUser = (user) => {
  userName = user
}
export const getUserData = (json) => {
  return axios({
    method: 'GET',
    url: ApiUrl + `users/search?q=${userName}&access_token=${IgApiKey}`
  })
}
export const getUserInfo = (userId) => {
  return axios({
    method: 'GET',
    url: ApiUrl + `users/${userId}/?access_token=${IgApiKey}`
  })
}
export const getUserMedia = (userId) => {
  return axios({
    method: 'GET',
    url: ApiUrl + `users/${userId}/media/recent/?access_token=${IgApiKey}`
  })
}
export const getAllUserMedia = (userId, maxId) => {
  return axios({
    method: 'GET',
    url: ApiUrl + `users/${userId}/media/recent/?access_token=${IgApiKey}&max_id=${maxId}`
  })
}
