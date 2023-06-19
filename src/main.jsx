import { React, useState } from 'react'
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
import Playlistsong from "./Playlist_songs.jsx"

import {
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.dark.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const global = {};
Object.defineProperty(global, 'song_id', {
  value: 1,
  writable: true
});

function App() {
  const [playlist, setPlaylist] = useState("");

  const handlePlaylist = x => setPlaylist(x);

  return (
    <MDBContainer fluid>
    <Login></Login>
    <MDBRow>
      <HashRouter>
        <MDBCol size="2" className="fixed-top sidebar">
          <Sidebar></Sidebar>
        </MDBCol>
        <MDBCol size="10" className="offset-2">
          <Routes>
            <Route path="/" element={<Home global={global}/>}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/playlist" element={<Playlist />}></Route>
            <Route path="/radio" element={<Radio />}></Route>
            <Route path="/showcase" element={<Showcase />}></Route>
            <Route path="/playlistsong" element={<Playlistsong playlist={playlist} handlePlaylist={handlePlaylist} />}></Route> 
          </Routes>
        </MDBCol>
        {/* <MDBCol size="2" className="offset-10 fixed-top sidebar">
          <Rightsidebar></Rightsidebar>
        </MDBCol> */}
      </HashRouter>
    </MDBRow>
    <MDBRow className="fixed-bottom">
      <Control global={global} playlist={playlist} ></Control>
    </MDBRow>
  </MDBContainer>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
