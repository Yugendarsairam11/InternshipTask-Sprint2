import React, { useState,useRef,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import './profileUpdate.css'
import {updateProfile} from '../actions/user.updateProfile'



function ProfileUpdate(props){
    console.log("the data initially is ",useSelector((state) => state.userData.isProfileUpdated))
    const isProfileUpdated=useSelector((state) => state.userData.isProfileUpdated)
    console.log("this is from updating the profile",isProfileUpdated)

    const history=useHistory()
    useEffect(()=>{
       setdata(JSON.parse(localStorage.getItem("profiledetails")))
        settingFieldsValue()
    },[])
    //making references
    const dispatch=useDispatch()
    const userref=useRef()
    const imageref=useRef()
    const emailref=useRef()
    const numberref=useRef()
    const locationref=useRef()
    // const courseref=useRef()
    // const adsref=useRef()
    // const purposeref=useRef()

    //setting state
    const[data,setdata]=useState({})
    const [user,setuser]=useState('')
    const [userlead,setuserlead]=useState({})
    const [image,setimage]=useState('')
    const [email,setemail]=useState('')
    const [state,setstate]=useState('')
    // const [initialstate,setinitialstate]=useState('')
    const [number,setnumber]=useState('')
    // const [course,setcourse]=useState('')
    // const [ads,setads]=useState('')
    // const [purpose,setpurpose]=useState('')
    

    //validation
    const [emailval,setemailval]=useState(false)
    const [imageval,setimageval]=useState(false)
    const [usernameval,setusernameval]=useState(false)
    const [numberval,setnumberval]=useState(false)
    // const [courseval,setcourseval]=useState(false)
    // const [adsval,setadsval]=useState(false)
    // const [purposeval,setpurposeval]=useState(false)

    
    const registeruser=(event)=>{
        event.preventDefault()
       
        if(  emailval && usernameval && numberval && imageval){
            var obj={
                // id:initialstate.id,
                image:image,
                email:email,
                username:user,
                number:number,
                // course:course,
                // ads:ads,
                // purpose:purpose
            }
            console.log(obj)
            var obj=localStorage.getItem('leadobject')
            // dispatch(leadUpdate(obj.id))
            console.log("this is from leads",obj)
            if(!isProfileUpdated){
                alert("Lead Updated")
                history.push('/leads')
            }
            else{
                alert("Lead not updated")
            }
            
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
        setstate({
            ...state,[name]:value
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
        setuserlead(JSON.parse(localStorage.getItem("profiledetails")))
        var obj=JSON.parse(localStorage.getItem('profiledetails'))
        var obj2=JSON.parse(localStorage.getItem('userdetails'))
        // console.log("this is image",obj.image)
        emailref.current.value=obj.emailId
        imageref.current.value=obj2.image
        userref.current.value=obj.username
        numberref.current.value=obj.number
        locationref.current.value=obj.location
        // courseref.current.value=obj.course
        // adsref.current.value=obj.ads
        // purposeref.current.value=obj.purpose

    }
    const captureData=(event)=>{
        var name=event.target.name
        var value=event.target.value
        setuserlead({...userlead,[name]:value})
        
        
    }
    const updateDetails=()=>{
        console.log(userlead)
        var obj={emailId:userlead.emailId,username:userlead.username,password:userlead.password,image:userlead.image,number:userlead.number,location:userlead.location}
        dispatch(updateProfile(obj))
        alert("profile updated")
        props.history.push('/userprofilepage')
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
        <h5>Update Profile Details</h5>
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
            <input style={{color:'white'}} id="emailId" type="text" name="email" onChange={captureData} ref={emailref} disabled />
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
            <input style={{color:'white'}} id="emailId" type="text" name="course" onChange={captureData} ref={locationref} />
            <label class="active" for="username"><b>Location</b></label>
            {/* <span ref={courseref}></span> */}
        </div>
            
            <br/>
        <div class="input-field col s12">
        <button  onClick={updateDetails} class="waves-effect waves-light btn-large red">Update Profile</button>
        </div>
    </div>
</div>
    )
}

export default ProfileUpdate