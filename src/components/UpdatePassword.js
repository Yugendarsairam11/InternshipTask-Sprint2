import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import './updatepassword.css'
import {useHistory} from 'react-router-dom'
import {passwordUpdate} from '../actions/user.updatePassword'
import Sidenav from './SideNav'

function UpdatePassword() {
    console.log("the data initially is ",useSelector((state) => state.userData.isPasswordUpdate))
    const isPasswordUpdate=useSelector((state) => state.userData.isPasswordUpdate)

    const dispatch=useDispatch()
    const history=useHistory()
    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    useEffect(
        ()=>{
        setEmailId(localStorage.getItem("emailId"))
    },[])
    const capturePassword=(event)=>{
            setPassword(event.target.value)
    }
    const sendToServer=(event)=>{
        event.preventDefault()
        var obj={
            emailId:emailId,
            password:password
        }
        dispatch(passwordUpdate(obj))
        console.log("from update password ",obj)
        if(!isPasswordUpdate){
            alert("password updated successfully")
            history.push('/login')
        }
        else{
            alert("passsword not updated")
        }
        
    }
    return (
        <div>
        {/* <h1>{emailId}</h1> */}
        <div className="updatepassword">  
            <div className="updatesideNav"><Sidenav />
                        {/* <h5>Kona<span style={{color:'#E9204F'}}>digital.ai</span></h5>
                        <br></br>
                        <NavLink to="/dashboard" style={{color:"#5B647F"}}><h5>DashBoard</h5></NavLink>
                        <hr></hr>
                        <NavLink to="/updatePassword" style={{color:"whitesmoke"}}><h5>UpdatePassword</h5></NavLink>
                        <hr></hr> */}
            </div>
            <div className="updatebody">
            <h4>Update your Password here</h4>
            <form>
            
            <div class="input-field col">
            <input type="text" name="password" onChange={capturePassword} />
            <label class="active" >New Password</label>
        </div>
        <div class="input-field col s12">
        <button  class="waves-effect waves-light btn-large red" onClick={sendToServer}>Update Password</button>
        </div>
        </form>
            </div>
        </div>
        </div>
    )
}

export default UpdatePassword
