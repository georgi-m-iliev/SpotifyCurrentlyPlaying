import {useState, useEffect, useRef} from 'react'
import {useCookies} from 'react-cookie'
import SpotifyWebApi from 'spotify-web-api-js'
import { FastAverageColor } from 'fast-average-color';
import './App.css'

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/en/authorize?" +
                         "client_id=" + import.meta.env.VITE_CLIENT_ID +
                         "&redirect_uri=" + import.meta.env.VITE_REDIRECT_URI +
                         "&response_type=token" +
                         "&scope=user-read-currently-playing,user-modify-playback-state";

function App() {
    const [playing, setPlaying] = useState<boolean | undefined>(undefined);
    const [imageURL, setImageURL] = useState<string | undefined>(undefined);
    const [time, setTime] = useState<number>(0);
    const cover = useRef(null);
    const [spotifyApi, ] = useState(new SpotifyWebApi());
    const [cookies, setCookie, removeCookie] = useCookies(['spotify_token']);

    useEffect(() => {
        console.log("First startup");
        if(!cookies.spotify_token) {
            const params = new URLSearchParams(window.location.hash);
            if(params.get("#access_token")) {
                console.log("Token is found, saving...");
                setCookie("spotify_token", params.get("#access_token"));
                spotifyApi.setAccessToken(params.get("#access_token"));
//                history.pushState({}, "", import.meta.env.VITE_ORIGIN_URL);
                window.location.replace(import.meta.env.VITE_ORIGIN_URL);
            }
            else {
                console.log("Token not found, redirecting...");
                window.location.replace(SPOTIFY_AUTH_URL);
            }
        }
        else {
            spotifyApi.setAccessToken(cookies.spotify_token);
        }
        return () => { }
    }, []);

    useEffect(() => {
        console.log("Repainting!");
        let objectCurrent = spotifyApi.getMyCurrentPlayingTrack();
        let interval = 0;
        objectCurrent.then((result) => {
            if(result.item != null) {
                // console.log(result);
                setPlaying(true);
                if(!result.progress_ms) {
                    interval = setInterval(() => setTime(Date.now()), 2000);
                }
                else {
                    if(imageURL != result.item.album.images[0].url) {
                        setImageURL(result.item.album.images[0].url);
                    }   
                    let duration_ms:number = result.item.duration_ms;
                    let progress_ms:number = result.progress_ms;
                    interval = setInterval(() => setTime(Date.now()), (duration_ms - progress_ms) + 1000);
                }
            }
            else {
                console.log("Nothing is playin...")
                setPlaying(false);
                setImageURL(undefined);
                interval = setInterval(() => setTime(Date.now()), 2000);
            }
        }).catch((error) => {
            if(error.status == 401 && cookies.spotify_token) {
                removeCookie("spotify_token");
                window.location.replace(SPOTIFY_AUTH_URL);
            }
        })
        return () => {
            clearInterval(interval);
        };
    }, [time]);

    useEffect(() => {
        if(imageURL) {   
            console.log("Changing color of effect..");
            const fac = new FastAverageColor();
            imageURL && fac.getColorAsync(imageURL).then(color => {
                // console.log('Average color', color);
                document.documentElement.style.setProperty('--logo-color', color.hex + "aa");
            }).catch(e => {
                console.log(e);
            });
        }
    }, [imageURL])

    function play() {
        spotifyApi.play();
        setTime(0);
    }

    function pause() {
        console.log("Pausing...");
        spotifyApi.pause();
        setTime(0);
    }

    function next() {
        spotifyApi.skipToNext();
        setTime(0);
    }

    function previuous() {
        spotifyApi.skipToPrevious();
        setTime(0);
    }

    return (
        <div className="App">
            <div className="card">
                <img src={imageURL} className="logo" id="cover" ref={cover} />
                {playing == false && <h1>Nothing is playing!</h1>}
            </div>
            <div className="buttons">
                <button onClick={next}>Next</button>
                <button onClick={pause}>||</button>
                <button onClick={play}>|&gt;</button>
                <button onClick={previuous}>Previous</button>
            </div>
        </div>
    )
}

export default App
