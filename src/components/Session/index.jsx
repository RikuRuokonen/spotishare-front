import React from 'react'
import styled from 'styled-components'
// import SearchSongForm from './SearchSongForm'
import { sendSong, searchSong, getSongList, getCurrentSong } from '../../services/calls'
// import SongQueue from './SongQueue'
// import SearchResults from './SearchResults'
// import { ClipLoader } from 'react-spinners'
import Logo from '../Logo'
import throttle from 'lodash/throttle'
import { Container, Col, Row } from 'reactstrap'
import SearchSongForm from '../SearchSongForm'

class Index extends React.Component {
  state = {
    songId: null,
    loading: false,
    songAddFinished: false,
    error: false,
    songList: null,
    searchResults: null,
    currentSong: null,
    currentDuration: 1,
    currentProgress: null,
    selectedSong: null,
  }

  componentDidMount() {
    this.fetchSongList()
    this.fetchCurrentSong()
  }

  fetchSongList = () => {
    this.setState({
      loading: true,
      error: false,
      songListFetchFinished: false,
    })
    getSongList()
      .then((data) => {
        this.setState({
          songList: data,
          songListFetchFinished: true,
          error: false,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({
          songListFetchFinished: true,
          error: true,
          loading: false,
        })
      })
  }

  fetchCurrentSong = () => {
    this.setState({
      loading: true,
      error: false,
      currentSongFetchFinished: false,
    })
    getCurrentSong()
      .then((data) => {
        this.setState({
          currentSong: data.song,
          currentProgress: data.progress,
          currentDuration: data.song.duration_ms,
          currentSongFetchFinished: true,
          error: false,
          loading: false,
        })
      })
      .catch(() => {
        this.setState({
          currentSongFetchFinished: true,
          error: true,
          loading: false,
        })
      })
  }

  handleSongSubmit = () => {
    this.setState({
      loading: true,
      error: false,
      songAddFinished: false,
      searchResults: [],
    })
    return sendSong(this.state.selectedSong)
      .then(() => {
        this.setState({
          songAddFinished: true,
          error: false,
          loading: false,
        })
        this.fetchSongList()
      })
  }

  selectSong = (uri) => {
    this.setState({
      selectedSong: uri,
    })
  }

  render() {
    const { error, songAddFinished, loading, searchResults, selectedSong, songList, currentSong, currentProgress, currentDuration } = this.state
    return (
      <Container>
        <Col item md={6}>
          <Logo />
        </Col>
        <Col item xs={12} md={6} style={{
          width: '100%',
        }}>
          <SearchSongForm />
        </Col>
      </Container>
    )
  }
}

export default Index
