import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
export const Card = (props) => {
    return (
        <div className="card">
            <nav className='card-nav'>
                <Link to={`/room/${props.code}`}><h2>{props.name}</h2>
                </Link>
                <h3>{props.desc}</h3>
                <h4>{props.creator}</h4>
            </nav>  
            <img src={props.photo} alt="" />
        </div>
    )   
}

