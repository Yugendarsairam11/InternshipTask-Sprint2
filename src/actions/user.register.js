import axios from "axios"

export const userRegister=(userData)=>async(dispatch,state)=>{
        const response=await axios.post("http://localhost:9011/user/register",userData)
        dispatch({type:"REGISTERUSER",result:response.data.result})
}