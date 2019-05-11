import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import SearchSongForm from "./components/SearchSongForm";
import { sendSong, searchSong, getSongList } from "./services/calls";
import SongQueue from './components/SongQueue'
import SearchResults from './components/SearchResults';
import { ClipLoader } from 'react-spinners';
import _ from 'lodash';

const mockSongs = [
    {songName: 'Kesä on kreisi', artist: 'Lidl Stigy'},
    {songName: 'Suomen kesä', artist: 'Lidl Stigy'},
]

const Notice = styled.div`
    color: 	#b3b3b3;
    margin: auto;
    text-aling: center;
`;

class App extends React.Component {
  constructor(props){
    super()
      this.state = {
          songId: null,
          loading: false,
          songAddFinished: false,
          error: false,
          songList: null,
          searchResults: null,
      }

      this.searchSong =  _.debounce(this.doSongSearch, 1000)
  }

  componentDidMount(){
      this.fetchSongList(this);
      setInterval(
          () => this.fetchSongList(this),
          8000
      );
  }

  fetchSongList = () => {
      getSongList(this);
  }

  handleSongIdChange = (e) =>  {
      const searchResults = this.searchSong(e.target.value);
      this.setState({
          searchResults,
      })
  }

  handleSongSubmit = () => {
      sendSong(this.state.selectedSong, this);
  }

  selectSong = (uri) => {
      console.log('uri: ', uri)
      this.setState({
          selectedSong: uri,
      })
  }

  doSongSearch = (value) => {
      console.log('search')
      searchSong(value, this);
  }

  render(){
      return (
          <div className="App">
            <header className="App-header">
                <h2>SPOTISHARE</h2>
                <ClipLoader
                    sizeUnit={"px"}
                    size={30}
                    color={'#1db954'}
                    loading={this.state.loading}
                />
                {this.state.songAddFinished && !this.state.error && (
                    <Notice>
                        <span>Kappale lisätty onnistuneesti!</span>
                    </Notice>
                )}
                {this.state.error && (
                    <Notice>
                        <span>Jotain meni vikaan. Yritä uudelleen, tai ota yhteyttä asiakaspalveluumme.</span>
                    </Notice>
                )}
            </header>
              <div className={'content'}>
                  {this.state.searchResults && this.state.searchResults.length > 0 && (
                      <SearchResults submitSong={this.selectSong} selectedSong={this.state.selectedSong} results={this.state.searchResults}/>
                  )}
                  <SearchSongForm onChange={this.handleSongIdChange} onSubmit={this.handleSongSubmit}/>
                  {console.log('state: ', this.state)}
                  {this.state.songList !== null && this.state.songList.length > 0 && (
                      <SongQueue songList={this.state.songList} />
                  )}
              </div>
          </div>
      );
  }
}

export default App;
