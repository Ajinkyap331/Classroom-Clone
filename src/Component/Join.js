import React, { useState } from 'react'
import firebase from 'firebase'
export const Join = (props) => {

    const db = firebase.firestore();

    const [data, setdata] = useState({})
    db.collection('room').where("code", "==", props.match.params.code).get().then((snap) => {
        snap.forEach((doc) => {
            setdata(doc.data())
        })
    });

    const Join = () => {
        const data = {
            code: props.match.params.code
        }
        db.collection('users').doc(props.logged.email).collection('class').add(data)
    }

    return (
        <div>
            <section>Name : {data.name}</section>
            <section>Description : {data.desc}</section>
            <section>Creator : {data.creator}</section>
            <section><button onClick={Join}>Join Class</button></section>
        </div>
    )
}
