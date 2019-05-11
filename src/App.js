import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import SearchSongForm from "./components/SearchSongForm";
import { sendSong, getSongList } from "./services/calls";
import SongQueue from './components/SongQueue'
import { ClipLoader } from 'react-spinners';

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
      }
  }

  componentDidMount(){
      setInterval(
          () => this.fetchSongList(this),
          1000
      );
  }

  fetchSongList = () => {
      getSongList(this);
  }

  handleSongIdChange = (e) =>  {
      console.log('fire change handler', e.target.value);
    this.setState({
        songId: e.target.value,
    })
  }

  handleSongSubmit = () => {
      console.log('submit');
      sendSong(this.state.songId, this);
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
                {this.state.songAddFinished && this.state.error && (
                    <Notice>
                        <span>Kappaleen lisääminen epäonnistui. Yritä uudelleen.</span>
                    </Notice>
                )}
            </header>
              <div className={'content'}>
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
