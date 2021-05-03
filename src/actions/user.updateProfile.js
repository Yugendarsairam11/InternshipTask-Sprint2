import axios from "axios"

export const updateProfile=(userData)=>async(dispatch,state)=>{
        const response=await axios.put("http://localhost:9011/user/updateprofile",userData)
        console.log("in update profile",response)
        console.log(response)
        dispatch({type:"profileupdate",result:response.data.result})
}