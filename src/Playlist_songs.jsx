import { useState, useEffect } from 'react';
//import './App.css';
import './Playlist_songs.scss'

function Playlistsong() {
    const [cur_playlistID] = useState(1);
    const [song, setSong] = useState([]);
    const [playlistSong, setPlaylistSong] = useState([
        { id: 0, title: "周杰倫", cover: "images/5.png" },
        { id: 1, title: "成發歌單", cover: "images/6.png" },
        { id: 2, title: "抖音", cover: "images/4.jpg" }
      ])
      useEffect(() => {
        fetchPlaylistSongData();
      }, [])
    
      const fetchPlaylistSongData = async () => {
        let response = await fetch("http://localhost:3000/api/playlist_song");
        let data = await response.json();

        let response1 = await fetch("http://localhost:3000/api/song");
        let data1 = await response1.json();
    
        //console.log(data);
        //console.log(data1);
        let newplaylistsong = [];
        for (let i = 0; i < data.length; i++) {
            if(data[i].playlist_id == cur_playlistID) {
                for (let j=0; j < data1.length; j++){
                    if(data[i].song_id == data1[j].song_id){
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
        <h>播放清單</h>
        <div>
        {
            playlistSong.map(song =>
              <div className="card col-2" key={playlist.id}>
                <a href="/#/playlistsong"><img type="button" src="images/5.png" className="card-img-top"></img></a>
                <p className="title">{playlist.title}</p>
                <p className="artists">{playlist.owners[1]}</p>
              </div>
            )
        }
        </div>

    </div>
    
  )
}

export default Playlistsong
