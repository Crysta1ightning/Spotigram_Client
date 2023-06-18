import { useState, useEffect } from 'react';
import './Home.scss';
// import './App.css';

function Home() {
  // const [song, setSong] = useState([
  //   {id: 0, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
  //   {id: 1, title: "A song", artist: "li3li3", cover:"images/song1.png"},
  //   {id: 2, title: "!@#$%^&*(", artist: "li3li3", cover:"images/song.png"},
  //   {id: 3, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
  //   {id: 4, title: "A song", artist: "li3li3", cover:"images/song1.png"},
  // ])

  const [song, setSong] = useState([]);

  const [story, setStory] = useState([]);
  // const [story, setStory] = useState([
  //   {id: 0, username: "li3li3", pfp:"images/song1.png"},
  //   {id: 1, username: "li3li3", pfp:"images/song.png"},
  //   {id: 2, username: "li3li3", pfp:"images/song1.png"},
  //   {id: 3, username: "li3li3", pfp:"images/song.png"},
  //   {id: 4, username: "li3li3", pfp:"images/song1.png"},
  //   {id: 5, username: "li3li3", pfp:"images/song.png"},
  //   {id: 6, username: "li3li3", pfp:"images/song.png"},
  //   {id: 7, username: "li3li3", pfp:"images/song1.png"},
  //   {id: 8, username: "li3li3", pfp:"images/song.png"},
  // ]);



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
  useEffect(() => {
    fetchSongData();
    fetchStoryData();
  }, [])

  const fetchSongData = async () => {
    let response = await fetch("http://localhost:3000/api/song");
    let data = await response.json();

    console.log(data);
    let newsongs = [];
    for (let i=0; i<data.length; i++) {
      newsongs.push({id: data[i].song_id, title: data[i].songname, artist: data[i].artist, cover:"images/song.png"});
    }
    setSong(newsongs);
    console.log(newsongs);
  }

  const fetchStoryData = async () => {
    let response = await fetch("http://localhost:3000/api/story");
    let data = await response.json();

    console.log(data);
    let newstorys = [];
    for (let i=0; i<data.length; i++) {
      newstorys.push({id: data[i].story_id, username: data[i].username, pfp:data[i].profile_pic});
    }
    setStory(newstorys);
    console.log(newstorys);
  }



  
  return (
    <div>
      <div className="row">
        <p className="h1">Story</p>
        <div className="story-container">
          {story.map(music => 
            <div className="stories col-1 text-center">
              <img type="button" src={music.pfp} className="story-pfp shadow img-fluid"></img>
                  <p className="">{music.username}</p>
            </div>
          )}
        </div>
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

      <div className='row'>
          <p className='bind'>u can't see me</p>
          <p className='bind'>u can't see me</p>
          <p className='bind'>u can't see me</p>
      </div>


    </div>
  )
}

export default Home
