import { useState } from 'react';
import './App.css';
import './Playlist.css'

function App() {
  const [count, setCount] = useState(0);
  const [ShareplaylistSet] = useState([
    {id:0, title: "周杰倫", owners:["li3", "Cody"] },
    {id:1, title: "成發歌單", owners:["li3", "Cody"]},
    {id:2, title: "抖音", owners:["li3", "Cody"]},
    {id:3, title: "周杰倫", owners:["li3", "Cody"] },
    {id:4, title: "成發歌單", owners:["li3", "Cody"]},
    {id:5, title: "抖音", owners:["li3", "Cody"]}

  ])
  const [MyplaylistSet] = useState([
    {id:0, title: "周杰倫", owner:"kk4944" },
    {id:1, title: "成發歌單", owner:"kk4944"},
    {id:2, title: "抖音", owners:"kk4944"}

  ])

  return (
    <div>
      <div class="title d-flex align-items-start"><h1 class="inline col-2">播放清單</h1></div>

        <div> 
          <p class="title col-3">個人播放清單</p>
          <div className="playlistSet" class="row">
          {
            MyplaylistSet.map(playlist=> 
              <div className="playlist inline col-2">
                <img type="button" src="images/song.png" class="card-img-top" alt="..."></img>
                <p className="inline">{playlist.title}</p>&emsp;
              </div>
            )
          }
          </div>
        </div>

        <div>
          <p class="title col-3">共享播放清單</p>
          <div className="playlistSet" class="row">
          {
            ShareplaylistSet.map(playlist=> 
              <div className="playlist inline col-2">
                <img type="button" src="images/song.png" class="card-img-top" alt="..."></img>
                <p className="inline">{playlist.title}</p><br></br>
                <p className="inline">with&emsp;{playlist.owners[0]}, {playlist.owners[1]}</p>
              </div>
            )
          }
          </div>
        </div>
      



    </div>
  )
}

export default App
