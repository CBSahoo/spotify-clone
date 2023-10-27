import React from 'react'
import styled from 'styled-components'
import './Footer.css'
import { CurrentTrack } from '../CurrentTrack/CurrentTrack'
import { PlayerControls } from '../PlayerControls/PlayerControls'
import Volume from '../Volume/Volume'

export const Footer = () => {
  return (
    <Container className='container_footer'>
      <CurrentTrack/>
      <PlayerControls />
      <Volume />
    </Container>
  )
}


const Container = styled.div``;
