import { useState } from 'react'
import '../App.css'
import './Radio.scss';

function createRadio(props) {
  const [radioID, setRadioID] = useState(1257);
  const [radioName, setRadioName] = useState("Kelvin的電台");
  const [queueSongs, setQueuesongs] = useState([0, 1, 2, 3]);
  const [nowPlaying, setNowPlaying] = useState(0);
  const songs = [
    {name: "Maka", artist: "MAKAA"},
    {name: "Baka", artist: "BAKAA"},
    {name: "Mikka", artist: "MIKKAA"},
    {name: "Mooska", artist: "Mooska"}
  ]
  const sendInvite = () => {

  }

  return (
    <div className="createRadioPage">
        <div>
          <h1>你的電台</h1>
          <p>ID: {radioID}</p>
        </div>
        <div>
          <h3>電台名稱</h3>
          <input 
            className="search"
            type = "search" 
            placeholder = {radioName} 
          />
        </div>
        <div>
          13人在房間
          <button onClick={()=>{sendInvite()}}>邀請好友聆聽</button>
        </div>
        <div>
          <h3>現正撥放</h3>
          {songs[queueSongs[nowPlaying]].name} &emsp;
          {songs[queueSongs[nowPlaying]].artist}
        </div>
        <div>
          <h3>接著撥放</h3>
          {
            queueSongs.map(function(songID, i) { 
              if (songID > nowPlaying) {
                return (
                <>
                  {songs[queueSongs[songID]].name} &emsp;
                  {songs[queueSongs[songID]].artist}
                </>    
                )
              }
            })
          }
          <button onClick={()=>{props.setPage(2)}}>+</button>
        </div>
    </div>
  )
  
}

export default createRadio
