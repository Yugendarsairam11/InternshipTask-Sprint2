import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
// import {Button,Modal} from 'bootstrap'
import './Checklist.css'
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

function Checklist(props){

    const [IsModalOpen,setIsModalOpen]=useState(false)
    const [useremail,setuseremail]=useState('')
    const [state,setstate]=useState('')
    const [note,setnote]=useState('')
    const [userdetails,setuserdetails]=useState({})
    const [checkbox,setcheckbox]=useState({})
    const [checklist,setchecklist]=useState([])
    const [checklistitem,setchecklistitem]=useState('')
    const [checkedobjects,setcheckobjects]=useState({})
    const [date,setdate]=useState(new Date())
    const history=useHistory()
    useEffect(()=>{
      setuseremail(localStorage.getItem('emailId'))
      setnote(localStorage.getItem('note'))
      getDetails()
    },[])
    // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  
  const addChecklistItem = () =>{
      console.log("the item to be added ", checklistitem)
      var temp = [...checklist]
      temp.push(checklistitem)
      setchecklist(temp)
      var tempObject = checkedobjects
      var tempProperty = checklistitem
      checkedobjects.[tempProperty] = false
      console.log("Created Object",checkedobjects)
      // console.log("the items in the checklist array is ",temp)

  }

    const getDetails=()=>{
        var obj={email:localStorage.getItem('emailId')}
        axios.post('http://localhost:9011/user/getuserbyemail',obj).then((response)=>setuserdetails(response.data))
    }
    const Checkbox = props => (
      <input type="checkbox" {...props} />
    )
    const captureData=(event)=>{
      // event.preventDefault()
      var name=event.target.name
      var value=event.target.value
      setstate({...state,[name]:value})
      var obj=state
      localStorage.setItem('note',JSON.stringify(obj))
    }
    const checkBox = () =>{
      // setstate()
      alert("onclick is working fine")
    }
    const createChecklist = (item) =>{
      checkedobjects.[item] = !checkedobjects.[item]
      console.log("In Create Checklist Function",checkedobjects)
      axios.put(`http://localhost:9011/lead/updatechecklist/${props.leadId}`,[checkedobjects]).then(()=>alert("Success"))
    }
    const DATE_OPTIONS = {  year: 'numeric', month: 'short', day: 'numeric' };
    return(
      <div>
        <div className="checklists">
             <button className="button_new" onClick={()=>setIsModalOpen(true)}>Create Checklist</button>
          <br />
          <form className="checklist">

            <div className="timestamp">
            <p>Time:&nbsp;{date.toLocaleDateString('en-us',DATE_OPTIONS)}</p>
            <p> &nbsp;at {date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</p>
          
            </div>
            <h5>Checklist</h5>        
            
          <form>
          <div className="checkbox">
            {checklist.map(item =><React.Fragment><label style={{color:'white'}}>
          <Checkbox

            // checked={this.state.checked}
            onChange={()=>createChecklist(item)}
          />
          <span>{item}</span>
        </label><br /></React.Fragment> )}
        
        <br></br>
        <br></br>
      </div> 

          </form>
            <hr
        style={{
            color: 'white',
            backgroundColor: 'white',
            height: 1
        }}
    />
    <div className="checklist-details">
            <img className="image" src={userdetails.image}></img>
            <h6>{useremail}, &nbsp;left a Checklist</h6>
            </div>
          </form>
        </div>
        <Modal 
          style={customStyles}  
          isOpen={IsModalOpen}  
          shouldCloseOnOverlayClick={true}
          >
            <div className="modal-wrapper">
              <div className="modal-header">
                <p>Checklist</p>
                <span onClick={()=>setIsModalOpen(false)} className="close-modal-btn">x</span>
            </div>
             <div className="modal-content">
            <div className="modal-body">
            <form className="task_data">
                <p><input type="text" style={{color:'white'}} placeholder="Enter Checklist Item Here" name="task" onChange={(event)=>{setchecklistitem(event.target.value);console.log(checklistitem)}}></input></p>
                </form>
            </div> 
             <div className="modal-footer">
                <button onClick={()=>{setIsModalOpen(false);addChecklistItem()}} className="btn-cancel">Save Checklist</button>
            </div> 
            </div>
        </div>
           </Modal>
        </div>
        
    )
}
export default Checklist