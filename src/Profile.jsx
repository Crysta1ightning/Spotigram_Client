import { useState } from 'react'
// import './App.css'

function Profile() {
  const [count, setCount] = useState(0)
  const [songRadio, setSongRadio] = useState([
    {timestamp: "06/06 22:00", songName: "勳歌的歌曲 1", artist: "li3"},
    {timestamp: "06/06 22:10", songName: "勳歌的歌曲 2", artist: "kk4944"},
    {timestamp: "06/06 22:30", songName: "勳歌的歌曲 3", artist: "li3"},
    {timestamp: "06/06 22:45", songName: "勳歌的歌曲 4", artist: "kk4944"},
    {timestamp: "06/06 22:50", songName: "勳歌的歌曲 5", artist: "li3"},
    {timestamp: "06/06 23:00", songName: "勳歌的歌曲 6", artist: "kk4944"},
  ])

  return (
    <>
      <div class='container'>
        <div class='d-flex align-items-end justify-content-start mt-4'>
          <img src='./images/profile.png' class='rounded-circle' width='150'></img>
          <div>
            <h1 class='px-4'>Bill Lin</h1>
            <h4 class='px-4'>llshang</h4>
          </div>
        </div>
      </div>
      <hr class='mt-5'/>
      <div class='container mt-5'>
        <div class='col'>
          <h2 class='text-left'>Timeline</h2>
          <div class='container'>
          <hr class='mt-3'/>
          {
            songRadio.map(song => 
                <div class='container'>
                  <div class='d-flex align-self-start'>
                    <img src='./images/song.png' height='80'></img>
                    <div class='container px-4'>
                      <h5>{song.timestamp}</h5>
                      <h3>{song.songName}</h3>
                      <h4>{song.songName}</h4>
                    </div>
                    
                  </div>
                  <hr class='mt-3'/>
                </div>
            )
          }
          </div>
        </div>
      </div>

    </>
  )
}

export default Profile
