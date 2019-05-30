import axios from 'axios'

const api = 'https://afternoon-bastion-84918.herokuapp.com/api'
const hash = window.location.pathname.slice(1)

export const sendSong = (songId) => axios.post(`${api}/song/${hash}`, {
    songId,
})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error) => {
        console.log(error)
        throw error
    })

export const searchSong = (searchQuery) => axios.get(`${api}/search/${hash}`, {
    params: {
        searchQuery,
    },
})
    .then((response) => {
        return response.data.body.tracks.items
    })


export const getSongList = () => axios.get(`${api}/song/${hash}`)
    .then((response) => response.data)
    .catch((error) => console.log(error))