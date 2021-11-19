import React, { useState } from 'react'
import './CreateJoin.css'
import firebase from 'firebase'
import { useSelector, useDispatch } from 'react-redux'
import { _Class } from '../REDUX/Actions';
import { useHistory } from 'react-router-dom'
export const Create = () => {

    const db = firebase.firestore();
    let history = useHistory()
    const code = Math.random().toString(36).substr(2, 5)

    const info = useSelector(state => state.info)
    const [create, setcreate] = useState(false)
    const [name, setname] = useState("")
    const [desc, setdesc] = useState("")
    const [fcode, setfcode] = useState("")

    const createClass = () => {
        const data = {
            code: code,
            name: name,
            desc: desc,
            creator: info.displayName,
            photo: info.photoURL
        }
        console.log(data)
        setfcode(code)
        db.collection('room').add(data)
        setcreate(true)
        
    }

    return (
        <div className="create">
            <div>
                <section>Name : <input onChange={(text) => { setcreate(false); setname(text.target.value) }} /></section>
                <section>Description : <input onChange={(text) => { setcreate(false); setdesc(text.target.value) }} /></section>
                <section>Creator : {info.displayName}</section>
                <section><button onClick={createClass}>Create Class</button></section>
                {create !== false ? <>
                    <section>Code : {fcode}</section>
                    <section>Link : <a href={`http://localhost:3000/join/${fcode}`} rel="noreferrer">{`http://localhost:3000/join/${fcode}`}</a> </section>
                </> : <></>}

            </div>
        </div>
    )
}
