import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from '../../Utils/StateProvider';
import './Volume.css'

export default function Volume() {
    const [{ token }] = useStateProvider();
    const setVolume = async (e) => {
      await axios.put(
        "https://api.spotify.com/v1/me/player/volume",
        {},
        {
          params: {
            volume_percent: parseInt(e.target.value),
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    };
    return (
      <Container className="container_volume">
        <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
      </Container>
    );
  };

  const Container = styled.div``;