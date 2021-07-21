import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Dom from 'react-dom'
// import Model from '../components/Model'
import DatePicker from 'react-date-picker'
import Modal from 'react-modal'
import './Notes.css'
import axios from 'axios';
import { Container } from '@material-ui/core'
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '50%',
    marginTop:"10%",
    height:'800px',
    width:'40%',
    backgroundColor:'',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root')
function Notes(props){ 
  // const [IsModalOpen,setIsModalOpen]=useState(false)
  // const closeHandler=()=>{
  //   setIsModalOpen(false)
  // }
  // return(
{/* <div>
    { IsModalOpen ? <div onClick={closeHandler} className="back-drop"></div>: null}
    <div className="notes">
      <button onClick={()=>setIsModalOpen(true)} className="btn-openmodal">Open Modal</button>
      <Modal show={IsModalOpen} close={closeHandler}/>
    </div>
    </div>
  )
} */}
  
  const [IsModalOpen,setIsModalOpen]=useState(false)
  const [show,setshow]=useState(false)
  const [useremail,setuseremail]=useState('')
  const [state,setstate]=useState({})
  const [details,setdetails]=useState({})
  const [notes,setnotes]=useState({})
  const [notesarray,setnotesarray]=useState([])
  const [date,setdate]=useState(new Date())
  const [value,onchange]=useState(new Date())
  const history=useHistory()
  useEffect(()=>{
    setuseremail(localStorage.getItem('emailId'))
    console.log("setnotes",JSON.parse(localStorage.getItem('leadobject')))
    getDetails()
    getNotes()
  },[])
  const getDetails=()=>{
    var obj={email:localStorage.getItem('emailId')}
    axios.post('http://localhost:9011/user/getuserbyemail',obj).then((response)=>setdetails(response.data))
  }
  const getNotes=()=>{
    console.log("props id",props.leadId)
    axios.get(`http://localhost:9011/lead/getleadbyid/${props.leadId}`).then(response=>{
    var notesFromDb = response.data[0].notes
    setnotesarray(notesFromDb)
    setnotes(notesFromDb[notesFromDb.length-1])
    console.log("notes from db",notesFromDb)
  })}
  const closeHandler=()=>setIsModalOpen(false)
  const captureData=(event)=>{
    event.preventDefault()
    var name=event.target.name
    var value=event.target.value
    var leadObject={
      [name]:value,
      date:date.toLocaleDateString('en-us',DATE_OPTIONS),
      Time:date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
      username:details.username,
      image:details.image,
    }
    setstate(leadObject)
  }
  
  const saveNote=(event)=>{
    event.preventDefault()
    closeHandler()
    var data=[...notesarray]
    data.push(state)
    var noteObject={
      notes:data,
      leadId:props.leadId
    }
    axios.put("http://localhost:9011/lead/updateleadnote",noteObject).then(response=>getNotes())
    console.log("note object",noteObject)
    
  }
  console.log("this is actual note",notesarray[notesarray.length-1])
  const DATE_OPTIONS = {  year: 'numeric', month: 'short', day: 'numeric' };

    return(
        <div className="notes">
          <button className="button_new" onClick={()=>setIsModalOpen(true)}>Create Note</button>
          <br />
          <form className="note">

            <div className="timestamp">
            <p>{notes?notes.date:null}</p>
           < p> &nbsp;at {notes?notes.Time:null}</p>
           
            </div>
            {/* <button>Delete</button> */}
            <h5>Note</h5>        
            <p>{notes?notes.note:null}</p>
            {/* This is the first note that we have been writing in the note component. So far, this is just a test case paragraph to check whether the respective css of the note is working properly or not. This is one of the component among four other components. Hierarchy of this note component is as follows where at the initial step we will be having a button named after open model followed by a form and data.</p> */}
           
            <hr
        style={{
            color: 'white',
            backgroundColor: 'white',
            height: 1
        }}
    />
          <div className="notesettings">
            <img className="imagedetails" src={details.image}></img>
            <h6>{useremail},  &nbsp;left a note</h6>
            </div>
          </form>
          {/* <Model show={show} closeHandler={closeHandler} */}
           <Modal 
          style={customStyles}  
          isOpen={IsModalOpen}  
          shouldCloseOnOverlayClick={true}
          >              
            <div className="modal-wrapper">    
              <div className="modal-header">
                <p>Note</p>
                <span onClick={()=>setIsModalOpen(false)} className="close-modal-btn">x</span>
            </div>
             <div className="modal-content">
            <div className="modal-body">
            <form  className="notes_data">
                <p><input type="text" style={{color:'white'}} placeholder="Start Typing to leave a note..." name="note" onChange={captureData}></input></p>
                </form> 
            </div> 
             <div className="modal-footer">
                <button onClick={()=>setIsModalOpen(false)} className="btn-cancel" onClick={saveNote}>Save Note</button>
            </div> 
            </div>
        </div> 
           </Modal>
          </div>
          )
       }    
export default Notes