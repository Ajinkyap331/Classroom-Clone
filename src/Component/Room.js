import React, { useEffect, useState, useCallback } from 'react'
import { storage, db } from '../firebase/config'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import { useHistory } from 'react-router-dom'
import './Room.css'

export const Room = (props) => {

    const info = useSelector(state => state.info)
    let history = useHistory()
    const [data, setdata] = useState({})
    const [progress, setProgress] = useState(0)

    let filesdata = []
    let ids = []
    const [_filesdata, setfilesdata] = useState(null)
    const [_ids, setids] = useState(null)
    const [uploadfile, setupload] = useState(false)
    const [expandedimage, setexpandedimage] = useState(false)

    let imgid = null

    const RemoveFile = async (type, name, index) => {
        console.log(_ids[index])
        storage.ref(`files/${type}/`).child(name).delete()
        await db.collection('files').doc(props.match.params.code).collection('images').doc(_ids[index]).delete().then(() => { setupload(uploadfile => !uploadfile); console.log("done") })
    }

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
                    db.collection('files').doc(props.match.params.code).collection('images').add({ url: url, type: 'images', name: file.name }).then(() => { setupload(true); setProgress(100) })
                    setfile(null)
                })
            }
        )
    }


    const changeImage = (id) => {
        imgid = id
        const img = document.getElementById(id)
        img.style.position = "absolute";
        img.style.zIndex = 2;

        img.style.top = 0.2 * window.screen.height.toString() + "px";
        img.style.height = 0.5 * window.screen.height.toString() + "px"
        img.style.width = 0.5 * window.screen.width.toString() + "px"
        setexpandedimage(true)

    }

    const revertImage = () => {
        const img = document.getElementById(imgid)
        img.style.position = "relative";
        // img.style.zIndex = 2;
        // img.style.top = 0.2 * window.screen.height.toString() + "100px";
        img.style.height = 0.5 * window.screen.height.toString() + "100px"
        img.style.width = 0.5 * window.screen.width.toString() + "100px"
    }

    useEffect(() => {
        if (info === null) {
            history.push('/login')
        }
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
                <div className="logo">
                    <div><img alt="" src="https://img.icons8.com/nolan/48/google-classroom.png" /></div>
                    <section>My Classroom</section>
                </div>
                <div>{data.name}</div>
                <div className="right">
                    <div>{data.desc}</div>
                    <div className="avatar-nav" ><Avatar src={info.photoURL} alt="" /></div>
                </div>
            </div>
            <div className="creator-room">
                <div>
                    <div>Creator</div>
                    <Avatar src={data.photo} alt='' sx={{ width: 60, height: 60 }} />
                    <section>{data.creator}</section>
                </div>
            </div>
            <div className="choose-file">
                {file != null ?

                    <div>
                        <label onClick={uploadFile}>
                            Upload File
                        </label>
                        <label onClick={() => setfile(null)}>
                            Remove file
                        </label>
                    </div> :
                    <>
                        <label> Choose Image
                            <input type="file" size="60" onChange={(_file) => setfile(_file.target.files[0])} />
                        </label>
                    </>
                }
            </div>
            <div>
                {_filesdata != null ?
                    <>
                        <div className="images-col">
                            {_filesdata.map(snap => {
                                return (
                                    <>
                                        <img src={snap.url} id={snap.url.slice(snap.url.length - 10, snap.url.length)} alt="" height={100} width={100} onClick={() => { changeImage(snap.url.slice(snap.url.length - 10, snap.url.length)) }} key={snap.url} />
                                        <div>
                                            {
                                                expandedimage ? <>True</> : <>False</>
                                            }
                                        </div>
                                    </>

                                    // RemoveFile(snap.type, snap.name, _filesdata.indexOf(snap))
                                    // <ImagesCollection url={snap.url} type={snap.type} name={snap.name} file={_filesdata} code={props.match.params.code}/>
                                )
                            })}
                        </div>
                    </> : <></>
                }
            </div>

        </div>
    )
}
