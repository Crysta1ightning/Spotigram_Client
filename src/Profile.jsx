import { useState, useEffect } from 'react'
import moment from 'moment';
import './App.css'
import './Profile.scss'


function Profile() {
  let default_userid = JSON.parse(localStorage.getItem('user_id')); // TODO: local storage 
  const [user, setUser] = useState([]);
  const [timeline, setTimeline] = useState([]);
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
      let response0 = await fetch("http://localhost:3000/api/friend?user_id=" + default_userid);
      let friendData = await response0.json();
      let response1 = await fetch("http://localhost:3000/api/user");
      let userData = await response1.json();
      let userFriend = [];

      for (let i = 0; i < friendData.length; i++) {
        let friendId = (friendData[i].user1_id == default_userid ? friendData[i].user2_id : friendData[i].user1_id);
        for (let j = 0; j < userData.length; j++) {
          if (userData[j].user_id == friendId) {
            userFriend.push({id: friendId, name: userData[j].username, pfp: "./images/user"+friendId+".png"});
            break;
          }
        }
      }
      console.log(userFriend);
      setFriend(userFriend);
    }

    fetchFriendData();

    const fetchTimelineData = async () => {
      let response0 = await fetch("http://localhost:3000/api/song");
      let songData = await response0.json();
      let response1 = await fetch("http://localhost:3000/api/timeline");
      let timelineData = await response1.json();
      let timelineFetch = []
      console.log(timelineData.length);
      console.log(songData.length);
      for (let i = 0; i < timelineData.length; i++) {
       let songName, songArtist;
       for (let j = 0; j < songData.length; j++) {
        if (songData[j].song_id === timelineData[i].song_id) {
          songName = songData[j].songname;
          songArtist = songData[j].artist;
        }
       }
       console.log(songName);
       timelineFetch.push({id: timelineData[i].timeline_id, user_id: timelineData[i].user_id, song_id: timelineData[i].song_id, song_name: songName, 
                            song_artist: songArtist, timestamp: timelineData[i].ts, cover: "./images/"+timelineData[i].song_id+".png"});
      }
      console.log(timelineFetch);
      setTimeline(timelineFetch);
    }

    fetchTimelineData();

    


  }, [])

  const logout = () => {
    localStorage.clear();
    location.reload();

  }

    //onError={({currentTarget}) => {currentTarget.src = "./images/0.png"}

  return (
    <div className='profile'>
      
      <div className='row container'>
        <div className='d-flex align-items-end justify-content-start mt-4'>
          <img src={'./images/user'+default_userid+'.png'} className='rounded-circle mainpfp ' ></img> {/*todo*/}
          <div>
            <h1 className='px-4'>{user.username}</h1>
            {/* <h5 className='px-4'>{friend.length} friends</h5> */}
            <button className='logoutbtn' onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <hr className='mt-5' />
      <div className='row mt-5'>
        <div className='col-4'>
          <h2 className='text-left'>Timeline</h2>
          <hr className='mt-3' />
          {
            timeline.filter(song => song.user_id == default_userid).slice(0, 5).map(song =>
              <div className='container'>
                <div className='d-flex align-self-start'>
                  <img src='./images/timeline-line.png' width='50'></img>
                  <div className='song-container mt-3 timeline-songs shadow rounded'>
                    <h5>{moment(song.timestamp*1000).format('HH:mm')}</h5>
                    <div className='d-flex align-self-start mt-4'>
                      <img src={song.cover} height='60' onError={({currentTarget}) => {currentTarget.src = "./images/0.png"}}></img>
                      <div className='container pl-5'>
                        <h4>{song.song_name}</h4>
                        <div className='song-artist'>{song.song_artist}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <div className='col-8'>
          <h2 className='text-left'>Friends</h2>
          <hr className='mt-3' />
          {
            friend.map(user => 
              <div className='container'>
                <div className='d-flex align-items-center'>
                <img className='friendPfp' src={user.pfp}></img>
                  <h4 className='friendName px-2'>{user.name}</h4>
                </div>
                <div className='d-flex mt-2'>

                {
                  timeline.filter(song => song.user_id == user.id).slice(0, 5).map(song =>
                    <table className="friendTable">
                      <tr><img src='./images/timeline-line-horizontal.png' width='130'></img></tr>
                      <tr><div className='timeline-songs'><img className="mt-1" src={song.cover} width='70' onError={({currentTarget}) => {currentTarget.src = "./images/0.png"}}></img>
                      <div className="mt-1">{song.song_name}</div></div></tr>

                    </table>
                  )
                }
                </div>
                <hr className='mt-5' />
              </div>
            )
          }
        </div>
      </div>

      <div className='row'>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
        <p className='bind'>u can't see me</p>
      </div>
    </div>
  )
}

export default Profile