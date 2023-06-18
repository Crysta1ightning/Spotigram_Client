import { useState, useEffect } from 'react';
//import './App.css';
import './Playlist.scss'

function App() {
  const [count, setCount] = useState(0);
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
    { id: 0, title: "周杰倫", cover: "images/song1.png" },
    { id: 1, title: "成發歌單", cover: "images/song1.png" },
    { id: 2, title: "抖音", cover: "images/song1.png" }

  ])
  useEffect(() => {
    fetchPlaylistData();
  }, [])

  const fetchPlaylistData = async () => {
    let response = await fetch("http://localhost:3000/api/playlist");
    let data = await response.json();

    console.log(data);
    let newplaylist = [];
    for (let i = 0; i < data.length; i++) {
      newplaylist.push({ id: data[i].playlist_id, title: data[i].playlistname, cover: "images/song.png" });
    }
    setPlaylistSet(newplaylist);
    console.log(newplaylist);
  }

  return (
    <div>
      <div class="title d-flex align-items-start"><h1 class="inline">播放清單</h1></div>

      <div className="row">
        <p class="subtitle inline">個人播放清單</p>
        <div className="scrolling-wrapper">
          {
            MyplaylistSet.map(playlist =>
              <div className="card col-2">
                <img type="button" src={playlist.cover} className="card-img-top"></img>
                <p className="card-text playlist-title">{playlist.title}</p>&emsp;
              </div>
            )
          }
        </div>
      </div>

      <div className="row">
        <p class="subtitle inline">共享播放清單</p>
        <div className="scrolling-wrapper">
          {
            ShareplaylistSet.map(playlist =>
              <div className="card col-2">
                <img type="button" src="images/song1.png" class="card-img-top"></img>
                <p className="card-text playlist-title">{playlist.title}</p>
                <p className="card-text playlist-owners">with&emsp;{playlist.owners[0]}, {playlist.owners[1]}</p>
              </div>
            )
          }
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

export default App
