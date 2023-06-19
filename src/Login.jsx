import { useState, useEffect } from 'react'
import './Login.scss'


import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBInput,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';

function Login() {
    const [error, setError] = useState(false);

    const renderErrorMessage = () => <div className="error">Invalid Username or Password</div>

    const handleLogin = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { username, password } = document.forms[0];

        let response = await fetch("http://localhost:3000/api/user/login/" + username.value + "/" + password.value);
        let data = await response.json();

        if (data.length > 0) {
            // found
            localStorage.setItem('user_id', JSON.stringify(data[0].user_id));
            location.reload();
        } else {
            setError(true);
        }
    };

    const handleRegister = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { username, password } = document.forms[1];

        let response = await (fetch("http://localhost:3000/api/user", {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                encoded_pwd: password.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }))
        let data = await response.json();
        localStorage.setItem('user_id', JSON.stringify(data.user_id));
        location.reload();
    };

    const [tab, setTab] = useState("login");

    const handleTabClick = x => { if (x !== tab) setTab(x); };

    // if (localStorage.getItem("user_id") != null) return (<></>);
    return (
        <MDBModal show={localStorage.getItem("user_id") === null} tabIndex='-1'>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Login In or Sign Up</MDBModalTitle>
                    </MDBModalHeader>
                    <MDBTabs pills justify className='mb-3'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('login')} active={tab === 'login'}>
                                <MDBIcon fa icon='sign-in' className='me-2' /> Log In
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('signup')} active={tab === 'signup'}>
                                <MDBIcon fa icon='user-plus' className='me-2' /> Sign Up
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>
                    <MDBTabsContent>
                        <MDBTabsPane show={tab === 'login'}>
                            <form onSubmit={handleLogin}>
                                <MDBModalBody>
                                    {error && renderErrorMessage()}
                                    <MDBInput className='mb-4' type='text' id='username' label='Username' required />
                                    <MDBInput className='mb-4' type='password' id='password' label='Password' required />
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn type='submit' className='mb-4' block>Log me In!!</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBTabsPane>
                        <MDBTabsPane show={tab === 'signup'}>
                            <form onSubmit={handleRegister}>
                                <MDBModalBody>
                                    {error && renderErrorMessage()}
                                    <MDBInput className='mb-4' type='text' id='username' label='Username' required />
                                    <MDBInput className='mb-4' type='password' id='password' label='Password' required />
                                </MDBModalBody>
                                <MDBModalFooter>
                                    <MDBBtn type='submit' className='mb-4' block>Sign me Up!!</MDBBtn>
                                </MDBModalFooter>
                            </form>
                        </MDBTabsPane>
                    </MDBTabsContent>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}

export default Login
