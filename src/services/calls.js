import axios from 'axios'

const api = 'https://afternoon-bastion-84918.herokuapp.com/api'

export const sendSong = (songId) => axios.post(`${api}/song/`, {
    songId,
})

export const searchSong = (searchQuery) => {
    return axios.get(`${api}/search/`, {
        params: {
            searchQuery,
        },
    })
        .then((response) => response.data.body.tracks.items.slice(0,6))
}

export const getSongList = () => axios.get(`${api}/song/`)
    .then(({ data }) => data)

export const getCurrentSong = () =>  axios.get(`${api}/song/current/`)
    .then(({ data }) => data)
