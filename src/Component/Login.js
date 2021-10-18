import React from 'react'
import './Login.css'
import { login } from '../firebase/config'
import { useHistory } from "react-router-dom";


const LocalData = (data) => {
    localStorage.setItem("email", data.email)
    localStorage.setItem("photoURL", data.photoURL)
    localStorage.setItem("name", data.displayName)
}


export const Login = (props) => {
    let history = useHistory();
    const userLogin = () => {
        login().then((data) => {
            props._logged(data)
            console.log(data)
            LocalData(data)
            history.push("/");
        })
    }

    return (
        <div class="login">
            <div>
                <button onClick={userLogin}>Login With Google</button>
            </div>
        </div>
    )
}
