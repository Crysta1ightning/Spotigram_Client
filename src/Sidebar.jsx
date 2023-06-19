import { useState } from 'react'
import { NavLink } from "react-router-dom";
// import './App.css'
import './Sidebar.scss'

import {
  MDBListGroup,
  MDBListGroupItem,
  MDBNavbarLink,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

function Sidebar() {



  // if (localStorage.getItem("user_id") == null) return (<></>)
  return (
    <div className="sidebar-container min-vh-100 ">
      <img src='./images/spotigram_title.png' width='150rem' className='mt-3'></img>
      <MDBListGroup className='text-center'>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/" action noBorders>
          <MDBIcon fas icon='home ' /><span className='d-none d-lg-flex'>Home</span>
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/profile" action noBorders>
          <MDBIcon fas icon='user-circle' /><span className='d-none d-lg-flex'>Profile</span>
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/playlist" action noBorders>
          <MDBIcon fas icon='bars' /><span className='d-none d-lg-flex'>Playlists</span>
        </MDBListGroupItem>
        {/* <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/radio" action noBorders>
          <MDBIcon fas icon='broadcast-tower' /><span className='d-none d-lg-flex'>Your radio</span>
        </MDBListGroupItem> */}
        {/* <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-items-center' to="/showcase" action noBorders>
          <MDBIcon fas icon='music' />Showcase
        </MDBListGroupItem> */}
      </MDBListGroup>

      <p className="text-center mt-5">Friends' Radio</p>
      <MDBListGroup className='friend-block'>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
          <img src='./images/user0.png' className='img-fluid rounded-circle' width={45} />
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
          <img src='./images/user4.png' className='img-fluid rounded-circle' width={45} />
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
          <img src='./images/user2.png' className='img-fluid rounded-circle' width={45} />
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
          <img src='./images/user3.png' className='img-fluid rounded-circle' width={45} />
        </MDBListGroupItem>
        
      </MDBListGroup>

    </div>
  )
}

export default Sidebar
