import React, { useState } from 'react'
import './Modal.css'

function Modal(){
     const [IsModalOpen,setIsModalOpen]=useState(false)
     const closeHandler=()=>{
     setIsModalOpen(false)
       }
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
    return(
        <form className="form">
        <div className="modal-wrapper">
         {/* style={{
         opacity: show ? '1':'0',
        }}  */}
        <div className="modal-header">
            <p>Note</p>
            <span onClick={()=>setIsModalOpen(false)} className="close-modal-btn">x</span>
        </div>
        <div className="modal-content">
        <div className="modal-body">
        
            <p><input type="text" style={{color:'white'}} placeholder="Start Typing to leave a note..." name="note" ></input></p>
        </div>
        <div className="modal-footer">
            <button onClick={closeHandler} className="btn-cancel" >Save Note</button>
        </div>
        </div>
    </div>            
        </form>
)
    }
        // <div className="modal-wrapper">
            /* style={{
             opacity: show ? '1':'0',
            }} */
            /* <button className="state" onClick={()=>setIsModalOpen(true)}></button> */
        //     <div className="modal-header">
        //         <p>Welcome to Our Website</p>
        //         <span onClick={()=>setIsModalOpen(false)} className="close-modal-btn">X</span>
       
        //     </div>
        //     <div className="modal-content">
        //     <div className="modal-body">
        //         <h4>Modal</h4>
        //         <p>Hello World Hello World Hello World Hello World Hello World Hello World Hello World</p>
        //     </div>
        //     <div className="modal-footer">
        //         <button onClick={()=>setIsModalOpen(false)} className="btn-cancel">Save Note</button>
        //     </div>
        //     </div>
        // </div>

export default Modal