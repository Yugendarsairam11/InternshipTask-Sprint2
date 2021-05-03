import React from 'react'
import SideNav from './SideNav'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'
import {useState} from 'react'

import './leads.css'
import axios from 'axios'
import SearchComponent from './searchComponent'

function Leads(props){
    // const details=props.data.config.username
    const [leads,setLeads]=useState([])
    const history=useHistory()
    const sendToLeadspage=()=>{
        history.push("/leaddetailspage")
    }
    useEffect(()=>{
        leadsData()
    },[])
    const leadsData=()=>{
        console.log("from leads data function")
        axios.get('http://localhost:9011/lead/getleads').then(response=>{
        console.log("response of the",response.data)
        setLeads(response.data);
        console.log("this are leads from state",leads.length)
    }
    )}
    const leadsRedirect=(id,image,email,username,number,course,ads,purpose)=>{
        var obj={
            id:id,
            image:image,
            email:email,
            username:username,
            number:number,
            course:course,
            ads:ads,
            purpose:purpose
        }
        localStorage.setItem("leadobject",JSON.stringify(obj))
        history.push('/userleads')
        alert("working")
    }
    return(
        <div className="leads">
                    
                    <div className="leadsSidenav"><SideNav /></div>
                    <div className="col">
                        <SearchComponent />
                   
                    <div className="leadsbody">
                        
                    <h3>Leads Summary</h3>
                    <hr></hr>
                    {/* <h1 style={{color:'white'}}>Welcome to Dashborad--{email} </h1> */}
                    <div className="button">
               <NavLink  className="waves-effect waves-light btn modal-trigger" to="/leaddetailspage" onClick={sendToLeadspage}>Add Lead</NavLink>
               </div>
               <hr></hr>
               <table>
        <thead style={{color:'#FEFEFE'}}>
          <tr >
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>MobileNumber</th>
              <th>Course</th>
              <th>Ads</th>
              <th>Purpose</th>
              
          </tr>
        </thead>

        <tbody style={{color:'#FFFFFF'}}>
        {leads.map(lead=><tr  onClick={()=>{leadsRedirect(lead.id,lead.image,lead.email,lead.username,lead.number,lead.course,lead.ads,lead.purpose)}}>
            <td>{lead.id}</td>
            <td>{lead.username}</td>
            <td>{lead.email}</td>
            <td>{lead.number}</td>
            <td>{lead.course}</td>
            <td>{lead.ads}</td>
            <td>{lead.purpose}</td>
        </tr>)}
        </tbody>
      </table>                   
                    </div>
    
            </div>
            </div>
    )
}

export default Leads