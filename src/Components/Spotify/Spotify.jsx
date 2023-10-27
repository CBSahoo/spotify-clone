import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Sidebar } from '../Sidebar/Sidebar';
import { Body } from '../Body/Body';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import './Spotify.css'
import { useStateProvider } from '../../Utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../Utils/Constants';

export const Spotify = () => {
  const [{token}, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
      
  };
  useEffect (() => {

      const getUserInfo = async () => {

        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers : {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
          }
        });

        const userInfo = {
          userId: data.id,
          userName: data.display_name,
        }
        dispatch({type: reducerCases.SET_USER, userInfo})
      };

      getUserInfo();

  }, [dispatch, token]);

  return (
    <Container className='container_spotify'>
      <div className="spotify_body">
        <Sidebar/>  
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}/>
          <div className="body_contents">
            { <Body headerBackground={headerBackground}/> }
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer />
      </div>
    </Container>
  )
}

const Container = styled.div``;
