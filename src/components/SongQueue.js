import React from 'react';
import styled from 'styled-components';

const QueueContainer = styled.div`
    width: 25em;
    min-height: 10em;
    margin-top: 2em;
    background-color: #212121;
    border: 1px solid #1db954;
    .title {
        display: block;
        margin-top: 1em;
        color: white;
        margin-bottom: 1em;
    }
    
    .section-title-row {
        width: 100%;
        margin: auto;
        height: 1em;
        padding: 1em 0 1em 0;
        span {
            min-width: 50%;
            color: #b3b3b3;
            float: left;
        }
    }
    
    .song-row {
        width: 100%;
        margin: auto;
        height: 1em;
        padding: 1em 0 1em 0;
        span {
            min-width: 50%;
            color: white;
            float: left;
        }
     
    }
    .first-child {
        border-top: 1px solid #535353;
    }
`

const SongQueue = (props) => {
    return(
        <QueueContainer>
            <span className={'title'}>Biisilista</span>
            <div className={'section-title-row'}>
                <span>Artisti</span>
                <span className={'last-section'}>Laulun nimi</span>
            </div>
            {props.songList.map((song, key) => (
                <div className={`song-row ${key === 0 ? 'first-child' : ''}`}>
                    <span>{song.album.artists[0].name}</span>
                    <span>{song.name}</span>
                </div>
            ))}
        </QueueContainer>
    )
}

export default SongQueue;