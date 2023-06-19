import { useState } from 'react'
import { NavLink } from "react-router-dom";
// import './App.css'
import './Sidebar.scss'

import { MDBListGroup, MDBListGroupItem, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';

function Sidebar() {
  // if (localStorage.getItem("user_id") == null) return (<></>)
  return (
    <div className="sidebar-container min-vh-100 ">
      <img src='./images/spotigram_title.png' width='150rem' className='mt-3'></img>
      <MDBListGroup className='text-center'>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-items-center' to="/" action noBorders>
          <MDBIcon fas icon='home' />Home
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-items-center' to="/profile" action noBorders>
          <MDBIcon fas icon='user-circle' />Profile
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-items-center' to="/playlist" action noBorders>
          <MDBIcon fas icon='bars' />Playlists
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-items-center' to="/radio" action noBorders>
          <MDBIcon fas icon='broadcast-tower' />Your radio
        </MDBListGroupItem>
        {/* <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-items-center' to="/showcase" action noBorders>
          <MDBIcon fas icon='music' />Showcase
        </MDBListGroupItem> */}
      </MDBListGroup>
    </div>
  )
}

export default Sidebar
