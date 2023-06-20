import { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
// import './App.css'
import './Sidebar.scss'

import {
  MDBListGroup,
  MDBListGroupItem,
  MDBNavbarLink,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

function Sidebar() {

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  let default_userid = JSON.parse(localStorage.getItem('user_id')); // TODO: local storage 

  useEffect(() => {
    const fetchUsersData = async () => {
        const data = await fetch("http://localhost:3000/api/user").then(r => r.json());

        for (let i = 0; i < data.length; i++) {
            if (data[i].user_id === default_userid) {
                setUsers(data[i]);
                break;
            }
        }
    }

    fetchUsersData();

    const fetchFriendsData = async () => {
        const friendsData = await fetch("http://localhost:3000/api/friend?user_id=" + default_userid).then(r => r.json());
        const usersData = await fetch("http://localhost:3000/api/user").then(r => r.json());
        let userFriends = [];

        for (let i = 0; i < friendsData.length; i++) {
            const friendId = (friendsData[i].user1_id == default_userid ? friendsData[i].user2_id : friendsData[i].user1_id);
            for (let j = 0; j < usersData.length; j++) {
                if (usersData[j].user_id == friendId) {
                    userFriends.push({ id: friendId, name: usersData[j].username, pfp: "./images/user" + friendId + ".png" });
                    break;
                }
            }
        }
        console.log(userFriends);
        setFriends(userFriends);
    }

    fetchFriendsData();
}, [])

  // if (localStorage.getItem("user_id") == null) return (<></>)
  return (
    <div className="sidebar-container min-vh-100 ">
      <img src='./images/spotigram_title.png' width='150rem' className='mt-3'></img>
      <MDBListGroup className='text-center'>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/" action noBorders>
          <MDBIcon fas icon='home ' /><span className='d-none d-lg-flex'>Home</span>
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/profile" action noBorders>
          <MDBIcon fas icon='user-circle' /><span className='d-none d-lg-flex'>Profile</span>
        </MDBListGroupItem>
        <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/playlist" action noBorders>
          <MDBIcon fas icon='bars' /><span className='d-none d-lg-flex'>Playlists</span>
        </MDBListGroupItem>
        {/* <MDBListGroupItem tag={NavLink} className='bar text-white d-lg-flex justify-content-between align-items-center' to="/radio" action noBorders>
          <MDBIcon fas icon='broadcast-tower' /><span className='d-none d-lg-flex'>Your radio</span>
        </MDBListGroupItem> */}
        {/* <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-items-center' to="/showcase" action noBorders>
          <MDBIcon fas icon='music' />Showcase
        </MDBListGroupItem> */}
      </MDBListGroup>
        <br />
      <p className="text-center mt-5">Friends' Radio</p>
      <MDBListGroup className='friend-block'>
        {
          friends.map((friend) => 
          <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
            <img src={friend.pfp} className='img-fluid rounded-circle' width={50} />
            <div className='col px-3'>
              <div className='friend-name text-right'>{friend.name}</div>
              <div className='join-label text-right'>→ Join Now</div>
            </div>
          </MDBListGroupItem>
          ) 
        }
        
      </MDBListGroup>

    </div>
  )
}

export default Sidebar
