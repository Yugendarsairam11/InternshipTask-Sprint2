import React from 'react'
import './sidenav.css'
import {NavLink} from 'react-router-dom'

function SideNav(props){
    return(
    <div className="sideNav">
        <h4 style={{color:'white'}}>Kona<span style={{color:'#E9204F'}}>Digital.ai</span></h4>
                <br />
               {props.toBeActive?<NavLink class="active" to='/dashboard'>Dashboard</NavLink>:<NavLink to='/dashboard'>Dashboard</NavLink>}
               <hr></hr>
               {props.toBeActive?<NavLink class="active" to='/userprofilepage'>User Profile</NavLink>:<NavLink to='/userprofilepage'>User Profile</NavLink>}
               <hr></hr>
               {props.toBeActive?<NavLink class="active" to='/updatePassword'>Dashboard</NavLink>:<NavLink to='/updatePassword'>UpdatePassword</NavLink>}
               <hr></hr>
               {props.toBeActive?<NavLink class="active" to='/leads'>Leads</NavLink>:<NavLink to='/leads'>Leads</NavLink>}
               <hr></hr>
               
               {props.toBeActive?<NavLink class="active" to='/userleads'>Lead Profile</NavLink>:<NavLink to='/userleads'>Lead Profile</NavLink>}
               <hr></hr>
               {props.toBeActive?<NavLink class="active" to='/report'>Report</NavLink>:<NavLink to='/report'>Report</NavLink>}
               <hr></hr>
               {props.toBeActive?<NavLink class="active" to='/settings'>Settings</NavLink>:<NavLink to='/settings'>Settings</NavLink>}        
    </div>
    )
}
export default SideNav