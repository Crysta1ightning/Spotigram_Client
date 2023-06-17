import { useState, useEffect } from 'react';
import './Showcase.scss';
import './App.css';

function Showcase() {
  const [songs, setSongs] = useState([]);
  const [thisUser, setThisUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSongsData();
    fetchFriendsData();
    setLoading(false);
  }, [])

  const fetchSongsData = async () => {
    let response = await fetch("http://localhost:3000/api/song");
    let data = await response.json();

    // console.log(data);
    let newsongs = [];
    for (let i=0; i<data.length; i++) {
      newsongs.push({id: data[i].song_id, title: data[i].songname, artist: data[i].artist});
    }
    setSongs(newsongs);
    // console.log(newsongs);
  }


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
            newFriends.push({user_id: user.user_id, username: user.username})
        }
    })
    setFriends(newFriends);
    // console.log(friendsForThisUser);
    // console.log(newFriends);
  }
  if (loading) return (
    <div className="Showcase">
    <div className="row">
        <h1>Loading...</h1>
      </div>
    </div>
  )
  return (
    <div className="Showcase">
      <div className="row">
        <h1>Showcase</h1>
      </div>
      <div className="row">
        <h2>Songs</h2>
          {songs.map(music => 
            <div className="card col">
                <p className="song">{music.title}</p>
                <p className="artist">{music.artist}</p>
            </div>
          )}
      </div>
      <div className="row">
        <h2>Friends for {thisUser}</h2>
          {friends.map(friend => 
            <div className="card col">
                <p className="song">{friend.username}</p>
                {/* <p className="artist">{friend.artist}</p> */}
            </div>
          )}
      </div>
    </div>
  )
}

export default Showcase
