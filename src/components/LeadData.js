import React,{useState,useEffect} from 'react'
import SideNav from '../components/SideNav'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {NavLink, useHistory} from 'react-router-dom'
import './LeadData.css'
import { leaddelete } from '../actions/user.deleteLead'
import {leadUpdate} from '../actions/user.updateLead'
import Leads from './Leads'
import SearchComponent from './searchComponent'

function LeadData(props){
    console.log("the data initially is ",useSelector((state) => state.userData.isLeadDelete))
    const isLeadDelete=useSelector((state) => state.userData.isLeadDelete)

    const dispatch=useDispatch()
    const history=useHistory()
    const [userLead,setUserLead]=useState({})
    useEffect(()=>{
        setUserLead(JSON.parse(localStorage.getItem('leadobject')))
    },[])
    const updateLead=()=>{
        props.history.push('/leaddetailsupdate')
        // var obj=JSON.parse(localStorage.getItem("leadobject"))
        // dispatch(leadUpdate(obj.id))
    }
    const deleteLead=()=>{
        var obj=JSON.parse(localStorage.getItem("leadobject"))
        dispatch(leaddelete(obj.id))
        console.log("after dispatched the action",isLeadDelete)
        if(!isLeadDelete){
            alert("lead Deletion Successful")
            history.push('/leads')
        }
        else{
          alert("lead could not be deleted / Something went wrong ")
        }

    }
    return(
        <div>
        {/* <h1>{emailId}</h1> */}
        <div className="leaddata">  
            <div className="sideNav"><SideNav/>
                        {/* <h5>Kona<span style={{color:'#E9204F'}}>digital.ai</span></h5>
                        <br></br>
                        <NavLink to="/dashboard" style={{color:"#5B647F"}}><h5>DashBoard</h5></NavLink>
                        <hr></hr>
                        <NavLink to="/updatePassword" style={{color:"whitesmoke"}}><h5>UpdatePassword</h5></NavLink>
                        <hr></hr> */}
            </div>
            <div className="leadbody">
                
                <div className="col">
                <SearchComponent />
                <img className="endimage" src={userLead.image}  ></img>
                    
                </div>
            <h4>Lead Profile</h4>
            <form>
            <div className="leadsdata">
            <div className="col">
                <img className="main_image" src={userLead.image}  ></img>
                <div></div>
                    <h5>{userLead.username}</h5>
                    <hr></hr>
                    </div>
        <h5>ID:{userLead.id}</h5>
        {/* <img src={userLead.image}></img> */}
        <h5>Username: {userLead.username}</h5>
         <h5>Email: {userLead.email}</h5>
         <h5>Number: {userLead.number}</h5>
         <h5>Course: {userLead.course}</h5>
         <h5>Ads: {userLead.ads}</h5>
         <h5>Purpose: {userLead.purpose}</h5>
         </div>
         <hr />
         <div className="buttons">
         <div class="input-field col s12">
        <button  class="waves-effect waves-light btn-large red" onClick={updateLead}>Edit lead</button>
        </div>
         <div class="input-field col s13">
        <button  class="waves-effect waves-light btn-large red" onClick={deleteLead} >Delete lead</button>     
        </div>
        </div>
        <hr />
        <div className= "components">
        <ul class="nav nav-tabs">
  <li class="nav-item">
    <NavLink class="nav-link active" to="/activities" href="#">ACTIVITIES</NavLink>
  </li>
  <li class="nav-item">
    <NavLink class="nav-link" to="/notes" href="#">NOTES</NavLink>
  </li>
  <li class="nav-item">
    <NavLink class="nav-link" to="/tasks" href="#">TASKS</NavLink>
  </li>
  <li class="nav-item">
    <NavLink class="nav-link" to="/checklist" href="#">CHECKLIST</NavLink>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled" href="#">EMAILS</a>
  </li>
</ul>
</div>
        
        </form>
        
            </div>
        </div>
        </div>
    // 
    )
}
 export default LeadData;