import React, { useState, useEffect } from 'react'
import './Mainbody.css'
import { Card } from './Card'
import { Link } from "react-router-dom";
import firebase from 'firebase'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import { _Class } from '../REDUX/Actions';

export const Mainbody = () => {

  // const [_class, setclass] = useState([])
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)

  const info = useSelector(state => state.info)
  const class1 = useSelector(state => state.class)

  const [fclass, setfclass] = useState([])
  const [load, setload] = useState(false)
  const [fdata, setfdata] = useState([])
  let data = [], _class = [];

  const db = firebase.firestore()

  const getData = async () => {
    setProgress(30)
    await db.collection('users').doc(info.email).collection('class').get().then((snap) => {
      snap.forEach((doc) => {
        _class.push(doc.data())
        // setclass(_class => [..._class, doc.data()])
      })
    }).then(() => {
      console.log(_class)
      setfclass(_class)
    })

  }

  const getSubdata = async (code) => {
    console.log(code)
    await db.collection('room').where("code", "==", code).get().then((snap) => {
      snap.forEach((doc) => {
        data.push(doc.data())
        // setdata(data => [...data, doc.data()])
      })
    }).then(() => {
      console.log(data)
      setfdata(data)
      dispatch(_Class(data))
    }).then(() => {

    })
  }

  const getIndData = () => {
    if (_class.length === 0)
      setProgress(100)
    console.log(_class)
    _class.forEach((e) => {
      console.log("came")
      getSubdata(e.code).then(() => {
        if (_class.length !== data.length) return
        setload(true)
        setProgress(100)
      })
    })

  }


  useEffect(() => {
    console.log(class1 !== null)
    if (class1 !== null) {
      setfdata(class1)
      setload(true)
    }
    else {
      getData()
        .then(() => {
          setProgress(60)
          getIndData()
        })
    }

  }, [])



  return (
    <div className="main-body">
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="top-buttons">
        <Link to={`/join/${info.email}`}><button>Join Classroom</button></Link>
        <Link to={"/create"}><button>Create Classroom</button></Link>
      </div>
      <div class="cards">
        {load ? <>
          {fdata.map((e) => {
            console.log("render")
            console.log(e)
            return (
              <Card key={e.code} name={e.name} creator={e.creator} desc={e.desc} photo={e.photo} code={e.code} />
            )
          })}
        </> : <></>}
        {/* <Card name="Fundamental of Data Structure" creator="Ajinkya Patil" desc="For SY Btech Students" photo="https://lh3.googleusercontent.com/a-/AOh14Ggm__5Z1Fq8M654frVrgu7mv0D5rd4Xq5JNhmOVKvo=s96-c" code="kjfhi"/> */}
      </div>
    </div>
  )
}

