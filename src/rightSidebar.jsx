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
    MDBBtn
} from 'mdb-react-ui-kit';

function Rightsidebar() {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    
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
                    <MDBListGroup>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/3.jpg' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/4.jpg' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/6.png' className='img-fluid rounded' width={45} />
                        </MDBListGroupItem>
                    </MDBListGroup>
                    <p className="text-center">Radio Rank List</p>
                    <MDBListGroup>
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