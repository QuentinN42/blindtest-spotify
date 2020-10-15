/*global swal*/

// import React from 'react';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';

const apiToken = 'BQDnm1zru33K9pt6Cc59yOsDhRUNpltBM0XwbKUxAl0M2PGVLdsa8ofW45yu6HVVoZfec7TJA8wpJcP-JUVDmQkr_ljmt45npDbS6pLbTanw38qXXrN03I4f4J6JyyzA0pLfN-0V4nD9r1PYkBMtSJ2ZMA';


function shuffleArray(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = getRandomNumber(counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
    return Math.floor(Math.random() * x);
}

const AlbumCover = ({ track }) =>
{
    // console.log(track);
    return (
        // <img src={track.album.images[0].url}  alt={track.album.name}/>
        <Sound url={track.preview_url} playStatus={Sound.status.PLAYING} />
        // <p> {track.name} </p>
    );
}


const App = () => {
    // https://trello.com/b/fE9yY2TP/react
    const [text, setText] = useState('');
    const [songsLoaded, setSongsLoaded] = useState(false);
    const [tracks, setTracks] = useState();
    const [t1, setTrack1] = useState();
    const [t2, setTrack2] = useState();
    const [t3, setTrack3] = useState();

    useEffect(() => {
        fetch('https://api.spotify.com/v1/me/tracks', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + apiToken,
            },
        })
            .then(response => response.json())
            .then((data) => {
                let res = data.items;
                // console.log(res);
                setTracks(res);
                setSongsLoaded(true);
                // console.log(songsLoaded);
                setTrack1(res[0].track.name)
                setTrack2(res[1].track.name)
                setTrack3(res[2].track.name)
            });
    }, [])

    if (!songsLoaded) {
        return (
            <div className="App">
                <img src={loading} className="App-logo" alt="logo"/>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Bienvenue sur le Blindtest</h1>
            </header>
            <div className="App-images">
                <p>
                    <p> {tracks[0].track.name} </p>
                    <AlbumCover track={tracks[0].track} />
                </p>
            </div>
            <div className="App-buttons">
                <Button>{t1}</Button>
                <Button>{tracks[1].track.name}</Button>
                <Button>{tracks[2].track.name}</Button>
            </div>
        </div>
    );
}

// {tracks && tracks.length} songs :
// { tracks && tracks.map((track) => <AlbumCover track={track.track} />) }

export default App;
