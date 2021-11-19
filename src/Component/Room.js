import React, { useEffect, useState, useCallback } from 'react'
import firebase from 'firebase'
import { storage } from '../firebase/config'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import './Room.css'

export const Room = (props) => {

    const info = useSelector(state => state.info)

    const [data, setdata] = useState({})
    const [progress, setProgress] = useState(0)

    let filesdata = []
    let ids = []
    const [_filesdata, setfilesdata] = useState(null)
    const [_ids, setids] = useState(null)
    const [uploadfile, setupload] = useState(false)
    const db = firebase.firestore();

    const [file, setfile] = useState(null)

    const getData = async () => {
        await db.collection('room').where("code", "==", props.match.params.code).get().then((snap) => {
            // console.log("called")
            snap.forEach((doc) => {
                setdata(doc.data())
            })
        });
        setProgress(50)
        filesdata = []
        await db.collection('files').doc(props.match.params.code).collection('images').get().then((snap) => {
            snap.forEach((doc) => {
                ids.push(doc.id)
                filesdata.push(doc.data())
            })
        }).then(() => {
            setfilesdata(filesdata)
            setids(ids)
            setProgress(100)
        })
    }


    const uploadFile = () => {
        console.log(file)
        setProgress(20)
        const upload = storage.ref(`files/images/${file.name}`).put(file)
        upload.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage.ref("files/images").child(file.name).getDownloadURL().then(url => {
                    setProgress(50)
                    db.collection('files').doc(props.match.params.code).collection('images').add({ url: url, type: 'images', name: file.name }).then(() => { setupload(true); setProgress(100)})
                })
            }
        )
    }


    const RemoveFile = async (type, name, index) => {
        console.log(_ids[index])
        storage.ref(`files/${type}/`).child(name).delete()
        await db.collection('files').doc(props.match.params.code).collection('images').doc(_ids[index]).delete().then(() => { setupload(uploadfile => !uploadfile); console.log("done") })
    }

    useEffect(() => {
        getData().then(() => {
            // console.log(data)

        })
        // setdata({ name: 'Mathematics', photo: 'https://lh3.googleusercontent.com/a-/AOh14GgePHZJSGyO_TGit2jYUF-4zH22uq8Nr_elAZtRkw=s96-c', desc: 'FY Btech', creator: 'SYITB223 Ajinkya Patil', code: 'n6hec' })
    }, [uploadfile])

    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="navbar">
                <div className = "logo">
                    <div><img alt="" src="https://img.icons8.com/nolan/48/google-classroom.png" /></div>
                    <section>My Classroom</section>
                </div>
                <div>{data.name}</div>
                <div className="right">
                    <div>{data.desc}</div>
                    <div className="avatar-nav" ><Avatar src={info.photoURL} alt="" /></div>
                    {/* <div className="button-nav">
                        <button onClick={userLogout} >Logout</button>
                    </div> */}
                </div>
            </div>
            <div>
                <img src={data.photo} alt='' />
                <h4>{data.creator}</h4>
            </div>
            <br /><br /><br /><br /><br />
            <div>
                <input type="file" onChange={(_file) => setfile(_file.target.files[0])}></input>
                {file != null ? <><button onClick={uploadFile}>Upload file</button> <button>Remove file</button></> : <></>}
            </div>
            {_filesdata != null ?
                <>
                    <div>
                        {_filesdata.map(snap => {
                            return (
                                <img src={snap.url} alt="" height={100} width={100} onClick={() => RemoveFile(snap.type, snap.name, _filesdata.indexOf(snap))} key={snap.url} />
                            )
                        })}
                    </div>
                </> : <></>}


        </div>
    )
}
