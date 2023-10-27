import React, { useEffect } from 'react'
import './CurrentTrack.css'
import { useStateProvider } from '../../Utils/StateProvider'
import axios from 'axios';
import styled from 'styled-components';
import { reducerCases } from '../../Utils/Constants';

export const CurrentTrack = () => {

    const [{token, currentlyPlaying}, dispatch] = useStateProvider();
    useEffect(() => {

          const getCurrentTrack = async () => {
          const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          if (response.data !== "") {
            const currentlyPlaying = {
              id: response.data.item.id,
              name: response.data.item.name,
              artists: response.data.item.artists.map((artist) => artist.name),
              image: response.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
          } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
          }
        };
        getCurrentTrack();
      }, [token, dispatch]);
    return (
        <Container>
        { 
            currentlyPlaying && (
            <div className="track">
                <div className="track_image">
                <img src={currentlyPlaying.image} alt="currentPlaying" />
                </div>
                <div className="track_info"  style={{'display': 'flex', 'flex-direction': 'column','gap': '0.3rem' }}>
                <h4 className="track_info_track_name" style={{'color': 'white'}}>{currentlyPlaying.name}</h4>
                <h6 className="track_info_track_artists" style={{'color': '#b3b3b3'}}>
                    {currentlyPlaying.artists.join(", ")}
                </h6>
                </div>
            </div>
        )}
      </Container>
    )
};

const Container = styled.div``;
