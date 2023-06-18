import { useState, useEffect } from 'react'
import './Login.scss'

import { MDBListGroup, MDBListGroupItem, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';

function Login() {
  const login = () => {
    localStorage.setItem('user_id', JSON.stringify(1));
    location.reload();
  }

  if (localStorage.getItem("user_id") != null) return (<></>);
  return (
    <div className="login min-vh-100 min-vw-100 ">
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
