import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Spotify from 'spotify-web-api-js'
import SpotifyWebApi from 'spotify-web-api-js'

function App() {
    const [count, setCount] = useState(0);
    const [imageURL, setImageURLURL] = useState("");
    const [spotifyApi, ] = useState(new SpotifyWebApi());

    useEffect(() => {
        spotifyApi.setAccessToken('BQAC_j8UUn0e2CZBM_SFsONBQVeDbd1PAxHPgtBACkGhQdT7k3LlEtB7ByyQoxjQetcHqsHuB_pOJL6gb2xUa0CCnVL1_flSjLB_r6s-bUYq-2er0wJ11_Zkj7olAkhz8c197EtSfyWGDJFmNouQuAJXjQA100qsDRfOxRbWuMmp8ZjNQwCgkC6CZfD6ECGIYaDPeMdUUMTC0nBNxuimZgL8Y3aviT-30zcGppxJI-ajiW2iyRhhQLJlkxDqFCWMIgoc6rGG_KeJOTD10_Juy0tlDm4ua8ohdJZenpWU-jN6Icvfy1Y');
        let objectCurrent = spotifyApi.getMyCurrentPlayingTrack()
        objectCurrent.then((result) => {
            if(result.item != null) {
                setImageURLURL(result.item.album.images[0].url)
            }
        })
    })
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
