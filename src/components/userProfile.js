import React, { useEffect, useState } from 'react'
import SideNav from '../components/SideNav'
import sidenav from '../components/SideNav'
import {useHistory} from 'react-router-dom'
import SearchComponent from '../components/searchComponent'
import './userProfile.css'
import axios from 'axios'

function UserProfile(props){
    
    const history=useHistory()
    const [user,setuser]=useState({})
    const [userdetails,setuserdetails]=useState({})

    useEffect(()=>{
        setuser(JSON.parse(localStorage.getItem("userdetails")))
        getUserDetatils()
    },[])
    const getUserDetatils=()=>{
        var obj={email:localStorage.getItem('emailId')}
        axios.post('http://localhost:9011/user/getuserbyemail',obj).then((res)=>setuserdetails(res.data))

    }
    const updateLead=()=>{
        props.history.push('/profileupdatepage')
        var obj=userdetails
        localStorage.setItem("profiledetails",JSON.stringify(obj))
        console.log(obj)
    }
    console.log(userdetails)
    return(
        <div className="userprofile">
            {/* <h3>Inside User Profile</h3> */}
            
             <div className="usersidenav"><SideNav />

             </div>
             <div className="col">
                <SearchComponent />
                
             <div className="userbody">
                <h4>User Profile</h4>
                <form>
                    <div className="details">
                    <div className="col">
                <img className="main_image" src={userdetails.image}  ></img>
                    <h5>{userdetails.username}</h5>
                    <hr></hr>
                    </div>
                <h5>Username: {userdetails.username}</h5>
               <h5>Email: {userdetails.emailId}</h5> 
               <h5>Mobile Number: {userdetails.number}</h5> 
               <h5>Location: {userdetails.location}</h5>  
                <div className="button">
                  <div class="input-field col s12">
        <button  class="waves-effect waves-light btn-large red" onClick={updateLead}>Edit Profile</button>
        </div>  
        </div> 

               </div>
                </form>
             </div>
             <div className="end">

             </div>
             
        </div>
        </div>
    )
}
export default UserProfile