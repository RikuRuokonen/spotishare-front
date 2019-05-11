import axios from 'axios';

const api = 'https://afternoon-bastion-84918.herokuapp.com/api/song';

export const sendSong = (songId, that) => {
    console.log('fire', songId)
    that.setState({
        loading: true,
        error: false,
        songAddFinished: false,
    })
    return axios.post(api, {
        songId,
    })
        .then(function (response) {
            that.setState({
                songAddFinished: true,
                error: false,
                loading: false,
            })
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