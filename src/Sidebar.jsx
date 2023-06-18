import { useState } from 'react'
import { NavLink } from "react-router-dom";
import './App.css'

import { MDBListGroup, MDBListGroupItem, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';

function Sidebar() {

  return (
    <div className="sidebar-container">
      <h1 className="px-0.5 ">Spotigram</h1>
      <MDBListGroup className='bg-dark text-center'>
        <MDBListGroupItem tag={NavLink} className='text-white d-flex justify-content-between align-items-center' to="/" action noBorders>
          <MDBIcon fas icon='home' className=''/>Home
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='text-white d-flex justify-content-between align-items-center' to="/profile" action noBorders>
          <MDBIcon fas icon='user-circle' />Profile
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='text-white d-flex justify-content-between align-items-center' to="/playlist" action noBorders>
          <MDBIcon fas icon='bars' />Playlists
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='text-white d-flex justify-content-between align-items-center' to="/radio" action noBorders>
          <MDBIcon fas icon='broadcast-tower' />Radio
        </MDBListGroupItem>
      </MDBListGroup>
    </div>
  )
}

export default Sidebar
