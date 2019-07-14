import React from 'react'
import './Session.css'
import styled from 'styled-components'
import SearchSongForm from './SearchSongForm'
import { sendSong, searchSong, getSongList, getCurrentSong } from '../services/calls'
import SongQueue from './SongQueue'
import SearchResults from './SearchResults'
import { ClipLoader } from 'react-spinners'
import throttle from 'lodash/throttle'

const Notice = styled.div`
    color: 	#b3b3b3;
    margin: auto;
    text-aling: center;
    font-size: 2em;
    margin-top: 1em;
`
const Current = styled.p`
    margin-top: 0.4em;
`
const ProgressContainer = styled.div`
    position: relative;
    width: 80%;
    height: 20px;
    margin: 0 auto;
    margin-top: 0.5rem;
`

const ProgressBottom = styled.div`
    position: absolute;
    width: 100%;
    border: 1px solid #1db954;
    height: 20px;
`

const ProgressBar = styled.div`
    position: absolute;
    background-color: #1db954;
    height: 22px;
    width: ${props => props.progress}%;
`
ProgressBar.defaultProps = {
    progress: 0
}

class Session extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
    }

    componentDidMount() {
        this.fetchCurrentSong()
            .then(this.fetchSongList())
            .then(setInterval(
                () => {
                    this.fetchSongList()
                    this.fetchCurrentSong()
                    console.log(this.state)
                },
                1000,
            ))
    }

    fetchSongList = () => {
        this.setState({
            loading: true,
            error: false,
            songListFetchFinished: false,
        })
        getSongList(this.props.location.pathname.split('/')[2])
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
        return getCurrentSong(this.props.location.pathname.split('/')[2])
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
            searchResults: [],
        })
        return sendSong(this.props.location.pathname.split('/')[2], this.state.selectedSong)
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
        return searchSong(this.props.location.pathname.split('/')[2], value)
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
        const { error, songAddFinished, loading, searchResults, selectedSong, songList, currentSong, currentProgress, currentDuration } = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <h2>SPOTISHARE</h2>
                    {!currentSong && <ClipLoader
                        sizeUnit={'px'}
                        size={30}
                        color={'#1db954'}
                        loading={loading}
                    />}
                    {currentSong && currentProgress &&
                        <div>
                            <h4>Now playing:</h4>
                            <Current>{currentSong.artists[0].name} - {currentSong.name}</Current>
                            <ProgressContainer>
                                <ProgressBottom></ProgressBottom>
                                <ProgressBar progress={100 * currentProgress / currentDuration}></ProgressBar>
                            </ProgressContainer>
                        </div>
                    }
                </header>
                <div className={'content'}>
                    <SearchSongForm
                        onChange={this.handleSongIdChange}
                        onSubmit={this.handleSongSubmit}
                    />
                    {searchResults && searchResults.length > 0 && (
                        <SearchResults
                            submitSong={this.selectSong}
                            selectedSong={selectedSong}
                            results={searchResults}
                        />
                    )}

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
                    {songList && (
                        <SongQueue songList={songList} />
                    )}
                </div>
            </div>
        )
    }
}

export default Session
