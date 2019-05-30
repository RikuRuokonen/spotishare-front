import React from 'react'
import { sendSong, getSongList } from './services/calls'
import SongQueue from './components/SongQueue'
import { ClipLoader } from 'react-spinners'
import SearchInput from './components/SearchInput'

import styles from './App.scss'

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
                    <div className={styles.notice}>
                        {(songAddFinished && !error && (
                            "Kappale lisätty onnistuneesti!"
                        )) || (error && (
                            "Jotain meni vikaan. Yritä uudelleen, tai ota yhteyttä asiakaspalveluumme."
                        ))}
                    </div>
                </header>
                <div className={'content'}>
                    {/*{searchResults && searchResults.length > 0 && (*/}
                    {/*    <SearchResults*/}
                    {/*        submitSong={this.selectSong}*/}
                    {/*        selectedSong={selectedSong}*/}
                    {/*        results={searchResults}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {/*<SearchSongForm*/}
                    {/*    onChange={this.handleSongIdChange}*/}
                    {/*    onSubmit={this.handleSongSubmit}*/}
                    {/*/>*/}
                    <SearchInput
                        onSelect={this.handleSongSubmit}
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
