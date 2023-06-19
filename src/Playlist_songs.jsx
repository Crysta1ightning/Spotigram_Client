import { useState, useEffect } from 'react';
//import './App.css';
import './Playlist_songs.scss'

function Playlistsong() {
    const [cur_playlistID] = useState(1);
    const [playlist_name, setPlaylistName] = useState([]); 
    const [playlistSong, setPlaylistSong] = useState([]);
      useEffect(() => {

        const fetchPlaylistSongData = async () => {
          const data = await fetch("http://localhost:3000/api/playlist_song").then(r => r.json());
          
          const data1 = await fetch("http://localhost:3000/api/song").then(r => r.json());
          
          const playlistdata = await fetch("http://localhost:3000/api/playlist").then(r => r.json());
  
          
          //console.log(data);
          //console.log(data1);
          let newplaylistsong = [];
          for (let i = 0; i < data.length; i++) {
              if (data[i].playlist_id == cur_playlistID) {
                  for (let j = 0; j < data1.length; j++){
                      if (data[i].song_id == data1[j].song_id){
                          newplaylistsong.push({ id: data1[j].song_id, title: data1[j].songname, artist: data1[j].artist});
                      }
                  }
              }
          }
  
          let newplaylistname = [];
          for (let i = 0; i < playlistdata.length; i++) {
            if(playlistdata[i].playlist_id == cur_playlistID){
              newplaylistname.push({name: playlistdata[i].playlistname});
            }
              
          }
  
          setPlaylistName(newplaylistname);
          console.log(newplaylistname);
          setPlaylistSong(newplaylistsong);
          console.log(playlistSong);
      }

        fetchPlaylistSongData();
      }, [])
    

    

  
  return (
    <div>
        <div className="title d-flex align-items-start"><h1 className="inline">{playlist_name[0]?.name}</h1></div>

        <div>
          {
            playlistSong.map(song =>
              <div className='row'>
                <div className='col song'>{song.title}</div>
                <div className='col song'>{song.artist}</div>
              </div>
            )
          }
        </div>



        
    </div>
  )
}

export default Playlistsong
