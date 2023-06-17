import { useState, useEffect } from 'react'
// import './App.css'

function Profile() {

  let default_userid = 1; // TODO: local storage 

  const [user, setUser] = useState([]);
  const [timeline, setTimeline] = useState([
    {timestamp: "06/06 22:00", songName: "勳歌的歌曲 1", artist: "li3"},
    {timestamp: "06/06 22:10", songName: "勳歌的歌曲 2", artist: "kk4944"},
    {timestamp: "06/06 22:30", songName: "勳歌的歌曲 3", artist: "li3"},
    {timestamp: "06/06 22:45", songName: "勳歌的歌曲 4", artist: "kk4944"},
    {timestamp: "06/06 22:50", songName: "勳歌的歌曲 5", artist: "li3"},
    {timestamp: "06/06 23:00", songName: "勳歌的歌曲 6", artist: "kk4944"},
  ]);
  

  useEffect(() => {
    fetchUserData();
    // fetchTimelineData();
  }, [])

  const fetchUserData = async () => {
    let response = await fetch("http://localhost:3000/api/user");
    let data = await response.json();

    for (let i=0; i<data.length; i++) {
      if (data[i].user_id === default_userid) {
        setUser(data[i]);
        break;
      }
    }
    console.log(user);
  }

  return (
    <>
      <div className='container'>
        <div className='d-flex align-items-end justify-content-start mt-4'>
          <img src='./images/profile.png' className='rounded-circle' width='150'></img>
          <div>
            <h1 className='px-4'>{user.username}</h1>
          </div>
        </div>
      </div>
      <hr className='mt-5'/>
      <div className='container mt-5'>
        <div className='col'>
          <h2 className='text-left'>Timeline</h2>
          <div className='container'>
          <hr className='mt-3'/>
          {
            timeline.map(song => 
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
