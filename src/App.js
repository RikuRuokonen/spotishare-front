import React from 'react'
import './App.css'
import styled from 'styled-components'
import SearchSongForm from './components/SearchSongForm'
import { sendSong, searchSong, getSongList } from './services/calls'
import SongQueue from './components/SongQueue'
import SearchResults from './components/SearchResults'
import { ClipLoader } from 'react-spinners'
import throttle from 'lodash/throttle'

const Notice = styled.div`
    color: 	#b3b3b3;
    margin: auto;
    text-aling: center;
`

class App extends React.Component {
    state = {
        songId: null,
        loading: false,
        songAddFinished: false,
        error: false,
        songList: null,
        searchResults: null,
    }

    componentDidMount() {
        this.fetchSongList()
        setInterval(
            () => this.fetchSongList(),
            8000,
        )
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

    handleSongIdChange = (e) => {
        const query = e.target.value
        if (!query) {
            this.setState({
                searchResults: [],
            })
        } else {
            this.searchSong(query)
        }
    }

    handleSongSubmit = () => {
        this.setState({
            loading: true,
            error: false,
            songAddFinished: false,
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
        console.log('uri: ', uri)
        this.setState({
            selectedSong: uri,
        })
    }

    doSongSearch = (value) => {
        console.log('search')
        return searchSong(value)
            .then((items) => {
                this.setState({
                    searchResults: items,
                })
            })
            .catch(() => {
                this.setState({
                    error: true,
                })
            })
    }

    searchSong = throttle(this.doSongSearch, 100, {
        trailing: true,
    })

    render() {
        const { error, songAddFinished, loading, searchResults, selectedSong, songList } = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <h2>SPOTISHARE</h2>
                    <ClipLoader
                        sizeUnit={'px'}
                        size={30}
                        color={'#1db954'}
                        loading={loading}
                    />
                    {songAddFinished && !error && (
                        <Notice>
                            <span>Kappale lisätty onnistuneesti!</span>
                        </Notice>
                    )}
                    {error && (
                        <Notice>
                            <span>Jotain meni vikaan. Yritä uudelleen, tai ota yhteyttä asiakaspalveluumme.</span>
                        </Notice>
                    )}
                </header>
                <div className={'content'}>
                    {searchResults && searchResults.length > 0 && (
                        <SearchResults
                            submitSong={this.selectSong}
                            selectedSong={selectedSong}
                            results={searchResults}
                        />
                    )}
                    <SearchSongForm
                        onChange={this.handleSongIdChange}
                        onSubmit={this.handleSongSubmit}
                    />
                    {songList && (
                        <SongQueue songList={songList} />
                    )}
                </div>
            </div>
        )
    }
}

export default App
