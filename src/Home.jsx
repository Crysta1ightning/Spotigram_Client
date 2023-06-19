import { useState, useEffect } from 'react';
import moment from 'moment';

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
  useEffect(() => {
    // fetchSongData();
    fetchHomeData();
  }, [])

  const updateStoryIndicator = async () => {
    for (let i = 0; i < story.length; i++) {
      let storyStatus = JSON.parse(localStorage.getItem('story-user'+story[i].id));
      console.log(story[i].id);
      console.log(storyStatus);
      var element = document.getElementById("story-user"+story[i].id)
      if (storyStatus) element.classList.add('visited');
      else element.classList.remove('visited');
    }
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

    response = await fetch("http://localhost:3000/api/friend?user_id=" + this_user_id);
    let friendsdata = await response.json();
    // console.log(friendsdata);
    let friendsForThisUser = [];
    friendsdata.forEach((friend) => {
      if (friend.user1_id != this_user_id) friendsForThisUser.push(friend.user1_id);
      else friendsForThisUser.push(friend.user2_id);
    })

    response = await fetch("http://localhost:3000/api/user");
    let userdata = await response.json();
    // console.log(userdata);
    let newFriends = [{user_id: this_user_id, username: "", pfp: "./images/user"+this_user_id+".png"}]
    userdata.forEach((user) => {
      // console.log(user);
      if (user.user_id == this_user_id) {
        setThisUser(user.username);
        // Let user itself be friend
        newFriends[0].username = user.username;
      }
      else if (friendsForThisUser.includes(user.user_id)) {
        newFriends.push({ user_id: user.user_id, username: user.username, pfp: "./images/user"+user.user_id+".png" })
      }
    })

    // console.log(friendsForThisUser);
    // console.log(newFriends);

    response = await fetch("http://localhost:3000/api/story");
    let storydata = await response.json();

    // console.log(storydata);

    let newstories = [];
    
      newFriends.forEach((user) => {
        // console.log(user);
        for (let i = 0; i < storydata.length; i++) {
        if (storydata[i].user_id == user.user_id) newstories.push({ id: storydata[i].user_id, song_id: storydata[i].song_id, 
                                                                    username: user.username, pfp: user.pfp , time: storydata[i].ts});
      }
    })

    response = await fetch("http://localhost:3000/api/song");
    let songdata = await response.json();

    // console.log(data);
    let newsongs = [];
    let stories = [];
    for (let i = 0; i < songdata.length; i++) {
      newsongs.push({ id: songdata[i].song_id, title: songdata[i].songname, artist: songdata[i].artist, cover: "./images/"+songdata[i].song_id+".png"});
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
    document.querySelector('.story-time').textContent = moment(story[currentStory].time*1000).calendar(); // TODO
    document.querySelector('.story-cover').src = story[currentStory].cover;
    document.querySelector('.story-title').textContent = story[currentStory].title;
    document.querySelector('.instory-pfp').src = story[currentStory].pfp;
    localStorage.setItem('story-user'+story[storyIndex].id, JSON.stringify(1));
    updateStoryIndicator();
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
    localStorage.setItem('story-user'+this_user_id, JSON.stringify(0));
    fetchHomeData();
    updateStoryIndicator();
  }

  return (
    <div>
      <div className="row story-row">
        <p className="h1 mx-4 mt-4">Story</p>
        <div className="story-container">
          {story.map((music, index) =>
            <div className="stories col-xl-1 col-4 text-center">
              <span data-bs-toggle="modal" data-bs-target="#storyModal">
                <img type="button" src={music.pfp} className="img-container mb-2 story-pfp shadow img-fluid rounded-circle" id={"story-user"+music.id} data-bs-toggle="button"
                onError={({currentTarget}) => {currentTarget.src = "./images/user0.jpg"}} onClick={() => { toChangeStory(index) }}></img>
              </span>
              <p className="overflow-hidden">{music.username}</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <p className="h1 row mt-4 ms-4">早安!</p>
        <div className="scrolling-wrapper ms-3">
          {song.map(music =>
            <div className="card col-xl-2">
              <img type="button" src={music.cover} className="card-img-top" onError={({currentTarget}) => {currentTarget.src = "./images/0.jpg"}}></img>
              <p className="song">{music.title}</p>
              <p className="artist">{music.artist}</p>
              <button className="share" onClick={()=>{share(music.id)}}>Share</button>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <p className="h1 row mt-4 ms-4">美好的明天!</p>
        <div className="scrolling-wrapper ms-3">
          {recommend.map(music =>
            <div className="card col-x1-2" >
              <img type="button" src={music.cover} className="card-img-top" onError={({currentTarget}) => {currentTarget.src = "./images/0.jpg"}}></img>
              <p className="card-text song">{music.title}</p>
              <p className="card-text artist">{music.artist}</p>
            </div>
          )}
        </div>
      </div>

      <div className="modal fade" id="storyModal" tabindex="-1" aria-hidden="true">
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
                <div type="button" className="story-prev-btn" onClick={() => {toChangeStory(currentStory-1)}}></div>
                <img type="button" className="story-cover"></img>
                <div type="button" className="story-next-btn" onClick={() => {toChangeStory(currentStory+1)}}></div>
              </div>
              <p className="story-title"></p>
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