import React from "react";
import { Avatar } from '@mui/material';
import { logout } from "../firebase/config";
import "./Navbar.css";
import { Link } from 'react-router-dom'

export default function Navbar(props) {

  const userLogout = () => {
    logout().then(() => {
      props._logged()
      localStorage.clear()
    })
  }

  return (
    <div className="navbar">
      <div>Your Classroom</div>
      {console.log(props.logged.photoURL)}
      <div className="right">
        <div>Hello {props.logged.displayName}</div>
        <div>
          <Link to={"/create"}>
            <img src="https://img.icons8.com/windows/24/ffffff/create-new.png" alt="" />
            <>Create</>
          </Link>
        </div>
        <div>
          <Link to={`/join/${props.logged.email}`}>
            <img src="https://img.icons8.com/material-outlined/24/ffffff/plus--v1.png" alt="" />
            Join
          </Link>
        </div>
        <div onClick={userLogout}><Avatar src={props.logged.photoURL} alt="" /></div>
      </div>
    </div>
  );
}
