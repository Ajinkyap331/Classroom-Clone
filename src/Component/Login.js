import React from 'react'
import './Login.css'
import { login } from '../firebase/config'
import { useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { _login } from '../REDUX/Actions/index'


// const LocalData = (data) => {
//     localStorage.setItem("email", data.email)
//     localStorage.setItem("photoURL", data.photoURL)
//     localStorage.setItem("name", data.displayName)
// }

export const Login = () => {
    const login_nav = useSelector(state => state.Log)
    let history = useHistory();
    const dispatch = useDispatch()
    const userLogin = () => {
        login().then((data) => {
            console.log(data)
            dispatch(_login())
            history.push("/");
        })
    }

    return (
        <div class="login">
            {login_nav === null ? <></> : <>
                {login_nav === true ? <Redirect to="/" /> : <>
                    <div onClick={userLogin} className="login-button">
                        <img alt="" src="https://img.icons8.com/fluency/50/000000/google-logo.png" />
                        <button>Login With Google</button>
                    </div>
                </>}
            </>}
        </div>
    )
}
