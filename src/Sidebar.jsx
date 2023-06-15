import { useState } from 'react'
import './App.css'

import { MDBListGroup, MDBListGroupItem, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';

function Sidebar() {

  return (
    <MDBListGroup className='bg-dark text-center text-white'>
      <MDBListGroupItem tag='a' className='d-flex justify-content-between align-items-center' href="/#" action noBorders>
        <MDBIcon fas icon='home' />Home
      </MDBListGroupItem>
      <MDBListGroupItem tag='a' className='d-flex justify-content-between align-items-center' href="/#/profile" action noBorders>
        <MDBIcon fas icon='user-circle' />Profile
      </MDBListGroupItem>
      <MDBListGroupItem tag='a' className='d-flex justify-content-between align-items-center' href="/#/playlist" action noBorders>
        <MDBIcon fas icon='bars' />Playlists
      </MDBListGroupItem>
      <MDBListGroupItem tag='a' className='d-flex justify-content-between align-items-center' href="/#/radio" action noBorders>
        <MDBIcon fas icon='broadcast-tower' />Radio
      </MDBListGroupItem>
    </MDBListGroup>
  )
}

export default Sidebar
