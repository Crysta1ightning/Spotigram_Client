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
            <MDBTabs pills className='mb-2 d-flex justify-content-center align-content-center'>
                <MDBTabsItem>
                    <MDBTabsLink className = 'tab text-capitalize' onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Friends
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink className = 'tab text-capitalize' onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Radio
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <MDBListGroup className='text-center'>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/profile.png' className='img-fluid rounded-circle' width={45} />friend1
                        </MDBListGroupItem>
                        <div class="horizontal-line"></div>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/profile.png' className='img-fluid rounded-circle' width={45} />friend2
                        </MDBListGroupItem>
                        <div class="horizontal-line"></div>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/profile.png' className='img-fluid rounded-circle' width={45} />friend3
                        </MDBListGroupItem>
                        <div class="horizontal-line"></div>
                        <MDBListGroupItem tag={NavLink} className='bar text-white d-flex justify-content-between align-content-center' noBorders>
                            <img src='./images/profile.png' className='img-fluid rounded-circle' width={45} />friend4
                        </MDBListGroupItem>
                        <div class="horizontal-line"></div>
                    </MDBListGroup></MDBTabsPane>
                <MDBTabsPane show={justifyActive === 'tab2'}>
                </MDBTabsPane>
            </MDBTabsContent>

        </div>
    )
}

export default Rightsidebar