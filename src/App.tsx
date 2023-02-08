import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import './App.css'
import SpotifyWebApi from 'spotify-web-api-js'

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/en/authorize?client_id=e9284fc470b744958c3b4768d9c0e4d2&redirect_uri=http://localhost:5173/&response_type=token&scope=user-read-currently-playing"

function App() {
    const [imageURL, setImageURLURL] = useState("");
    const [spotifyApi, ] = useState(new SpotifyWebApi());
    const [cookies, setCookie, removeCookie] = useCookies(['spotify_token']);
    const [time, setTime] = useState(0);

    useEffect(() => {
        console.log("First startup")
        if(!cookies.spotify_token) {
            //http://localhost:5173/#access_token=BQC_nKTlQV_t1RldtKh1PN8CfmGqaLykOgrBF5f1854kYU0DfMEbyu2zULxybaVXacKRx4jUYnyoCEnehBdzSz_vBqjZV6WZKYItU-k7D835GpwZK-ymJ39hUvxHIqgo3BzV31uEqtAlC5TeZOzMq_tmGCLy4ztMpApB_xe9EA&token_type=Bearer&expires_in=3600
            const params = new URLSearchParams(window.location.hash);
            if(params.get("#access_token")) {
                console.log("Token is found, saving...")
                setCookie("spotify_token", params.get("#access_token"))
                spotifyApi.setAccessToken(params.get("#access_token"))
//                history.pushState({}, "", window.location.origin);
                window.location.replace(window.location.origin);
            }
            else {
                console.log("Token not found, redirecting...")
                window.location.replace(SPOTIFY_AUTH_URL)
            }
        }
        else {
            spotifyApi.setAccessToken(cookies.spotify_token);
        }
        return () => {
        }
    }, [])

    useEffect(() => {
        console.log("Repainting!")
        let objectCurrent = spotifyApi.getMyCurrentPlayingTrack()
        let interval:number
        objectCurrent.then((result) => {
            if(result.item != null) {
                if(!result.progress_ms) {
                    interval = setInterval(() => setTime(Date.now()), 2000);
                }
                else {
                    setImageURLURL(result.item.album.images[0].url)
                    let duration_ms:number = result.item.duration_ms
                    let progress_ms:number = result.progress_ms
                    interval = setInterval(() => setTime(Date.now()), (duration_ms - progress_ms) + 1000);
                }
            }
        }).catch((error) => {
            if(error.status == 401 && cookies.spotify_token) {
                removeCookie("spotify_token")
                window.location.replace(SPOTIFY_AUTH_URL)
            }
        })
        return () => {
            clearInterval(interval);
        };
    }, [time]);

    return (
        <div className="App">
            <div>
                <img src={imageURL} className="logo"/>
            </div>

        </div>
    )
}

export default App
