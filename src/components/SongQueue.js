import React from 'react'
import styles from './SongQueue.module.scss'

const SongQueue = ({ songList }) => {
    return (
        <div className={styles.songQueue}>
            {songList.length ? (
                <>
                    <h3>Biisilista</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th>Artisti</th>
                            <th>Laulun nimi</th>
                        </tr>
                        {songList.map((song, key) => (
                            <tr key={key}>
                                <td>{song.album.artists[0].name}</td>
                                <td>{song.name}</td>
                            </tr>
                        ))}
                        <tr>
                            <td>testi</td>
                            <td>afsadfsdf</td>
                        </tr>
                        <tr>
                            <td>asdf</td>
                            <td>afsadfsdf</td>
                        </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <h3>Ei biisejä listassa</h3>
            )}
        </div>
    )
}

export default SongQueue