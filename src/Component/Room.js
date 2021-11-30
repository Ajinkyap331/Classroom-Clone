import React, { useEffect, useState, useCallback } from 'react'
import { storage, db } from '../firebase/config'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import { Redirect } from 'react-router-dom'
import './Room.css'

export const Room = (props) => {

    const info = useSelector(state => state.info)
    const [data, setdata] = useState({})
    const [progress, setProgress] = useState(0)
    const login = useSelector(state => state.Log)

    let filesdata = []
    let ids = []
    const [_filesdata, setfilesdata] = useState(null)
    const [_ids, setids] = useState(null)
    const [uploadfile, setupload] = useState(false)

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


    const uploadImage = () => {
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
                    console.log(url);
                    setProgress(50)
                    db.collection('files').doc(props.match.params.code).collection('images').add({ url: url, type: 'images', name: file.name }).then(() => { setupload(true); setProgress(100) })
                    setfile(null)
                })
            }
        )
    }

    const uploadFile = () => {
        console.log(file)
        setProgress(20)
        const upload = storage.ref(`files/doc/${file.name}`).put(file)
        upload.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage.ref("files/doc").child(file.name).getDownloadURL().then(url => {
                    setProgress(50)
                    db.collection('files').doc(props.match.params.code).collection('doc').add({ url: url, type: 'doc', name: file.name }).then(() => { setupload(true); setProgress(100) })
                    setfile(null)
                })
            }
        )
    }

    const changeImage = (id) => {
        document.getElementById(id.slice(1, 11)).style.display = "inline-block";
        const img = document.getElementById(id)
        img.style.position = "absolute";
        img.style.zIndex = 1;

        img.style.top = 0.2 * window.screen.height.toString() + "px";
        img.style.height = 0.5 * window.screen.height.toString() + "px"
        img.style.width = 0.5 * window.screen.width.toString() + "px"

    }

    const revertImage = (id) => {
        console.log("came")
        const img = document.getElementById(id)
        document.getElementById(id.slice(1, 11)).style.display = "none";
        img.style.position = "relative";
        img.style.zIndex = 0;
        img.style.top = 0;
        img.style.height = "100px"
        img.style.width = "100px"
    }

    useEffect(() => {
        // getData()
        // setdata({ name: 'Mathematics', photo: 'https://lh3.googleusercontent.com/a-/AOh14GgePHZJSGyO_TGit2jYUF-4zH22uq8Nr_elAZtRkw=s96-c', desc: 'FY Btech', creator: 'SYITB223 Ajinkya Patil', code: 'n6hec' })
    }, [uploadfile])

    return (
        <div>
            {
                login === false ? <><Redirect to="/login" /></> : <></>
            }
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className='input-room'>
                <input ></input>
                <section>Send Messages</section>
                <img alt="" src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/321588/external-send-user-interface-kmg-design-flat-kmg-design.png" />
            </div>
            <div className="navbar">
                <div className="logo">
                    <div><img alt="" src="https://img.icons8.com/nolan/48/google-classroom.png" /></div>
                    <section>My Classroom</section>
                </div>
                <div>{data.name}</div>
                <div className="right-room">
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
            <section className="chossing-collection">
                <div className="choose-file">
                    {file != null ?

                        <div>
                            <label onClick={uploadImage}>
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
                            <label> Choose File
                                <input type="file" size="60" onChange={(_file) => setfile(_file.target.files[0])} />
                            </label>
                        </>
                    }
                </div>
            </section>
            <div>
                {_filesdata != null ?
                    <>
                        <div className="images-col">
                            {_filesdata.map(snap => {
                                return (
                                    <>
                                        <img src={snap.url} id={snap.url.slice(snap.url.length - 11, snap.url.length)} alt="" height={100} width={100} onClick={() => { changeImage(snap.url.slice(snap.url.length - 11, snap.url.length)) }} key={snap.url} />
                                        <div>
                                            {
                                                <div class="cross-image" id={snap.url.slice(snap.url.length - 10, snap.url.length)}  >
                                                    <img alt="" onClick={() => revertImage(snap.url.slice(snap.url.length - 11, snap.url.length))} src="https://img.icons8.com/ios/32/ffffff/xbox-x.png" />
                                                    <section><img alt="" onClick={() => RemoveFile(snap.type, snap.name, _filesdata.indexOf(snap))} src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/32/ffffff/external-delete-miscellaneous-kiranshastry-solid-kiranshastry.png" /></section>
                                                </div>
                                            }
                                        </div>

                                    </>
                                    //  
                                    // 
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
