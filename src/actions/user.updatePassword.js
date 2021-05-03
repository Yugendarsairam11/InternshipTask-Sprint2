import axios from "axios"

export const passwordUpdate=(userData)=>async(dispatch,state)=>{
        const response=await axios.put("http://localhost:9011/user/updatepassword",userData)
        console.log(response)
        dispatch({type:"update",result:response.data.result})
}