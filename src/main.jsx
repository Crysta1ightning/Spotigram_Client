import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Home from './Home';
import Profile from './Profile';
import Playlist from './Playlist';
import Control from './Control';
import Radio from './radio/Radio';
import Sidebar from './Sidebar';

import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.dark.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MDBRow>
      <MDBCol size="2">
        <Sidebar></Sidebar>
      </MDBCol>
      <MDBCol size="10">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/playlist" element={<Playlist />}></Route>
            <Route path="/radio" element={<Radio />}></Route>
          </Routes>
        </HashRouter>
      </MDBCol>
    </MDBRow>
    <Control></Control>
  </React.StrictMode>
)
