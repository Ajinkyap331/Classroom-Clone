import React, { useEffect, useState, useCallback } from 'react'
import firebase from 'firebase'
import { storage } from '../firebase/config'
export const Room = (props) => {

    const [data, setdata] = useState({})
    let filesdata = []
    const [_filesdata, setfilesdata] = useState(null)
    const [uploadfile, setupload] = useState(false)
    const db = firebase.firestore();

    const [file, setfile] = useState(null)

    const getData = async () => {
        await db.collection('room').where("code", "==", props.match.params.code).get().then((snap) => {
            console.log("called")
            snap.forEach((doc) => {
                setdata(doc.data())
            })
        });
        filesdata = []
        await db.collection('files').doc(props.match.params.code).collection('images').get().then((snap) => {
            snap.forEach((doc) => {
                filesdata.push(doc.data())
            })
        }).then(() => setfilesdata(filesdata))

    }


    const uploadFile = () => {
        console.log(file)
        const upload = storage.ref(`files/images/${file.name}`).put(file)
        upload.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage.ref("files/images").child(file.name).getDownloadURL().then(url => {
                    db.collection('files').doc(props.match.params.code).collection('images').add({ url: url, type : 'images', name : file.name }).then(() => setupload(true))
                })
            }
        )
    }
    

    const RemoveFile = (type, name) => {
        // storage.ref(`files/${type}/`).child(name).delete()   
        // db.collection('files').doc(props.match.params.code).collection('images').update({
        //     url: firebase.firestore.FieldValue.delete()
        // });
    }

    useEffect(() => {
        getData().then(() => {
            console.log(data)
        })
        // setdata({ name: 'Mathematics', photo: 'https://lh3.googleusercontent.com/a-/AOh14GgePHZJSGyO_TGit2jYUF-4zH22uq8Nr_elAZtRkw=s96-c', desc: 'FY Btech', creator: 'SYITB223 Ajinkya Patil', code: 'n6hec' })
    }, [uploadfile])
    return (
        <div>
            <div>
                <nav><h1>{data.name}</h1><h4>{data.desc}</h4></nav>
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
                    {console.log(_filesdata)}
                    <div>
                        {_filesdata.map(snap => {
                            console.log(snap)
                            return (
                                <img src={snap.url} alt="" height={100} width={100} onClick={RemoveFile(snap.type, snap.name)} key= {snap.url}/>
                            )
                        })} 
                    </div>
                </> : <></>}


        </div>
    )
}
