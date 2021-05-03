import React from 'react'
import {useHistory} from 'react-router-dom'
import './dashboard.css'
import {NavLink} from 'react-router-dom'
import { useEffect} from 'react';
import {useState} from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import searchComponent from '../components/searchComponent'
// import searchIcon from '@material-ui/icons/search'

import Sidenav from './SideNav'
import SearchComponent from './searchComponent';
import axios from 'axios';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function DashBoard(props) {
    var history=useHistory()
    // if(!localStorage.getItem("token")||!localStorage.getItem("emailId")){
    //     history.push('/')
    // }
    const [emailId,setemailId]=useState('')
    const [ui,setui]=useState([])
    const [ux,setux]=useState([])
    const [web,setweb]=useState([])
    const [data,setdata]=useState([])
    const [ads,setads]=useState([])
    const [microsoftads,setmircosoftads]=useState([])
    useEffect(
        ()=>{
            
            if(!localStorage.getItem("emailId")){
                props.history.push('/')
                
            }
            
        setemailId(localStorage.getItem("emailId"))
        getUiLeads()
        getUxLeads()
        getAllLeads()
        getWebLeads()  
        getGoogleLeads()
        getMicrosoftLeads(

        )  
        
    },[])  
    const logoutUser=()=>{
        localStorage.removeItem("emailId")
        setemailId("")
        props.history.push('/')
    }
    const getGoogleLeads=()=>{
        var obj={ads:"Google Ads"}
        axios.post('http://localhost:9011/lead/getleadsbyads',obj).then((response)=>setads(response.data))
    }
    const getMicrosoftLeads=()=>{
        var obj={ads:"Microsoft Ads"}
        axios.post('http://localhost:9011/lead/getleadsbyads',obj).then((response)=>setmircosoftads(response.data))
    }
    const getUiLeads=()=>{
        var obj={course:"UI"}
        axios.post('http://localhost:9011/lead/getleadsbycourse',obj).then((response)=>setui(response.data))
    }
    const getUxLeads=()=>{
        var obj={course:"UX"}
        axios.post('http://localhost:9011/lead/getleadsbycourse',obj).then((response)=>setux(response.data))
    }
    const getWebLeads=()=>{
        var obj={course:"Web Development"}
        axios.post('http://localhost:9011/lead/getleadsbycourse',obj).then((response)=>setweb(response.data))
    }
    const getAllLeads=()=>{
        axios.get('http://localhost:9011/lead/getleads').then((response)=>setdata(response.data))
    }
    var Ui=(ui.length/data.length)*100
            var Ux=(ux.length/data.length)*100
            var Web=(web.length/data.length)*100
    console.log(Ui)
    console.log(Ux)
    console.log(Web)

    var NewGoogleAds=(ads.length/data.length)*100   
    var NewMicrosoftAds=(microsoftads.length/data.length)*100

    console.log(NewGoogleAds)
    console.log(NewMicrosoftAds)

    const options = {
        theme: "dark2",
        animationEnabled: true,
        exportFileName: "New Year Resolutions",
        exportEnabled: true,
        title:{
            text: "Leads by Course"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            
            dataPoints: [
                { y: Ui, label: "UI" },
                { y: Ux, label: "UX" },
                { y: Web, label: "Web Development" }
                
            ]
        }]
    } 
    const optionsnew = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Leads by Ads"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: " {y}%",
            dataPoints: [
                { y: NewGoogleAds, label: "Google Ads" },
                { y: NewMicrosoftAds, label: "Mircosoft Ads" },
            ]
        }]
    }
    console.log("this is from ui",ui)
    console.log("this is from ux",ux)
    return (
                <div className="dashboard">
                     
                    <div className="sideNav"><Sidenav /></div>
                    <div className="search">
                    <SearchComponent />
                    <div className="logoutbutton">
        <div><NavLink className="btn waves-effect waves-light btn-large red"  name="action" to="/" onClick={logoutUser}>Logout
                    </NavLink></div>
                    </div>
          
                    <div className="body">
                    
                                      {/* <searchIcon /> */}
       
        
                    <h4>Welcome to DashBoard-{emailId}</h4>
                    <hr />
                    <br />
                    <div className="dashboardleads">
                   <div className="divison">
                   <h3> {data.length} <div className="divison_leads">Total Leads</div></h3>
                   </div>
                   <br></br>
                   <br />
                   <div className="coldleads">
                   <h3> {data.length} <div className="divison_leads">Cold Leads</div></h3>
                   </div>
                   </div>
                   <br />
                    <CanvasJSChart options = {options} />
                    <br />
                    <br />
                    <CanvasJSChart options = {optionsnew} />
                    {/* <h1 style={{color:'white'}}>Welcome to Dashborad--{email} </h1> */}
               {/* <NavLink class="waves-effect waves-light btn modal-trigger" to="/updatePassword">Change Password</NavLink> */}
                    </div>
                    <div className="end">

                    </div>
    
            </div>
            </div>
    )
}

export default DashBoard
