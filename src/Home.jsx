import { useState, useEffect } from 'react';
import moment from 'moment';
import {getAverageRGB} from './storybackcolor.jsx';


import './Home.scss';
// import './App.css';

function Home(props) {
  // const [song, setSong] = useState([
  //   {id: 0, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
  //   {id: 1, title: "A song", artist: "li3li3", cover:"images/song1.png"},
  //   {id: 2, title: "!@#$%^&*(", artist: "li3li3", cover:"images/song.png"},
  //   {id: 3, title: "天是空的", artist: "li3li3", cover:"images/song.png"},
  //   {id: 4, title: "A song", artist: "li3li3", cover:"images/song1.png"},
  // ])

  const [song, setSong] = useState([]);

  const [story, setStory] = useState([]);

  const [thisUser, setThisUser] = useState("");

  const [recommend, setRecommend] = useState([
    { id: 0, title: "你想一想", artist: "li3li3", cover: "images/5.png" },
    { id: 1, title: "B song", artist: "li3li3", cover: "images/6.png" },
    { id: 2, title: "yo yo", artist: "li3li3", cover: "images/5.png" },
    { id: 3, title: "天是空的", artist: "li3li3", cover: "images/5.png" },
    { id: 4, title: "A song", artist: "li3li3", cover: "images/6.png" },
    { id: 5, title: "!@#$%^&*(", artist: "li3li3", cover: "images/5.png" },
    { id: 6, title: "天是空的", artist: "li3li3", cover: "images/6.png" },
    { id: 7, title: "A song", artist: "li3li3", cover: "images/6.png" },
    { id: 8, title: "!@#$%^&*(", artist: "li3li3", cover: "images/5.png" },
  ])

  const [MyplaylistSet, setPlaylistSet] = useState([
    { id: 0, title: "周杰倫", cover: "images/5.png" },
    { id: 1, title: "成發歌單", cover: "images/6.png" },
    { id: 2, title: "抖音", cover: "images/4.jpg" }
  ])

  useEffect(() => {
    // fetchSongData();
    fetchHomeData();
    fetchPlaylistData();
  }, [])

  const updateStoryIndicator = async () => {
    for (let i = 0; i < story.length; i++) {
      let storyStatus = JSON.parse(localStorage.getItem('story-user' + story[i].id));
      console.log(story[i].id);
      console.log(storyStatus);
      var element = document.getElementById("story-user" + story[i].id)
      if (storyStatus) element.classList.add('visited');
      else element.classList.remove('visited');
    }
  }

  const fetchPlaylistData = async () => {
    let response = await fetch("http://localhost:3000/api/playlist");
    let data = await response.json();

    let response1 = await fetch("http://localhost:3000/api/playlist_song");
    let data1 = await response1.json();

    // console.log(data);
    let newplaylist = [];
    for (let i = 0; i < data.length; i++) {
      let covers = [];
      for(let j=0; j< data1.length; j++){
        if(data1[j].playlist_id == data[i].playlist_id){
          covers.push(('./images/'+data1[j].song_id+'.png'));
        }
      }     

      for(let x = covers.length; x < 4; x++) covers.push(('./images/0.png'))
      newplaylist.push({ id: data[i].playlist_id, title: data[i].playlistname, cover: covers});
    
    }
  
    setPlaylistSet(newplaylist);
    console.log(newplaylist);
  }


  // Fetch each friend's id and username for this_user_id
  const fetchHomeData = async () => {
    let this_user_id = JSON.parse(localStorage.getItem('user_id'));
    // this should be from localstorage, after sign in we should store this
    // before calling the rest, maybe make sure the token is valid for this user

    // Refresh Story
    let response = await (fetch("http://localhost:3000/api/story", {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }))

    const friendsdata = await fetch("http://localhost:3000/api/friend?user_id=" + this_user_id).then(r => r.json());
    // console.log(friendsdata);
    let friendsForThisUser = [];
    friendsdata.forEach((friend) => {
      if (friend.user1_id != this_user_id) friendsForThisUser.push(friend.user1_id);
      else friendsForThisUser.push(friend.user2_id);
    })

    response = await fetch("http://localhost:3000/api/user");
    let userdata = await response.json();
    // console.log(userdata);
    let newFriends = [{ user_id: this_user_id, username: "", pfp: "./images/user" + this_user_id + ".png" }]
    userdata.forEach((user) => {
      // console.log(user);
      if (user.user_id == this_user_id) {
        setThisUser(user.username);
        // Let user itself be friend
        newFriends[0].username = user.username;
      }
      else if (friendsForThisUser.includes(user.user_id)) {
        newFriends.push({ user_id: user.user_id, username: user.username, pfp: "./images/user" + user.user_id + ".png" })
      }
    })

    // console.log(friendsForThisUser);
    // console.log(newFriends);

    const storydata = await fetch("http://localhost:3000/api/story").then(r => r.json());

    // console.log(storydata);

    let newstories = [];

    newFriends.forEach((user) => {
      // console.log(user);
      for (let i = 0; i < storydata.length; i++) {
        if (storydata[i].user_id == user.user_id) newstories.push({
          id: storydata[i].user_id, song_id: storydata[i].song_id,
          username: user.username, pfp: user.pfp, time: storydata[i].ts
        });
      }
    })

    const songdata = await fetch("http://localhost:3000/api/song").then(r => r.json());

    // console.log(data);
    let newsongs = [];
    let stories = [];
    for (let i = 0; i < songdata.length; i++) {
      newsongs.push({ id: songdata[i].song_id, title: songdata[i].songname, artist: songdata[i].artist, cover: "./images/" + songdata[i].song_id + ".png" });
    }

    newstories.forEach((user) => {
      for (let i = 0; i < songdata.length; i++) {
        if (songdata[i].song_id == user.song_id) {
          stories.push({
            id: user.id, title: songdata[i].songname, artist: songdata[i].artist,
            cover: newsongs[i].cover, username: user.username, pfp: user.pfp, time: user.time
          })
          break;
        }
      }
    })

    setSong(newsongs);
    console.log(newsongs);
    setStory(stories);
    console.log(stories);
    updateStoryIndicator();
  }

  var currentStory = 0;
  
  const toChangeStory = (storyIndex) => {
    if (storyIndex < 0 || storyIndex >= story.length) {
      // TODO
      console.log(123);
      var modal = bootstrap.Modal.getInstance(document.getElementById('storyModal'));
      modal.hide();
      return;
    }
    currentStory = storyIndex;
    document.querySelector('.story-user').textContent = story[currentStory].username;
    document.querySelector('.story-time').textContent = moment(story[currentStory].time * 1000).calendar(); // TODO
    document.querySelector('.story-cover').src = story[currentStory].cover;
    document.querySelector('.story-title').textContent = story[currentStory].title;
    document.querySelector('.instory-pfp').src = story[currentStory].pfp;
    localStorage.setItem('story-user' + story[storyIndex].id, JSON.stringify(1));
    updateStoryIndicator();
    let rgb = getAverageRGB(document.getElementById('cover'));
    document.querySelector('.story-block').style.background = 'radial-gradient(rgba('+rgb.r+','+rgb.g+','+rgb.b+', 1) 35%,rgba(0,0,0,1) 200%)'
    // console.log(background);
    // console.log(rgb);


  };

  const toChangeSong = (songIndex) => {
    // if (storyIndex < 0 || storyIndex >= story.length) {
    //   // TODO
    //   console.log(123);
    //   var modal = bootstrap.Modal.getInstance(document.getElementById('storyModal'));
    //   modal.hide();
    //   return;
    // }
    let currentSong = songIndex-1;
    // document.querySelector('.story-user').textContent = story[currentSong].username;
    // document.querySelector('.story-time').textContent = moment(story[currentStory].time * 1000).calendar(); // TODO
    document.querySelector('.song-cover').src = song[currentSong].cover;
    document.querySelector('.song-title').textContent = song[currentSong].title;
    // document.querySelector('.insong-pfp').src = story[currentSong].pfp;
    // localStorage.setItem('story-user' + story[storyIndex].id, JSON.stringify(1));
    // updateStoryIndicator();
    let rgb = getAverageRGB(document.getElementById('songcover'));
    document.querySelector('.song-block').style.background = 'radial-gradient(rgba('+rgb.r+','+rgb.g+','+rgb.b+', 1) 35%,rgba(0,0,0,1) 200%)'
    // console.log(background);
    // console.log(rgb);


  };

  const share = async (song_id) => {
    let this_user_id = JSON.parse(localStorage.getItem('user_id'));
    let response = await (fetch("http://localhost:3000/api/story", {
      method: 'POST',
      body: JSON.stringify({
        user_id: this_user_id,
        song_id: song_id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }))
    localStorage.setItem('story-user' + this_user_id, JSON.stringify(0));
    fetchHomeData();
    updateStoryIndicator();
  }

  return (
    <div>
      <div className="row story-row">
        <p className="h1 mx-4 mt-4">Story</p>
        <div className="story-container">
          {story.map((music, index) =>
            <div className="stories col-xl-1 col-4 text-center" key={index}>
              <span data-bs-toggle="modal" data-bs-target="#storyModal">
                <img type="button" src={music.pfp} className={"img-container mb-2 story-pfp shadow img-fluid rounded-circle" + (JSON.parse(localStorage.getItem('story-user' + music.id)) ? " visited" : "")} id={"story-user" + music.id} data-bs-toggle="button"
                  onError={({ currentTarget }) => { currentTarget.src = "./images/user0.png" }} onClick={() => { toChangeStory(index) }}></img>
              </span>
              <p className="overflow-hidden">{music.username}</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <p className="h1 row mt-4 ms-4">推薦歌曲</p>
        <div className="scrolling-wrapper ms-3">
          {song.map(music =>
            <div className="card col-xl-2" type="button" key={music.id} onClick={() => { toChangeSong(music.id) }} data-bs-toggle="modal" data-bs-target="#songModal">
              <img src={music.cover} className="card-img-top" onClick={()=>{
                props.global.song_id = music.id;
                console.log("SET "+music.id)
              }} onError={({ currentTarget }) => { currentTarget.src = "./images/0.png" }}></img>
              <p className="song">{music.title}</p>
              <p className="artist">{music.artist}</p>
              <button className="btn share" onClick={() => { share(music.id) }}>Share</button>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <p className="h1 row mt-4 ms-4">播放清單</p>
        <div className="scrolling-wrapper">
          {MyplaylistSet.slice(0,5).map(playlist =>
              <a className="card col-lg-2 col-7 col-md-5 mt-4 mx-4" key={playlist.id} type="button" href={"/#/playlistsong?pl=" + playlist.id}>
                {/* <img  src={playlist.cover[0]} className="card-img-top" onError={({ currentTarget }) => { currentTarget.src = "./images/0.png" }} ></img> */}
                <div className="" >
                  <div className="row row-cols-2 g-0 card-img-top">
                    <img  src={playlist.cover[0]} className="col playlistcover " onError={({ currentTarget }) => { currentTarget.src = "./images/0.png" }} ></img>
                    <img  src={playlist.cover[1]} className="col playlistcover " onError={({ currentTarget }) => { currentTarget.src = "./images/0.png" }} ></img>
                    <img  src={playlist.cover[2]} className="col playlistcover " onError={({ currentTarget }) => { currentTarget.src = "./images/0.png" }} ></img>
                    <img  src={playlist.cover[3]} className="col playlistcover " onError={({ currentTarget }) => { currentTarget.src = "./images/0.png" }} ></img>

                  </div>
                </div>
                <p className="card-text playlist-title">{playlist.title}</p>&emsp;
              </a>
            )}
        </div>
      </div>

      <div className="modal fade" id="storyModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" width="1500px">
          <div className="container story-block modal-content">
            <div className='d-flex align-items-center justify-content-start mt-3'>
              <img type="button" src="" className="story-pfp instory-pfp shadow img-fluid rounded-circle"></img>
              <div className="container pt-3">
                <p className="story-user"></p>
                <p className="story-time"></p>
              </div>
            </div>
            <div className="story-music">
              <div className='d-flex align-items-center justify-content-center'>
                <div type="button" className="story-prev-btn" onClick={() => { toChangeStory(currentStory - 1) }}></div>
                <img id="cover" type="button" className="story-cover shadow"></img>
                <div type="button" className="story-next-btn" onClick={() => { toChangeStory(currentStory + 1) }}></div>
              </div>
              <p className="story-title"></p>
            </div>

          </div>
        </div>
      </div>

      <div className="modal fade" id="songModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" width="1500px">
          <div className="container song-block modal-content">
            <div className='d-flex align-items-center justify-content-start mt-3'>
              {/* <img type="button" src="" className="song-pfp insong-pfp shadow img-fluid rounded-circle"></img> */}
              <div className="container pt-3">
                {/* <p className="song-user"></p> */}
                {/* <p className="song-time"></p> */}
              </div>
            </div>
            <div className="song-music">
              <div className='d-flex align-items-center justify-content-center'>
                {/* <div type="button" className="story-prev-btn" onClick={() => { toChangeStory(currentStory - 1) }}></div> */}
                <img id="songcover" type="button" className="song-cover shadow"></img>
                {/* <div type="button" className="story-next-btn" onClick={() => { toChangeStory(currentStory + 1) }}></div> */}
              </div>
              <p className="song-title"></p>
            </div>

          </div>
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