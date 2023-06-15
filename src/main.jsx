import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import Home from './Home';
import Profile from './Profile';
import Playlist from './Playlist';
import Radio from './radio/Radio';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={ <Home/> }></Route>
        <Route path="/profile" element={ <Profile/> }></Route>
        <Route path="/playlist" element={ <Playlist/> }></Route>
        <Route path="/radio" element={ <Radio/> }></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
