import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { _Class } from '../REDUX/Actions';
export const Join = (props) => {
    let history = useHistory();
    const dispatch = useDispatch()

    const info = useSelector(state => state.info)
    const db = firebase.firestore();

    const [data, setdata] = useState({})

    const [code, setcode] = useState("")


    useEffect(() => {
        if (info === null) {
            history.push('/login')
        }
        if (props.match.params.code.length === 5)
            db.collection('room').where("code", "==", props.match.params.code).get().then((snap) => {
                console.log("called")
                snap.forEach((doc) => {
                    setdata(doc.data())
                })
            });
    }, [])

    const Join = async () => {
        if (props.match.params.code.length === 5)
            await db.collection('users').doc(info.email).collection('class').add({
                code: props.match.params.code
            })
        else await db.collection('users').doc(info.email).collection('class').add({
            code: code
        })
        dispatch(_Class(null))
        history.push('/')
    }

    return (
        <div>
            {props.match.params.code.length === 5 ?
                <><section>Name : {data.name}</section>
                    <section>Description : {data.desc}</section>
                    <section>Creator : {data.creator}</section>
                    <section><button onClick={Join}>Join Class</button></section>
                </> :
                <>
                    <h3>Enter Code : </h3><input onChange={(e) => setcode(e.target.value)} />
                    <button onClick={Join}>Join Class</button>
                </>}

        </div>
    )
}
