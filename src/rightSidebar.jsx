import { useState } from 'react';
import { NavLink } from "react-router-dom";

import './rightSidebar.scss';

import {
    MDBListGroup,
    MDBListGroupItem,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const handlePfpErrored = (img, id) => {
    img.oneerror = null;
    // story.forEach((story) => {
    //   if(story.id == id) story.pfp = "./images/user"+id+".png";
    // })
    if (id) img.src = "./images/user" + id + ".png";
};

function Rightsidebar() {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    let default_userid = JSON.parse(localStorage.getItem('user_id')); // TODO: local storage 

    const [user, setUser] = useState([]);
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
                        userFriend.push({ id: friendId, name: userData[j].username, pfp: "./images/user" + friendId + ".png" });
                        break;
                    }
                }
            }
            console.log(userFriend);
            setFriend(userFriend);
        }

        fetchFriendData();
    }, [])

    if (localStorage.getItem("user_id") == null) return (<></>);
    return (
        <div className='sidebar-container min-vh-100'>
            <MDBTabs pills justify className='mb-2 d-flex'>
                <MDBTabsItem>
                    <MDBTabsLink className='tab text-capitalize' onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Friends
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink className='tab text-capitalize' onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Radio
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <MDBListGroup className='text-center'>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/user1.png' className='img-fluid rounded-circle' width={45} />friend1
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/user1.png' className='img-fluid rounded-circle' width={45} />friend2
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/user1.png' className='img-fluid rounded-circle' width={45} />friend3
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/user1.png' className='img-fluid rounded-circle' width={45} />friend4
                        </MDBListGroupItem>
                    </MDBListGroup></MDBTabsPane>
                <MDBTabsPane show={justifyActive === 'tab2'} className='text-center'>
                    <MDBBtn block className='btn text-white text-capitalize' color='tertiary' style={{ backgroundColor: '#454545' }} size='lg' href='/#/radio'>Host my Radio +</MDBBtn>
                    <p className="text-center">Friends' Radio</p>
                    <MDBListGroup className='t2'>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/3.png' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/4.png' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/6.png' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                    </MDBListGroup >
                    <p className="text-center">Radio Rank List</p>
                    <MDBListGroup className='t2'>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/1.png' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/2.png' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/5.png' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                    </MDBListGroup>
                </MDBTabsPane>
            </MDBTabsContent>

        </div>
    )
}

export default Rightsidebar