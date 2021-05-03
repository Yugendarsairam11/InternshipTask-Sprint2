import React from 'react'
import {NavLink, useHistory} from 'react-router-dom'

function Home() {
    return (
        <div>
            <span style={{color:'#E9204F'}}>Konadigital.ai</span>
                <div className="buttons">
                    <div><NavLink className="btn waves-effect waves-light btn-large red"  name="action" to="/register">Register
                    </NavLink></div>
                    <div><NavLink className="btn waves-effect waves-light btn-large red" id="login"  name="action" to="/login">Login
                    </NavLink></div>
                </div>
        </div>
    )
}

export default Home
