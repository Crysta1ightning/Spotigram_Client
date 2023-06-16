import { useState } from 'react';
import './Home.scss';
import './App.css';

function Home() {
  const [song, setSong] = useState([
    {id: 0, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
    {id: 1, title: "A song", artist: "li3li3", cover:"images/song1.png"},
    {id: 2, title: "!@#$%^&*(", artist: "li3li3", cover:"images/song.png"},
    {id: 3, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
    {id: 4, title: "A song", artist: "li3li3", cover:"images/song1.png"},

  ])
  const [recommend, setRecommend] = useState([
    {id: 0, title: "你想一想", artist: "li3li3", cover:"images/song1.png"},
    {id: 1, title: "B song", artist: "li3li3", cover:"images/song.png"},
    {id: 2, title: "yo yo", artist: "li3li3", cover:"images/song1.png"},
    {id: 3, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
    {id: 4, title: "A song", artist: "li3li3", cover:"images/song1.png"},
    {id: 5, title: "!@#$%^&*(", artist: "li3li3", cover:"images/song.png"},
    {id: 6, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
    {id: 7, title: "A song", artist: "li3li3", cover:"images/song1.png"},
    {id: 8, title: "!@#$%^&*(", artist: "li3li3", cover:"images/song.png"},
  ])

  return (
    <div>
      <div className="row">
        <p className="h1">Story</p>

      </div>
      <div className="row">
        <p className="h1 row">早安!</p>
        <div className="scrolling-wrapper">
          {song.map(music => 
            <div className="card col-2">
              <img type="button" src={music.cover} className="card-img-top"></img>
                  <p className="song">{music.title}</p>
                  <p className="artist">{music.artist}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="row">
        <p className="h1 row">美好的明天!</p>
        <div className="scrolling-wrapper">
          {recommend.map(music => 
            <div className="card col-2" >
              <img type="button" src={music.cover} className="card-img-top"></img>
                  <p className="card-text song">{music.title}</p>
                  <p className="card-text artist">{music.artist}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
