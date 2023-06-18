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

  const [thisUser, setThisUser] = useState("");

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
    fetchFriendsData();
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

  // Fetch each friend's id and username for this_user_id
  const fetchFriendsData = async () => {
    let this_user_id = 1; // assume user_id = 1;
    // this should be from localstorage, after sign in we should store this
    // before calling the rest, maybe make sure the token is valid for this user

    let response = await fetch("http://localhost:3000/api/friend?user_id=" + this_user_id);
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
    let newFriends = []
    userdata.forEach((user) => {
        // console.log(user);
        if (user.user_id == this_user_id) setThisUser(user.username);
        else if (friendsForThisUser.includes(user.user_id)) {
            newFriends.push({user_id: user.user_id, username: user.username, pfp:user.profile_pic})
        }
    })
    // console.log(friendsForThisUser);
    // console.log(newFriends);

    response = await fetch("http://localhost:3000/api/story");
    let storydata = await response.json();

    console.log(storydata);
    
    let newstorys = [];
    for (let i=0; i<storydata.length; i++) {
      newFriends.forEach((user) => {
        console.log(user);
        if(storydata[i].user_id == user.user_id) newstorys.push({id: storydata[i].user_id, story: storydata[i].song_id, username: user.username, pfp: user.pfp});
      })
    }
    
    setStory(newstorys);
    console.log(newstorys);
  }

  var currentStory = 0;

  const toChangeStory = (storyIndex) => {
    currentStory = storyIndex;
    document.querySelector('#storyid').textContent = "story index: " + currentStory;
  };

  return (
    <div>
      <div className="row">
        <p className="h1">Story</p>
        <div className="story-container">
          {story.map((music, index) => 
            <div className="stories col-1 text-center">
              <img type="button" src={music.pfp} className="story-pfp shadow img-fluid rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {toChangeStory(index)}}></img>
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

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" width="1500px">
          <div class="modal-content">
            <h1 id="storyid"></h1>
            <></>
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
