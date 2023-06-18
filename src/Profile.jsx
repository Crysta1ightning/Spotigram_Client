import { useState, useEffect } from 'react'
import './App.css'
import './Profile.scss'


function Profile() {
  let default_userid = JSON.parse(localStorage.getItem('user_id')); // TODO: local storage 

  const [user, setUser] = useState([]);
  const [timeline, setTimeline] = useState([
    { timestamp: "06/06 22:00", songName: "勳歌的歌曲 1", artist: "li3" },
    { timestamp: "06/06 22:10", songName: "勳歌的歌曲 2", artist: "kk4944" },
    { timestamp: "06/06 22:30", songName: "勳歌的歌曲 3", artist: "li3" },
    { timestamp: "06/06 22:45", songName: "勳歌的歌曲 4", artist: "kk4944" },
    { timestamp: "06/06 22:50", songName: "勳歌的歌曲 5", artist: "li3" },
    { timestamp: "06/06 23:00", songName: "勳歌的歌曲 6", artist: "kk4944" },
  ]);
  const [friend, setFriend] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      let response = await fetch("http://localhost:3000/api/user");
      let data = await response.json();

      for (let i = 0; i < data.length; i++) {
        if (data[i].user_id === default_userid) {
          setUser(data[i]);
          break;
        }
      }
    }

    fetchUserData();

    const fetchFriendData = async () => {
      let response = await fetch("http://localhost:3000/api/friend?user_id=" + default_userid);
      let data = await response.json();
      let userFriend = [];
      console.log(userFriend);
      for (let i = 0; i < data.length; i++) {
        userFriend.push({ id: (data[i].user1_id == default_userid ? data[i].user2_id : data[i].user1_id) });
      }
      console.log(userFriend);
      setFriend(userFriend);
    }

    fetchFriendData();

    const fetchTimelineData = async () => {
      let response = await fetch("http://localhost:3000/api/timeline");
      let data = await response.json();
      let timelineData = [];
      for (let i = 0; i < data.length; i++) {
       timelineData.push({id: data[i].id, user_id: data[i].user_id, song_id: data[i].song_id, timestamp: data[i].timestamp});
      }
      console.log(timelineData);
      setTimeline(timelineData);
    }

    fetchTimelineData();

  }, [])
  const logout = () => {
    localStorage.clear();
    location.reload();

  }

  return (
    <div className='profile'>
      <div className='container'>
        <div className='d-flex align-items-end justify-content-start mt-4'>
          <img src='./images/profile.png' className='rounded-circle' width='150'></img>
          <div>
            <h1 className='px-4'>{user.username}</h1>
            <h5 className='px-4'>{friend.length} friends</h5>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <hr className='mt-5' />
      <div className='container mt-5'>
        <div className='col'>
          <h2 className='text-left'>Timeline</h2>
          <div className='container'>
            <hr className='mt-3' />
            {
              timeline.map(song =>
                <div className='container'>
                  <div className='d-flex align-self-start'>
                    <img src='./images/timeline-line.png' width='50'></img>
                    <div className='song-container mt-3 timeline-songs shadow rounded'>
                      <h5>{song.timestamp}</h5>
                      <div className='d-flex align-self-start mt-4'>
                        <img src='./images/1.png' height='60'></img>
                        <div className='container pl-5'>
                          <h4>{song.songName}</h4>
                          <h5>{song.artist}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile