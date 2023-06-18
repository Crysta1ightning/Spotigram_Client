import { useState } from 'react'
//import '../App.css'
//import './Radio.scss';
import './createRadio.scss'

function createRadio(props) {
  const [radioID, setRadioID] = useState(1257);
  const [radioName, setRadioName] = useState("Kelvin的電台");
  const [queueSongs, setQueuesongs] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [nowPlaying, setNowPlaying] = useState(0);
  const songs = [
    {name: "Maka", artist: "MAKAA", cover: "images/1.png"},
    {name: "Baka", artist: "BAKAA", cover: "images/2.png"},
    {name: "Mikka", artist: "MIKKAA", cover: "images/1.png"},
    {name: "Mooska", artist: "Mooska", cover: "images/2.png"},
    {name: "Maka", artist: "MAKAA", cover: "images/1.png"},
    {name: "Baka", artist: "BAKAA", cover: "images/2.png"},
    {name: "Mikka", artist: "MIKKAA", cover: "images/1.png"},
    {name: "Mooska", artist: "Mooska", cover: "images/2.png"}
  ]
  const sendInvite = () => {

  }

  

  return (
    <div className="createRadioPage">
        <div className='row pageTop'>
          <h1 className='col-3'>你的電台</h1>
          <p className='col-2 roomID'>ID: {radioID}</p>
        </div>

        <div className='row radioSetting'>
          <div className='col-3'>
            <h3>電台名稱</h3>
            <input 
              className="search"
              type = "search" 
              placeholder = {radioName} 
            />
          </div>
          <div className='col-3'>
            <p>12人在房間</p>
            <button onClick={()=>{sendInvite()}}>邀請好友聆聽</button>
          </div>
        </div>

       
        <div className='row nowPlaying'>  
          <h3>現正撥放</h3>
          <div className='row'> 
            <div className='col-2 Song'>
              <img type="button" src={songs[queueSongs[nowPlaying]].cover} className='card-img-top'></img>
            </div>
            <div className='col-1 block'></div>
            <div className='col-2 d-flex align-items-center'>
              <div>
                <p className='song'>{songs[queueSongs[nowPlaying]].name}</p>
                <p className='artist'>{songs[queueSongs[nowPlaying]].artist}</p>
              </div>
            </div> 
          </div>
        </div>

        <div className='row nextPlaying'>
          <h3>接著撥放</h3>
          <div className='scrolling-wrapper'>
          {
            queueSongs.map(function(songID, i) { 
              if (songID > nowPlaying) {
                return (
                <div className='card col-2'>
                  <img type="button" src={songs[queueSongs[nowPlaying]].cover} className='card-img-top'></img>
                  <p className='card-text song'>{songs[queueSongs[songID]].name}</p>
                  <p className='card-text artist'>{songs[queueSongs[songID]].artist}</p>
                </div>    
                )
              }
            })
          }
          

            <button  onClick={()=>{props.setPage(2)}}>+</button>

          </div>
        </div>

        <div className='row'>
          <p className='bind'>u can't see me</p>
          <p className='bind'>u can't see me</p>
          <p className='bind'>u can't see me</p>
      </div>

    </div>
  )
  
}

export default createRadio
