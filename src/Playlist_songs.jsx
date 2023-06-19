import { useState, useEffect } from 'react';
//import './App.css';
import './Playlist_songs.scss'

function Playlistsong() {
    const [cur_playlistID] = useState(location.href.split('?')[1].split('=')[1]);
    const [playlistName, setPlaylistName] = useState([]); 
    const [playlistSong, setPlaylistSong] = useState([]);
    const [playlistOwner, setPlaylistOwner] = useState([]);
      useEffect(() => {

        const fetchPlaylistSongData = async () => {
          const data = await fetch("http://localhost:3000/api/playlist_song").then(r => r.json());
          
          const data1 = await fetch("http://localhost:3000/api/song").then(r => r.json());
          
          const playlistdata = await fetch("http://localhost:3000/api/playlist").then(r => r.json());

          const playlistowner = await fetch("http://localhost:3000/api/playlist_owner").then(r => r.json());

          const users = await fetch("http://localhost:3000/api/user").then(r => r.json());
          
          
          //console.log(data);
          //console.log(data1);
          let newplaylistsong = [];
          for (let i = 0; i < data.length; i++) {
              if (data[i].playlist_id == cur_playlistID) {
                  for (let j = 0; j < data1.length; j++){
                      if (data[i].song_id == data1[j].song_id){
                          newplaylistsong.push({ id: data1[j].song_id, cover: './images/'+data1[j].song_id+'.png', title: data1[j].songname, artist: data1[j].artist});
                      }
                  }
              }
          }
          console.log(cur_playlistID);
          let newplaylistname = [];
          let newplaylistOwner = [];
          for (let i = 0; i < playlistdata.length; i++) {
            if(playlistdata[i].playlist_id == cur_playlistID){
              newplaylistname.push({name: playlistdata[i].playlistname});
            }
          }

          for (let i = 0; i < playlistowner.length; i++) {
            if (playlistowner[i].playlist_id == cur_playlistID) {
              newplaylistOwner.push({owner: playlistowner[i].user_id, pfp: './images/user'+playlistowner[i].user_id+'.png'});
            }
          }
  
          setPlaylistName(newplaylistname);
          setPlaylistSong(newplaylistsong);
          setPlaylistOwner(newplaylistOwner);
      }

        fetchPlaylistSongData();
      }, [])
    

    

  
  return (
    <div>
      <div className="title d-flex align-items-start"><h1 className="inline">{playlistName[0]?.name}</h1></div>
      
      <div>
        <div className='d-flex px-4 mt-2 align-items-center '>
          <button type="button" class='btn btn-primary'>Start Radio</button>
          <div className='ps-3'>Created by:</div>
          {
            playlistOwner.map((user, index) =>
              <div>
                <img src={user.pfp} className='user-pfp shadow img-fluid rounded-circle'></img>
              </div>
            )
          }
        </div>
      </div>
      <hr className='mt-3' />
      <div>
        {
          playlistSong.map((song, index) =>
            <div className='d-flex mt-3'>
              <div className='col-1 song-index px-3'>{index+1}</div>
              <img className='song-cover' src={song.cover}></img>
              <div className='col'>
                <div className='col-4 song-title px-4'>{song.title}</div>
                <div className='col-4 song-artist px-4'>{song.artist}</div>
              </div>
            </div>
          )
        }
      </div>

      <div className='row'>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
      </div>



        
    </div>
  )
}

export default Playlistsong
