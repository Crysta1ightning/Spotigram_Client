import { useState } from 'react';
import './Home.scss';
import './App.css';

function Home() {
  const [song, setSong] = useState([
    {id: 0, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
    {id: 1, title: "A song", artist: "li3li3", cover:"images/song1.png"},
    {id: 2, title: "!@#$%^&*(", artist: "li3li3", cover:"images/song.png"},
  ])

  return (
    <div className="home">
      <div class="row" className="story">
        <p class="h1">Story</p>

      </div>
      <div class="row" className="songs">
        <p class="h1 col">早安!</p>
        <div class="col">
          {song.map(music => 
            <div class="card col">
              <img type="button" src={music.cover} class="card-img-top"></img>
                  <p class="song">{music.title}</p>
                  <p class="artist">{music.artist}</p>
            </div>
          )}
        </div>
      </div>
      
      <div class="row" className="songs">
        <p class="h1 col">美好的明天!</p>
        <div class="">
          {song.map(music => 
            <div class="card col-2">
              <img type="button" src={music.cover} class="card-img-top"></img>
                  <p class="song">{music.title}</p>
                  <p class="artist">{music.artist}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
