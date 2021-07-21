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
import Notes from '../components/Notes'
import Activities from '../components/Activities'
import Tasks from '../components/Tasks'
import Checklist from '../components/Checklist'
import axios from 'axios'

function LeadData(props){
    console.log("the data initially is ",useSelector((state) => state.userData.isLeadDelete))
    const isLeadDelete=useSelector((state) => state.userData.isLeadDelete)

    const dispatch=useDispatch()
    const history=useHistory()
    const [leadData,setleadData]=useState({})
    const [state,setstate]=useState('')
    const [user,setuser]=useState({})
    const [owner,setowner]=useState('')
    const [activities,setactivities]=useState(false)
    const [notes,setnotes]=useState(false)
    const [tasks,settasks]=useState(false)
    const [checklist,setchecklist]=useState(false)
    useEffect(()=>{
        console.log("this is from local storage",(JSON.parse(localStorage.getItem('leadobject'))))
        var obj=JSON.parse(localStorage.getItem('leadobject'))  
        setleadData(obj)   
        console.log("this is user lead",obj)
       
        setstate(JSON.parse(localStorage.getItem('userdetails')))
        setowner(localStorage.getItem("emailId"))
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
    const changeActivities=()=>{
      setactivities(true)
      settasks(false)
      setnotes(false)
      setchecklist(false)
    }
    const changeTasks=()=>{
      setactivities(false)
      settasks(true)
      setnotes(false)
      setchecklist(false)
    }
    const changeNotes=()=>{
      setactivities(false)
      settasks(false)
      setnotes(true)
      setchecklist(false)
    }
    const changeChecklist=()=>{
      setactivities(false)
      settasks(false)
      setnotes(false)
      setchecklist(true)
    }
    
    // const getUser=()=>{
    //   var obj={username:"Sachin Chandra"}
    //   axios.post("http://localhost:9011/user/getuserbychoice",obj).then((response)=>setuser(response.data))
    // }
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
                <img className="endimage" src={leadData.image}  ></img>
                    
                </div>
            <h4>Lead Profile</h4>
            <form>
            <div className="leadsdata">
            <div className="col">
              <div className="row-0">
                <img className="main_image" src={leadData.image}  ></img>
                    <h5>{leadData.username}</h5>
                    <br />
                    {/* <h5>ID:{userLead.id}</h5> */}
                    </div>
                    {/* <hr></hr> */}
                    </div>
        
        {/* <img src={userLead.image}></img> */}
        <div className="row-1">
        {/* <h5>Username: {userLead.username}</h5> */}
         <h5>Email: {leadData.email}</h5>
         <h5>Number: {leadData.number}</h5>
         </div>
         <div className="row-2">
         <h5 style={{marginLeft:'20px'}}>Course: {leadData.course}</h5>
         <h5>Ads: {leadData.ads}</h5>
         {/* <h5>Purpose: {userLead.purpose}</h5> */}
         </div>
         <div className="row-3">
            <h5>Lead Owner: {owner}</h5>
         </div>
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
        <div className="row-4">
        <h5>Lead Stage:</h5>
        <br />
        <div className="rowdata">
        <h6>New</h6>
        <h6>CBNB</h6>
        <h6>Call Back</h6>
        <h6>Follow Up 1</h6>
        <h6>Dead Lead</h6>
        <h6>Invalid Number</h6>
        <h6>Registered</h6>
        </div>
         </div>
        <div className= "components">
        <ul className="nav nav-tabs">
  <li class="nav-item">
    <p class="nav-link " onClick={changeActivities} >ACTIVITIES</p>
  </li>
  <li class="nav-item">
    <p class="nav-link" onClick={changeNotes}>NOTES</p>
  </li>
  <li class="nav-item">
    <p class="nav-link" onClick={changeTasks}>TASKS</p>
  </li>
  <li class="nav-item">
    <p class="nav-link" onClick={changeChecklist}>CHECKLIST</p>
  </li>
  <li class="nav-item">
    <p class="nav-link " >EMAILS</p>
  </li>
</ul>
</div>
        {activities?<Activities />:null}                
        {notes?<Notes leadId={leadData.id} />:null}
        {console.log("this is lead data")}
        {console.log("this is lead data")}
        {tasks?<Tasks leadId={leadData.id} />:null}
        {checklist?<Checklist leadId={leadData.id} />:null}
        </form>
        
            </div>
        </div>
        </div>
    // 
    )
}
 export default LeadData;