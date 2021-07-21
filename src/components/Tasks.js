import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import DatePicker from 'react-date-picker'
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import './Tasks.css'
// import Model from './Model'
import Modal from 'react-modal'
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

function Tasks(props){
    const [IsModalOpen,setIsModalOpen]=useState(false)
  const [useremail,setuseremail]=useState('')
  const [state,setstate]=useState('')
  const [note,setnote]=useState('')
  const [userdetails,setuserdetails]=useState({})
  const [date,setdate]=useState(new Date())
  const [value,onchange]=useState(new Date())
  const [tasksarray,settasksarray]=useState([])
  const [tasks,settasks]=useState({})
  const [taskstate,settaskstate]=useState({})
  const history=useHistory()
  useEffect(()=>{
    setuseremail(localStorage.getItem('emailId'))
    setnote(localStorage.getItem('note'))
    getDetails()
    getTasks()
  },[])
  const getDetails=()=>{
      var obj={email:localStorage.getItem('emailId')}
      axios.post('http://localhost:9011/user/getuserbyemail',obj).then((response)=>setuserdetails(response.data))
  }
  const getTasks=()=>{
      console.log("leadId",props.leadId)
      axios.get(`http://localhost:9011/lead/getleadbyid/${props.leadId}`).then(response=>{
        // if(response.data.length != 0){
        var tasksFromDb = response.data[0].task
        settasksarray(tasksFromDb)
        settasks(tasksFromDb[tasksFromDb.length-1])
        console.log("tasks from db",tasksFromDb)
      // }
      })
  }

  const captureData=(event)=>{
    // event.preventDefault()
    var name=event.target.name
    var value=event.target.value
    var taskObject={
      [name]:value,
      date:date.toLocaleDateString('en-us',DATE_OPTIONS),
      Time:date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
      username:userdetails.username,
      image:userdetails.image,
    }
    settaskstate(taskObject) 
  }
  const saveTask=(event)=>{
    // event.preventDefault()
    var data=[...tasksarray]
    data.push(taskstate)
    var taskobject={
      tasks:data,
      leadId:props.leadId
    }
    axios.put("http://localhost:9011/lead/updatetask",taskobject).then(response=>getTasks())
    console.log("task object",taskobject)
  }
  console.log("this is actual task",tasksarray[tasksarray.length-1])
  const DATE_OPTIONS = {  year: 'numeric', month: 'short', day: 'numeric' };
    return(
        <div className="tasks">
             <button className="button_new" onClick={()=>setIsModalOpen(true)}>Create Task</button>
          <br />
          <form className="task">

            <div className="timestamp">
            <p>{tasks?tasks.date:null}</p>
           < p> &nbsp;at {tasks?tasks.Time:null}</p>
          
            </div>
            <h5>Task</h5>
             
            <div className="title">
            <CheckCircleTwoToneIcon /> 
            &nbsp; 
            <h7>Call this Lead </h7>   
            </div>
            <br />
            <p>{tasks?tasks.task:null}</p>
            {/* This is the first note that we have been writing in the note component. So far, this is just a test case paragraph to check whether the respective css of the note is working properly or not. This is one of the component among four other components. </p> */}
        
         <hr 
         style={{
             color:'white',
             backgroundColor:'white',
             height:1
         }}
         />
          <h7 className="assign">Assign To</h7>
           <br />
           <div className="usertask">
        
        <img className="userdetails" src={userdetails.image}></img>
            <h6>&nbsp; {useremail}  &nbsp;</h6>
            </div>
            <div className="date">
              <h8>Due Date</h8>
              <br />
            </div>
          </form>
          <Modal 
          style={customStyles}  
          isOpen={IsModalOpen}  
          shouldCloseOnOverlayClick={true}
          >
            <div className="modal-wrapper">
              <div className="modal-header">
                <p>Task</p>
                <span onClick={()=>setIsModalOpen(false)} className="close-modal-btn">x</span>
            </div>
             <div className="modal-content">
            <div className="modal-body">
            <form className="task_data">
                <p><input type="text" style={{color:'white'}} placeholder="Enter Task Here" name="task" onChange={captureData}></input></p>
                </form>
            </div> 
            <div className="duedate">
              <h7>Date</h7>
              <br />
            <DatePicker style={{backgroundColor:'blue'}} name="date" className="datepicker" 
            onChange={onchange}
            onClick={captureData}
            value={value}
            />
            </div>
             <div className="modal-footer">
                <button onClick={()=>setIsModalOpen(false)} className="btn-cancel" onClick={saveTask} >Save Task</button>
            </div> 
            </div>
        </div>
           </Modal>
        </div>
    )
}
export default Tasks