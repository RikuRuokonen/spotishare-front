import axios from 'axios'

const transport = axios
  .create({
    withCredentials: true,
    crossDomain: true
  })

const api = `${process.env.REACT_APP_SERVER}/api`

export const sendSong = (hash, songId) => {
  return transport
    .post(`${api}/song/${hash}`, {
      songId,
    })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export const searchSong = (hash, searchQuery) => {
  console.log('fire', searchQuery)
  return transport
    .get(`${api}/search/${hash}`, {
      params: {
        searchQuery
      }
    })
    .then(response => {
      console.log('search response: ', response)
      return response.data.body.tracks.items.slice(0, 6)
    })
}

export const getSongList = (hash) =>
  transport
    .get(`${api}/song/${hash}`)
    .then(response => {
      return response.data
    })
    .catch(error => console.log(error))

export const getCurrentSong = (hash) =>
  transport
    .get(`${api}/song/current/${hash}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

export const createSession = () =>
  transport
    .post(`${api}/session`)
    .then(response => {
      console.log(response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
      throw (err)
    })