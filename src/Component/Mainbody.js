import React, { useState, useEffect, useCallback } from 'react'
import './Mainbody.css'
import { Card } from './Card'
import { useHistory } from "react-router-dom";
import firebase from 'firebase'
export const Mainbody = (props) => {

  // const [_class, setclass] = useState([])

  let history = useHistory();

  if (!props.logged) {
    history.push("/login");
  }

  const [_class, setclass] = useState([])
  const [load, setload] = useState(false)
  const [data, setdata] = useState([])

  const db = firebase.firestore()

  const getData = async () => {
    await db.collection('users').doc(props.logged.email).collection('class').get().then((snap) => {
      snap.forEach((doc) => {
        console.log(_class)
        setclass(_class => [..._class, doc.data()])
      })
    })

  }

  const getSubdata = async (code) => {
    console.log(code)
    await db.collection('room').where("code", "==", code).get().then((snap) => {
      snap.forEach((doc) => {
        console.log(doc.data())
        setdata(data => [...data, doc.data()])
      })
    });
  }

  const getIndData = () => {
    console.log("Came")
    _class.forEach((e) => {
      getSubdata(e.code)
    })

  }

  const init = () => {
    getData()
      .then(() => {
        setload(true)
      })
    // .then(() => {
    //   setload(true) 
    //   getIndData()
    // })
    // .then(() => {
    //   console.log(data)
    //   
    // })

  }

  useEffect(() => {
    init()
  }, [])




  return (
    <div className="main-body">
      {load ? <>
        {_class.map((e) => {
          return (
            <Card key={e.code} />
          )
        })}
      </> : <></>}

      {/* <Card /><Card /><Card /><Card />
      <Card /><Card /><Card /><Card /> */}
    </div>
  )
}
