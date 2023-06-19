import { useState, useEffect } from 'react';
//import './App.css';
import './Playlist.scss'

function Playlist() {
  const [ShareplaylistSet] = useState([
    { id: 0, title: "周杰倫", owners: ["li3", "Cody"] },
    { id: 1, title: "成發歌單", owners: ["li3", "Cody"] },
    { id: 2, title: "抖音", owners: ["li3", "Cody"] },
    { id: 3, title: "周杰倫", owners: ["li3", "Cody"] },
    { id: 4, title: "成發歌單", owners: ["li3", "Cody"] },
    { id: 5, title: "抖音", owners: ["li3", "Cody"] }
  ])
  //const [MyplaylistSet] = useState([
  //  {id:0, title: "周杰倫", cover:"images/song1.png"},
  //  {id:1, title: "成發歌單", cover:"images/song1.png"},
  //  {id:2, title: "抖音", cover:"images/song1.png"}
  //
  //])

  const [MyplaylistSet, setPlaylistSet] = useState([
    { id: 0, title: "周杰倫", cover: "images/5.png" },
    { id: 1, title: "成發歌單", cover: "images/6.png" },
    { id: 2, title: "抖音", cover: "images/4.jpg" }
  ])


  useEffect(() => {
    fetchPlaylistData();
  }, [])
 


  const fetchPlaylistData = async () => {
    let response = await fetch("http://localhost:3000/api/playlist");
    let data = await response.json();

    let response1 = await fetch("http://localhost:3000/api/playlist_song");
    let data1 = await response1.json();

    console.log(data);
    let newplaylist = [];
    for (let i = 0; i < data.length; i++) {
      for(let j=0; j< data1.length; j++){
        if(data1[j].playlist_id == data[i].playlist_id){
          newplaylist.push({ id: data[i].playlist_id, title: data[i].playlistname, cover: './images/'+data1[j].song_id+'.png' });
          break;
        }
      }     
    }
  
    setPlaylistSet(newplaylist);
    console.log(newplaylist);
  }

  return (
    <div>
      <div className="title d-flex align-items-start"><h1 className="inline">播放清單</h1></div>

      <div className="personalList">
        <p class="subtitle">個人播放清單</p>
        <div className="scrolling-wrapper">
          {
            MyplaylistSet.map(playlist =>
              <div className="card col-2" key={playlist.id}>
                <a href={"/#/playlistsong?pl=" + playlist.id}><img type="button" src={playlist.cover} className="card-img-top"></img></a>
                <p className="card-text playlist-title">{playlist.title}</p>&emsp;
              </div>
            )
          }
        </div>
      </div>



      <div className='row'>
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

export default Playlist
