import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {userRegister} from '../actions/user.register'

import './register.css'
function Register() {
    console.log("the data initially is ",useSelector((state) => state.userData.isUserRegister))
    const isUserRegister=useSelector((state) => state.userData.isUserRegister)

   //useSelector((state) => state.userData)
    const dispatch=useDispatch()
    const history=useHistory()
    const emailIdRef=useRef()
    const usernameRef=useRef()
    const passwordRef=useRef()
    const formMessage=useRef()
    const imageref=useRef()
    const numberref=useRef()

    const [emailId,setemailId]=useState("")
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const [image,setimage]=useState("")
    const [number,setnumber]=useState("")
    const [location,setlocation]=useState("")

    const [emailVal,setemailVal]=useState(false)
    const [usernameVal,setusernameval]=useState(false)
    const [passwordVal,setpasswordVal]=useState(false)
    const [imageval,setimageval]=useState(false)
    const [numberval,setnumberval]=useState(false)

    const validateEmailField=(event)=>{
        const pattern=/^[a-z A-Z 0-9]+@gmail.com$/
        if(pattern.test(event.target.value)){
            emailIdRef.current.style.color="#3FF80C"
            emailIdRef.current.innerHTML="Email Valid"
            setemailVal(true)
            setemailId(event.target.value)
        }
        else{
            emailIdRef.current.style.color="tomato"
            emailIdRef.current.innerHTML="Please Enter Email in proper Format"
            setemailVal(false)
            
        }
    }
    const validateUsername=(event)=>{
        if(event.target.value.length<5){
            usernameRef.current.style.color="tomato"
            usernameRef.current.innerHTML="Username must be atleast more 5 characters"
            setusernameval(false)
        }
        else{
            usernameRef.current.style.color="#3FF80C"
            usernameRef.current.innerHTML="Username Valid"
            setusernameval(true)
            setusername(event.target.value)
        }
    }
    const validatePassword=(event)=>{
        if(event.target.value.length<8){
            passwordRef.current.style.color="tomato"
            passwordRef.current.innerHTML="Password must be atleast 8 characters or more"
            setpasswordVal(false)
        }
        else{
            passwordRef.current.style.color="#3FF80C"
            passwordRef.current.innerHTML="Valid Password"
            setpasswordVal(true)
            setpassword(event.target.value)
        
        }
    }
    const submitHandler=()=>{
        if(emailVal&&usernameVal&&passwordVal&&imageval&&numberval&&location){
            var userObj={
                emailId:emailId,
                username:username,
                password:password,
                image:image,
                number:number,
                location:location.location
            }
            dispatch(userRegister(userObj))
            console.log("after dispatched the action ",isUserRegister)
            if(!isUserRegister){
                alert("userRegisterd successfully !!")
                localStorage.setItem("userdetails",JSON.stringify(userObj))
                history.push('/login')
            }
            else{
                alert("userRegistration unsuccessfull !!!")
            }
           
           
        }else{
            formMessage.current.innerHTML="please enter all fields properly"
        }
    }
    console.log(passwordVal)

    const imageValidation=(event)=>{
        var value=event.target.value
        if(value.length>5){
            imageref.current.innerHTML="Valid URL"
            imageref.current.style.color="green"
            setimageval(true)
            setimage(value)
        }
        else{
            imageref.current.innerHTML="Paste your Image URL here"
            imageref.current.style.color="red"
            setimageval(false)
            
        }
    }
    const numberValidation=(event)=>{
        var value=event.target.value
        var pattern=/^[6-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;
        if(pattern.test(value)){
            numberref.current.innerHTML="Valid Number"
            numberref.current.style.color="green"
            setnumber(value)
            setnumberval(true)
        }
        else{
            numberref.current.innerHTML="Mobile Number is not in proper format"
            numberref.current.style.color="red"
            setnumberval(false)
        }

    }

    const locationData=(event)=>{
        var name=event.target.name
        var value=event.target.value
        setlocation({
            ...location,[name]:value
        })
    }

    return (
        <div>
        <div className="row">
        <div className="col">
        </div>
        <div className="col">
            <h3><span style={{color:'#E9204F'}}>Kona</span>digital.ai</h3>
                <br></br>
        <div className="registerbox">
            <h5>Register</h5>
                <br /><br />
                <span ref={formMessage} ></span>
            <div className="input-field col s12">
                <input  id="emailId" type="text" name="emailId" onBlur={validateEmailField}/>
                <span ref={emailIdRef}></span>
                <label className="active" >EmailId</label>
            </div>
                <br/><br/><br/><br/>
                <div className="input-field col s12">
                <input  id="number" type="text" name="emailId" onChange={numberValidation} />
                <span ref={numberref}></span>
                <label className="active" >Mobile Number</label>
            </div>
                <br/><br/><br/><br/>
                <div className="input-field col s12">
                <input  id="location" type="text" name="location" onChange={locationData} />
                <label className="active" >Location</label>
                <span ></span>
            </div>
                <br/><br/><br/><br/>
                <div className="input-field col s12">
                <input  id="username" type="text" onChange={validateUsername} />
                <span ref={usernameRef} style={{color:"tomato"}}></span>
                <label className="active" >Username</label>
            </div>
                <br/><br/><br/><br/>
            <div className="input-field col s12">
                <input  id="password" type="password" onChange={validatePassword} />
                <span ref={passwordRef}></span>
                <label className="active">Password</label>
            </div>
            <div className="input-field col s12">
                <input  id="image" type="text" onBlur={imageValidation} />
                <label className="active">Image URL</label>
                <span ref={imageref}></span>
            </div>
            <br/><br/><br/><br/>
            <div className="input-field col s12">
            <button  className="waves-effect waves-light btn-large red" onClick={submitHandler}>Register</button>
            </div>
        </div>
        </div>
        <div className="col">
        </div>
        </div>
        </div>
    )
}

export default Register
