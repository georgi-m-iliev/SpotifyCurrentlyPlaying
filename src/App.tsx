import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Spotify from 'spotify-web-api-js'
import SpotifyWebApi from 'spotify-web-api-js'

function App() {
    const [imageURL, setImageURLURL] = useState("");
    const [spotifyApi, ] = useState(new SpotifyWebApi());

    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        console.log("First startup")
        spotifyApi.setAccessToken('BQDrjTrjrD3Ruq_HgY6KkhZpMe3MbRrymI6aUlVUjxvyxacqmYxScGb3JTtKHGGZMGcGnjgjr4wxwULkuyg9cr2vOxAf9Vg8oTXTRD1bpuzJaNNdQVRX0WZuPwIbwFGvXerI962T3UCUlF-hC7xogj5Kzu4PryMC2hE2qh6bskmXg9Y7IYHn4qd5cchPPrwrn7wH5xeTGvDvNi61xusNCGOjofdKdsPnSsXYlc8i-3ptzyDV86FwwVmO9SoqK7DTsFBVDFWVIJKZdcXlFa3Z9d-rx0INft6HTMmfp0RZpW7CPipoXtY');

    }, [])

    useEffect(() => {
        let objectCurrent = spotifyApi.getMyCurrentPlayingTrack()
        let interval:number
        objectCurrent.then((result) => {
            if(result.item != null) {
                console.log(result)
                setImageURLURL(result.item.album.images[0].url)
                let duration_ms:number = result.item.duration_ms
                let progress_ms:number = result.progress_ms ? result.progress_ms : 0
                interval = setInterval(() => setTime(Date.now()), (duration_ms - progress_ms));
            }
        })
        console.log("repainting!")
        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={imageURL} className="logo" alt="Vite logo"/>
                </a>
            </div>
        </div>
    )
}

export default App
