import { useState } from 'react';
import './App.css';
import './Playlist.css'

function App() {
  const [count, setCount] = useState(0);
  const [playlistSet] = useState([
    {id:0, title: "周杰倫", owners:["li3", "kk4944"] },
    {id:1, title: "成發歌單", owners:["li4", "kk3933"]},
    {id:2, title: "抖音", owners:["li5", "kk5955"]}

  ])

  return (
    <div>
      <h1 class="col-2 d-inline-flex">播放清單</h1>

        <div> 
          <h1>個人播放清單</h1>
          <div className="playlistSet" class="row">
          {
            playlistSet.map(playlist=> 
              <div className="playlist inline col-2">
                <img type="button" src="images/song.png" class="card-img-top" alt="..."></img>
                <p className="inline">{playlist.title}</p>&emsp;
                <p className="inline">{playlist.owners[0]}, {playlist.owners[1]}</p>
              </div>
            )
          }
          </div>
        </div>

        <div>
          <h1>朋友播放清單</h1>
          <div className="playlistSet" class="row">
          {
            playlistSet.map(playlist=> 
              <div className="playlist inline col-2">
                <img type="button" src="images/song.png" class="card-img-top" alt="..."></img>
                <p className="inline">{playlist.title}</p>&emsp;
                <p className="inline">{playlist.owners[0]}, {playlist.owners[1]}</p>
              </div>
            )
          }
          </div>
        </div>
      



    </div>
  )
}

export default App
