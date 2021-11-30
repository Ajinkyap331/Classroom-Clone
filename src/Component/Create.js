import React, { useState } from 'react'
import './CreateJoin.css'
import { useSelector, useDispatch } from 'react-redux'
import Image from '../Images/create.png'
import { logout, db } from '../firebase/config';
import { useHistory } from 'react-router';

export const Create = () => {

    const code = Math.random().toString(36).substr(2, 5)

    const info = useSelector(state => state.info)
    const [create, setcreate] = useState(false)
    const [name, setname] = useState("")
    const [desc, setdesc] = useState("")
    const [fcode, setfcode] = useState("")
    let history = useHistory();

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
        if (name.length > 3 && desc.name > 3) {
            setcreate(true)
        }
        else
            alert("Name or Description Length cannot be less than 3")


    }


    return (
        <>
            <div className="navbar">
                <div className="logo" onClick={() => { history.push('/') }}>
                    <div><img alt="" src="https://img.icons8.com/nolan/48/google-classroom.png" /></div>
                    <section>My Classroom</section>
                </div>
            </div>
            <div className="create">
                <section>
                    <div className="left-main">
                        <img alt="" src={Image}></img>
                    </div>
                    <div className='right'>
                        <nav className='create-heading'>CREATE YOUR CLASSROOM</nav>
                        <div>
                            <section>Name </section>
                            <section> <input onChange={(text) => { setcreate(false); setname(text.target.value) }} /></section>
                        </div>
                        <div>
                            <section>Description </section>
                            <section> <input onChange={(text) => { setcreate(false); setdesc(text.target.value) }} /></section>
                        </div>
                        <article className='creator-input'>
                            <section>Creator </section>
                            <section> {info.displayName}</section>
                        </article>
                        <section><button onClick={createClass}>Create Class</button></section>
                        <article className="creator-input">
                            {create !== false ?
                                <>
                                    <section>Code : {fcode}</section>
                                    <section>Link : <a href={`http://localhost:3000/join/${fcode}`} rel="noreferrer">{`http://localhost:3000/join/${fcode}`}</a> </section>
                                </>
                                : <>🙂</>}
                        </article>
                    </div>
                </section>
            </div>
        </>
    )
}
