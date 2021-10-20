import React, { useState, useEffect, useCallback } from 'react'
import './Mainbody.css'
import { Card } from './Card'
import { useHistory, Link } from "react-router-dom";
import firebase from 'firebase'
export const Mainbody = (props) => {

  // const [_class, setclass] = useState([])

  let history = useHistory();

  if (!props.logged) {
    history.push("/login");
  }


  const [fclass, setfclass] = useState([])
  const [load, setload] = useState(false)
  const [fdata, setfdata] = useState([])
  let data = [], _class = [];

  const db = firebase.firestore()

  const getData = async () => {
    await db.collection('users').doc(props.logged.email).collection('class').get().then((snap) => {
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
    }).then(() => {
    })
  }

  const getIndData = () => {
    console.log(_class)
    _class.forEach((e) => {
      console.log("came")
      getSubdata(e.code).then(() => {
        if (_class.length !== data.length) return
        setload(true)
      })

    })

  }


  useEffect(() => {
    getData()
      .then(() => {
        getIndData()

      })
  }, [])




  return (
    <div className="main-body">
      <div className = "top-buttons">
        <Link to={`/join/${props.logged.email}`}><button>Join Classroom</button></Link>
        <Link to={"/create"}><button>Create Classroom</button></Link>
      </div>
      <div class = "cards"> 
      {load ? <>
        {fdata.map((e) => {
          console.log("render")
          console.log(e)
          return (
            <Card key= {e.code} name = {e.name} creator = {e.creator} desc = {e.desc} photo = {e.photo} code = {e.code}/>
          )
        })}
      </> : <></>}
      {/* <Card name="Fundamental of Data Structure" creator="Ajinkya Patil" desc="For SY Btech Students" photo="https://lh3.googleusercontent.com/a-/AOh14Ggm__5Z1Fq8M654frVrgu7mv0D5rd4Xq5JNhmOVKvo=s96-c" code="kjfhi"/> */}
      </div>
    </div>
  )
}

