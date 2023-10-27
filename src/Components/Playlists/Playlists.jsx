import React, { useEffect } from 'react'
import './Playlists.css'
import { useStateProvider } from '../../Utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../../Utils/Constants';
import styled from 'styled-components';

export const Playlists = () => {

    const [{ token, playlistsItems }, dispatch] = useStateProvider();
    useEffect(() => {
        const getPlaylistsData = async () => {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/playlists",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );
            const { items }  = response.data;
            const playlistsItems = items.map(({ name, id }) => {
                return { name, id };
              });
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlistsItems});
        }

        getPlaylistsData();
    }, [token, dispatch]);

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
      };
    return (
        <div className='container_playlists'>
            <ul>
                {
                    playlistsItems.map(({ name, id }) => {
                        return <li key={id} onClick={() => changeCurrentPlaylist(id)}>{name}</li>
                    })
                }
            </ul>
        </div>
    )
}

const Container = styled.div``;
