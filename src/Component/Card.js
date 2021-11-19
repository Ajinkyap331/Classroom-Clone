import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import './Card.css'
export const Card = (props) => {
    return (
        <div className="card">
            <nav className='card-nav'>
                <section>
                    <h2>{props.name}</h2>
                    <h3>{props.desc}</h3>
                    <h4>{props.creator}</h4>
                </section>
                <section>
                    <div className="avatar-home">
                        <Avatar src={props.photo} sx={{ width: 50, height: 50 }} />
                    </div>
                </section>
                
            </nav>
            <div className="arrow-home">
                <Link to={`/room/${props.code}`}>
                    <img alt="" src="https://img.icons8.com/external-flatart-icons-solid-flatarticons/64/ffffff/external-arrow-arrow-flatart-icons-solid-flatarticons-6.png" />
                </Link>
            </div>
        </div>
    )
}

