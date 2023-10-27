import React from 'react';
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from '../../Utils/StateProvider';
import axios from "axios";
import { reducerCases } from "../../Utils/Constants";
import './PlayerControls.css';

export const PlayerControls = () => {
    const [{ token, playerState }, dispatch] = useStateProvider();

    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        await axios.put(
            `https://api.spotify.com/v1/me/player/${state}`,
            {},
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            }
        );
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };

    const changeTrack = async (type) => {
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            }
        );
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

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



  return (
    <Container className='container_playercontrols'>
      <span style={{'color':"white",'font-weight': '400'}}>*Please open an active device and play a song.</span>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => {changeTrack("previous");}} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => {changeTrack("next");} } />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  )
};


const Container = styled.div``;


