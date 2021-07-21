import React, { useRef, useState,useEffect } from 'react'
import './leadUpdate.css'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import {leadUpdate} from '../actions/user.updateLead'
import {useHistory} from 'react-router-dom'

function LeadDetailsUpdate(props){
    console.log("the data initially is ",useSelector((state) => state.userData.isLeadUpdated))
    const isLeadUpdated=useSelector((state) => state.userData.isLeadUpdated)
    console.log("this is from updating the lead",isLeadUpdated)

    const history=useHistory()
    useEffect(()=>{
       
        settingFieldsValue()
    },[])
    //making references
    const dispatch=useDispatch()
    const userref=useRef()
    const imageref=useRef()
    const emailref=useRef()
    const numberref=useRef()
    const courseref=useRef()
    const adsref=useRef()
    const purposeref=useRef()

    //setting state
    const [user,setuser]=useState('')
    const [userlead,setuserlead]=useState({})
    const [image,setimage]=useState('')
    const [email,setemail]=useState('')
    const [initialstate,setinitialstate]=useState('')
    const [number,setnumber]=useState('')
    const [course,setcourse]=useState('')
    const [ads,setads]=useState('')
    const [purpose,setpurpose]=useState('')
    

    //validation
    const [emailval,setemailval]=useState(false)
    const [imageval,setimageval]=useState(false)
    const [usernameval,setusernameval]=useState(false)
    const [numberval,setnumberval]=useState(false)
    const [courseval,setcourseval]=useState(false)
    const [adsval,setadsval]=useState(false)
    const [purposeval,setpurposeval]=useState(false)

    const [data,setdata]=useState({})
    const registeruser=(event)=>{
        event.preventDefault()
       
        if( initialstate && emailval && usernameval && numberval && courseval && adsval && purposeval && imageval){
            var obj={
                id:initialstate.id,
                image:image,
                email:email,
                username:user,
                number:number,
                course:course,
                ads:ads,
                purpose:purpose
            }
            console.log(obj)
            var obj=localStorage.getItem('leadobject')
            dispatch(leadUpdate(obj.id))
            console.log("this is from leads",obj)
            if(!isLeadUpdated){
                alert("Lead Updated")
                history.push('/leads')
            }
            else{
                alert("Lead not updated")
            }
            
        }
        
    }
    
    const coursevalidation=(event)=>{
        var value=event.target.value
        if(value.length>2){
            courseref.current.innerHTML="length should not be more than 2 characters"
            courseref.current.style.color="red"
            setcourseval(false)
        }
        else{
            courseref.current.innerHTML="valid"
            courseref.current.style.color="green"
            setcourseval(true)
            setcourse(value)
        }
    }
       
    const adsvalidation=(event)=>{
        var value=event.target.value
        if(value.length<5){
            adsref.current.innerHTML="length should be more than 5 characters"
            adsref.current.style.color='red'
            setadsval(false)

        }
        else{
            adsref.current.innerHTML="All good !"
            adsref.current.style.color='green'
            setads(value)
            setadsval(true)
        }
    }

    const purposevalidation=(event)=>{
        var value=event.target.value
        if(value.length<4){
            purposeref.current.innerHTML="Length should be more than 4 characters"
            purposeref.current.style.color="red"
            setpurposeval(false)
        }
        else{
            purposeref.current.innerHTML="All good"
            purposeref.current.style.color="green"
            setpurposeval(true)
            setpurpose(value)
        }
    }

    const usernamedatavalidation=(event)=>{
        var value=event.target.value
        if(value.length<2){
            userref.current.innerHTML="length should be more than 2 characters"
            userref.current.style.color='red'
            setusernameval(false)

        }
        else{
            userref.current.innerHTML="All good !"
            userref.current.style.color='green'
            setuser(value)
            setusernameval(true)
        }
    }


    const emailvalidation=(event)=>{
        
        var pattern=/^[a-z A-Z 0-9]+@gmail.com$/
        var value=event.target.value
        if(pattern.test(value)){
            emailref.current.style.color='green'
            emailref.current.innerHTML="Email is correct"
            setemail(value)
            setemailval(true)

        }
        else{
            emailref.current.style.color='red'
            emailref.current.innerHTML="Email is not in proper format"
            setemailval(false)
        }

    }

    const numbervalidation=(event)=>{
      var value=event.target.value
     var pattern=/^[6-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;
     if(pattern.test(value)){
        numberref.current.innerHTML="Number is valid"
        numberref.current.style.color='green'
        setnumber(value)
        setnumberval(true)
     }
     else{
         numberref.current.innerHTML="Mobile Number is not in proper format"
         numberref.current.style.color='red'
         setnumberval(false)
     }
    }
    const idData=(event)=>{
        var name=event.target.name
        var value=event.target.value
        setinitialstate({
            ...initialstate,[name]:value
        })
    }
    const imageValidation=(event)=>{
        var value=event.target.value
        if(value.length<5){
            imageref.current.innerHTML="Paste your image address here"
            imageref.current.style.color='red'
            setimageval(false)
        }
        else{
            imageref.current.innerHTML="Valid URL"
            imageref.current.style.color='green'
            setimageval(true)
            setimage(value)
        }
    }
    const settingFieldsValue=()=>{
        setuserlead(JSON.parse(localStorage.getItem("leadobject")))
        var obj=JSON.parse(localStorage.getItem('leadobject'))
        emailref.current.value=obj.email
        imageref.current.value=obj.image
        userref.current.value=obj.username
        numberref.current.value=obj.number
        courseref.current.value=obj.course
        adsref.current.value=obj.ads
        purposeref.current.value=obj.purpose

    }
    const captureData=(event)=>{
        var name=event.target.name
        var value=event.target.value
        setuserlead({...userlead,[name]:value})
        
    }
    const updateDetails=()=>{
        dispatch(leadUpdate(userlead))
        alert("lead updated")
        props.history.push('/leads')
    }
///-->Additonal Stuff
    // const passwordvalidation=(event)=>{
    //     var value=event.target.value
    //     if(value.length<6){
    //         passwordref.current.innerHTML="password should be more than 6 characters"
    //         passwordref.current.style.color="red"
    //         setpasswordval(false)
    //     }
    //     else{
    //         passwordref.current.innerHTML="valid password"
    //         passwordref.current.style.color="green"
    //         setpassword(value)
    //         setpasswordval(true)
    //     }
    // }

    // const confirmpassword=(event)=>{
    //     var value=event.target.value
    //     if(value==password){
    //         confirmpass.current.innerHTML="password is correct"
    //         confirmpass.current.style.color="green"
    //         setpasswordval(true)
    //     }
    //     else{
    //         confirmpass.current.innerHTML="password not matched"
    //         confirmpass.current.style.color="red"
    //     }
    // }

    


    // var pattern=/^[a-z A-Z 0-9]+@gmail.com$/
    return(
    <div className="details">
    <h3 style={{color:'white'}}>Kona<span style={{color:'#E9204F'}}>Digital.ai</span></h3>
            <br></br>
    <div className="leaddetailsbox">
        <h5>Update Lead Details</h5>
        <br />
            {/* <div class="input-field col s12">
            <input  id="id" type="text" name="id" onChange={idData} />
            <label class="active" for="id"><b>ID</b></label>
            {/* <span ref={emailref}></span> */}
        {/* </div>  */}
            <br />
            <div class="input-field col s12">
            <input style={{color:'white'}} id="image" type="text" name="image" onChange={captureData} ref={imageref} />
            <label class="active" for="image"><b>Image URL</b></label>
            {/* <span ref={imageref}></span> */}
        </div>
            <br />
            <div class="input-field col s12">
            <input style={{color:'white'}} id="emailId" type="text" name="email" onChange={captureData} ref={emailref} />
            <label class="active" for="emailId"><b>Email</b></label>
            {/* <span ref={emailref}></span> */}
        </div>
            <br/>
            <div class="input-field col s12">
            <input style={{color:'white'}} id="emailId" type="text" name="username" onChange={captureData} ref={userref} />
            <label class="active" for="username"><b>Username</b></label>
            {/* <span ref={userref}></span> */}
        </div>
            <br/>
            <div class="input-field col s12">
            <input style={{color:'white'}} id="emailId" type="text" name="number" onChange={captureData} ref={numberref} />
            <label class="active" for="username"><b>Mobile Number</b></label>
            {/* <span ref={numberref}></span> */}
        </div>
            <br/>
            <div class="input-field col s12">
            <input style={{color:'white'}} id="emailId" type="text" name="course" placeholder="UI/UX" onChange={captureData} ref={courseref} />
            <label class="active" for="username"><b>Course</b></label>
            {/* <span ref={courseref}></span> */}
        </div>
            <br/>
            <div class="input-field col s12">
            <input style={{color:'white'}}  id="emailId" type="text" name="ads" placeholder="Google Ads/ Microsoft Ads" onChange={captureData} ref={adsref} />
            <label class="active" for="username"><b>Ads</b></label>
            {/* <span ref={adsref}></span> */}
        </div>
            <br/>
            <div class="input-field col s12">
            <input style={{color:'white'}} id="emailId" type="text" name="purpose" placeholder="Demo/Enroll" onChange={captureData} ref={purposeref} />
            <label class="active" for="username"><b>Purpose</b></label>
            {/* <span ref={purposeref}></span> */}
        </div>
            <br/>
        <div class="input-field col s12">
        <button  onClick={updateDetails} class="waves-effect waves-light btn-large red">Update Lead</button>
        </div>
    </div>
</div>
    )
}
export default LeadDetailsUpdate