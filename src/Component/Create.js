import React, { useState } from 'react'
import './CreateJoin.css'
import firebase from 'firebase'
export const Create = (props) => {

    const db = firebase.firestore();

    const code = Math.random().toString(36).substr(2, 5)

    const [create, setcreate] = useState(false)
    const [name, setname] = useState("")
    const [desc, setdesc] = useState("")
    const [fcode, setfcode] = useState("")

    const createClass = () => {
        const data = {
            code: code,
            name: name,
            desc: desc,
            creator: props.logged.displayName,
            photo: props.logged.photoURL
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
                <section>Creator : {props.logged.displayName}</section>
                <section><button onClick={createClass}>Create Class</button></section>
                {create !== false ? <>
                    <section>Code : {fcode}</section>
                    <section>Link : <a href={`http://localhost:3000/join/${fcode}`} target="_blank" rel="noreferrer">{`http://localhost:3000/join/${fcode}`}</a> </section>
                </> : <></>}

            </div>
        </div>
    )
}
