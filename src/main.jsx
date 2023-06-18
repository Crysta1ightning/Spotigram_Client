import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Home from './Home';
import Profile from './Profile';
import Playlist from './Playlist';
import Control from './Control';
import Radio from './radio/Radio';
import Sidebar from './Sidebar';
import Showcase from './Showcase';
import Rightsidebar from './rightSidebar';
import Login from './Login'

import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.dark.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <MDBContainer fluid>
    <MDBRow>
      <HashRouter>
        <MDBCol size="0">
          <Login></Login>
        </MDBCol>
        <MDBCol size="2" className="fixed-top sidebar">
          <Sidebar></Sidebar>
        </MDBCol>
        <MDBCol size="8" className="offset-2 my-fixed-top">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/playlist" element={<Playlist />}></Route>
            <Route path="/radio" element={<Radio />}></Route>
            <Route path="/showcase" element={<Showcase />}></Route>
          </Routes>
        </MDBCol>
        <MDBCol size="2" className="offset-10 fixed-top sidebar">
          <Rightsidebar></Rightsidebar>
        </MDBCol>
      </HashRouter>
    </MDBRow>
    <MDBRow className="fixed-bottom">
      <Control></Control>
    </MDBRow>
  </MDBContainer>
)
