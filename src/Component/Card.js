import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
export const Card = (props) => {
    // var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return (
        <div className="card">
            <nav className='card-nav'>
                <Link to={`/room/${props.code}`}><h2>{props.name}</h2>
                </Link>
                <h3>{props.desc}</h3>
            </nav>
            <h4>{props.creator}</h4>
            <img src={props.photo} alt="" />
        </div>
    )
}

// {desc: 'SY Btech', creator: 'Ajinkya Patil', code: '4fp4v', name: 'FDS', photo: 'https://lh3.googleusercontent.com/a-/AOh14Ggm__5Z1Fq8M654frVrgu7mv0D5rd4Xq5JNhmOVKvo=s96-c'}