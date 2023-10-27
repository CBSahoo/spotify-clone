import React from 'react'
import './Login.css'
import styled from 'styled-components'

export const Login = () => {
    const Container = styled.div``;
    const handleClick = () => {
        //const clientId = "ad88ee0dd7714ba2b585a032e7126a1b";
        const clientId = "025406f99d8d4a3991e4fb27ba74d28d";
        //const redirectUrl = "http://localhost:3000/";
        const redirectUrl = "https://astounding-liger-5ce6aa.netlify.app";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-read-playback-state",
            "user-modify-playback-state",
            "user-read-currently-playing",
            "user-read-playback-position",
            "user-top-read",
            "user-read-recently-played",
        ]

        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dailog=true`

    }
    
    return (
        <Container className='container'>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="" />
            <button onClick={handleClick}>Connect Spotify</button>
        </Container>
    )
}

