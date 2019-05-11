import axios from 'axios';

const api = 'https://afternoon-bastion-84918.herokuapp.com/api';

export const sendSong = (songId, that) => {
    console.log('fire', songId)
    that.setState({
        loading: true,
        error: false,
        songAddFinished: false,
    })
    return axios.post(`${api}/song`, {
        songId,
    })
        .then(function (response) {
            that.setState({
                songAddFinished: true,
                error: false,
                loading: false,
            })
            that.fetchSongList();
            console.log(response);
        })
        .catch(function (error) {
            that.setState({
                songAddFinished: true,
                error: true,
                loading: false,
            })
            console.log(error);
        });
}

export const searchSong = (searchQuery, that) => {
    console.log('fire', searchQuery)
    axios.get(`${api}/search`, {
        params: {
            searchQuery,
        }
    })
        .then(function (response) {
            console.log('search response: ', response)
            that.setState({
                searchResults: response.data.body.tracks.items,
            })
        })
        .catch(function (error) {
            that.setState({
                error: true,
            })
        });
}


export const getSongList = (that) => {
    that.setState({
        loading: true,
        error: false,
        songListFetchFinished: false,
    })
    return axios.get(`${api}/song`, {
    })
        .then(function (response) {
            that.setState({
                songList: response.data,
                songListFetchFinished: true,
                error: false,
                loading: false,
            })
            console.log(response);
        })
        .catch(function (error) {
            that.setState({
                songListFetchFinished: true,
                error: true,
                loading: false,
            })
            console.log(error);
        });
}