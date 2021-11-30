import React from "react";
import { Avatar } from '@mui/material';
import { logout } from "../firebase/config";
import "./Navbar.css";
import { Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { _Data, _logout, _Class } from '../REDUX/Actions/index'



export default function Navbar() {

  const info = useSelector(state => state.info)
  const login_nav = useSelector(state => state.Log)
  const dispatch = useDispatch()
  let history = useHistory()
  const userLogout = () => {
    logout().then(() => {
      dispatch(_logout())
      dispatch(_Data([]))
      dispatch(_Class(null))
    })
  }

  return (
    <div className="navbar">
      {console.log(login_nav)}
      {
        login_nav === true
          ?
          <>
            <div className="logo" onClick={() => { history.push('/') }}>
              <div><img alt="" src="https://img.icons8.com/nolan/48/google-classroom.png" /></div>
              <section>My Classroom</section>
            </div>
            <div className="right-nav">
              <div>Hello {info.displayName.split(" ")[0]}</div>
              <div className="avatar-nav" ><Avatar src={info.photoURL} alt="" /></div>
              <div className="button-nav">
                <button onClick={userLogout} >Logout</button>
              </div>
            </div>
          </>
          :
          <Redirect to="/login" />
      }

    </div>
  );
}
