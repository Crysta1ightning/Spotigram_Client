import { useState, useEffect } from 'react';
//import './App.css';
import './Playlist_songs.scss'

function Playlistsong() {
    const [cur_playlistID] = useState(2);
    const [playlist_name, setPlaylistName] = useState(); 
    const [song, setSong] = useState([]);
    const [playlistSong, setPlaylistSong] = useState([
        { id: 0, title: "周杰倫", cover: "images/5.png" },
        { id: 1, title: "成發歌單", cover: "images/6.png" },
        { id: 2, title: "抖音", cover: "images/4.jpg" }
      ])
      useEffect(() => {
        fetchPlaylistSongData();
        fetchPlaylistName();
      }, [])
    
      const fetchPlaylistName = async () => {
        const data = await fetch("http://localhost:3000/api/playlist").then(r => r.json());

        //console.log(data);
        let newplaylistname = [];
        for (let i = 0; i < data.length; i++) {
          if(data[i].playlist_id == cur_playlistID){
            newplaylistname.push({name: data[i].playlistname});
          }
            
        }

        setPlaylistName(newplaylistname);
        console.log(newplaylistname);
      } 
    
      const fetchPlaylistSongData = async () => {
        const data = await fetch("http://localhost:3000/api/playlist_song").then(r => r.json());
        
        const data1 = await fetch("http://localhost:3000/api/song").then(r => r.json());
        
        
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
        
        setPlaylistSong(newplaylistsong);
        console.log(newplaylistsong);
    }
  
  return (
    <div>
        <div>{playlist_name[0].name}</div>
        <div>{playlistSong[0].title}</div>
        <div>{playlistSong[1].title}</div>


        
    </div>
  )
}

export default Playlistsong
