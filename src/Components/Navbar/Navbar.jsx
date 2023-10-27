import React from 'react'
import './Navbar.css'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useStateProvider } from '../../Utils/StateProvider';

export const Navbar = ({navBackground}) => {

  const [{ userInfo }] = useStateProvider();
  var bgNavColors = { "default": "#000000", "none" : "transparent" }

  return (
    <Container className='container_navbar' style={ navBackground ? { 'background-color': bgNavColors.default, 'opacity' : '0.7'} : {'background-color': 'transparent'}}>
      <div className="search_bar">
        <FaSearch/>
        <input type="text" placeholder='Artists, songs or podcasts' />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile/>
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </Container>
  )
}


const Container = styled.div``;
