import { useState, useEffect } from 'react'
import './Login.scss'

import { MDBListGroup, MDBListGroupItem, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';

function Login() {
    const [error, setError] = useState(false);
 
    const renderErrorMessage = () => <div className="error">Invalid Username or Password</div>

    const handleLogin = async (event) => {
        //Prevent page reload
        event.preventDefault();
      
        var { username, password } = document.forms[0];
        
        let response = await fetch("http://localhost:3000/api/user/login/"+username.value+"/"+password.value);
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

    if (localStorage.getItem("user_id") != null) return (<></>);
    return (
        <div className="login min-vh-100 min-vw-100 ">
            <div className="form">
                {error && renderErrorMessage()}
                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="username" required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Login"/>
                    </div>
                </form>
            </div>
            <div className="form">
                <form onSubmit={handleRegister}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="username" required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" required />
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
